/**
 * MC Server Manager - Main Process
 * Version 2.5.0 - PERFECT MERGE (Fix Downloads + Auto-Clean + Backups)
 */

const { app, BrowserWindow, ipcMain, dialog, shell, nativeImage } = require('electron');
const path = require('path');
const fs = require('fs');
const https = require('https');
const { spawn } = require('child_process');
const { promisify } = require('util'); 
const zlib = require('zlib');
const extract = require('extract-zip');
const pidusage = require('pidusage');
const os = require('os'); // <--- GARDÉ CELUI-CI, SUPPRIMÉ LE DOUBLON
const { Notification } = require('electron');
const net = require('net');
// Promisify zlib.gunzip pour l'utiliser avec async/await
const gunzip = promisify(zlib.gunzip);
const QRCode = require('qrcode');

// --- AJOUT POUR LA TÉLÉCOMMANDE ---
const express = require('express');
const http = require('http');
const { Server } = require("socket.io");
const ip = require('ip');
const SETTINGS_FILE = path.join(app.getPath('userData'), 'app-settings.json');

const appExpress = express();
const serverHttp = http.createServer(appExpress);
const io = new Server(serverHttp);

// On servira les fichiers du dossier "mobile"
appExpress.use(express.static(path.join(__dirname, 'mobile')));

// Le port de communication (ex: 3000)
const PORT = 3000;
// ----------------------------------

// ========================================
// VARIABLES GLOBALES
// ========================================

let mainWindow = null;
let serverProcess = null;
let statsInterval = null;
let currentServerName = "Serveur";
const numCores = os.cpus().length;
const DATA_FILE = path.join(app.getPath('userData'), 'servers-list.json');

let activeServerTasks = new Map(); // Stocke les minuteurs (setInterval) par serverPath
let currentServerPath = null;      // Garde en mémoire le chemin du serveur qui tourne

const SERVER_FILES = {
    vanilla: 'server.jar',
    paper: 'paper-server.jar',
    fabric: 'fabric-server.jar',
    forge: 'forge-installer.jar',
    eula: 'eula.txt',
    properties: 'server.properties'
};

// ========================================
// DÉMARRAGE
// ========================================

app.whenReady().then(() => {
    createMainWindow();
    registerIpcHandlers();
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        stopServerIfRunning();
        clearAllScheduledTasks(); // Arrête tous les minuteurs
        app.quit();
    }
});

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createMainWindow();
    }
});

function createMainWindow() {
    mainWindow = new BrowserWindow({
        width: 1280,
        height: 900,
        minWidth: 800,
        minHeight: 600,
        title: "MC Server Manager Ultimate v2.5",
        icon: path.join(__dirname, 'logo.png'),
        backgroundColor: '#121212',
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            nodeIntegration: false,
            contextIsolation: true,
            webSecurity: true
        }
    });

    mainWindow.loadFile('index.html');
    mainWindow.setMenuBarVisibility(false);

    mainWindow.on('closed', () => {
        mainWindow = null;
        stopServerIfRunning();
    });
}

// ========================================
// IPC HANDLERS
// ========================================

function registerIpcHandlers() {
    ipcMain.handle('dialog:openDirectory', handleDirectorySelection);
    
    ipcMain.handle('get-versions', handleGetVersions);
    ipcMain.handle('get-saved-servers', handleGetSavedServers);
    ipcMain.handle('read-server-props', handleReadServerProperties);
    ipcMain.handle('save-server-props', handleSaveServerProperties);
    ipcMain.handle('world:reset', handleResetWorld);
    ipcMain.handle('world:upload', handleUploadWorld);
    ipcMain.handle('world:openDatapacks', handleOpenDatapacks);
    ipcMain.handle('delete-server', handleDeleteServer);
    ipcMain.handle('delete-server-files', handleDeleteServerFiles);
    
    ipcMain.handle('create-backup', handleCreateBackup);
    ipcMain.handle('get-backups', handleGetBackups);
    ipcMain.handle('restore-backup', handleRestoreBackup);
    ipcMain.handle('delete-backup', handleDeleteBackup);
    
    ipcMain.on('start-server', handleStartServer);
    ipcMain.on('stop-server', handleStopServer);
    ipcMain.on('send-command', handleSendCommand);
    
    ipcMain.on('open-external-link', handleOpenExternalLink);
    ipcMain.on('open-mods-folder', handleOpenModsFolder);
    ipcMain.on('open-plugins-folder', handleOpenPluginsFolder);
    ipcMain.handle('import-server', handleImportServer);
    ipcMain.handle('change-server-icon', handleChangeServerIcon);

    ipcMain.handle('get-whitelist', handleGetWhitelist);
    ipcMain.handle('get-banlist', handleGetBanlist);
    ipcMain.handle('add-to-whitelist', handleAddToWhitelist);
    ipcMain.handle('remove-from-whitelist', handleRemoveFromWhitelist);
    ipcMain.handle('add-to-banlist', handleAddBan);
    ipcMain.handle('remove-from-banlist', handleRemoveBan);
    ipcMain.handle('get-log-files', handleGetLogFiles);
    ipcMain.handle('get-log-content', handleGetLogContent);

    ipcMain.handle('search-addons', handleSearchAddons);
    ipcMain.handle('download-addon', handleDownloadAddon);

    // ... tes autres handlers ...
ipcMain.handle('get-app-settings', () => loadAppSettings());
ipcMain.handle('save-app-settings', (event, settings) => saveAppSettings(settings));

    ipcMain.on('remote-start-with-config', (event, config) => {
        console.log("📱 Config reçue, lancement via Remote...");
        handleStartServer(null, config);
    });

    ipcMain.on('remote-send-perf-data', (event, data) => {
        io.emit('perf-data', data);
    });

    ipcMain.on('remote-send-player-list', (event, list) => {
        if (io) io.emit('player-list-full', list);
    });

    ipcMain.handle('get-remote-info', async () => {
        try {
            const myIp = getLocalIpAddress(); // <--- Appelle la fonction du bas
            const url = `http://${myIp}:${PORT}`;
            
            const qrDataUrl = await QRCode.toDataURL(url, { 
                color: { dark: '#000000', light: '#ffffff' },
                width: 200,
                margin: 1
            });
            
            return { ip: url, qr: qrDataUrl };
        } catch (e) {
            console.error("Erreur QR Code:", e); // <--- Regarde ta console si ça s'affiche !
            return { error: e.message };
        }
    });
}

// ========================================
// UTILS & TELECHARGEMENT
// ========================================

function sendToConsole(msg) { 
    if (mainWindow && !mainWindow.isDestroyed()) mainWindow.webContents.send('console-log', msg); 
    if (io) io.emit('log-update', msg);
}

function sendServerStopped() { if (mainWindow) mainWindow.webContents.send('server-stopped'); }
function stopServerIfRunning() { 
    if (serverProcess) { 
        try { serverProcess.stdin.write('stop\n'); } catch (e) {} 
        setTimeout(() => { if (serverProcess) serverProcess.kill('SIGTERM'); }, 5000); 
    } 
}
function ensureDirectoryExists(p) { if (!fs.existsSync(p)) fs.mkdirSync(p, { recursive: true }); }

