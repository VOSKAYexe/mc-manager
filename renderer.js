/**
 * MC Server Manager - Renderer Process
 * Version 2.9.0 - FINAL COMPLETE (Themes + Icons + Backups + Selector)
 */

const DOM = {
    settingPinInput: document.getElementById('setting-remote-pin'),
    btnSavePin: document.getElementById('btn-save-pin'),

    // Sidebar
    sidebar: document.getElementById('sidebar'),
    toggleSidebarBtn: document.getElementById('btn-toggle-sidebar'),
    navButtons: document.querySelectorAll('.nav-btn'),
    tabContents: document.querySelectorAll('.tab-content'),
    
    // Dashboard
    statusDot: document.getElementById('status-dot'),
    statusText: document.getElementById('status-text'),
    
    // Selector
    btnOpenSelector: document.getElementById('btn-open-selector'),
    currentServerName: document.getElementById('current-server-name'),
    serverSelectorModal: document.getElementById('server-selector-modal'),
    popupServerList: document.getElementById('popup-server-list'),
    closeSelector: document.getElementById('close-selector'),
    
    // Console
    consoleOutput: document.getElementById('console-output'),
    commandInput: document.getElementById('command-input'),
    btnSend: document.getElementById('btn-send'),
    btnStart: document.getElementById('btn-start'),
    btnStop: document.getElementById('btn-stop'),

    // Stats
    statsContainer: document.getElementById('stats-container'),
    statCpu: document.getElementById('stat-cpu'),
    statRam: document.getElementById('stat-ram'),
    
    // Config
    versionGrid: document.getElementById('version-grid-container'),
    versionInput: document.getElementById('version-select-value'),
    versionUrlInput: document.getElementById('version-select-url'),
    serverTypeInput: document.getElementById('server-type-input'),
    serverFolder: document.getElementById('server-folder'),
    serverName: document.getElementById('server-name'),
    javaPathInput: document.getElementById('java-path'),
    
    // Icones
    serverIconPreview: document.getElementById('server-icon-preview'),
    serverIconWrapper: document.querySelector('.server-icon-wrapper'),

    btnBrowse: document.getElementById('btn-browse'),
    btnSave: document.getElementById('btn-save'),
    
    // Types & Mods
    typeButtons: document.querySelectorAll('.type-btn'),
    modWarningFabric: document.getElementById('mod-warning-fabric'),
    modWarningForge: document.getElementById('mod-warning-forge'),
    modWarningPaper: document.getElementById('mod-warning-paper'),
    
    // Options
    publicModeToggle: document.getElementById('public-mode-toggle'),
    navBtnPublic: document.getElementById('nav-btn-public'),
    
    // Perf
    ramSlider: document.getElementById('ram-slider'),
    ramDisplay: document.getElementById('ram-display-val'),
    ramInput: document.getElementById('ram-input-custom'),
    ramToggle: document.getElementById('btn-ram-toggle'),
    renderSlider: document.getElementById('render-slider'),
    renderDisplay: document.getElementById('render-display-val'),
    renderInput: document.getElementById('render-input-custom'),
    renderToggle: document.getElementById('btn-render-toggle'),

    // Backups
    btnCreateBackup: document.getElementById('btn-create-backup'),
    backupList: document.getElementById('backup-list'),
    
    // Players
    maxPlayersSlider: document.getElementById('max-players-slider'),
    maxPlayersDisplay: document.getElementById('max-players-value'),
    maxPlayersInput: document.getElementById('max-players-input'),
    maxPlayersToggle: document.getElementById('btn-max-players-toggle'),
    playerList: document.getElementById('player-list'),
    navBtnPlayers: document.querySelector('[data-tab="players"]'),
    subTabButtons: document.querySelectorAll('.sub-nav-btn'),
    subTabContents: document.querySelectorAll('.sub-tab-content'),
    
    whitelistAddInput: document.getElementById('whitelist-add-input'),
    btnWhitelistAdd: document.getElementById('btn-whitelist-add'),
    whitelistList: document.getElementById('whitelist-list'),
    
    banAddInput: document.getElementById('ban-add-input'),
    banReasonInput: document.getElementById('ban-reason-input'),
    btnBanAdd: document.getElementById('btn-ban-add'),
    banList: document.getElementById('ban-list'),

    // Tâches planifiées
    autoRestartToggle: document.getElementById('auto-restart-toggle'),
    autoRestartOptions: document.getElementById('auto-restart-options'),
    autoRestartHours: document.getElementById('auto-restart-hours'),
    autoBackupToggle: document.getElementById('auto-backup-toggle'),
    autoBackupOptions: document.getElementById('auto-backup-options'),
    autoBackupDays: document.getElementById('auto-backup-days'),
    autoBackupTime: document.getElementById('auto-backup-time'),

    // Log Viewer
    btnOpenLogViewer: document.getElementById('btn-open-log-viewer'),
    logViewerModal: document.getElementById('log-viewer-modal'),
    closeLogViewer: document.getElementById('close-log-viewer'),
    logFileList: document.getElementById('log-file-list'),
    logContentDisplay: document.getElementById('log-content-display'),
    logViewerFooter: document.getElementById('log-viewer-footer'),
    logFileName: document.getElementById('log-file-name'),

    // Éditeur propriétés
    btnLoadProperties: document.getElementById('btn-load-properties'),
    btnSaveProperties: document.getElementById('btn-save-properties'),
    propertiesEditorContainer: document.getElementById('properties-editor-container'),

    // Add-on Browser
    addonSearchInput: document.getElementById('addon-search-input'),
    btnAddonSearch: document.getElementById('btn-addon-search'),
    addonTypeFilter: document.getElementById('addon-type-filter'),
    addonResultsList: document.getElementById('addon-results-list'),
    
    // Library
    libraryList: document.getElementById('library-list'),
    btnImportServer: document.getElementById('btn-import-server'),
    
    // Modals
    managerModal: document.getElementById('manager-modal'),
    closeModal: document.getElementById('close-modal'),
    modalServerList: document.getElementById('modal-server-list'),
    
    alertModal: document.getElementById('start-alert-modal'),
    alertTitle: document.getElementById('alert-title'),
    alertMessage: document.getElementById('alert-message'),
    alertActionBtn: document.getElementById('btn-alert-action'),
    alertCancelBtn: document.getElementById('btn-alert-cancel'),
    
    inputModal: document.getElementById('input-modal'),
    inputTitle: document.getElementById('input-title'),
    inputValue: document.getElementById('input-value'),
    btnInputConfirm: document.getElementById('btn-input-confirm'),
    btnInputCancel: document.getElementById('btn-input-cancel'),
    
    btnDiscord: document.getElementById('btn-discord'),
    btnPaypal: document.getElementById('btn-paypal'),

    // Mondes
    btnUploadWorld: document.getElementById('btn-upload-world'),
    btnResetWorld: document.getElementById('btn-reset-world'),
    btnOpenDatapacks: document.getElementById('btn-open-datapacks')
};

const STATE = {
    serverRunning: false,
    serverIsReady: false,
    selectedVersion: null,
    selectedServerType: 'vanilla',
    connectedPlayers: []
};

const DEFAULT_ICON = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAIlSURBVHhe7ZvtbcMwDITpIv0oXaQfTYfpR+kivWg/CmQ7Cxw4siU9HxCHCwwG+0Gync+Xuw/8Pc/z9eXz/P7+S6/X6+V8Pp/u9/vpb/y2bdtpvV6n5/N5ut1up9/xO7/X9/l8vqf3+/30cDj86nf8zu/1/X6/p/f7/fRwOPzqd/zO7/X9fr+n9/v99HA4/Op3/M7v9f1+v6f3+/30cDj86nf8zu/1/X6/p/f7/fRwOPzqd/zO7/X9fr+n9/v99HA4/Op3/M7v9f1+v6f3+/30cDj86nf8zu/1/X6/p/f7/fRwOPzqd/zO7/X9fr+n9/v99HA4/Op3/M7v9f1+v6f3+/30cDj86nf8zu/1/X6/p/f7/fRwOPzqd/zO7/X9fr+n9/v99HA4/Op3/M7v9f1+v6f3+/30cDj86nf8zu/1/X6/p/f7/fRwOPzqd/zO7/X9fr+n9/v99HA4/Op3/M7v9f1+v6f3+/30cDj86nf8zu/1/X6/p/f7/fRwOPzqd/zO7/X9fr+n9/v99HA4/Op3/M7v9f1+v6f3+/30cDj86nf8zu/1/X6/p/f7/fRwOPzqd/zO7/X9fr+n9/v99HA4/Op3/M7v9f1+v6f3+/30cDj86nf8zu/1/X6/p/f7/fRwOPzqd/zO7/X9fr+n9/v99HA4/Op3/M7v9f1+v6f3+/30cDj86nf8zu/1/X6/p/f7/fRwOPzqd/zO7/X9fr+n9/v99HA4/Op3/M7v9f3/P//+A4I+m74a8A3RAAAAAElFTkSuQmCC';

// ========================================
// COULEURS / THÈMES
// ========================================
const THEMES = {
    green:  { main: '#4CAF50', hover: '#45a049', shadow: 'rgba(76, 175, 80, 0.3)', light: 'rgba(76, 175, 80, 0.15)' },
    blue:   { main: '#2196F3', hover: '#1976D2', shadow: 'rgba(33, 150, 243, 0.3)', light: 'rgba(33, 150, 243, 0.15)' },
    purple: { main: '#9C27B0', hover: '#7B1FA2', shadow: 'rgba(156, 39, 176, 0.3)', light: 'rgba(156, 39, 176, 0.15)' },
    orange: { main: '#FF9800', hover: '#F57C00', shadow: 'rgba(255, 152, 0, 0.3)', light: 'rgba(255, 152, 0, 0.15)' },
    red:    { main: '#F44336', hover: '#D32F2F', shadow: 'rgba(244, 67, 54, 0.3)', light: 'rgba(244, 67, 54, 0.15)' },
    pink:   { main: '#E91E63', hover: '#C2185B', shadow: 'rgba(233, 30, 99, 0.3)', light: 'rgba(233, 30, 99, 0.15)' }
};

