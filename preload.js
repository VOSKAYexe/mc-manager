/**
 * MC Server Manager - Preload Script
 * Version 2.6.0 - FINAL (Avec Icons)
 */

const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('api', {
    // ========================================
    // GESTION DOSSIERS & FICHIERS
    // ========================================
    selectFolder: () => ipcRenderer.invoke('dialog:openDirectory'),
    
    // 👇 NOUVELLE LIGNE POUR L'ICÔNE 👇
    changeServerIcon: (path) => ipcRenderer.invoke('change-server-icon', path),
    // 👆 --------------------------- 👆

    // ========================================
    // GESTION VERSIONS & SERVEURS
    // ========================================
    getVersions: () => ipcRenderer.invoke('get-versions'),
    getSavedServers: () => ipcRenderer.invoke('get-saved-servers'),
    importServer: (path) => ipcRenderer.invoke('import-server', path),
    readServerProps: (path) => ipcRenderer.invoke('read-server-props', path),
    saveServerProps: (path, props) => ipcRenderer.invoke('save-server-props', path, props),
    deleteServer: (path) => ipcRenderer.invoke('delete-server', path),
    deleteServerFiles: (path) => ipcRenderer.invoke('delete-server-files', path),

    // ========================================
    // DOSSIERS MODS / PLUGINS
    // ========================================
    openModsFolder: (path) => ipcRenderer.send('open-mods-folder', path),
    openPluginsFolder: (path) => ipcRenderer.send('open-plugins-folder', path),
    
    // ========================================
    // SYSTÈME DE BACKUPS
    // ========================================
    createBackup: (path, name) => ipcRenderer.invoke('create-backup', path, name),
    getBackups: (path) => ipcRenderer.invoke('get-backups', path),
    restoreBackup: (path, name) => ipcRenderer.invoke('restore-backup', path, name),
    deleteBackup: (path, name) => ipcRenderer.invoke('delete-backup', path, name),

    getWhitelist: (path) => ipcRenderer.invoke('get-whitelist', path),
    getBanlist: (path) => ipcRenderer.invoke('get-banlist', path),
    addToWhitelist: (path, name) => ipcRenderer.invoke('add-to-whitelist', path, name),
    removeFromWhitelist: (path, uuid) => ipcRenderer.invoke('remove-from-whitelist', path, uuid),
    addToBanlist: (path, name, reason) => ipcRenderer.invoke('add-to-banlist', path, name, reason),
    removeFromBanlist: (path, uuid) => ipcRenderer.invoke('remove-from-banlist', path, uuid),
    getLogFiles: (path) => ipcRenderer.invoke('get-log-files', path),
    getLogContent: (path, name) => ipcRenderer.invoke('get-log-content', path, name),

    searchAddons: (query, filters) => ipcRenderer.invoke('search-addons', query, filters),
    downloadAddon: (path, slug, gameVersion, loader) => ipcRenderer.invoke('download-addon', path, slug, gameVersion, loader),

    // --- AJOUT GESTIONNAIRE DE MONDES ---
    resetWorld: (path) => ipcRenderer.invoke('world:reset', path),
    uploadWorld: (path) => ipcRenderer.invoke('world:upload', path),
    openDatapacks: (path) => ipcRenderer.invoke('world:openDatapacks', path),

    // ========================================
    // CONTRÔLE DU SERVEUR
    // ========================================
    startServer: (config) => ipcRenderer.send('start-server', config),
    stopServer: () => ipcRenderer.send('stop-server'),
    sendCommand: (cmd) => ipcRenderer.send('send-command', cmd),
    
    // ========================================
    // UTILITAIRES
    // ========================================
    openExternal: (url) => ipcRenderer.send('open-external-link', url),

    // ========================================
    // ÉVÉNEMENTS
    // ========================================
    onConsoleLog: (cb) => ipcRenderer.on('console-log', (e, t) => cb(t)),
    onServerStopped: (cb) => ipcRenderer.on('server-stopped', () => cb()),
    onServerReady: (cb) => ipcRenderer.on('server-ready', () => cb()),
    
    onPlayerJoined: (cb) => ipcRenderer.on('player-joined', (e, name) => cb(name)),
    onPlayerLeft: (cb) => ipcRenderer.on('player-left', (e, name) => cb(name)),
    onServerStats: (cb) => ipcRenderer.on('server-stats', (e, stats) => cb(stats)),

    onRemoteRequestConfig: (cb) => ipcRenderer.on('request-config-for-remote', cb),
    sendConfigToRemote: (config) => ipcRenderer.send('remote-start-with-config', config),
    onRemoteLoadServer: (cb) => ipcRenderer.on('remote-load-server', (e, path) => cb(path)),
    onRemoteSetPerf: (cb) => ipcRenderer.on('remote-set-perf', (e, data) => cb(data)),
    sendPerfDataToRemote: (data) => ipcRenderer.send('remote-send-perf-data', data),
    onRequestPerfData: (cb) => ipcRenderer.on('request-only-perf-data', cb),
    onRequestPlayerList: (cb) => ipcRenderer.on('request-player-list', cb),
    sendPlayerListToRemote: (list) => ipcRenderer.send('remote-send-player-list', list),

    getRemoteInfo: () => ipcRenderer.invoke('get-remote-info'),
    onGlobalServerState: (cb) => ipcRenderer.on('global-server-state', (e, state) => cb(state)),
    getAppSettings: () => ipcRenderer.invoke('get-app-settings'),
    saveAppSettings: (settings) => ipcRenderer.invoke('save-app-settings', settings)
});