function downloadFile(url, destination) {
    return new Promise((resolve, reject) => {
        if (fs.existsSync(destination)) try { fs.unlinkSync(destination); } catch (e) {}
        const file = fs.createWriteStream(destination);
        const req = https.get(url, { headers: { 'User-Agent': 'MC-Manager' } }, (res) => {
            if (res.statusCode === 301 || res.statusCode === 302) return downloadFile(res.headers.location, destination).then(resolve).catch(reject);
            if (res.statusCode !== 200) { reject(new Error(`HTTP ${res.statusCode}`)); return; }
            const len = parseInt(res.headers['content-length'], 10);
            let cur = 0;
            res.on('data', (chunk) => {
                cur += chunk.length;
                if (len) { const pct = Math.round((cur / len) * 100); if (pct % 20 === 0) sendToConsole(`📥 Téléchargement: ${pct}%`); }
            });
            res.pipe(file);
            file.on('finish', () => file.close(() => resolve('SUCCESS')));
        });
        req.on('error', (e) => { fs.unlink(destination, () => {}); reject(e); });
        file.on('error', (e) => { fs.unlink(destination, () => {}); reject(e); });
    });
}

// ========================================
// DOWNLOAD URLS & LOGIC
// ========================================

async function getVanillaDownloadUrl(versionUrl) {
    return new Promise((resolve, reject) => {
        https.get(versionUrl, { headers: { 'User-Agent': 'MC-Manager' } }, (res) => {
            let data = ''; res.on('data', c => data += c);
            res.on('end', () => {
                try {
                    const json = JSON.parse(data);
                    if (json.downloads && json.downloads.server) resolve(json.downloads.server.url);
                    else reject(new Error('URL serveur introuvable'));
                } catch (e) { reject(e); }
            });
        }).on('error', reject);
    });
}

async function getPaperDownloadUrl(v) {
    return new Promise((resolve, reject) => {
        https.get(`https://api.papermc.io/v2/projects/paper/versions/${v}`, { headers: { 'User-Agent': 'MC-Manager' } }, (res) => {
            let d = ''; res.on('data', c => d += c);
            res.on('end', () => {
                try {
                    const json = JSON.parse(d);
                    const build = json.builds[json.builds.length - 1];
                    resolve(`https://api.papermc.io/v2/projects/paper/versions/${v}/builds/${build}/downloads/paper-${v}-${build}.jar`);
                } catch (e) { reject(e); }
            });
        }).on('error', reject);
    });
}

async function getFabricDownloadUrl(v) {
    return new Promise((resolve, reject) => {
        https.get('https://meta.fabricmc.net/v2/versions/loader', { headers: { 'User-Agent': 'MC-Manager' } }, (res) => {
            let d = ''; res.on('data', c => d += c);
            res.on('end', () => {
                try {
                    const l = JSON.parse(d).find(x => x.stable).version;
                    resolve(`https://meta.fabricmc.net/v2/versions/loader/${v}/${l}/1.0.1/server/jar`);
                } catch (e) { reject(e); }
            });
        }).on('error', reject);
    });
}

async function getForgeDownloadUrl(v) {
    return new Promise((resolve, reject) => {
        https.get('https://files.minecraftforge.net/net/minecraftforge/forge/promotions_slim.json', { headers: { 'User-Agent': 'MC-Manager' } }, (res) => {
            let d = ''; res.on('data', c => d += c);
            res.on('end', () => {
                try {
                    const json = JSON.parse(d);
                    const fv = json.promos[`${v}-recommended`] || json.promos[`${v}-latest`];
                    resolve(`https://maven.minecraftforge.net/net/minecraftforge/forge/${v}-${fv}/forge-${v}-${fv}-installer.jar`);
                } catch (e) { reject(e); }
            });
        }).on('error', reject);
    });
}

// ========================================
// FILE & SERVER DATA
// ========================================

function saveServerToList(config) {
    let servers = [];
    if (fs.existsSync(DATA_FILE)) {
        try { servers = JSON.parse(fs.readFileSync(DATA_FILE, 'utf8')); } catch (e) { servers = []; }
    }
    const serverName = config.name || path.basename(config.folderPath);
    const existingIndex = servers.findIndex(s => s.path === config.folderPath);

    const serverData = {
        path: config.folderPath,
        version: config.versionId,
        name: serverName,
        type: config.type || 'vanilla',
        javaPath: config.javaPath,
        lastModified: new Date().toISOString(),
        autoRestart: config.autoRestart,
        autoBackup: config.autoBackup
    };
    
    if (existingIndex !== -1) {
        servers[existingIndex] = { ...servers[existingIndex], ...serverData };
    } else {
        servers.push(serverData);
    }
    try { fs.writeFileSync(DATA_FILE, JSON.stringify(servers, null, 2)); } catch (e) { console.error(e); }
}

async function updateCoreProperties(folderPath, config) {
    const coreProperties = {
        'online-mode': config.onlineMode !== false,
        'view-distance': config.viewDistance || 10,
        'max-players': config.maxPlayers || 20
    };
    if (config.onlineMode === false) {
        coreProperties['enforce-secure-profile'] = false;
    }
    return await handleSaveServerProperties(null, folderPath, coreProperties);
}

// ========================================
// HANDLERS IMPLEMENTATION
// ========================================

async function handleDirectorySelection() {
    const result = await dialog.showOpenDialog(mainWindow, { properties: ['openDirectory', 'createDirectory'] });
    return result.canceled ? null : result.filePaths[0];
}

async function handleGetVersions() {
    const FALLBACK = [
        { id: "1.21", type: "release" }, { id: "1.20.4", type: "release" }, { id: "1.16.5", type: "release" }, { id: "1.8.9", type: "release" }
    ];
    return new Promise((resolve) => {
        const req = https.get('https://piston-meta.mojang.com/mc/game/version_manifest_v2.json', { headers: { 'User-Agent': 'MC-Manager' }, timeout: 5000 }, (res) => {
            let data = '';
            res.on('data', c => data += c);
            res.on('end', () => {
                try { resolve(JSON.parse(data).versions.filter(v => v.type === 'release')); } catch (e) { resolve(FALLBACK); }
            });
        });
        req.on('error', () => resolve(FALLBACK));
        req.on('timeout', () => { req.destroy(); resolve(FALLBACK); });
    });
}

async function handleGetSavedServers() {
    if (!fs.existsSync(DATA_FILE)) return [];
    try {
        let servers = JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
        const validServers = servers.filter(server => fs.existsSync(server.path));
        if (validServers.length !== servers.length) {
            fs.writeFileSync(DATA_FILE, JSON.stringify(validServers, null, 2));
        }
        return validServers;
    } catch (e) { return []; }
}

async function handleDeleteServer(event, folderPath) {
    if (!fs.existsSync(DATA_FILE)) return false;
    let servers = JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
    fs.writeFileSync(DATA_FILE, JSON.stringify(servers.filter(s => s.path !== folderPath), null, 2));
    return true;
}

async function handleDeleteServerFiles(event, folderPath) {
    try {
        if (!folderPath || folderPath.length < 5) return { success: false, error: "Chemin invalide." };
        await fs.promises.rm(folderPath, { recursive: true, force: true });
        return { success: true };
    } catch (e) {
        return { success: false, error: e.message };
    }
}