/**
 * Échappe les caractères HTML pour une insertion sécurisée dans un attribut 'value'.
 */
function escapeHTML(str) {
    if (typeof str !== 'string') return str;
    return str.replace(/"/g, '&quot;');
}

// ========================================
// INITIALISATION
// ========================================

document.addEventListener('DOMContentLoaded', () => {
    initializeSidebar();
    initializeNavigation();
    initializeSliders();
    initializeServerTypeSelector();
    loadVersions();
    initializeConsole();
    initializeModals();
    initializeServerControls();
    initializePublicMode();
    initializeBackups();
    initializeThemes();
    initializePlayerManagement();
    initializeScheduledTasks();
    loadSavedServers();
    checkFirstLaunch();
    initializeLogViewer();
    initializeAddonBrowser();
    initializePropertiesEditor();
    initializeWorldManager();
    initializeQRCode();
    initializeSettings();
});

// ========================================
// LOGIQUE DES THÈMES
// ========================================

function initializeThemes() {
    const dots = document.querySelectorAll('.theme-dot');
    const savedTheme = localStorage.getItem('app_theme') || 'green';
    
    applyTheme(savedTheme);

    dots.forEach(dot => {
        if(dot.dataset.theme === savedTheme) {
            dots.forEach(d => d.classList.remove('selected'));
            dot.classList.add('selected');
        }

        dot.addEventListener('click', () => {
            const themeName = dot.dataset.theme;
            dots.forEach(d => d.classList.remove('selected'));
            dot.classList.add('selected');
            applyTheme(themeName);
            localStorage.setItem('app_theme', themeName);
        });
    });
}

function applyTheme(themeName) {
    const theme = THEMES[themeName] || THEMES['green'];
    const root = document.documentElement;
    root.style.setProperty('--primary-color', theme.main);
    root.style.setProperty('--primary-hover', theme.hover);
    root.style.setProperty('--primary-shadow', theme.shadow);
    root.style.setProperty('--primary-light', theme.light);
}

// ========================================
// TUTORIAL
// ========================================

function checkFirstLaunch() {
    const hasSeenTutorial = localStorage.getItem('has_seen_welcome_v2');
    if (!hasSeenTutorial) {
        const modal = document.getElementById('welcome-modal');
        const btn = document.getElementById('btn-close-welcome');
        if (modal && btn) {
            modal.style.display = 'block';
            btn.addEventListener('click', () => {
                modal.style.display = 'none';
                localStorage.setItem('has_seen_welcome_v2', 'true');
            });
        }
    }
}

// ========================================
// SÉLECTEUR DE SERVEUR
// ========================================

function openServerSelector() {
    window.api.getSavedServers().then(servers => {
        const list = DOM.popupServerList;
        list.innerHTML = ''; 
        const currentLoadedPath = DOM.serverFolder ? DOM.serverFolder.value : '';

        if (servers.length === 0) {
            list.innerHTML = '<p style="text-align:center; color:#777; padding:20px;">Aucun serveur trouvé.</p>';
        } else {
            servers.sort((a, b) => new Date(b.lastModified || 0) - new Date(a.lastModified || 0));
            servers.forEach(server => {
                const item = document.createElement('div');
                item.className = 'server-list-item';
                const isCurrent = (server.path === currentLoadedPath);
                if (isCurrent) item.classList.add('is-current');
                
                let icon = '🧊';
                if (server.type === 'paper') icon = '📄';
                if (server.type === 'fabric') icon = '🧵';
                if (server.type === 'forge') icon = '⚒️';
                const badgeHtml = isCurrent ? '<span class="badge-current">ACTUEL</span>' : '';

                item.innerHTML = `
                    <div class="srv-info">
                        <span class="srv-name">${server.name} ${badgeHtml}</span>
                        <div class="srv-meta"><span class="type-badge">${icon} ${server.type}</span><span>Version : ${server.version || '?'}</span></div>
                    </div>
                    <i class="fas ${isCurrent ? 'fa-check-circle' : 'fa-play-circle'}" style="color: var(--primary-color); font-size: 1.5em;"></i>
                `;

                item.addEventListener('click', () => {
                    selectServer(server);
                    DOM.serverSelectorModal.style.display = 'none';
                });
                list.appendChild(item);
            });
        }
        DOM.serverSelectorModal.style.display = 'block';
    });
}

function selectServer(server) {
    if (DOM.currentServerName) {
        DOM.currentServerName.textContent = server.name;
        DOM.currentServerName.style.color = "var(--primary-color)";
    }
    if (DOM.serverFolder) DOM.serverFolder.value = server.path;
    if (DOM.serverName) DOM.serverName.value = server.name;
    if (DOM.javaPathInput) DOM.javaPathInput.value = server.javaPath || '';
    
    // ...
    selectServerType(server.type || 'vanilla');
    
    // ICONE AVEC FALLBACK INTEGREE
    const iconPath = `file://${server.path}/server-icon.png`;
    const img = new Image();
    
    img.onload = () => { 
        if(DOM.serverIconPreview) DOM.serverIconPreview.src = `${iconPath}?t=${Date.now()}`; 
    };
    
    // C'est ici que la magie opère : on utilise la variable DEFAULT_ICON
    img.onerror = () => { 
        if(DOM.serverIconPreview) DOM.serverIconPreview.src = DEFAULT_ICON; 
    };
    
    img.src = iconPath;

    // Mise à jour des tâches planifiées
    const restartConfig = server.autoRestart || { enabled: false, intervalHours: 4 };
    DOM.autoRestartToggle.checked = restartConfig.enabled;
    DOM.autoRestartHours.value = restartConfig.intervalHours;
    DOM.autoRestartOptions.style.display = restartConfig.enabled ? 'block' : 'none';

    const backupConfig = server.autoBackup || { enabled: false, intervalDays: 1, atTime: '00:00' };
    DOM.autoBackupToggle.checked = backupConfig.enabled;
    DOM.autoBackupDays.value = backupConfig.intervalDays;
    DOM.autoBackupTime.value = backupConfig.atTime;
    DOM.autoBackupOptions.style.display = backupConfig.enabled ? 'block' : 'none';

    window.api.readServerProps(server.path).then(props => {
        if (props && DOM.publicModeToggle) DOM.publicModeToggle.checked = props.onlineMode;
    });
}

// ========================================
// UTILS & CHARGEMENT
// ========================================

async function loadSavedServers(autoSelectPath = null) {
    try {
        const servers = await window.api.getSavedServers();
        if (DOM.libraryList) {
            DOM.libraryList.innerHTML = '';
            if (servers.length === 0) DOM.libraryList.innerHTML = '<p style="text-align:center;color:#777;">Aucun serveur.</p>';
            else servers.forEach(s => DOM.libraryList.appendChild(createServerCard(s)));
        }
        if (autoSelectPath && servers.length > 0) {
            const target = servers.find(s => s.path === autoSelectPath);
            if (target) selectServer(target);
        }
    } catch (e) { console.error(e); }
}

function createServerCard(server) {
    const div = document.createElement('div');
   div.className = 'lib-item';

const iconSrc = `file://${server.path}/server-icon.png`;

// V COLLEZ CE BLOC CI-DESSOUS V
div.innerHTML = `
    <div style="display:flex; align-items:center; gap:15px; margin-bottom: 15px;">
        <div class="lib-icon-wrapper" style="position:relative; width:48px; height:48px; cursor:pointer; flex-shrink: 0;" title="Changer l'icône">

            <img src="${iconSrc}" 
                 class="lib-server-icon"
                 onerror="this.src=DEFAULT_ICON" 
                 style="width:100%; height:100%; border-radius:4px; object-fit:cover; transition:0.2s; image-rendering: pixelated;">
            <div style="position:absolute; inset:0; background:rgba(0,0,0,0.5); display:flex; justify-content:center; align-items:center; opacity:0; border-radius:4px; transition:0.2s;">
                <i class="fas fa-pen" style="color:white; font-size:0.8em;"></i>
            </div>
        </div>

        <div style="flex: 1; min-width: 0;">
            <h4 style="margin: 0 0 5px 0; color: var(--primary-color); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; font-size: 1.1em;" title="${server.name}">
                ${server.name}
            </h4>
            <p style="font-size: 0.85em; color: var(--text-secondary); margin: 0; text-transform: capitalize;">
                ${server.type} - ${server.version}
            </p>
        </div>
    </div>
    <div class="lib-actions" style="display: flex; gap: 10px;">
        <button class="btn-secondary" style="width: 100%; padding: 10px; text-transform: none; font-weight: 600;">
            <i class="fas fa-sign-in-alt" style="margin-right: 8px;"></i> Charger
        </button>
        <button class="btn-danger" style="width: auto; padding: 10px;">
            <i class="fas fa-trash"></i>
        </button>
    </div>
`;

    const iconWrapper = div.querySelector('.lib-icon-wrapper');
    const imgElement = div.querySelector('.lib-server-icon');
    const overlay = div.querySelector('.lib-icon-wrapper div');

    iconWrapper.addEventListener('mouseenter', () => overlay.style.opacity = '1');
    iconWrapper.addEventListener('mouseleave', () => overlay.style.opacity = '0');

    iconWrapper.addEventListener('click', async (e) => {
        e.stopPropagation();
        const res = await window.api.changeServerIcon(server.path);
        if (res.success) {
            const newSrc = `file://${res.path}?t=${Date.now()}`;
            imgElement.src = newSrc;
            if (DOM.serverFolder.value === server.path && DOM.serverIconPreview) DOM.serverIconPreview.src = newSrc;
            showAlert('Succès', 'Icône modifiée !');
        }
    });
    
    div.querySelector('.btn-secondary').addEventListener('click', () => {
        selectServer(server);
        const dashTab = document.querySelector('[data-tab="dashboard"]');
        if (dashTab) dashTab.click();
    });
    
    div.querySelector('.btn-danger').addEventListener('click', async () => {
        if (await confirmAction('Supprimer', 'Retirer de la liste ?')) { 
            await window.api.deleteServer(server.path); 
            loadSavedServers(); 
            if (await confirmAction('Disque Dur', 'Supprimer aussi les fichiers (Irréversible) ?')) {
                const res = await window.api.deleteServerFiles(server.path);
                if(!res.success) showAlert('Erreur', res.error);
                else showAlert('Succès', 'Fichiers supprimés.');
            }
        }
    });
    return div;
}

// ========================================
// GESTIONNAIRE DE MONDES (UI)
// ========================================

function initializeWorldManager() {
    if (DOM.btnUploadWorld) DOM.btnUploadWorld.addEventListener('click', handleUploadWorldClick);
    if (DOM.btnResetWorld) DOM.btnResetWorld.addEventListener('click', handleResetWorldClick);
    if (DOM.btnOpenDatapacks) DOM.btnOpenDatapacks.addEventListener('click', handleOpenDatapacksClick);
}

async function handleUploadWorldClick() {
    const serverPath = DOM.serverFolder.value;
    if (!serverPath) {
        showAlert('Erreur', 'Veuillez d\'abord sélectionner un serveur.'); return;
    }
    if (STATE.serverRunning) {
        showAlert('Action impossible', 'Veuillez arrêter le serveur avant de modifier le monde.'); return;
    }

    if (!await confirmAction('Uploader un Monde', 'Votre monde actuel sera supprimé et remplacé. Êtes-vous sûr ? (Faites un backup avant !)')) {
        return;
    }

    DOM.btnUploadWorld.disabled = true;
    DOM.btnUploadWorld.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Décompression...';

    try {
        const result = await window.api.uploadWorld(serverPath);
        if (result.success) {
            showAlert('Succès', 'Le nouveau monde a été uploadé ! Il sera chargé au prochain démarrage.');
        } else {
            showAlert('Erreur', result.error || 'Une erreur est survenue.');
        }
    } catch (e) {
        showAlert('Erreur critique', e.message);
    }

    DOM.btnUploadWorld.disabled = false;
    DOM.btnUploadWorld.innerHTML = '<i class="fas fa-file-zip"></i> Choisir un fichier .zip...';
}

async function handleResetWorldClick() {
    const serverPath = DOM.serverFolder.value;
    if (!serverPath) {
        showAlert('Erreur', 'Veuillez d\'abord sélectionner un serveur.'); return;
    }
    if (STATE.serverRunning) {
        showAlert('Action impossible', 'Veuillez arrêter le serveur avant de réinitialiser le monde.'); return;
    }

    if (!await confirmAction('Réinitialiser le Monde', 'ACTION IRRÉVERSIBLE. Votre monde (world, nether, end) sera supprimé. Êtes-vous absolument sûr ?')) {
        return;
    }

    DOM.btnResetWorld.disabled = true;
    DOM.btnResetWorld.textContent = 'Suppression...';

    try {
        const result = await window.api.resetWorld(serverPath);
        if (result.success) {
            showAlert('Succès', 'Monde réinitialisé. Une nouvelle map sera générée au prochain démarrage.');
        } else {
            showAlert('Erreur', result.error || 'Une erreur est survenue.');
        }
    } catch (e) {
        showAlert('Erreur critique', e.message);
    }

    DOM.btnResetWorld.disabled = false;
    DOM.btnResetWorld.innerHTML = '<i class="fas fa-trash"></i> Réinitialiser le Monde';
}

async function handleOpenDatapacksClick() {
    const serverPath = DOM.serverFolder.value;
    if (!serverPath) {
        showAlert('Erreur', 'Veuillez d\'abord sélectionner un serveur.'); return;
    }

    try {
        // Pas besoin de vérifier si le serveur tourne, on peut ajouter des datapacks à la volée
        await window.api.openDatapacks(serverPath);
    } catch (e) {
        showAlert('Erreur', e.message);
    }
}

// ========================================
// CONTROLES
// ========================================

function initializeServerControls() {
    if (DOM.btnBrowse) DOM.btnBrowse.addEventListener('click', browseForFolder);
    if (DOM.btnSave) DOM.btnSave.addEventListener('click', saveServerConfig);
    if (DOM.btnStart) DOM.btnStart.addEventListener('click', startServer);
    if (DOM.btnStop) DOM.btnStop.addEventListener('click', stopServer);
    if (DOM.btnDiscord) DOM.btnDiscord.addEventListener('click', () => window.api.openExternal('https://discord.gg/wCCRbr6MP5'));
    // VVVV MODIFICATION ICI VVVV
    if (DOM.btnPaypal) DOM.btnPaypal.addEventListener('click', () => {
        // J'ai corrigé le nom de la fonction (openExternal) et ajouté https://
        window.api.openExternal('https://www.paypal.me/MCMANAGEROWNER'); 
        window.api.openExternalLink('PayPal.me/MCMANAGEROWNER'); 
    });

    if (DOM.btnImportServer) DOM.btnImportServer.addEventListener('click', importExistingServer);
    
    if (DOM.btnOpenSelector) DOM.btnOpenSelector.addEventListener('click', openServerSelector);
    if (DOM.closeSelector) DOM.closeSelector.addEventListener('click', () => DOM.serverSelectorModal.style.display = 'none');
    window.addEventListener('click', (e) => { if (e.target === DOM.serverSelectorModal) DOM.serverSelectorModal.style.display = 'none'; });
    
    if (DOM.serverIconWrapper) DOM.serverIconWrapper.addEventListener('click', changeIconConfig);
}

async function changeIconConfig() {
    if (!DOM.serverFolder.value) { showAlert('Erreur', 'Sélectionnez un serveur.'); return; }
    const res = await window.api.changeServerIcon(DOM.serverFolder.value);
    if (res.success) {
        const newSrc = `file://${res.path}?t=${Date.now()}`;
        if(DOM.serverIconPreview) DOM.serverIconPreview.src = newSrc;
        loadSavedServers(); 
        showAlert('Succès', 'Icône mise à jour !');
    }
}

function startServer() {
    if (DOM.statsContainer) DOM.statsContainer.style.display = 'none'; 
    const config = getServerConfig();
    if (!config.folderPath) { showAlert('Attention', 'Sélectionnez un dossier.'); return; }
    STATE.serverRunning = true; STATE.serverIsReady = false;
    if (DOM.btnStart) { DOM.btnStart.disabled = true; DOM.btnStart.textContent = 'LANCEMENT...'; }
    if (DOM.btnStop) DOM.btnStop.disabled = false; if (DOM.commandInput) DOM.commandInput.disabled = false; if (DOM.btnSend) DOM.btnSend.disabled = false;
    if (DOM.consoleOutput) DOM.consoleOutput.innerHTML = '';
    if (DOM.statusDot) DOM.statusDot.className = 'dot orange'; if (DOM.statusText) DOM.statusText.textContent = 'Démarrage...';
    logToConsole('=== DÉMARRAGE ===');
    window.api.startServer(config);
    setTimeout(() => { loadSavedServers(config.folderPath); }, 1000);
}

function stopServer() { if (!STATE.serverRunning) return; if (DOM.btnStop) DOM.btnStop.disabled = true; if (DOM.statusText) DOM.statusText.textContent = 'Arrêt...'; window.api.stopServer(); }

// ========================================
// HELPERS
// ========================================

function onServerReady() { 
    if (STATE.serverIsReady) return; 
    STATE.serverIsReady = true; 
    if (DOM.btnStart) DOM.btnStart.textContent = 'LANCÉ'; 
    if (DOM.statusDot) DOM.statusDot.className = 'dot green'; 
    if (DOM.statusText) DOM.statusText.textContent = 'Démarré'; 
    if (DOM.statsContainer) DOM.statsContainer.style.display = 'flex';
    logToConsole('=== SERVEUR PRÊT ==='); 
}
/**
 * Appelée lorsque le serveur s'arrête (proprement ou non).
 * Réinitialise tout l'état de l'interface.
 */
function onServerStopped() {
    // 1. Mettre à jour l'état global
    STATE.serverRunning = false;
    STATE.serverIsReady = false;
    STATE.connectedPlayers = [];

    // 2. Réinitialiser les boutons de contrôle
    if (DOM.btnStart) {
        DOM.btnStart.disabled = false;
        DOM.btnStart.textContent = 'LANCER LE SERVEUR';
    }
    if (DOM.btnStop) {
        DOM.btnStop.disabled = true;
    }
    if (DOM.commandInput) {
        DOM.commandInput.disabled = true;
    }
    if (DOM.btnSend) {
        DOM.btnSend.disabled = true;
    }

    // 3. Réinitialiser l'indicateur de statut
    if (DOM.statusDot) {
        DOM.statusDot.className = 'dot red';
    }
    if (DOM.statusText) {
        DOM.statusText.textContent = 'Serveur éteint';
    }

    // 4. Cacher et réinitialiser le moniteur de stats
    if (DOM.statsContainer) {
        DOM.statsContainer.style.display = 'none';
    }
    if (DOM.statCpu) {
        DOM.statCpu.textContent = '0%';
    }
    if (DOM.statRam) {
        DOM.statRam.textContent = '0 MB';
    }

    // 5. Vider la liste des joueurs connectés
    if (DOM.playerList) {
        DOM.playerList.innerHTML = '<p style="color:#777; text-align:center;">Aucun joueur connecté.</p>';
    }

    // 6. Logger l'arrêt dans la console
    logToConsole('=== ARRÊT ===');
}
function initializeSidebar() { if (DOM.toggleSidebarBtn) DOM.toggleSidebarBtn.addEventListener('click', () => DOM.sidebar.classList.toggle('collapsed')); }
function initializeNavigation() { DOM.navButtons.forEach(b => b.addEventListener('click', () => { DOM.navButtons.forEach(x=>x.classList.remove('active')); DOM.tabContents.forEach(x=>x.classList.remove('active')); b.classList.add('active'); const t=document.getElementById(b.dataset.tab); if(t){t.classList.add('active'); if(b.dataset.tab==='backups')loadBackups();} })); }
function initializeSliders() { setupSlider('ram', 'Go', 2, 128); setupSlider('render', 'Chunks', 2, 64); setupSlider('max-players', '', 1, 1000); }
function setupSlider(n,u,min,max){ const s=document.getElementById(`${n}-slider`), d=document.getElementById(`${n}${n==='max-players'?'-value':'-display-val'}`), i=document.getElementById(`${n}-input${n==='max-players'?'':'-custom'}`), t=document.getElementById(`btn-${n}-toggle`); if(!s)return; let m=false; s.addEventListener('input',()=>d.textContent=s.value+(u?` ${u}`:'')); t.addEventListener('click',()=>{ m=!m; if(m){s.style.display='none';i.style.display='block';i.value=s.value;t.textContent='Slider';i.dataset.active='true';}else{s.style.display='block';i.style.display='none';i.dataset.active='false';const v=parseInt(i.value);if(v>=min&&v<=max){s.value=v;d.textContent=v+(u?` ${u}`:'');}t.textContent='Manuel';} }); i.addEventListener('input',()=>{const v=parseInt(i.value);if(v>=min&&v<=max)d.textContent=v+(u?` ${u}`:'');}); }
function initializeServerTypeSelector(){ 
    DOM.typeButtons.forEach(b=>b.addEventListener('click',()=>selectServerType(b.dataset.type))); 
}
function selectServerType(t){ STATE.selectedServerType=t; if(DOM.serverTypeInput)DOM.serverTypeInput.value=t; DOM.typeButtons.forEach(b=>{ b.classList.remove('active'); if(b.dataset.type===t)b.classList.add('active'); }); if(DOM.modWarningFabric)DOM.modWarningFabric.style.display='none'; if(DOM.modWarningForge)DOM.modWarningForge.style.display='none'; if(DOM.modWarningPaper)DOM.modWarningPaper.style.display='none'; switch(t){ case 'fabric': if(DOM.modWarningFabric)DOM.modWarningFabric.style.display='block'; break; case 'forge': if(DOM.modWarningForge)DOM.modWarningForge.style.display='block'; break; case 'paper': if(DOM.modWarningPaper)DOM.modWarningPaper.style.display='block'; break; } }
function openModsFolder(){ if(DOM.serverFolder.value)window.api.openModsFolder(DOM.serverFolder.value); else showAlert('Erreur','Pas de dossier'); }
function openPluginsFolder(){ if(DOM.serverFolder.value)window.api.openPluginsFolder(DOM.serverFolder.value); else showAlert('Erreur','Pas de dossier'); }
async function loadVersions(){ const M=document.getElementById('major-versions-grid'), m=document.getElementById('minor-versions-grid'); if(!M)return; M.innerHTML='Loading...'; try{ const v=await window.api.getVersions(); if(!v.length)throw 0; const g={}; v.forEach(x=>{ const k=x.id.match(/^(\d+\.\d+)/)?.[1]||"Autre"; if(!g[k])g[k]=[]; g[k].push(x); }); M.innerHTML=''; m.innerHTML='<div style="padding:20px;text-align:center;color:#777;">Choisir famille</div>'; Object.keys(g).forEach((k,i)=>{ const b=document.createElement('div'); b.className='v-btn'; b.textContent=k; b.addEventListener('click',()=>{ document.querySelectorAll('#major-versions-grid .v-btn').forEach(x=>x.classList.remove('active')); b.classList.add('active'); m.innerHTML=''; g[k].forEach((y,j)=>{ const bb=document.createElement('div'); bb.className='v-btn'; bb.textContent=y.id; if(STATE.selectedVersion?.id===y.id)bb.classList.add('active'); bb.addEventListener('click',()=>{ document.querySelectorAll('#minor-versions-grid .v-btn').forEach(z=>z.classList.remove('active')); bb.classList.add('active'); STATE.selectedVersion=y; if(DOM.versionInput)DOM.versionInput.value=y.id; if(DOM.versionUrlInput)DOM.versionUrlInput.value=y.url; }); m.appendChild(bb); if(j===0&&!STATE.selectedVersion){bb.click();} }); }); M.appendChild(b); if(i===0)b.click(); }); }catch(e){ M.innerHTML='Erreur'; } }
function initializeConsole(){ if(DOM.btnSend)DOM.btnSend.addEventListener('click',sendCommand); if(DOM.commandInput)DOM.commandInput.addEventListener('keypress',e=>{if(e.key==='Enter')sendCommand();}); if(window.api){ if(window.api.onConsoleLog)window.api.onConsoleLog(logToConsole); if(window.api.onServerStopped)window.api.onServerStopped(onServerStopped); if(window.api.onServerReady)window.api.onServerReady(onServerReady); if(window.api.onPlayerJoined)window.api.onPlayerJoined(onPlayerJoined); if(window.api.onPlayerLeft)window.api.onPlayerLeft(onPlayerLeft); if(window.api.onServerStats)window.api.onServerStats(onServerStats); } }
function sendCommand(){ if(DOM.commandInput&&DOM.commandInput.value.trim()&&STATE.serverRunning){ const c=DOM.commandInput.value.trim(); window.api.sendCommand(c); logToConsole(`> ${c}`); DOM.commandInput.value=''; } }
function logToConsole(t){ if(!DOM.consoleOutput)return; const p=document.createElement('p'); p.textContent=t; if(t.includes('ERROR')||t.includes('FAILED'))p.style.color='#f44336'; else if(t.includes('WARN'))p.style.color='#ff9800'; else if(t.includes('INFO'))p.style.color='#2196f3'; else if(t.includes('joined'))p.style.color='#4caf50'; DOM.consoleOutput.appendChild(p); DOM.consoleOutput.scrollTop=DOM.consoleOutput.scrollHeight; const l=t.toLowerCase(); if(!STATE.serverIsReady&&(l.includes('done')||l.includes('for help, type')))onServerReady(); }
async function browseForFolder(){ try{const p=await window.api.selectFolder(); if(p){DOM.serverFolder.value=p;}}catch(e){} }
async function saveServerConfig(){ const c=getServerConfig(); if(!c.folderPath||!c.name){showAlert('Erreur','Nom et dossier requis');return;} showAlert('Ok','Prêt.'); }
// V REMPLACEZ L'ANCIENNE FONCTION getServerConfig() PAR CELLE-CI V
function getServerConfig(){ 
    let ram=4,render=8,max=10;
    if(DOM.ramInput&&DOM.ramInput.dataset.active==='true')ram=parseInt(DOM.ramInput.value); else if(DOM.ramSlider)ram=parseInt(DOM.ramSlider.value);
    if(DOM.renderInput&&DOM.renderInput.dataset.active==='true')render=parseInt(DOM.renderInput.value); else if(DOM.renderSlider)render=parseInt(DOM.renderSlider.value);
    if(DOM.maxPlayersInput&&DOM.maxPlayersInput.dataset.active==='true')max=parseInt(DOM.maxPlayersInput.value); else if(DOM.maxPlayersSlider)max=parseInt(DOM.maxPlayersSlider.value);
    
    // On crée l'objet config
    const config = { 
        folderPath:DOM.serverFolder?DOM.serverFolder.value:'', 
        name:DOM.serverName?DOM.serverName.value:'', 
        port:25565, 
        versionId:DOM.versionInput?DOM.versionInput.value:null, 
        versionUrl:DOM.versionUrlInput?DOM.versionUrlInput.value:null, 
        type:DOM.serverTypeInput?DOM.serverTypeInput.value:'vanilla', 
        ram:ram, 
        viewDistance:render, 
        maxPlayers:max, 
        onlineMode:DOM.publicModeToggle?DOM.publicModeToggle.checked:false, 
        javaPath:DOM.javaPathInput?DOM.javaPathInput.value.trim():null,

        // On ajoute les nouvelles tâches planifiées
        autoRestart: {
            enabled: DOM.autoRestartToggle ? DOM.autoRestartToggle.checked : false,
            intervalHours: DOM.autoRestartHours ? (parseInt(DOM.autoRestartHours.value) || 4) : 4
        },
        autoBackup: {
            enabled: DOM.autoBackupToggle ? DOM.autoBackupToggle.checked : false,
            intervalDays: DOM.autoBackupDays ? (parseInt(DOM.autoBackupDays.value) || 1) : 1,
            atTime: DOM.autoBackupTime ? DOM.autoBackupTime.value : '00:00'
        }
    };
    
    return config;
}
function initializePublicMode(){ if(DOM.publicModeToggle){DOM.publicModeToggle.addEventListener('change',()=>{ if(DOM.navBtnPublic){ if(DOM.publicModeToggle.checked)DOM.navBtnPublic.classList.add('visible'); else DOM.navBtnPublic.classList.remove('visible'); } });} if(DOM.navBtnPublic)DOM.navBtnPublic.style.display='flex'; }
function initializeBackups(){ if(DOM.btnCreateBackup)DOM.btnCreateBackup.addEventListener('click',createServerBackup); const t=document.querySelector('[data-tab="backups"]'); if(t)t.addEventListener('click',loadBackups); }
async function createServerBackup(){ if(!DOM.serverFolder.value){showAlert('Erreur','Dossier ?');return;} const d=`backup-${new Date().toISOString().slice(0,10)}`; const n=await showInput("Nom :",d); if(n===null)return; const c=n.trim()||d; if(DOM.btnCreateBackup){DOM.btnCreateBackup.disabled=true;DOM.btnCreateBackup.textContent='...';} try{const r=await window.api.createBackup(DOM.serverFolder.value,c); if(r.success){showAlert('Ok',`Créé: ${r.path}`);loadBackups();}else showAlert('Erreur',r.error);}catch(e){}finally{if(DOM.btnCreateBackup){DOM.btnCreateBackup.disabled=false;DOM.btnCreateBackup.innerHTML='<i class="fas fa-plus"></i> CRÉER';}} }
async function loadBackups(){ if(!DOM.serverFolder.value||!DOM.backupList)return; const b=await window.api.getBackups(DOM.serverFolder.value); DOM.backupList.innerHTML=''; if(!b||!b.length){DOM.backupList.innerHTML='<p style="text-align:center;color:#777;">Vide.</p>';return;} b.forEach(n=>{ const d=document.createElement('div'); d.style.cssText='display:flex;justify-content:space-between;align-items:center;background:var(--bg-card);padding:12px;margin-bottom:8px;border-radius:5px;border:1px solid var(--border-secondary);'; d.innerHTML=`<span style="font-family:monospace;">${n}</span><div style="display:flex;gap:10px;"><button class="btn-small btn-primary btn-restore"><i class="fas fa-undo"></i></button><button class="btn-small btn-danger btn-delete"><i class="fas fa-trash"></i></button></div>`; d.querySelector('.btn-restore').addEventListener('click',()=>restoreServerBackup(n)); d.querySelector('.btn-delete').addEventListener('click',()=>deleteServerBackup(n)); DOM.backupList.appendChild(d); }); }
async function restoreServerBackup(n){ if(STATE.serverRunning){showAlert('Erreur','Stop serveur.');return;} if(await confirmAction('Restaurer',`Écraser avec ${n} ?`)){try{const r=await window.api.restoreBackup(DOM.serverFolder.value,n); if(r.success)showAlert('Ok','Restauré.'); else showAlert('Erreur',r.error);}catch(e){}} }
async function deleteServerBackup(n){ if(await confirmAction('Supprimer',`Supprimer ${n} ?`)){try{const r=await window.api.deleteBackup(DOM.serverFolder.value,n); if(r.success)loadBackups(); else showAlert('Erreur',r.error);}catch(e){}} }
async function importExistingServer(){ const p=await window.api.selectFolder(); if(!p)return; const r=await window.api.importServer(p); if(r.success){showAlert('Ok',`Importé: ${r.name}`); loadSavedServers();} else showAlert('Erreur',r.error); }
function onPlayerJoined(n){ if(!STATE.connectedPlayers.includes(n)){STATE.connectedPlayers.push(n);updatePlayerList();} }
function onPlayerLeft(n){ const i=STATE.connectedPlayers.indexOf(n); if(i>-1){STATE.connectedPlayers.splice(i,1);updatePlayerList();} }
function onPlayerLeft(n){ const i=STATE.connectedPlayers.indexOf(n); if(i>-1){STATE.connectedPlayers.splice(i,1);updatePlayerList();} }

// VVVV COLLEZ CETTE NOUVELLE FONCTION VVVV
/**
 * Met à jour les valeurs CPU/RAM.
 */
// ========================================
// GRAPHIQUE PERFORMANCES PC
// ========================================

let pcChartInstance = null;

function initializePcChart() {
    const ctx = document.getElementById('pcPerfChart');
    if (!ctx) return; // Sécurité si on est pas sur la bonne page

    pcChartInstance = new Chart(ctx.getContext('2d'), {
        type: 'line',
        data: {
            labels: Array(60).fill(''), // 60 points (1 minute environ)
            datasets: [
                {
                    label: 'CPU (%)',
                    data: Array(60).fill(0),
                    borderColor: '#2196F3', // Bleu
                    backgroundColor: 'rgba(33, 150, 243, 0.1)',
                    borderWidth: 2,
                    pointRadius: 0, // Ligne pure sans points
                    tension: 0.4, // Courbe lisse
                    fill: true
                },
                {
                    label: 'RAM (MB)',
                    data: Array(60).fill(0),
                    borderColor: '#4CAF50', // Vert
                    borderWidth: 2,
                    pointRadius: 0,
                    tension: 0.4,
                    yAxisID: 'y_ram' // Axe dédié à droite
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            interaction: { mode: 'index', intersect: false },
            plugins: { 
                legend: { display: true, labels: { color: '#ccc' } } 
            },
            scales: {
                x: { display: false }, // Pas d'axe temps visible
                y: { 
                    beginAtZero: true, 
                    max: 100, 
                    grid: { color: '#333' },
                    ticks: { color: '#aaa' },
                    title: { display: true, text: 'CPU %', color: '#2196F3' }
                },
                y_ram: {
                    type: 'linear',
                    display: true,
                    position: 'right',
                    grid: { drawOnChartArea: false },
                    ticks: { color: '#4CAF50' },
                    title: { display: true, text: 'RAM (MB)', color: '#4CAF50' }
                }
            },
            animation: { duration: 0 } // Désactiver l'animation pour fluidité temps réel
        }
    });
}

// On lance le graphique au démarrage
// (Ajoute cette ligne dans ton document.addEventListener tout en haut si ce n'est pas fait, 
// ou laisse le script l'exécuter ici car renderer.js est chargé à la fin du body)
setTimeout(initializePcChart, 500); 

/**
 * Met à jour les valeurs CPU/RAM (Texte + Graphique).
 */
function onServerStats(stats) {
    // 1. Mise à jour des textes (Dashboard)
    if (DOM.statCpu) DOM.statCpu.textContent = `${stats.cpu.toFixed(1)}%`;
    
    if (DOM.statRam) {
        if (stats.memory > 1024) {
            DOM.statRam.textContent = `${(stats.memory / 1024).toFixed(2)} GB`;
        } else {
            DOM.statRam.textContent = `${stats.memory.toFixed(0)} MB`;
        }
    }

    // 2. Mise à jour du Graphique
    if (pcChartInstance) {
        const cpuData = pcChartInstance.data.datasets[0].data;
        const ramData = pcChartInstance.data.datasets[1].data;

        // On décale tout vers la gauche (supprime le vieux, ajoute le neuf)
        cpuData.shift();
        cpuData.push(stats.cpu);

        ramData.shift();
        ramData.push(stats.memory);

        pcChartInstance.update();
    }
}

// ^^^^ FIN DE LA NOUVELLE FONCTION ^^^^
function updatePlayerList(){ if(!DOM.playerList)return; DOM.playerList.innerHTML=''; if(STATE.connectedPlayers.length===0)DOM.playerList.innerHTML='<p style="color:#777;text-align:center;">Aucun joueur.</p>'; else STATE.connectedPlayers.forEach(p=>{ const d=document.createElement('div'); d.className='player-row'; d.innerHTML=`<span class="player-name">${p}</span><button class="btn-op">OP</button>`; d.querySelector('.btn-op').addEventListener('click',()=>makePlayerOp(p)); DOM.playerList.appendChild(d); }); }
function makePlayerOp(playerName) {
    if (!playerName) return;
    if (!STATE.serverRunning) {
        showAlert('Erreur', 'Le serveur doit être démarré pour utiliser /op.');
        return;
    }
    logToConsole(`> [AUTO] Commande /op envoyée pour ${playerName}.`);
    window.api.sendCommand(`op ${playerName}`);
}

function makePlayerOp(playerName) {
    if (!playerName) return;
    if (!STATE.serverRunning) {
        showAlert('Erreur', 'Le serveur doit être démarré pour utiliser /op.');
        return;
    }
    logToConsole(`> [AUTO] Commande /op envoyée pour ${playerName}.`);
    window.api.sendCommand(`op ${playerName}`);
}

function initializeModals(){ if(DOM.closeModal)DOM.closeModal.addEventListener('click',()=>DOM.managerModal.style.display='none'); }
function showInput(t,d){ return new Promise(r=>{ const m=DOM.inputModal,te=DOM.inputTitle,ie=DOM.inputValue,bc=DOM.btnInputConfirm,ba=DOM.btnInputCancel; if(!m){alert('Err modal');r(null);return;} te.textContent=t; ie.value=d; m.style.display='block'; ie.focus(); const cl=()=>{bc.onclick=null;ba.onclick=null;ie.onkeydown=null;m.style.display='none';}; bc.onclick=()=>{cl();r(ie.value);}; ba.onclick=()=>{cl();r(null);}; ie.onkeydown=e=>{if(e.key==='Enter')bc.click();if(e.key==='Escape')ba.click();}; }); }
function showAlert(t,m){ if(!DOM.alertModal){alert(t+': '+m);return;} DOM.alertTitle.textContent=t; DOM.alertMessage.textContent=m; DOM.alertActionBtn.textContent='OK'; DOM.alertActionBtn.onclick=()=>DOM.alertModal.style.display='none'; DOM.alertCancelBtn.style.display='none'; DOM.alertModal.style.display='block'; }
function confirmAction(t,m){ return new Promise(r=>{ if(!DOM.alertModal){r(confirm(t+': '+m));return;} DOM.alertTitle.textContent=t; DOM.alertMessage.textContent=m; DOM.alertActionBtn.textContent='Confirmer'; DOM.alertActionBtn.onclick=()=>{DOM.alertModal.style.display='none';r(true);}; DOM.alertCancelBtn.style.display='inline-block'; DOM.alertCancelBtn.textContent='Annuler'; DOM.alertCancelBtn.onclick=()=>{DOM.alertModal.style.display='none';r(false);}; DOM.alertModal.style.display='block'; }); }

// ========================================
// GESTION JOUEURS (CONNECTÉS, WHITELIST, BANS)
// ========================================

function initializePlayerManagement() {
    // 1. Logique des sous-onglets (Whitelist, Ban, etc.)
    DOM.subTabButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Enlever 'active' de tous les boutons et onglets
            DOM.subTabButtons.forEach(btn => btn.classList.remove('active'));
            DOM.subTabContents.forEach(content => content.classList.remove('active'));

            // Ajouter 'active' au bouton cliqué et à l'onglet correspondant
            button.classList.add('active');
            const subTabId = button.dataset.subtab;
            const targetContent = document.getElementById(subTabId);
            if (targetContent) {
                targetContent.classList.add('active');
            }
            
            // Charger les données quand on clique sur l'onglet
            if (subTabId === 'players-whitelist') loadWhitelist();
            if (subTabId === 'players-banned') loadBanlist();
        });
    });

    // 2. Charger les listes quand on va sur l'onglet "Joueurs"
    if (DOM.navBtnPlayers) {
        DOM.navBtnPlayers.addEventListener('click', () => {
            // On recharge les listes au cas où le serveur a changé
            loadWhitelist();
            loadBanlist();
        });
    }

    // 3. Connecter les boutons "Ajouter"
    if (DOM.btnWhitelistAdd) DOM.btnWhitelistAdd.addEventListener('click', handleWhitelistAdd);
    if (DOM.btnBanAdd) DOM.btnBanAdd.addEventListener('click', handleBanAdd);
}