async function handleReadServerProperties(event, folderPath) {
    try {
        const propPath = path.join(folderPath, SERVER_FILES.properties);
        if (!fs.existsSync(propPath)) return {}; 
        const content = await fs.promises.readFile(propPath, 'utf-8');
        const properties = {};
        content.split('\n').forEach(line => {
            const trimmedLine = line.trim();
            if (trimmedLine && !trimmedLine.startsWith('#')) {
                const separatorIndex = trimmedLine.indexOf('=');
                if (separatorIndex > 0) {
                    const key = trimmedLine.substring(0, separatorIndex).trim();
                    const value = trimmedLine.substring(separatorIndex + 1).trim();
                    properties[key] = value;
                }
            }
        });
        return properties;
    } catch (error) { return {}; }
}

async function handleSaveServerProperties(event, folderPath, propertiesObject) {
    try {
        const propPath = path.join(folderPath, SERVER_FILES.properties);
        let content = '';
        if (fs.existsSync(propPath)) content = await fs.promises.readFile(propPath, 'utf-8');
        else content = '# Minecraft server properties\n# Fichier généré par MC Server Manager\n';

        for (const key in propertiesObject) {
            const value = propertiesObject[key];
            const newLine = `${key}=${value}`;
            const escapedKey = key.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
            const regex = new RegExp(`^${escapedKey}\\s*=.*$`, 'gm');
            if (content.match(regex)) content = content.replace(regex, newLine);
            else content += `\n${newLine}`;
        }
        await fs.promises.writeFile(propPath, content);
        return { success: true };
    } catch (e) { return { success: false, error: e.message }; }
}

async function handleResetWorld(event, serverPath) {
    if (serverProcess) return { success: false, error: "Arrêtez le serveur." };
    try {
        await fs.promises.rm(path.join(serverPath, 'world'), { recursive: true, force: true });
        await fs.promises.rm(path.join(serverPath, 'world_nether'), { recursive: true, force: true });
        await fs.promises.rm(path.join(serverPath, 'world_the_end'), { recursive: true, force: true });
        return { success: true };
    } catch (e) { return { success: false, error: e.message }; }
}

async function handleUploadWorld(event, serverPath) {
    if (serverProcess) return { success: false, error: "Arrêtez le serveur." };
    const result = await dialog.showOpenDialog(mainWindow, {
        title: 'Choisir une map (.zip)',
        properties: ['openFile'],
        filters: [{ name: 'Fichiers Zip', extensions: ['zip'] }]
    });
    if (result.canceled || result.filePaths.length === 0) return { success: false, error: "Aucun fichier." };

    const zipPath = result.filePaths[0];
    const worldDir = path.join(serverPath, 'world');
    const tempDir = path.join(serverPath, 'world_temp_upload');

    try {
        await handleResetWorld(null, serverPath);
        ensureDirectoryExists(tempDir);
        await extract(zipPath, { dir: tempDir });
        const files = await fs.promises.readdir(tempDir);
        let sourceDir;
        if (files.length === 1 && (await fs.promises.stat(path.join(tempDir, files[0]))).isDirectory()) {
            sourceDir = path.join(tempDir, files[0]);
        } else {
            sourceDir = tempDir;
        }
        await fs.promises.rename(sourceDir, worldDir);
        await fs.promises.rm(tempDir, { recursive: true, force: true });
        return { success: true };
    } catch (e) {
        await fs.promises.rm(tempDir, { recursive: true, force: true });
        return { success: false, error: e.message };
    }
}

async function handleOpenDatapacks(event, serverPath) {
    try {
        const datapackDir = path.join(serverPath, 'world', 'datapacks');
        ensureDirectoryExists(datapackDir);
        shell.openPath(datapackDir);
        return { success: true };
    } catch (e) { return { success: false, error: e.message }; }
}

// ========================================
// BACKUPS
// ========================================

async function handleCreateBackup(event, folderPath, customName) {
    try {
        const worldDir = path.join(folderPath, 'world');
        if (!fs.existsSync(worldDir)) return { success: false, error: "Pas de monde 'world' à sauvegarder." };
        
        const backupDir = path.join(folderPath, 'backups');
        ensureDirectoryExists(backupDir);
        
        const safeName = (customName || `backup-${Date.now()}`).replace(/[^a-z0-9_\- ]/gi, '_');
        const destPath = path.join(backupDir, safeName);
        
        await fs.promises.cp(worldDir, destPath, { recursive: true });

        new Notification({
            title: 'Backup Terminé',
            body: `La sauvegarde '${safeName}' a été créée avec succès.`,
            icon: path.join(__dirname, 'logo.png')
        }).show();

        return { success: true, name: safeName, path: destPath }; 
    } catch (e) { 
        return { success: false, error: e.message }; 
    }
}

async function handleDeleteBackup(event, folderPath, name) {
    try {
        const target = path.join(folderPath, 'backups', name);
        if (!fs.existsSync(target)) return { success: false, error: "Backup introuvable." };
        await fs.promises.rm(target, { recursive: true, force: true });
        return { success: true };
    } catch (e) { return { success: false, error: e.message }; }
}

async function handleGetBackups(event, folderPath) {
    try {
        const backupDir = path.join(folderPath, 'backups');
        if (!fs.existsSync(backupDir)) return [];
        const files = await fs.promises.readdir(backupDir, { withFileTypes: true });
        return files.filter(d => d.isDirectory()).map(d => d.name).sort().reverse();
    } catch (e) { return []; }
}

async function handleRestoreBackup(event, folderPath, name) {
    try {
        const src = path.join(folderPath, 'backups', name);
        const dest = path.join(folderPath, 'world');
        if (!fs.existsSync(src)) return { success: false, error: "Introuvable" };
        if (fs.existsSync(dest)) await fs.promises.rm(dest, { recursive: true, force: true });
        await fs.promises.cp(src, dest, { recursive: true });
        return { success: true };
    } catch (e) { return { success: false, error: e.message }; }
}

// ========================================
// SERVER START/STOP
// ========================================

function handleOpenExternalLink(event, url) { shell.openExternal(url); }
function handleOpenModsFolder(event, p) { const d = path.join(p, 'mods'); ensureDirectoryExists(d); shell.openPath(d); }
function handleOpenPluginsFolder(event, p) { const d = path.join(p, 'plugins'); ensureDirectoryExists(d); shell.openPath(d); }

function handleStopServer() {
    if (serverProcess) { try { serverProcess.stdin.write('stop\n'); } catch (e) {} }
}

function handleSendCommand(event, command) {
    if (serverProcess && command) { try { serverProcess.stdin.write(`${command}\n`); } catch (e) {} }
}

async function handleStartServer(event, config) {
    if (!config || !config.folderPath) return;
    if (serverProcess) return;

    saveServerToList(config);
    currentServerName = config.name || path.basename(config.folderPath);

    try {
        const props = await handleReadServerProperties(null, config.folderPath);
        const port = parseInt(props['server-port'] || config.port || 25565);
        config.port = port; 

        sendToConsole(`🔍 Vérification du port ${port}...`);
        const isPortAvailable = await checkPortAvailability(port);
        
        if (!isPortAvailable) {
            const errorMsg = `Le port ${port} est déjà utilisé.`;
            sendToConsole(`❌ Erreur : ${errorMsg}`);
            new Notification({ title: 'Erreur de Démarrage', body: errorMsg, icon: path.join(__dirname, 'logo.png') }).show();
            sendServerStopped();
            return;
        }
        sendToConsole(`✅ Port ${port} disponible.`);
    } catch (e) {
        sendToConsole(`⚠️ Erreur fatale port: ${e.message}`);
        sendServerStopped();
        return;
    }

    currentServerPath = config.folderPath;
    clearScheduledTasks(config.folderPath);
    registerScheduledTasks(config);
    
    const eulaPath = path.join(config.folderPath, SERVER_FILES.eula);
    if (!fs.existsSync(eulaPath)) fs.writeFileSync(eulaPath, 'eula=true');
    
    await updateCoreProperties(config.folderPath, config);
    sendToConsole('✅ Configuration chargée.');

    try {
        const javaCmd = config.javaPath || 'java';
        const ram = config.ram;

        if (config.type === 'vanilla') {
            const jarPath = path.join(config.folderPath, SERVER_FILES.vanilla);
            if (!fs.existsSync(jarPath)) {
                if (!config.versionUrl) throw new Error("URL Vanilla manquante.");
                sendToConsole('📥 Téléchargement (Vanilla)...');
                const url = await getVanillaDownloadUrl(config.versionUrl);
                await downloadFile(url, jarPath);
            }
            runJavaServer(config.folderPath, SERVER_FILES.vanilla, ram, config.javaPath);
        } else if (config.type === 'paper') {
            const jarPath = path.join(config.folderPath, SERVER_FILES.paper);
            if (!fs.existsSync(jarPath)) {
                if (!config.versionId) throw new Error("ID Paper manquant.");
                sendToConsole('📥 Téléchargement (Paper)...');
                const url = await getPaperDownloadUrl(config.versionId);
                await downloadFile(url, jarPath);
            }
            runJavaServer(config.folderPath, SERVER_FILES.paper, ram, config.javaPath);
        } else if (config.type === 'fabric') {
            const jarPath = path.join(config.folderPath, SERVER_FILES.fabric);
            if (!fs.existsSync(jarPath)) {
                if (!config.versionId) throw new Error("ID Fabric manquant.");
                sendToConsole('📥 Téléchargement (Fabric)...');
                const url = await getFabricDownloadUrl(config.versionId);
                await downloadFile(url, jarPath);
            }
            runJavaServer(config.folderPath, SERVER_FILES.fabric, ram, config.javaPath);
        } else if (config.type === 'forge') {
            const installerPath = path.join(config.folderPath, SERVER_FILES.forge);
            const runScript = path.join(config.folderPath, process.platform === 'win32' ? 'run.bat' : 'run.sh');

            if (!fs.existsSync(runScript)) {
                sendToConsole('⚙️ Forge n\'est pas installé. Lancement de l\'installeur...');
                if (!fs.existsSync(installerPath)) {
                    if (!config.versionId) throw new Error("ID Forge manquant.");
                    sendToConsole('📥 Téléchargement (Forge Installer)...');
                    const url = await getForgeDownloadUrl(config.versionId);
                    await downloadFile(url, installerPath);
                }
                sendToConsole('Veuillez patienter, installation Forge...');
                await new Promise((resolve, reject) => {
                    const installProcess = spawn(javaCmd, ['-jar', installerPath, '--installServer'], { cwd: config.folderPath });
                    installProcess.stdout.on('data', (data) => sendToConsole(`[Forge Installer] ${data.toString()}`));
                    installProcess.on('close', (code) => {
                        if (code === 0) {
                            sendToConsole('✅ Installation de Forge terminée.');
                            try { fs.unlinkSync(installerPath); } catch(e) {}
                            resolve();
                        } else {
                            reject(new Error(`L'installeur Forge a échoué (Code: ${code})`));
                        }
                    });
                });
            }
            runForgeScript(config.folderPath, config.ram, config.javaPath);
        }

    } catch (error) {
        sendToConsole(`❌ Erreur démarrage: ${error.message}`);
        if (currentServerPath) clearScheduledTasks(currentServerPath);
        currentServerPath = null;
        currentServerName = "Serveur";
        sendServerStopped();
    }
}

function runJavaServer(folderPath, jarFile, ramGB, customJavaPath) {
    const javaCmd = customJavaPath || 'java';
    sendToConsole(`🚀 Démarrage (RAM: ${ramGB}G)...`);
    const args = [`-Xms${ramGB}G`, `-Xmx${ramGB}G`, '-jar', jarFile, 'nogui'];
    
    try {
        serverProcess = spawn(javaCmd, args, { cwd: folderPath, shell: false });
        if (mainWindow) mainWindow.webContents.send('global-server-state', 'running');
        io.emit('server-state', 'running');
        setupServerProcessHandlers();
    } catch (error) {
        sendToConsole(`❌ Erreur spawn: ${error.message}`);
        if (mainWindow) mainWindow.webContents.send('global-server-state', 'stopped');
        io.emit('server-state', 'stopped');
        sendServerStopped();
    }
}

function runForgeScript(folderPath, ramGB, customJavaPath) {
    const cmd = process.platform === 'win32' ? 'cmd.exe' : 'sh';
    const args = process.platform === 'win32' ? ['/c', 'run.bat'] : ['run.sh'];
    const env = { ...process.env };
    if (customJavaPath) env.JAVA_HOME = path.dirname(path.dirname(customJavaPath));
    
    try {
        serverProcess = spawn(cmd, args, { cwd: folderPath, shell: false, env: env });
        if (mainWindow) mainWindow.webContents.send('global-server-state', 'running');
        io.emit('server-state', 'running');
        setupServerProcessHandlers();
    } catch (error) {
        sendToConsole(`❌ Erreur spawn forge: ${error.message}`);
        if (mainWindow) mainWindow.webContents.send('global-server-state', 'stopped');
        io.emit('server-state', 'stopped');
        sendServerStopped();
    }
}

// 1. Fonction helper pour Windows (PowerShell)
function getStatsWindows(pid) {
    return new Promise((resolve, reject) => {
        const psCommand = `Get-CimInstance -ClassName Win32_PerfFormattedData_PerfProc_Process -Filter "IDProcess = ${pid}" | Select-Object PercentProcessorTime, WorkingSetPrivate | ConvertTo-Json`;
        
        const ps = spawn('powershell.exe', ['-NoProfile', '-Command', psCommand]);
        let data = '';

        ps.stdout.on('data', (chunk) => { data += chunk; });
        
        ps.on('close', (code) => {
            if (code !== 0 || !data.trim()) { resolve(null); return; }
            try {
                const json = JSON.parse(data);
                const stat = Array.isArray(json) ? json[0] : json;
                resolve({
                    cpu: stat.PercentProcessorTime,
                    memory: stat.WorkingSetPrivate
                });
            } catch (e) { resolve(null); }
        });
        ps.on('error', () => resolve(null));
    });
}

// 2. La fonction principale de gestion du processus
// ==================================================================
//  DÉBUT DU BLOC DE REMPLACEMENT (STATS + LOGS CORRIGÉS)
// ==================================================================