// --- CHARGEMENT ET AFFICHAGE DES LISTES ---

async function loadWhitelist() {
    if (!DOM.serverFolder.value) {
        DOM.whitelistList.innerHTML = '<p style="color:#777; text-align:center;">Sélectionnez un serveur.</p>';
        return;
    }
    DOM.whitelistList.innerHTML = '<p style="color:#777; text-align:center;">Chargement...</p>';
    try {
        const list = await window.api.getWhitelist(DOM.serverFolder.value);
        renderWhitelist(list);
    } catch (e) {
        DOM.whitelistList.innerHTML = `<p style="color:var(--danger-color); text-align:center;">Erreur: ${e.message}</p>`;
    }
}

async function loadBanlist() {
    if (!DOM.serverFolder.value) {
        DOM.banList.innerHTML = '<p style="color:#777; text-align:center;">Sélectionnez un serveur.</p>';
        return;
    }
    DOM.banList.innerHTML = '<p style="color:#777; text-align:center;">Chargement...</p>';
    try {
        const list = await window.api.getBanlist(DOM.serverFolder.value);
        renderBanlist(list);
    } catch (e) {
        DOM.banList.innerHTML = `<p style="color:var(--danger-color); text-align:center;">Erreur: ${e.message}</p>`;
    }
}