// 1. Fonction de recherche profonde (Recursive) pour Windows
function getStatsWindows(rootPid) {
    return new Promise((resolve, reject) => {
        // Ce script PowerShell récupère tous les processus,
        // puis descend l'arbre généalogique jusqu'à trouver 'java'
        const psCommand = `
            $root = ${rootPid};
            $target = $root;
            $found = $false;
            
            # On récupère la liste des processus une seule fois (plus rapide)
            $procs = Get-CimInstance Win32_Process;
            $parents = @($root);

            # On cherche jusqu'à 4 niveaux de profondeur (cmd -> cmd -> conhost -> java)
            for ($i=0; $i -lt 4; $i++) {
                $children = $procs | Where-Object { $parents -contains $_.ParentProcessId };
                if (!$children) { break; }
                
                # Est-ce qu'on a trouvé Java ?
                $java = $children | Where-Object { $_.Name -match 'java' } | Select-Object -First 1;
                if ($java) {
                    $target = $java.ProcessId;
                    $found = $true;
                    break;
                }
                # Sinon on continue de chercher dans les enfants
                $parents = $children.ProcessId;
            }

            # On récupère les stats du PID trouvé (Java ou le parent si pas trouvé)
            Get-CimInstance -ClassName Win32_PerfFormattedData_PerfProc_Process -Filter "IDProcess = $target" | Select-Object PercentProcessorTime, WorkingSetPrivate | ConvertTo-Json
        `;
        
        const ps = spawn('powershell.exe', ['-NoProfile', '-Command', psCommand]);
        let data = '';

        ps.stdout.on('data', (chunk) => { data += chunk; });
        
        ps.on('close', (code) => {
            if (code !== 0 || !data.trim()) { resolve(null); return; }
            try {
                const json = JSON.parse(data);
                const stat = Array.isArray(json) ? json[0] : json;
                if (!stat) { resolve(null); return; }
                
                resolve({
                    cpu: stat.PercentProcessorTime || 0,
                    memory: stat.WorkingSetPrivate || 0
                });
            } catch (e) { resolve(null); }
        });
        ps.on('error', () => resolve(null));
    });
}

// 2. Gestionnaire principal du processus serveur
function setupServerProcessHandlers() {
    // Nettoyage de sécurité
    if (statsInterval) { clearTimeout(statsInterval); statsInterval = null; }

    // --- BOUCLE DE STATS ---
    const updateStatsLoop = async () => {
        if (!serverProcess || serverProcess.killed) return;

        try {
            let data = { cpu: 0, memory: 0 };

            if (process.platform === 'win32') {
                // Windows : Recherche récursive via PowerShell
                const stats = await getStatsWindows(serverProcess.pid);
                if (stats) {
                    data = { 
                        cpu: stats.cpu / (numCores || 1), 
                        memory: stats.memory / 1024 / 1024 
                    };
                }
            } else {
                // Linux/Mac : pidusage standard
                try {
                    const stats = await pidusage(serverProcess.pid);
                    data = { 
                        cpu: stats.cpu / (numCores || 1), 
                        memory: stats.memory / 1024 / 1024 
                    };
                } catch(e) {}
            }

            // Envoi aux interfaces
            if (mainWindow && !mainWindow.isDestroyed()) {
                mainWindow.webContents.send('server-stats', data);
            }
            if (io) io.emit('server-stats', data);

        } catch (err) {
            // Silence en cas d'erreur de stats pour ne pas spammer
        } finally {
            // Relance dans 2 secondes
            if (serverProcess && !serverProcess.killed) {
                statsInterval = setTimeout(updateStatsLoop, 2000); 
            }
        }
    };

    updateStatsLoop();

    // --- GESTION DES LOGS (Correction du bug lineBuffer) ---
    let serverReady = false;
    let lineBuffer = ''; // <--- C'est la variable qui manquait !

    serverProcess.on('error', (error) => { sendToConsole(`❌ Erreur process: ${error.message}`); });
    
    serverProcess.stdout.on('data', (data) => {
        const rawChunk = data.toString();
        const rawLower = rawChunk.toLowerCase();
        
        if (!serverReady && (rawLower.includes('done') || rawLower.includes('for help, type'))) {
            serverReady = true;
            if (mainWindow && !mainWindow.isDestroyed()) mainWindow.webContents.send('server-ready');
            sendToConsole('✅ SYSTÈME: Démarrage confirmé !');
            if (mainWindow && (mainWindow.isMinimized() || !mainWindow.isFocused())) {
                new Notification({ title: 'Serveur Prêt !', body: `Le serveur '${currentServerName}' est en ligne.`, icon: path.join(__dirname, 'logo.png') }).show();
            }
        }

        lineBuffer += rawChunk;
        // On traite ligne par ligne
        if (lineBuffer.includes('\n')) {
            const lines = lineBuffer.split('\n');
            lineBuffer = lines.pop(); // On garde le reste pour le prochain tour
            for (const line of lines) {
                if (line.trim() === '') continue;
                sendToConsole(line);
                
                // Détection Joueurs
                const joinMatch = line.match(/:\s*(\w+)\s+joined the game/);
                if (joinMatch) {
                    if (mainWindow) mainWindow.webContents.send('player-joined', joinMatch[1]);
                    if (io) io.emit('player-event', { type: 'join', name: joinMatch[1] });
                }
                const leaveMatch = line.match(/:\s*(\w+)\s+left the game/);
                if (leaveMatch) {
                    if (mainWindow) mainWindow.webContents.send('player-left', leaveMatch[1]);
                    if (io) io.emit('player-event', { type: 'leave', name: leaveMatch[1] });
                }
            }
        }
    });
    
    serverProcess.stderr.on('data', (data) => {
        const txt = data.toString();
        if(txt.trim()) sendToConsole(txt);
    });
    
    serverProcess.on('close', (code) => {
        sendToConsole(code === 0 ? '✅ Serveur arrêté proprement' : `⚠️ Serveur arrêté (Code: ${code})`);
        
        if (statsInterval) { clearTimeout(statsInterval); statsInterval = null; }
        if (currentServerPath) { clearScheduledTasks(currentServerPath); currentServerPath = null; currentServerName = "Serveur"; }
        
        serverProcess = null;
        
        if (mainWindow) mainWindow.webContents.send('global-server-state', 'stopped');
        if (io) io.emit('server-state', 'stopped');
        sendServerStopped();
    });
}

// ==================================================================
//  FIN DU BLOC DE REMPLACEMENT
// ==================================================================

// ========================================
// TÂCHES PLANIFIÉES
// ========================================

function clearScheduledTasks(serverPath) {
    if (activeServerTasks.has(serverPath)) {
        const tasks = activeServerTasks.get(serverPath);
        if (tasks.restartTimer) clearInterval(tasks.restartTimer);
        if (tasks.backupTimer) clearInterval(tasks.backupTimer);
        activeServerTasks.delete(serverPath);
        console.log(`[Tasks] Minuteurs arrêtés pour ${serverPath}`);
    }
}

function clearAllScheduledTasks() {
    activeServerTasks.forEach((tasks) => {
        if (tasks.restartTimer) clearInterval(tasks.restartTimer);
        if (tasks.backupTimer) clearInterval(tasks.backupTimer);
    });
    activeServerTasks.clear();
}

function registerScheduledTasks(config) {
    const serverPath = config.folderPath;
    let tasks = { restartTimer: null, backupTimer: null, lastBackupDate: null };

    if (config.autoRestart && config.autoRestart.enabled) {
        const intervalMs = (config.autoRestart.intervalHours || 4) * 3600 * 1000;
        tasks.restartTimer = setInterval(() => {
            if (serverProcess && currentServerPath === serverPath) {
                sendToConsole(`[Auto-Tâche] Redémarrage planifié...`);
                handleStopServer(); 
                setTimeout(() => {
                    if (mainWindow && !serverProcess) {
                        sendToConsole(`[Auto-Tâche] Relance du serveur...`);
                        handleStartServer(null, config);
                    }
                }, 10000); 
            }
        }, intervalMs);
    }

    if (config.autoBackup && config.autoBackup.enabled) {
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - (config.autoBackup.intervalDays || 1));
        tasks.lastBackupDate = yesterday.toDateString();
        performAutoBackup(config);
        tasks.backupTimer = setInterval(() => { performAutoBackup(config); }, 60000);
    }
    activeServerTasks.set(serverPath, tasks);
}