function renderWhitelist(list) {
    DOM.whitelistList.innerHTML = '';
    if (!list || list.length === 0) {
        DOM.whitelistList.innerHTML = '<p style="color:#777; text-align:center;">La whitelist est vide.</p>';
        return;
    }
    
    list.forEach(p => {
        const item = document.createElement('div');
        item.className = 'player-list-item-manager';
        item.innerHTML = `
            <div class="player-info">
                <span class="player-name">${p.name}</span>
                <span class="player-meta">${p.uuid}</span>
            </div>
            <button class="btn-small btn-danger btn-remove-player">
                <i class="fas fa-times"></i>
            </button>
        `;
        item.querySelector('.btn-remove-player').addEventListener('click', () => handleWhitelistRemove(p.uuid, p.name));
        DOM.whitelistList.appendChild(item);
    });
}

function renderBanlist(list) {
    DOM.banList.innerHTML = '';
    if (!list || list.length === 0) {
        DOM.banList.innerHTML = '<p style="color:#777; text-align:center;">Aucun joueur banni.</p>';
        return;
    }

    list.forEach(p => {
        const item = document.createElement('div');
        item.className = 'player-list-item-manager';
        item.innerHTML = `
            <div class="player-info">
                <span class="player-name">${p.name}</span>
                <span class="player-meta">Raison: ${p.reason || 'Aucune'}</span>
            </div>
            <button class="btn-small btn-secondary btn-remove-player" style="background: #555;">
                <i class="fas fa-undo"></i>
            </button>
        `;
        item.querySelector('.btn-remove-player').addEventListener('click', () => handleBanRemove(p.uuid, p.name));
        DOM.banList.appendChild(item);
    });
}