function performAutoBackup(config) {
    if (!config || !activeServerTasks.has(config.folderPath)) return;
    const now = new Date();
    const [hour, minute] = config.autoBackup.atTime.split(':');
    const tasks = activeServerTasks.get(config.folderPath);
    const today = now.toDateString();
    
    if (now.getHours() != hour || now.getMinutes() != minute) return;
    if (tasks.lastBackupDate === today) return;

    const lastBackup = new Date(tasks.lastBackupDate);
    const diffDays = Math.ceil(Math.abs(now - lastBackup) / (1000 * 60 * 60 * 24));

    if (diffDays >= config.autoBackup.intervalDays) {
        sendToConsole(`[Auto-Tâche] Lancement du backup automatique...`);
        const dateStr = now.toISOString().split('T')[0]; 
        const timeStr = now.toTimeString().split(' ')[0].replace(/:/g, '-');
        const backupName = `backup (auto) - ${dateStr} - ${timeStr}`;

        handleCreateBackup(null, config.folderPath, backupName).then(result => {
            if (result.success) {
                sendToConsole(`[Auto-Tâche] Backup réussi: ${backupName}`);
                tasks.lastBackupDate = today;
                activeServerTasks.set(config.folderPath, tasks);
            } else {
                sendToConsole(`[Auto-Tâche] ERREUR backup: ${result.error}`);
            }
        });
    }
}

// ========================================
// GESTION LISTES & ICONS
// ========================================

function fetchPlayerUUID(playerName) {
    return new Promise((resolve, reject) => {
        const url = `https://api.mojang.com/users/profiles/minecraft/${encodeURIComponent(playerName)}`;
        https.get(url, { headers: { 'User-Agent': 'MC-Manager' } }, (res) => {
            if (res.statusCode !== 200) return reject(new Error(`Joueur introuvable`));
            let data = ''; res.on('data', (chunk) => data += chunk);
            res.on('end', () => {
                try {
                    const json = JSON.parse(data);
                    const uuid = json.id.replace(/(\w{8})(\w{4})(\w{4})(\w{4})(\w{12})/, '$1-$2-$3-$4-$5');
                    resolve({ uuid: uuid, name: json.name });
                } catch (e) { reject(e); }
            });
        }).on('error', reject);
    });
}

async function getPlayerList(folderPath, fileName) {
    const filePath = path.join(folderPath, fileName);
    if (!fs.existsSync(filePath)) return [];
    try { return JSON.parse(await fs.promises.readFile(filePath, 'utf8') || '[]'); } catch (e) { return []; }
}

async function savePlayerList(folderPath, fileName, list) {
    try { await fs.promises.writeFile(path.join(folderPath, fileName), JSON.stringify(list, null, 2)); return true; } catch (e) { return false; }
}

async function handleGetWhitelist(event, folderPath) { return await getPlayerList(folderPath, 'whitelist.json'); }
async function handleGetBanlist(event, folderPath) { return await getPlayerList(folderPath, 'banned-players.json'); }

async function handleRemoveFromWhitelist(event, folderPath, uuid) {
    let list = await getPlayerList(folderPath, 'whitelist.json');
    list = list.filter(p => p.uuid !== uuid);
    await savePlayerList(folderPath, 'whitelist.json', list);
    return list;
}

async function handleRemoveBan(event, folderPath, uuid) {
    let list = await getPlayerList(folderPath, 'banned-players.json');
    list = list.filter(p => p.uuid !== uuid);
    await savePlayerList(folderPath, 'banned-players.json', list);
    return list;
}

async function handleAddToWhitelist(event, folderPath, playerName) {
    try {
        const player = await fetchPlayerUUID(playerName);
        let list = await getPlayerList(folderPath, 'whitelist.json');
        if (list.some(p => p.uuid === player.uuid)) return { success: true, list: list };
        list.push({ uuid: player.uuid, name: player.name });
        await savePlayerList(folderPath, 'whitelist.json', list);
        return { success: true, list: list };
    } catch (e) { return { success: false, error: e.message }; }
}

async function handleAddBan(event, folderPath, playerName, reason) {
    try {
        const player = await fetchPlayerUUID(playerName);
        let list = await getPlayerList(folderPath, 'banned-players.json');
        if (list.some(p => p.uuid === player.uuid)) return { success: true, list: list };
        list.push({
            uuid: player.uuid, name: player.name,
            created: new Date().toISOString(), source: "MC Manager",
            expires: "forever", reason: reason || "Banni via MC Manager"
        });
        await savePlayerList(folderPath, 'banned-players.json', list);
        return { success: true, list: list };
    } catch (e) { return { success: false, error: e.message }; }
}

async function handleChangeServerIcon(event, folderPath) {
    try {
        const result = await dialog.showOpenDialog(mainWindow, {
            title: 'Choisir une icône', properties: ['openFile'], filters: [{ name: 'Images', extensions: ['png', 'jpg', 'jpeg'] }]
        });
        if (result.canceled || result.filePaths.length === 0) return { success: false };
        const destPath = path.join(folderPath, 'server-icon.png');
        let image = nativeImage.createFromPath(result.filePaths[0]);
        image = image.resize({ width: 64, height: 64, quality: 'high' });
        fs.writeFileSync(destPath, image.toPNG());
        return { success: true, path: destPath };
    } catch (e) { return { success: false, error: e.message }; }
}

async function readLogDir(dirPath) {
    if (!fs.existsSync(dirPath)) return [];
    try {
        const files = await fs.promises.readdir(dirPath);
        return files.map(name => ({ name, path: path.join(dirPath, name) }))
            .filter(f => fs.statSync(f.path).isFile())
            .sort((a, b) => fs.statSync(b.path).mtime.getTime() - fs.statSync(a.path).mtime.getTime())
            .map(f => f.name);
    } catch (e) { return []; }
}

async function handleGetLogFiles(event, serverPath) {
    if (!serverPath) return [];
    const logFiles = await readLogDir(path.join(serverPath, 'logs'));
    const crashFiles = await readLogDir(path.join(serverPath, 'crash-reports'));
    const allFiles = [...logFiles.map(f => ({ name: f, path: path.join('logs', f) })), ...crashFiles.map(f => ({ name: f, path: path.join('crash-reports', f) }))];
    const latest = allFiles.find(f => f.name === 'latest.log');
    const others = allFiles.filter(f => f.name !== 'latest.log');
    return latest ? [latest, ...others] : others;
}

async function handleGetLogContent(event, serverPath, logPath) {
    const fullPath = path.join(serverPath, logPath);
    if (!fs.existsSync(fullPath)) return { success: false, error: "Introuvable" };
    try {
        const buf = await fs.promises.readFile(fullPath);
        if (logPath.endsWith('.gz')) return { success: true, content: (await gunzip(buf)).toString('utf8') };
        return { success: true, content: buf.toString('utf8') };
    } catch (e) { return { success: false, error: e.message }; }
}