// --- ACTIONS (AJOUTER / SUPPRIMER) ---

async function handleWhitelistAdd() {
    const name = DOM.whitelistAddInput.value.trim();
    if (!name) {
        showAlert('Erreur', 'Veuillez entrer un nom de joueur.');
        return;
    }
    if (!DOM.serverFolder.value) {
        showAlert('Erreur', 'Veuillez sélectionner un serveur.');
        return;
    }

    DOM.btnWhitelistAdd.disabled = true;
    DOM.btnWhitelistAdd.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';

    try {
        const result = await window.api.addToWhitelist(DOM.serverFolder.value, name);
        if (result.success) {
            renderWhitelist(result.list);
            DOM.whitelistAddInput.value = '';

            if (STATE.serverRunning) {
                window.api.sendCommand(`whitelist add ${name}`);
                logToConsole(`> [AUTO] Commande /whitelist add envoyée pour ${name}.`);
            }
        } else {
            showAlert('Erreur', result.error || 'Impossible d\'ajouter le joueur.');
        }
    } catch (e) {
        showAlert('Erreur', e.message);
    }

    DOM.btnWhitelistAdd.disabled = false;
    DOM.btnWhitelistAdd.innerHTML = '<i class="fas fa-plus"></i> Ajouter';
}

async function handleBanAdd() {
    const name = DOM.banAddInput.value.trim();
    const reason = DOM.banReasonInput.value.trim() || 'Banni via MC Server Manager';
    if (!name) {
        showAlert('Erreur', 'Veuillez entrer un nom de joueur.');
        return;
    }
    if (!DOM.serverFolder.value) {
        showAlert('Erreur', 'Veuillez sélectionner un serveur.');
        return;
    }

    DOM.btnBanAdd.disabled = true;
    DOM.btnBanAdd.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
    
    try {
        const result = await window.api.addToBanlist(DOM.serverFolder.value, name, reason);
        if (result.success) {
            renderBanlist(result.list);
            DOM.banAddInput.value = '';
            DOM.banReasonInput.value = '';
            // Si le serveur tourne, on envoie aussi la commande pour effet immédiat
            if (STATE.serverRunning) {
                window.api.sendCommand(`ban ${name} ${reason}`);
                logToConsole(`> [AUTO] Commande /ban envoyée pour ${name}.`);
            }
        } else {
            showAlert('Erreur', result.error || 'Impossible de bannir le joueur.');
        }
    } catch (e) {
        showAlert('Erreur', e.message);
    }
    
    DOM.btnBanAdd.disabled = false;
    DOM.btnBanAdd.innerHTML = '<i class="fas fa-plus"></i> Bannir';
}