function fetchModrinthApi(url) {
    return new Promise((resolve, reject) => {
        https.get(url, { headers: { 'User-Agent': 'MC-Manager' } }, (res) => {
            let data = ''; res.on('data', c => data += c);
            res.on('end', () => { try { resolve(JSON.parse(data)); } catch (e) { reject(e); } });
        }).on('error', reject);
    });
}

async function handleSearchAddons(event, query, filters) {
    try {
        let facets = [];
        if (filters.type === 'mod') facets.push(["project_type:mod"]);
        else if (filters.type === 'plugin') facets.push(["project_type:plugin"]);
        if (filters.version) facets.push([`versions:${filters.version}`]);
        const url = `https://api.modrinth.com/v2/search?query=${encodeURIComponent(query)}&facets=${encodeURIComponent(JSON.stringify(facets))}`;
        const results = await fetchModrinthApi(url);
        return { success: true, hits: results.hits };
    } catch (e) { return { success: false, error: e.message }; }
}

async function handleDownloadAddon(event, serverPath, projectSlug, gameVersion, loader) {
    try {
        const vUrl = `https://api.modrinth.com/v2/project/${projectSlug}/version?game_versions=${encodeURIComponent(JSON.stringify([gameVersion]))}&loaders=${encodeURIComponent(JSON.stringify([loader]))}`;
        const versions = await fetchModrinthApi(vUrl);
        if (!versions || !versions.length) return { success: false, error: 'Aucune version compatible.' };
        const file = versions[0].files.find(f => f.primary) || versions[0].files[0];
        const destDir = path.join(serverPath, ['paper', 'spigot'].includes(loader) ? 'plugins' : 'mods');
        ensureDirectoryExists(destDir);
        const destPath = path.join(destDir, file.filename);
        await downloadFile(file.url, destPath);
        return { success: true, fileName: file.filename };
    } catch (e) { return { success: false, error: e.message }; }
}

function checkPortAvailability(port) {
    return new Promise((resolve, reject) => {
        const server = net.createServer();
        server.once('error', (err) => resolve(err.code !== 'EADDRINUSE'));
        server.once('listening', () => server.close(() => resolve(true)));
        server.listen(port);
    });
}

// --- Démarrage Serveur Web ---
serverHttp.listen(PORT, () => {
    console.log(`📡 REMOTE CONTROL: Prêt ! Connecte-toi sur : http://${getLocalIpAddress()}:${PORT}`);
});

function getLocalIpAddress() {
    const interfaces = require('os').networkInterfaces();
    for (const name of Object.keys(interfaces)) {
        for (const iface of interfaces[name]) {
            // On cherche une IP IPv4 qui n'est pas interne (127.0.0.1)
            // On privilégie les 192.168.x.x (Réseau local classique)
            if (iface.family === 'IPv4' && !iface.internal && iface.address.startsWith('192.168.')) {
                return iface.address;
            }
        }
    }
    // Si on n'a pas trouvé de 192.168, on prend la première IPv4 externe dispo
    for (const name of Object.keys(interfaces)) {
        for (const iface of interfaces[name]) {
            if (iface.family === 'IPv4' && !iface.internal) {
                return iface.address;
            }
        }
    }
    return '127.0.0.1';
}

// ==========================================
// LOGIQUE SOCKET.IO (SÉCURISÉE & COMPLÈTE)
// ==========================================