async function handleWhitelistRemove(uuid, name) {
    const confirmed = await confirmAction('Retirer de la Whitelist', `Voulez-vous vraiment retirer ${name} de la whitelist ?`);
    if (confirmed) {
        try {
            const newList = await window.api.removeFromWhitelist(DOM.serverFolder.value, uuid);
            renderWhitelist(newList);

            if (STATE.serverRunning) {
                window.api.sendCommand(`whitelist remove ${name}`);
                logToConsole(`> [AUTO] Commande /whitelist remove envoyée pour ${name}.`);
            }
        } catch (e) {
            showAlert('Erreur', e.message);
        }
    }
}

async function handleBanRemove(uuid, name) {
    const confirmed = await confirmAction('Grâcier le joueur', `Voulez-vous vraiment débannir ${name} ?`);
    if (confirmed) {
        try {
            const newList = await window.api.removeFromBanlist(DOM.serverFolder.value, uuid);
            renderBanlist(newList);
            // Si le serveur tourne, on envoie /pardon
            if (STATE.serverRunning) {
                window.api.sendCommand(`pardon ${name}`);
                logToConsole(`> [AUTO] Commande /pardon envoyée pour ${name}.`);
            }
        } catch (e) {
            showAlert('Erreur', e.message);
        }
    }
}

// ========================================
// GESTION TÂCHES PLANIFIÉES (UI)
// ========================================

function initializeScheduledTasks() {
    // Logique pour le toggle Auto-Restart
    if (DOM.autoRestartToggle) {
        DOM.autoRestartToggle.addEventListener('change', () => {
            if (DOM.autoRestartToggle.checked) {
                DOM.autoRestartOptions.style.display = 'block';
            } else {
                DOM.autoRestartOptions.style.display = 'none';
            }
        });
    }

    // Logique pour le toggle Auto-Backup
    if (DOM.autoBackupToggle) {
        DOM.autoBackupToggle.addEventListener('change', () => {
            if (DOM.autoBackupToggle.checked) {
                DOM.autoBackupOptions.style.display = 'block';
            } else {
                DOM.autoBackupOptions.style.display = 'none';
            }
        });
    }
}

// ========================================
// GESTIONNAIRE DE LOGS (UI)
// ========================================

function initializeLogViewer() {
    if (DOM.btnOpenLogViewer) {
        DOM.btnOpenLogViewer.addEventListener('click', openLogViewer);
    }
    if (DOM.closeLogViewer) {
        DOM.closeLogViewer.addEventListener('click', () => {
            DOM.logViewerModal.style.display = 'none';
        });
    }
    // Fermer en cliquant à l'extérieur
    window.addEventListener('click', (e) => {
        if (e.target === DOM.logViewerModal) {
            DOM.logViewerModal.style.display = 'none';
        }
    });
}

async function openLogViewer() {
    if (!DOM.serverFolder.value) {
        showAlert('Erreur', 'Veuillez d\'abord sélectionner un serveur actif.');
        return;
    }
    
    // Réinitialiser l'état de la modale
    DOM.logFileList.innerHTML = '<p style="color:#777; text-align:center; padding-top: 20px;">Chargement des fichiers...</p>';
    DOM.logContentDisplay.textContent = 'Sélectionnez un fichier log sur la gauche.';
    DOM.logViewerFooter.style.display = 'none';
    DOM.logViewerModal.style.display = 'block';

    try {
        const files = await window.api.getLogFiles(DOM.serverFolder.value);
        renderLogFileList(files);
    } catch (e) {
        DOM.logFileList.innerHTML = `<p style="color:var(--danger-color); text-align:center; padding-top: 20px;">Erreur: ${e.message}</p>`;
    }
}

function renderLogFileList(files) {
    DOM.logFileList.innerHTML = ''; // Nettoyer
    
    if (!files || files.length === 0) {
        DOM.logFileList.innerHTML = '<p style="color:#777; text-align:center; padding-top: 20px;">Aucun log trouvé.</p>';
        return;
    }

    files.forEach(file => {
        const item = document.createElement('div');
        item.className = 'log-file-item';
        item.textContent = file.name;
        item.title = file.path; // Stocke le chemin complet (ex: logs/fichier.log.gz)

        // Ajoute une classe spéciale pour les crashs
        if (file.path.includes('crash-reports')) {
            item.classList.add('crash');
            item.innerHTML = `<i class="fas fa-skull-crossbones" style="margin-right: 8px;"></i> ${file.name}`;
        }
        
        // Ajoute l'action au clic
        item.addEventListener('click', () => {
            // Gérer la classe 'active'
            document.querySelectorAll('.log-file-item').forEach(el => el.classList.remove('active'));
            item.classList.add('active');
            
            // Charger le contenu
            loadLogFileContent(file);
        });

        DOM.logFileList.appendChild(item);
    });
}

async function loadLogFileContent(file) {
    DOM.logContentDisplay.textContent = 'Décompression et lecture du fichier...';
    DOM.logViewerFooter.style.display = 'block';
    DOM.logFileName.textContent = file.path;

    try {
        const result = await window.api.getLogContent(DOM.serverFolder.value, file.path);
        
        if (result.success) {
            DOM.logContentDisplay.textContent = result.content;
            // Scrolle automatiquement en bas (utile pour les crash reports)
            DOM.logContentDisplay.scrollTop = DOM.logContentDisplay.scrollHeight;
        } else {
            DOM.logContentDisplay.style.color = 'var(--danger-color)';
            DOM.logContentDisplay.textContent = `Erreur lors de la lecture du fichier :\n\n${result.error}`;
        }
    } catch (e) {
        DOM.logContentDisplay.style.color = 'var(--danger-color)';
        DOM.logContentDisplay.textContent = `Erreur critique :\n\n${e.message}`;
    }
}

// ========================================
// NAVIGATEUR ADD-ONS (MODRINTH)
// ========================================

function initializeAddonBrowser() {
    // Connecter le bouton de recherche
    if (DOM.btnAddonSearch) {
        DOM.btnAddonSearch.addEventListener('click', performAddonSearch);
    }
    // Connecter la touche "Entrée"
    if (DOM.addonSearchInput) {
        DOM.addonSearchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                performAddonSearch();
            }
        });
    }
}

// ========================================
// ÉDITEUR SERVER.PROPERTIES (UI)
// ========================================

/**
 * Initialise les boutons de l'éditeur.
 */
function initializePropertiesEditor() {
    if (DOM.btnLoadProperties) {
        DOM.btnLoadProperties.addEventListener('click', loadServerProperties);
    }
    if (DOM.btnSaveProperties) {
        DOM.btnSaveProperties.addEventListener('click', saveServerProperties);
    }
}

/**
 * Charge et affiche les propriétés du serveur sélectionné.
 */
async function loadServerProperties() {
    const serverPath = DOM.serverFolder.value;
    if (!serverPath) {
        showAlert('Erreur', 'Veuillez d\'abord sélectionner un serveur.');
        return;
    }

    DOM.propertiesEditorContainer.innerHTML = '<p style="color:#777; text-align:center; padding: 20px 0;">Chargement...</p>';
    DOM.btnLoadProperties.disabled = true;

    try {
        const props = await window.api.readServerProps(serverPath);
        
        if (Object.keys(props).length === 0) {
            DOM.propertiesEditorContainer.innerHTML = '<p style="color:var(--danger-color); text-align:center; padding: 20px 0;">Fichier `server.properties` introuvable ou vide.</p>';
            DOM.btnSaveProperties.disabled = true;
        } else {
            renderPropertiesForm(props);
            DOM.btnSaveProperties.disabled = false;
        }
    } catch (e) {
        showAlert('Erreur de chargement', e.message);
    }
    
    DOM.btnLoadProperties.disabled = false;
}

/**
 * Génère le formulaire HTML dynamiquement à partir de l'objet de propriétés.
 */
function renderPropertiesForm(props) {
    DOM.propertiesEditorContainer.innerHTML = '';
    
    // Trie les clés par ordre alphabétique pour un affichage cohérent
    const sortedKeys = Object.keys(props).sort();

    sortedKeys.forEach(key => {
        const value = props[key];
        let inputHtml = '';

        // Détecte le type de valeur pour générer le bon champ
        if (value === 'true' || value === 'false') {
            // Booléen -> Select (true/false)
            inputHtml = `
                <select class="styled-input" data-key="${key}">
                    <option value="true" ${value === 'true' ? 'selected' : ''}>true</option>
                    <option value="false" ${value === 'false' ? 'selected' : ''}>false</option>
                </select>`;
        } else if (!isNaN(Number(value)) && value.trim() !== '' && !key.includes('port') && !key.includes('id') && !key.includes('seed')) {
            // Nombre -> Input type "number" (sauf pour les ports/seeds)
            inputHtml = `<input type="number" class="styled-input" data-key="${key}" value="${value}">`;
        } else {
            // Texte -> Input type "text"
            // On utilise escapeHTML pour les valeurs (ex: le motd peut contenir des ")
            inputHtml = `<input type="text" class="styled-input" data-key="${key}" value="${escapeHTML(value)}">`;
        }
        
        // Crée l'élément de ligne
        const row = document.createElement('div');
        row.className = 'property-item-row';
        row.innerHTML = `
            <label title="${key}">${key}</label>
            ${inputHtml}
        `;
        DOM.propertiesEditorContainer.appendChild(row);
    });
}

/**
 * Lit toutes les valeurs du formulaire et les envoie au main process.
 */
async function saveServerProperties() {
    const serverPath = DOM.serverFolder.value;
    if (!serverPath) {
        showAlert('Erreur', 'Aucun serveur sélectionné.');
        return;
    }

    DOM.btnSaveProperties.disabled = true;
    DOM.btnSaveProperties.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sauvegarde...';

    try {
        const newProps = {};
        // Récupère tous les champs générés
        const inputs = DOM.propertiesEditorContainer.querySelectorAll('[data-key]');
        
        inputs.forEach(input => {
            const key = input.dataset.key;
            newProps[key] = input.value;
        });

        // Envoie l'objet complet au main process
        const result = await window.api.saveServerProps(serverPath, newProps);
        
        if (result.success) {
            showAlert('Succès', 'Les propriétés ont été enregistrées !\nUn redémarrage est requis.');
        } else {
            throw new Error(result.error);
        }

    } catch (e) {
        showAlert('Erreur de sauvegarde', e.message);
    }

    DOM.btnSaveProperties.disabled = false;
    DOM.btnSaveProperties.innerHTML = '<i class="fas fa-save"></i> Enregistrer';
}

async function performAddonSearch() {
    const query = DOM.addonSearchInput.value.trim();
    if (!query) {
        showAlert('Recherche', 'Veuillez entrer un terme de recherche.');
        return;
    }

    // Vérification cruciale : on a besoin de savoir POUR QUEL serveur on cherche
    if (!DOM.serverFolder.value || !STATE.selectedVersion || !STATE.selectedVersion.id) {
        showAlert('Erreur', 'Veuillez d\'abord sélectionner un serveur avec une version définie avant de rechercher.');
        return;
    }

    // Afficher l'état de chargement
    DOM.addonResultsList.innerHTML = '<p style="color:#777; text-align:center; padding: 20px;">Recherche en cours...</p>';
    DOM.btnAddonSearch.disabled = true;
    DOM.btnAddonSearch.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';

    // Préparer les filtres
    const filters = {
        type: DOM.addonTypeFilter.value,
        version: STATE.selectedVersion.id // Ex: "1.21"
    };

    try {
        const result = await window.api.searchAddons(query, filters);
        if (result.success) {
            renderAddonResults(result.hits);
        } else {
            throw new Error(result.error);
        }
    } catch (e) {
        DOM.addonResultsList.innerHTML = `<p style="color:var(--danger-color); text-align:center; padding: 20px;">Erreur: ${e.message}</p>`;
    }

    // Rétablir le bouton
    DOM.btnAddonSearch.disabled = false;
    DOM.btnAddonSearch.innerHTML = '<i class="fas fa-search"></i> Rechercher';
}