io.on('connection', (socket) => {
    console.log('📱 Un téléphone tente de se connecter...');
    
    let isAuthenticated = false;
    let mobileCurrentPath = null; // À mettre tout au début du io.on

    // 0. AUTHENTIFICATION DYNAMIQUE
socket.on('auth-login', (pinEntered) => {
    // On recharge les réglages à chaque tentative pour avoir le code à jour
    const settings = loadAppSettings();
    const realPin = settings.remotePin || "1234"; // "1234" par sécurité

    if (pinEntered === realPin) {
        isAuthenticated = true;
        socket.emit('auth-result', { success: true });
        socket.emit('log-update', '🟢 Authentification réussie !');
        // ... suite du code existant ...
        if (serverProcess) socket.emit('server-state', 'running');
        else socket.emit('server-state', 'stopped');
    } else {
        isAuthenticated = false;
        socket.emit('auth-result', { success: false });
        console.log(`⚠️ Code faux : ${pinEntered} (Attendu: ${realPin})`);
    }
});

    // --- COMMANDES PROTÉGÉES ---

    // 1. DÉMARRER
    socket.on('cmd-start', () => {
        if (!isAuthenticated) return;
        if (serverProcess) { socket.emit('log-update', '⚠️ Déjà lancé !'); return; }
        if (mainWindow && !mainWindow.isDestroyed()) {
            mainWindow.webContents.send('request-config-for-remote');
            socket.emit('log-update', '🔄 Demande de lancement...');
            socket.emit('server-state', 'running');
        } else {
            socket.emit('log-update', '❌ Logiciel PC fermé.');
        }
    });

    // 2. STOPPER
    socket.on('cmd-stop', () => {
        if (!isAuthenticated) return;
        if (serverProcess) {
            handleStopServer();
            socket.emit('log-update', '🛑 Arrêt demandé...');
            socket.emit('server-state', 'stopped');
        } else {
            socket.emit('log-update', '⚠️ Aucun serveur lancé.');
        }
    });

    // 3. CONSOLE
    socket.on('cmd-input', (command) => {
        if (!isAuthenticated) return;
        if (serverProcess) handleSendCommand(null, command);
        else socket.emit('log-update', '⚠️ Serveur éteint.');
    });

    // 4. LISTE SERVEURS
    socket.on('get-servers', async () => {
        if (!isAuthenticated) return;
        const servers = await handleGetSavedServers(); 
        socket.emit('servers-list', servers);
    });

    // 5. CHANGER SERVEUR (MODIFIÉ)
socket.on('select-server', (path) => {
    if (!isAuthenticated) return;

    // On mémorise le chemin pour les réglages
    mobileCurrentPath = path; 

    if (serverProcess) { 
        socket.emit('log-update', '⚠️ Impossible : Serveur en cours !'); 
        return; 
    }
    if (mainWindow) mainWindow.webContents.send('remote-load-server', path);
    socket.emit('log-update', '✅ Serveur chargé.');
});

    // 6. CONFIG (GET)
    socket.on('get-perf', () => {
        if (!isAuthenticated) return;
        if (mainWindow) mainWindow.webContents.send('request-only-perf-data'); 
    });

    // 7. CONFIG (SET)
    socket.on('set-perf', (data) => {
        if (!isAuthenticated) return;
        if (mainWindow) mainWindow.webContents.send('remote-set-perf', data);
        socket.emit('log-update', '🛠️ Réglages appliqués.');
    });

    // 8. JOUEURS
    socket.on('get-players', () => {
        if (!isAuthenticated) return;
        if (mainWindow) mainWindow.webContents.send('request-player-list');
    });

    // 9. TÉLÉPHONE DEMANDE LES VERSIONS
    socket.on('get-version-list', async () => {
        console.log("📱 Le téléphone demande la liste des versions...");
        
        const fallbackList = [
            { id: '1.21.4', type: 'release' }, { id: '1.21.1', type: 'release' },
            { id: '1.21', type: 'release' }, { id: '1.20.6', type: 'release' },
            { id: '1.20.4', type: 'release' }, { id: '1.20.1', type: 'release' },
            { id: '1.19.4', type: 'release' }, { id: '1.18.2', type: 'release' },
            { id: '1.16.5', type: 'release' }, { id: '1.12.2', type: 'release' },
            { id: '1.8.9', type: 'release' }
        ];

        try {
            const versions = await handleGetVersions();
            if (versions && versions.length > 0) {
                console.log(`✅ ${versions.length} versions trouvées.`);
                const simpleList = versions.map(v => ({ id: v.id, type: v.type }));
                socket.emit('version-list-data', simpleList);
            } else {
                console.log("⚠️ Liste vide, envoi du fallback.");
                socket.emit('version-list-data', fallbackList);
            }
        } catch (e) {
            console.error("❌ Erreur versions :", e);
            socket.emit('version-list-data', fallbackList);
        }
    });

    // 11. LECTURE SERVER.PROPERTIES
socket.on('get-full-properties', async () => {
    if (!isAuthenticated) return;
    // On utilise soit le serveur en cours d'exécution, soit celui sélectionné
    const targetPath = currentServerPath || mobileCurrentPath;

    if (!targetPath) {
        socket.emit('log-update', '❌ Aucun serveur sélectionné.');
        return;
    }

    try {
        // On réutilise ta fonction existante
        const props = await handleReadServerProperties(null, targetPath);
        socket.emit('server-properties-data', props);
    } catch (e) {
        console.error(e);
        socket.emit('log-update', '❌ Erreur lecture propriétés.');
    }
});

// 12. SAUVEGARDE SERVER.PROPERTIES
socket.on('save-full-properties', async (newProps) => {
    if (!isAuthenticated) return;
    const targetPath = currentServerPath || mobileCurrentPath;

    if (!targetPath) return;

    try {
        // On réutilise ta fonction existante
        await handleSaveServerProperties(null, targetPath, newProps);
        socket.emit('log-update', '💾 Propriétés sauvegardées !');
        // On renvoie la version à jour pour confirmer
        const updated = await handleReadServerProperties(null, targetPath);
        socket.emit('server-properties-data', updated);
    } catch (e) {
        socket.emit('log-update', '❌ Erreur sauvegarde.');
    }
});

    // 12. SAUVEGARDE SERVER.PROPERTIES (MANQUAIT AUSSI !)
    socket.on('save-full-properties', async (newProps) => {
        if (!isAuthenticated) return;
        const targetPath = currentServerPath || mobileCurrentPath;

        if (!targetPath) return;

        try {
            await handleSaveServerProperties(null, targetPath, newProps);
            socket.emit('log-update', '💾 Propriétés sauvegardées !');
            const updated = await handleReadServerProperties(null, targetPath);
            socket.emit('server-properties-data', updated);
        } catch (e) {
            socket.emit('log-update', '❌ Erreur sauvegarde.');
        }
    });
    
    // 10. CRÉATION DE SERVEUR
    socket.on('create-server', async (data) => {
        if (!isAuthenticated) return;

        console.log('📱 Création demandée :', data);
        socket.emit('log-update', '🛠️ Création du serveur en cours...');

        try {
            const baseDir = 'C:\\Minecraft_Servers'; 
            if (!fs.existsSync(baseDir)) fs.mkdirSync(baseDir, { recursive: true });

            const safeName = data.name.replace(/[^a-z0-9_\- ]/gi, '_').trim();
            const serverPath = path.join(baseDir, safeName);

            if (fs.existsSync(serverPath)) {
                socket.emit('log-update', '❌ Erreur : Nom déjà pris !');
                return;
            }

            fs.mkdirSync(serverPath);
            socket.emit('log-update', `📁 Dossier créé : ${safeName}`);

            const newConfig = {
                folderPath: serverPath,
                name: data.name,
                type: data.type,
                versionId: data.version,
                ram: 4,
                viewDistance: 10,
                maxPlayers: 20
            };

            saveServerToList(newConfig);
            socket.emit('log-update', '✅ Serveur créé et ajouté !');
            
            const servers = await handleGetSavedServers();
            socket.emit('servers-list', servers);

        } catch (e) {
            console.error(e);
            socket.emit('log-update', '❌ Erreur création : ' + e.message);
        }
    });

});

// --- GESTION DES PARAMÈTRES GLOBAUX ---
function loadAppSettings() {
    try {
        if (fs.existsSync(SETTINGS_FILE)) {
            return JSON.parse(fs.readFileSync(SETTINGS_FILE, 'utf8'));
        }
    } catch (e) { console.error("Erreur lecture settings:", e); }
    // Paramètres par défaut si le fichier n'existe pas
    return { remotePin: "1234" }; 
}

function saveAppSettings(settings) {
    try {
        // On charge l'existant pour ne pas écraser d'autres futures options
        const current = loadAppSettings();
        const newSettings = { ...current, ...settings };
        fs.writeFileSync(SETTINGS_FILE, JSON.stringify(newSettings, null, 2));
        return true;
    } catch (e) { return false; }
}

// ========================================
// FONCTIONS MANQUANTES (À COLLER À LA FIN)
// ========================================

async function handleImportServer(event, folderPath) {
    try {
        const files = fs.readdirSync(folderPath);
        const hasJar = files.some(f => f.endsWith('.jar'));
        const hasProps = fs.existsSync(path.join(folderPath, 'server.properties'));
        
        if (!hasJar && !hasProps) return { success: false, error: "Ce dossier ne semble pas être un serveur." };

        let detectedType = 'vanilla';
        let detectedVersion = 'Inconnue';
        
        for (const file of files) {
            const lower = file.toLowerCase();
            if (lower.includes('paper')) {
                detectedType = 'paper';
                const match = file.match(/paper-(\d+\.\d+(\.\d+)?)/);
                if (match) detectedVersion = match[1];
            } else if (lower.includes('fabric')) detectedType = 'fabric';
            else if (lower.includes('forge')) detectedType = 'forge';
        }

        const serverName = path.basename(folderPath);
        saveServerToList({ 
            folderPath, 
            versionId: detectedVersion, 
            type: detectedType, 
            name: serverName 
        });
        
        return { success: true, name: serverName, type: detectedType };
    } catch (e) {
        return { success: false, error: e.message };
    }
}

// --- PARAMÈTRES ---
function loadAppSettings() {
    try {
        if (fs.existsSync(SETTINGS_FILE)) return JSON.parse(fs.readFileSync(SETTINGS_FILE, 'utf8'));
    } catch (e) {}
    return { remotePin: "1234" }; 
}

function saveAppSettings(settings) {
    try {
        const current = loadAppSettings();
        const newSettings = { ...current, ...settings };
        fs.writeFileSync(SETTINGS_FILE, JSON.stringify(newSettings, null, 2));
        return true;
    } catch (e) { return false; }
}

// --- HELPERS ADDITIONNELS ---
async function handleGetWhitelist() { return []; }
async function handleGetBanlist() { return []; }
async function handleAddToWhitelist() { return {success:true}; }
async function handleRemoveFromWhitelist() { return []; }
async function handleAddBan() { return {success:true}; }
async function handleRemoveBan() { return []; }
async function handleGetLogFiles() { return []; }
async function handleGetLogContent() { return {success:false}; }
async function handleSearchAddons() { return {success:true, hits:[]}; }
async function handleDownloadAddon() { return {success:true}; }