function renderAddonResults(hits) {
    DOM.addonResultsList.innerHTML = ''; // Vider les anciens résultats
    
    if (!hits || hits.length === 0) {
        DOM.addonResultsList.innerHTML = '<p style="color:#777; text-align:center; padding: 20px;">Aucun résultat trouvé.</p>';
        return;
    }

    hits.forEach(hit => {
        const card = document.createElement('div');
        card.className = 'addon-card';

        // Nettoyer la description (enlever les balises HTML)
        const description = hit.description.replace(/<[^>]*>?/gm, '');

        card.innerHTML = `
            <div class="addon-card-main">
                <img src="${hit.icon_url}" alt="${hit.title}" class="addon-icon">
                <div class="addon-info">
                    <h4 class="addon-title" title="${hit.title}">${hit.title}</h4>
                    <div class="addon-author">par ${hit.author}</div>
                </div>
            </div>
            <div class="addon-description" style="padding: 0 15px 15px;">
                ${description}
            </div>
            <div class="addon-card-footer">
                <button class="btn-primary btn-download-addon" style="width: 100%;">
                    <i class="fas fa-download"></i> Télécharger
                </button>
                <button class="btn-secondary btn-open-modrinth" style="width: auto;" title="Ouvrir sur Modrinth">
                    <i class="fas fa-external-link-alt"></i>
                </button>
            </div>
        `;

        // Connecter les boutons de la carte
        const downloadBtn = card.querySelector('.btn-download-addon');
        const modrinthBtn = card.querySelector('.btn-open-modrinth');

        downloadBtn.addEventListener('click', () => handleDownloadClick(hit, downloadBtn));
        modrinthBtn.addEventListener('click', () => {
            window.api.openExternal(`https://modrinth.com/project/${hit.slug}`);
        });

        DOM.addonResultsList.appendChild(card);
    });
}

async function handleDownloadClick(hit, button) {
    // On revérifie qu'un serveur est sélectionné
    if (!DOM.serverFolder.value || !STATE.selectedVersion || !STATE.selectedServerType) {
        showAlert('Erreur', 'Impossible de télécharger : informations du serveur manquantes.');
        return;
    }

    button.disabled = true;
    button.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';

    try {
        const result = await window.api.downloadAddon(
            DOM.serverFolder.value,     // Le chemin du serveur
            hit.slug,                   // L'ID du projet (ex: 'worldedit')
            STATE.selectedVersion.id,   // La version du jeu (ex: '1.21')
            STATE.selectedServerType    // Le loader (ex: 'paper', 'fabric')
        );

        if (result.success) {
            button.innerHTML = `<i class="fas fa-check"></i> Installé !`;
            showAlert('Succès', `${result.fileName} a été installé.`);
        } else {
            throw new Error(result.error);
        }
    } catch (e) {
        button.disabled = false;
        button.innerHTML = '<i class="fas fa-download"></i> Télécharger';
        showAlert('Erreur de téléchargement', e.message);
    }
}

window.MCServerManager = { showAlert, confirmAction, loadServerFromLibrary: selectServer, deleteServer: window.api.deleteServer, makePlayerOp };

// ============================================================================
//  TOUTE LA LOGIQUE REMOTE CONTROL (MASTER BLOCK)
//  Ce bloc gère : Démarrage, Config, Changement de serveur, et Joueurs.
// ============================================================================

// 1. DÉMARRAGE : Le téléphone veut lancer le serveur
if (window.api.onRemoteRequestConfig) {
    window.api.onRemoteRequestConfig(() => {
        if (!DOM.serverFolder.value) return;
        const config = getServerConfig();
        window.api.sendConfigToRemote(config);
    });
}

// 2. LECTURE CONFIG : Le téléphone veut voir les sliders (sans démarrer)
if (window.api.onRequestPerfData) {
    window.api.onRequestPerfData(() => {
        if (!DOM.serverFolder.value) return;
        const config = getServerConfig();
        window.api.sendPerfDataToRemote({
            ram: config.ram,
            view: config.viewDistance,
            slots: config.maxPlayers
        });
    });
}

// 3. ÉCRITURE CONFIG : Le téléphone a modifié les sliders
if (window.api.onRemoteSetPerf) {
    window.api.onRemoteSetPerf((data) => {
        console.log("📱 Remote: Modification réglages", data);
        if (data.ram && DOM.ramSlider) { DOM.ramSlider.value = data.ram; if(DOM.ramDisplay) DOM.ramDisplay.textContent = data.ram + " Go"; }
        if (data.view && DOM.renderSlider) { DOM.renderSlider.value = data.view; if(DOM.renderDisplay) DOM.renderDisplay.textContent = data.view + " Chunks"; }
        if (data.slots && DOM.maxPlayersSlider) { DOM.maxPlayersSlider.value = data.slots; if(DOM.maxPlayersDisplay) DOM.maxPlayersDisplay.textContent = data.slots; }
        
        saveServerConfig(); // Sauvegarde
        if(window.MCServerManager && window.MCServerManager.showAlert) {
            window.MCServerManager.showAlert("Remote", "Réglages mis à jour.");
        }
    });
}

// 4. SÉLECTION SERVEUR : Le téléphone change de serveur (C'est ça qui manquait !)
if (window.api.onRemoteLoadServer) {
    window.api.onRemoteLoadServer((remotePath) => {
        console.log("📱 Remote: Changement de serveur vers", remotePath);
        window.api.getSavedServers().then(servers => {
            const target = servers.find(s => s.path.trim() === remotePath.trim());
            if (target) {
                selectServer(target); // Charge le serveur dans l'interface
                
                // Bascule sur l'onglet Dashboard
                const dashTab = document.querySelector('[data-tab="dashboard"]');
                if (dashTab) dashTab.click();
            }
        });
    });
}

// 5. LISTE JOUEURS : Le téléphone demande qui est connecté
if (window.api.onRequestPlayerList) {
    window.api.onRequestPlayerList(() => {
        // On renvoie la liste stockée dans la variable globale STATE
        window.api.sendPlayerListToRemote(STATE.connectedPlayers || []);
    });
}

// ========================================
// AFFICHAGE QR CODE & IP (REMOTE)
// ========================================

async function initializeQRCode() {
    const container = document.getElementById('qrcode-container');
    const link = document.getElementById('remote-link');
    
    // Si les éléments n'existent pas dans le HTML (pas encore ajoutés), on arrête
    if(!container || !link) return;

    try {
        // On demande au Main de générer le QR Code
        // (Assure-toi d'avoir ajouté le handler dans main.js et le pont dans preload.js avant !)
        if (window.api.getRemoteInfo) {
            const info = await window.api.getRemoteInfo();
            
            if (info && !info.error) {
                // Affichage de l'image
                container.innerHTML = `<img src="${info.qr}" style="width: 100px; height: 100px; display: block; border-radius: 4px;">`;
                
                // Affichage du lien texte
                link.textContent = info.ip;
                link.href = info.ip;
                
                // Petit bonus : Copier au clic
                link.title = "Cliquer pour copier";
                link.addEventListener('click', (e) => {
                    e.preventDefault();
                    navigator.clipboard.writeText(info.ip);
                    window.MCServerManager.showAlert("Copié", "L'adresse a été copiée !");
                });
            }
        }
    } catch (e) {
        console.error("Erreur lors de l'affichage du QR Code :", e);
        container.innerHTML = '<small style="color:var(--danger-color)">Erreur</small>';
    }
}

// ========================================
// SYNC ÉTAT GLOBAL (PC <-> MOBILE)
// ========================================

if (window.api.onGlobalServerState) {
    window.api.onGlobalServerState((state) => {
        console.log("🔄 État du serveur synchronisé :", state);
        
        // Met à jour la variable globale
        STATE.serverRunning = (state === 'running');

        // Mise à jour des boutons PC
        if (DOM.btnStart) {
            DOM.btnStart.disabled = (state === 'running');
            DOM.btnStart.textContent = (state === 'running') ? 'EN COURS...' : 'LANCER LE SERVEUR';
            // Si c'est running, on peut mettre "LANCÉ" si on veut, ou attendre le "Server Ready"
        }
        
        if (DOM.btnStop) {
            DOM.btnStop.disabled = (state !== 'running');
        }

        // Mise à jour de l'indicateur visuel (Pastille)
        if (DOM.statusDot && DOM.statusText) {
            if (state === 'running') {
                DOM.statusDot.className = 'dot orange'; // Orange = Démarrage / En cours
                DOM.statusText.textContent = 'Actif';
                // On active la console et l'input
                if(DOM.commandInput) DOM.commandInput.disabled = false;
                if(DOM.btnSend) DOM.btnSend.disabled = false;
            } else {
                DOM.statusDot.className = 'dot red';
                DOM.statusText.textContent = 'Éteint';
                // On désactive la console
                if(DOM.commandInput) DOM.commandInput.disabled = true;
                if(DOM.btnSend) DOM.btnSend.disabled = true;
                
                // Reset des stats
                if(DOM.statsContainer) DOM.statsContainer.style.display = 'none';
            }
        }
    });
}

// ========================================
// GESTION PARAMÈTRES (PIN MOBILE)
// ========================================

async function initializeSettings() {
    // 1. Charger le code PIN actuel quand on lance l'app
    if (DOM.settingPinInput) {
        // On demande au Main.js via le pont Preload
        if (window.api.getAppSettings) {
            const settings = await window.api.getAppSettings();
            DOM.settingPinInput.value = settings.remotePin || "1234";
        }

        // Petit bonus : Empêcher d'écrire des lettres (chiffres uniquement)
        DOM.settingPinInput.addEventListener('input', (e) => {
            e.target.value = e.target.value.replace(/[^0-9]/g, '').slice(0, 4);
        });
    }

    // 2. Action du bouton Enregistrer
    if (DOM.btnSavePin) {
        DOM.btnSavePin.addEventListener('click', async () => {
            const newPin = DOM.settingPinInput.value;
            
            if (newPin.length !== 4) {
                showAlert('Erreur', 'Le code PIN doit faire exactement 4 chiffres.');
                return;
            }

            // On sauvegarde via le Main.js
            if (window.api.saveAppSettings) {
                await window.api.saveAppSettings({ remotePin: newPin });
                showAlert('Succès', 'Nouveau code PIN enregistré !');
            } else {
                showAlert('Erreur', 'Fonction de sauvegarde introuvable (vérifiez preload.js).');
            }
        });
    }
}

