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
    btnWizardNext: document.getElementById('btn-wizard-next'),
    
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
    btnOpenProperties: document.getElementById('btn-open-properties'),
    propertiesModal: document.getElementById('properties-modal'),
    closePropertiesModal: document.getElementById('close-properties-modal'),
    btnSavePropertiesModal: document.getElementById('btn-save-properties-modal'),
    
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
    modWarningNeoForge: document.getElementById('mod-warning-neoforge'),
    
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
    connectedPlayers: [],
    wizardActive: false,
    wizardStepsVisited: new Set(),
    statsSum: { cpu: 0, ram: 0, count: 0 },
    isCrossPlay: false
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
    initializePropertiesModal();
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

        // --- AJOUT : BOUTON "CRÉER NOUVEAU" EN HAUT ---
        const createItem = document.createElement('div');
        createItem.className = 'server-list-item';
        // Style spécial pour le distinguer (bordure pointillée ou couleur différente)
        createItem.style.border = '2px dashed var(--text-secondary)';
        createItem.style.justifyContent = 'center';
        
        createItem.innerHTML = `
            <div style="display:flex; align-items:center; gap:10px; font-weight:bold; color:var(--primary-color);">
                <i class="fas fa-plus-circle" style="font-size:1.2em;"></i>
                <span>CRÉER UN NOUVEAU SERVEUR</span>
            </div>
        `;

        createItem.addEventListener('click', () => {
            prepareNewServerCreation();
            DOM.serverSelectorModal.style.display = 'none';
        });
        list.appendChild(createItem);
        // -----------------------------------------------

        if (servers.length === 0) {
            const p = document.createElement('p');
            p.style.textAlign = 'center'; p.style.color = '#777'; p.style.padding = '20px';
            p.textContent = 'Aucun serveur existant.';
            list.appendChild(p);
        } else {
            // Tri par date
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
                if (server.type === 'neoforge') icon = '🦊';
                const badgeHtml = isCurrent ? '<span class="badge-current">ACTUEL</span>' : '';

                item.innerHTML = `
                    <div class="srv-info">
                        <span class="srv-name">${server.name} ${badgeHtml}</span>
                        <div class="srv-meta"><span class="type-badge">${icon} ${server.type}</span><span>Ver: ${server.version || '?'}</span></div>
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

// ========================================
// LOGIQUE DE L'ASSISTANT (WIZARD)
// ========================================

function renderWizardStartScreen() {
    const configTab = document.getElementById('config');
    if (!configTab) return;

    // 1. On vérifie si l'écran existe déjà, sinon on le crée
    let choiceScreen = document.getElementById('wizard-choice-screen');
    if (!choiceScreen) {
        choiceScreen = document.createElement('div');
        choiceScreen.id = 'wizard-choice-screen';
        choiceScreen.style.cssText = 'display:flex; gap:20px; justify-content:center; align-items:stretch; height:100%; padding:20px;';
        configTab.appendChild(choiceScreen);
    }

    // 2. On injecte le contenu HTML avec vos textes
    choiceScreen.innerHTML = `
        <div id="btn-wizard-java" class="wizard-card" style="flex:1; background:var(--bg-card); border:2px solid var(--border-color); border-radius:8px; padding:20px; cursor:pointer; transition:0.3s; display:flex; flex-direction:column; align-items:center;">
            <div style="font-size:3em; margin-bottom:15px; color:#4CAF50;"><i class="fas fa-desktop"></i></div>
            <h3 style="margin:0 0 10px 0;">Java Edition</h3>
            <p style="color:#888; text-align:center; margin-bottom:20px;">L'expérience classique sur PC.</p>
            
            <div class="wizard-details">
                <div class="detail-row pro"><i class="fas fa-check"></i> <span>Mods infinis (Forge, Fabric...)</span></div>
                <div class="detail-row pro"><i class="fas fa-check"></i> <span>Stabilité maximale</span></div>
                <div class="detail-row pro"><i class="fas fa-check"></i> <span>Moins de bugs</span></div>
                <div class="detail-row con"><i class="fas fa-times"></i> <span>Joueurs PC uniquement</span></div>
            </div>
            
            <button class="btn-primary" style="margin-top:auto; width:100%;">Choisir Java</button>
        </div>

        <div id="btn-wizard-cross" class="wizard-card" style="flex:1; background:var(--bg-card); border:2px solid var(--border-color); border-radius:8px; padding:20px; cursor:pointer; transition:0.3s; display:flex; flex-direction:column; align-items:center;">
            <div style="font-size:3em; margin-bottom:15px; color:#2196F3;"><i class="fas fa-globe"></i></div>
            <h3 style="margin:0 0 10px 0;">Cross-Play</h3>
            <p style="color:#888; text-align:center; margin-bottom:20px;">PC + Consoles + Mobiles.</p>
            
            <div class="wizard-details">
                <div class="detail-row pro"><i class="fas fa-check"></i> <span>Tout le monde peut jouer</span></div>
                <div class="detail-row pro"><i class="fas fa-gamepad"></i> <span>Compatible PS4/5, Xbox, Switch, Tel</span></div>
                <div class="detail-row con"><i class="fas fa-exclamation-triangle"></i> <span>Pas de mods complexes (ex: Create)</span></div>
                <div class="detail-row con"><i class="fas fa-exclamation-triangle"></i> <span>Risque de petits bugs visuels</span></div>
            </div>

            <button class="btn-primary" style="margin-top:auto; width:100%;">Choisir Cross-Play</button>
        </div>
    `;

    // 3. Effets de survol (Hover) pour faire joli
    const cards = choiceScreen.querySelectorAll('.wizard-card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', () => { 
            card.style.transform = 'translateY(-5px)'; 
            card.style.borderColor = 'var(--primary-color)'; 
            card.style.boxShadow = '0 5px 15px rgba(0,0,0,0.3)';
        });
        card.addEventListener('mouseleave', () => { 
            card.style.transform = 'translateY(0)'; 
            card.style.borderColor = 'var(--border-color)';
            card.style.boxShadow = 'none';
        });
    });
}

function prepareNewServerCreation() {
    // 1. Reset visuel
    if (DOM.currentServerName) {
        DOM.currentServerName.innerHTML = '<i class="fas fa-plus"></i> Nouveau Serveur';
        DOM.currentServerName.style.color = "var(--text-secondary)";
    }

    // 2. Vider les champs
    if (DOM.serverFolder) DOM.serverFolder.value = '';
    if (DOM.serverName) DOM.serverName.value = '';
    if (DOM.javaPathInput) DOM.javaPathInput.value = '';
    if (DOM.serverIconPreview) DOM.serverIconPreview.src = DEFAULT_ICON;
    STATE.isCrossPlay = false; // Reset du mode

    // 3. INITIALISER LE MODE WIZARD
    STATE.wizardActive = true;
    STATE.wizardStepsVisited.clear();
    STATE.wizardStepsVisited.add('config');

    // Cacher le bouton "Créer" statique
    if(DOM.btnSave) DOM.btnSave.style.display = 'none';

    // Afficher le bouton flottant
    updateWizardButton('config');
    DOM.btnWizardNext.style.display = 'flex';

    // 4. Navigation vers l'onglet config
    const configTabBtn = document.querySelector('[data-tab="config"]');
    if (configTabBtn) configTabBtn.click();

    // --- MAGIE ICI : ON INJECTE L'INTERFACE DE CHOIX ---
    renderWizardStartScreen(); 
    // ---------------------------------------------------

    // 5. Désactiver Start
    if (DOM.btnStart) DOM.btnStart.disabled = true;
    if (DOM.statusText) DOM.statusText.textContent = 'Configuration...';
}

function selectServer(server) {
    // 1. Mise à jour visuelle du sélecteur
    if (DOM.currentServerName) {
        DOM.currentServerName.textContent = server.name;
        DOM.currentServerName.style.color = "var(--primary-color)";
    }

    // 2. Remplissage des champs de configuration
    if (DOM.serverFolder) DOM.serverFolder.value = server.path;
    if (DOM.serverName) DOM.serverName.value = server.name;
    if (DOM.javaPathInput) DOM.javaPathInput.value = server.javaPath || '';
    
    // 3. Gestion de la version
    // On récupère l'ID (parfois stocké sous 'version', parfois 'versionId')
    const vId = server.version || server.versionId;
    
    if (DOM.versionInput) DOM.versionInput.value = vId;
    
    // --- CORRECTION ICI : ON MET À JOUR L'ÉTAT GLOBAL ---
    // C'est ce qui manquait pour que la recherche d'addons fonctionne
    STATE.selectedVersion = { id: vId }; 
    // ----------------------------------------------------

    // 4. Sélection du type (Vanilla, Forge, NeoForge...)
    selectServerType(server.type || 'vanilla');
    
    // 5. Chargement de l'icône avec gestion d'erreur (Fallback)
    const iconPath = `file://${server.path}/server-icon.png`;
    const img = new Image();
    
    img.onload = () => { 
        if(DOM.serverIconPreview) DOM.serverIconPreview.src = `${iconPath}?t=${Date.now()}`; 
    };
    
    // Si l'image n'existe pas, on met l'image par défaut
    img.onerror = () => { 
        if(DOM.serverIconPreview) DOM.serverIconPreview.src = DEFAULT_ICON; 
    };
    
    img.src = iconPath;

    // 6. Mise à jour des tâches planifiées (UI)
    const restartConfig = server.autoRestart || { enabled: false, intervalHours: 4 };
    if(DOM.autoRestartToggle) DOM.autoRestartToggle.checked = restartConfig.enabled;
    if(DOM.autoRestartHours) DOM.autoRestartHours.value = restartConfig.intervalHours;
    if(DOM.autoRestartOptions) DOM.autoRestartOptions.style.display = restartConfig.enabled ? 'block' : 'none';

    const backupConfig = server.autoBackup || { enabled: false, intervalDays: 1, atTime: '00:00' };
    if(DOM.autoBackupToggle) DOM.autoBackupToggle.checked = backupConfig.enabled;
    if(DOM.autoBackupDays) DOM.autoBackupDays.value = backupConfig.intervalDays;
    if(DOM.autoBackupTime) DOM.autoBackupTime.value = backupConfig.atTime;
    if(DOM.autoBackupOptions) DOM.autoBackupOptions.style.display = backupConfig.enabled ? 'block' : 'none';

    // 7. Lecture des propriétés pour le mode Public
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
    
    if (DOM.btnPaypal) DOM.btnPaypal.addEventListener('click', () => {
        window.api.openExternal('https://www.paypal.me/MCMANAGEROWNER'); 
    });

    if (DOM.btnImportServer) DOM.btnImportServer.addEventListener('click', importExistingServer);
    
    if (DOM.btnOpenSelector) DOM.btnOpenSelector.addEventListener('click', openServerSelector);
    if (DOM.closeSelector) DOM.closeSelector.addEventListener('click', () => DOM.serverSelectorModal.style.display = 'none');
    
    // Fermeture modale au clic extérieur
    window.addEventListener('click', (e) => { if (e.target === DOM.serverSelectorModal) DOM.serverSelectorModal.style.display = 'none'; });
    
    if (DOM.serverIconWrapper) DOM.serverIconWrapper.addEventListener('click', changeIconConfig);

    // --- CORRECTION : AJOUT DU LISTENER WIZARD ICI ---
    if (DOM.btnWizardNext) {
        // On supprime d'abord les anciens listeners pour éviter les doublons (méthode propre)
        const newBtn = DOM.btnWizardNext.cloneNode(true);
        DOM.btnWizardNext.parentNode.replaceChild(newBtn, DOM.btnWizardNext);
        DOM.btnWizardNext = newBtn; 
        
        // On attache le bon listener
        DOM.btnWizardNext.addEventListener('click', handleWizardNextStep);
    }
}

function initializePropertiesModal() {
    // 1. Ouvrir la modale
    if (DOM.btnOpenProperties) {
        DOM.btnOpenProperties.addEventListener('click', async () => {
            const serverPath = DOM.serverFolder.value;
            if (!serverPath) {
                showAlert("Erreur", "Veuillez d'abord sélectionner un serveur.");
                return;
            }

            try {
                // Lecture du fichier
                const props = await window.api.readServerProps(serverPath);
                
                // Si vide ou inexistant
                if (!props || Object.keys(props).length === 0) {
                    showAlert("Fichier manquant", "Le fichier server.properties n'existe pas encore. Lancez le serveur une fois pour le créer.");
                    return;
                }

                renderPropertiesForm(props);
                DOM.propertiesModal.style.display = 'block';

            } catch (e) {
                showAlert("Erreur", "Impossible de lire les propriétés : " + e.message);
            }
        });
    }

    // 2. Fermer la modale
    if (DOM.closePropertiesModal) {
        DOM.closePropertiesModal.addEventListener('click', () => DOM.propertiesModal.style.display = 'none');
    }

    // 3. BOUTON SAUVEGARDER (Correction ici)
    if (DOM.btnSavePropertiesModal) {
        // On clone le bouton pour supprimer les anciens écouteurs (anti-doublon)
        const newBtn = DOM.btnSavePropertiesModal.cloneNode(true);
        DOM.btnSavePropertiesModal.parentNode.replaceChild(newBtn, DOM.btnSavePropertiesModal);
        DOM.btnSavePropertiesModal = newBtn; // Mise à jour de la référence DOM

        DOM.btnSavePropertiesModal.addEventListener('click', async () => {
            console.log("💾 Clic sur Enregistrer...");
            await saveServerPropertiesFromModal();
        });
    }


    // 2. Fermer la modale
    if (DOM.closePropertiesModal) {
        DOM.closePropertiesModal.addEventListener('click', () => DOM.propertiesModal.style.display = 'none');
    }

    // 3. Sauvegarder depuis la modale
    if (DOM.btnSavePropertiesModal) {
        DOM.btnSavePropertiesModal.addEventListener('click', async () => {
            // Sauvegarde server.properties (fonction existante un peu modifiée pour ne pas utiliser les anciens boutons)
            await saveServerPropertiesFromModal();
            DOM.propertiesModal.style.display = 'none';
        });
    }
}

// Fonction adaptée de votre ancien saveServerProperties
async function saveServerPropertiesFromModal() {
    const serverPath = DOM.serverFolder.value;
    if (!serverPath) return;

    // Changement visuel du bouton pour montrer que ça charge
    const btn = DOM.btnSavePropertiesModal;
    const originalText = btn.innerHTML;
    btn.disabled = true;
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sauvegarde...';

    try {
        const newProps = {};
        const inputs = document.getElementById('properties-editor-container').querySelectorAll('[data-key]');
        
        inputs.forEach(input => {
            newProps[input.dataset.key] = input.value;
        });

        console.log("Envoi des nouvelles propriétés :", newProps);
        const result = await window.api.saveServerProps(serverPath, newProps);
        
        if (result.success) {
            DOM.propertiesModal.style.display = 'none'; // On ferme d'abord
            showAlert('Succès', 'Configuration sauvegardée ! Redémarrez le serveur pour appliquer.');
        } else {
            throw new Error(result.error);
        }
    } catch (e) {
        console.error(e);
        showAlert('Erreur', "Échec de la sauvegarde : " + e.message);
    } finally {
        // Rétablissement du bouton
        btn.disabled = false;
        btn.innerHTML = originalText;
    }
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

async function startServer() {
    // 1. Reset visuel des stats
    if (DOM.statsContainer) DOM.statsContainer.style.display = 'none'; 
    
    // 2. Récupération de la config
    const config = getServerConfig();
    if (!config.folderPath) { showAlert('Attention', 'Sélectionnez un dossier.'); return; }

    // 3. Vérification Wizard (Si l'utilisateur a sauté des étapes)
    if (STATE.wizardActive) {
        const requiredSteps = ['performance', 'backups', 'worlds'];
        if (config.type !== 'vanilla') requiredSteps.push('addons');

        const missedSteps = requiredSteps.filter(step => !STATE.wizardStepsVisited.has(step));

        if (missedSteps.length > 0) {
            const confirm = await confirmAction(
                "Configuration Incomplète", 
                "Vous n'avez pas validé toutes les étapes. Lancer avec les paramètres par défaut ?"
            );
            if (!confirm) return;
            finishWizard(); // Force la fin du wizard
            await new Promise(r => setTimeout(r, 500));
        }
    }

    // 4. Mise à jour de l'état
    STATE.serverRunning = true; 
    STATE.serverIsReady = false;

    // Reset des moyennes et du graphique
    STATE.statsSum = { cpu: 0, ram: 0, count: 0 };
    if (document.getElementById('avg-cpu-display')) {
        document.getElementById('avg-cpu-display').textContent = '0.0%';
        document.getElementById('avg-ram-display').textContent = '0 MB';
    }
    if (window.pcChartInstance) {
        window.pcChartInstance.data.datasets.forEach(dataset => dataset.data.fill(0));
        window.pcChartInstance.update();
    }

    // 5. Interface
    if (DOM.btnStart) { DOM.btnStart.disabled = true; DOM.btnStart.textContent = 'LANCEMENT...'; }
    if (DOM.btnStop) DOM.btnStop.disabled = false; 
    if (DOM.commandInput) DOM.commandInput.disabled = false; 
    if (DOM.btnSend) DOM.btnSend.disabled = false;
    if (DOM.consoleOutput) DOM.consoleOutput.innerHTML = '';
    if (DOM.statusDot) DOM.statusDot.className = 'dot orange'; 
    if (DOM.statusText) DOM.statusText.textContent = 'Démarrage...';
    
    logToConsole('=== DÉMARRAGE ===');

    // 6. ENVOI DE LA COMMANDE AU MAIN (C'est cette ligne qui vous manquait !)
    window.api.startServer(config);
    
    // 7. Petit refresh de la liste
    setTimeout(() => { loadSavedServers(config.folderPath); }, 1000);
}

function stopServer() { 
    if (!STATE.serverRunning) return;
     if (DOM.btnStop) DOM.btnStop.disabled = true; 
     if (DOM.statusText) DOM.statusText.textContent = 'Arrêt...'; 
     window.api.stopServer(); }

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
/* ========================================
   INTERFACE & NAVIGATION
   ======================================== */

function initializeSidebar() {
    if (DOM.toggleSidebarBtn) {
        DOM.toggleSidebarBtn.addEventListener('click', () => {
            DOM.sidebar.classList.toggle('collapsed');
        });
    }
}

function initializeNavigation() {
    DOM.navButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            // Désactiver tous les boutons et onglets
            DOM.navButtons.forEach(x => x.classList.remove('active'));
            DOM.tabContents.forEach(x => x.classList.remove('active'));

            // Activer l'élément cliqué
            btn.classList.add('active');
            const targetTab = document.getElementById(btn.dataset.tab);
            
            if (targetTab) {
                targetTab.classList.add('active');
                
                // Cas Backups
                if (btn.dataset.tab === 'backups') {
                    loadBackups();
                }

                // --- AJOUT : Cas Performance ---
                if (btn.dataset.tab === 'performance') {
                    // On attend 50ms que le CSS "display: block" s'applique
                    setTimeout(() => {
                        initializePcChart();
                    }, 50);
                }
                // -------------------------------
            }
        });
    });
}
/* ========================================
   SLIDERS & INPUTS
   ======================================== */

function initializeSliders() {
    setupSlider('ram', 'Go', 2, 128);
    setupSlider('render', 'Chunks', 2, 64);
    setupSlider('max-players', '', 1, 1000);
}

function setupSlider(name, unit, min, max) {
    // Récupération dynamique des IDs
    const slider = document.getElementById(`${name}-slider`);
    // Gère la différence d'ID pour max-players
    const display = document.getElementById(`${name}${name === 'max-players' ? '-value' : '-display-val'}`);
    const input = document.getElementById(`${name}-input${name === 'max-players' ? '' : '-custom'}`);
    const toggleBtn = document.getElementById(`btn-${name}-toggle`);

    if (!slider) return;

    let isManualMode = false;

    // Mise à jour du texte quand on bouge le slider
    slider.addEventListener('input', () => {
        display.textContent = slider.value + (unit ? ` ${unit}` : '');
    });

    // Bouton de bascule Slider <-> Manuel
    toggleBtn.addEventListener('click', () => {
        isManualMode = !isManualMode;
        
        if (isManualMode) {
            slider.style.display = 'none';
            input.style.display = 'block';
            input.value = slider.value;
            toggleBtn.textContent = 'Slider';
            input.dataset.active = 'true';
        } else {
            slider.style.display = 'block';
            input.style.display = 'none';
            input.dataset.active = 'false';
            
            // Validation de la valeur manuelle avant de revenir au slider
            const val = parseInt(input.value);
            if (val >= min && val <= max) {
                slider.value = val;
                display.textContent = val + (unit ? ` ${unit}` : '');
            }
            toggleBtn.textContent = 'Manuel';
        }
    });

    // Mise à jour du texte quand on écrit dans l'input manuel
    input.addEventListener('input', () => {
        const val = parseInt(input.value);
        if (val >= min && val <= max) {
            display.textContent = val + (unit ? ` ${unit}` : '');
        }
    });
}

/* ========================================
   TYPES DE SERVEUR
   ======================================== */

function initializeServerTypeSelector() {
    DOM.typeButtons.forEach(btn => {
        btn.addEventListener('click', () => selectServerType(btn.dataset.type));
    });
}

function selectServerType(type) {
    STATE.selectedServerType = type;
    
    if (DOM.serverTypeInput) {
        DOM.serverTypeInput.value = type;
    }

    // Gestion de la classe active sur les boutons
    DOM.typeButtons.forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.type === type) {
            btn.classList.add('active');
        }
    });

    // Réinitialisation des alertes
    if (DOM.modWarningFabric) DOM.modWarningFabric.style.display = 'none';
    if (DOM.modWarningForge) DOM.modWarningForge.style.display = 'none';
    if (DOM.modWarningPaper) DOM.modWarningPaper.style.display = 'none';
    if (DOM.modWarningNeoForge) DOM.modWarningNeoForge.style.display = 'none';

    // Affichage de l'alerte correspondante
    switch (type) {
        case 'fabric':
            if (DOM.modWarningFabric) DOM.modWarningFabric.style.display = 'block';
            break;
        case 'forge':
            if (DOM.modWarningForge) DOM.modWarningForge.style.display = 'block';
            break;
        case 'paper':
            if (DOM.modWarningPaper) DOM.modWarningPaper.style.display = 'block';
            break;
            case 'neoforge':
            if (DOM.modWarningNeoForge) DOM.modWarningNeoForge.style.display = 'block';
            break;
    }
}

/* ========================================
   UTILITAIRES DOSSIERS
   ======================================== */

function openModsFolder() {
    if (DOM.serverFolder.value) {
        window.api.openModsFolder(DOM.serverFolder.value);
    } else {
        showAlert('Erreur', 'Pas de dossier sélectionné');
    }
}

function openPluginsFolder() {
    if (DOM.serverFolder.value) {
        window.api.openPluginsFolder(DOM.serverFolder.value);
    } else {
        showAlert('Erreur', 'Pas de dossier sélectionné');
    }
}

/* ========================================
   GESTION DES VERSIONS
   ======================================== */

async function loadVersions() {
    const majorGrid = document.getElementById('major-versions-grid');
    const minorGrid = document.getElementById('minor-versions-grid');

    if (!majorGrid) return;

    majorGrid.innerHTML = 'Loading...';

    try {
        const versions = await window.api.getVersions();
        if (!versions.length) throw new Error("Aucune version trouvée");

        // Regrouper par version majeure (ex: 1.20, 1.19)
        const grouped = {};
        versions.forEach(ver => {
            const key = ver.id.match(/^(\d+\.\d+)/)?.[1] || "Autre";
            if (!grouped[key]) grouped[key] = [];
            grouped[key].push(ver);
        });

        majorGrid.innerHTML = '';
        minorGrid.innerHTML = '<div style="padding:20px;text-align:center;color:#777;">Choisir famille</div>';

        // Création des boutons de familles (colonne gauche)
        Object.keys(grouped).forEach((key, index) => {
            const btn = document.createElement('div');
            btn.className = 'v-btn';
            btn.textContent = key;

            btn.addEventListener('click', () => {
                // Gestion visuelle active
                document.querySelectorAll('#major-versions-grid .v-btn').forEach(x => x.classList.remove('active'));
                btn.classList.add('active');

                // Remplissage colonne droite
                minorGrid.innerHTML = '';
                grouped[key].forEach((subVer, subIndex) => {
                    const subBtn = document.createElement('div');
                    subBtn.className = 'v-btn';
                    subBtn.textContent = subVer.id;

                    if (STATE.selectedVersion?.id === subVer.id) subBtn.classList.add('active');

                    subBtn.addEventListener('click', () => {
                        document.querySelectorAll('#minor-versions-grid .v-btn').forEach(z => z.classList.remove('active'));
                        subBtn.classList.add('active');
                        
                        STATE.selectedVersion = subVer;
                        if (DOM.versionInput) DOM.versionInput.value = subVer.id;
                        if (DOM.versionUrlInput) DOM.versionUrlInput.value = subVer.url;
                    });

                    minorGrid.appendChild(subBtn);

                    // Sélectionne automatiquement la première version de la liste par défaut
                    if (subIndex === 0 && !STATE.selectedVersion) {
                        subBtn.click();
                    }
                });
            });

            majorGrid.appendChild(btn);
            // Clic automatique sur le premier groupe au chargement
            if (index === 0) btn.click();
        });

    } catch (e) {
        majorGrid.innerHTML = 'Erreur lors du chargement des versions';
    }
}

/* ========================================
   CONSOLE & COMMANDES
   ======================================== */

function initializeConsole() {
    if (DOM.btnSend) {
        DOM.btnSend.addEventListener('click', sendCommand);
    }
    if (DOM.commandInput) {
        DOM.commandInput.addEventListener('keypress', e => {
            if (e.key === 'Enter') sendCommand();
        });
    }

    // Liaison des événements IPC (Backend -> Frontend)
    if (window.api) {
        if (window.api.onConsoleLog) window.api.onConsoleLog(logToConsole);
        if (window.api.onServerStopped) window.api.onServerStopped(onServerStopped);
        if (window.api.onServerReady) window.api.onServerReady(onServerReady);
        if (window.api.onPlayerJoined) window.api.onPlayerJoined(onPlayerJoined);
        if (window.api.onPlayerLeft) window.api.onPlayerLeft(onPlayerLeft);
        if (window.api.onServerStats) window.api.onServerStats(onServerStats);
    }
}

function sendCommand() {
    if (DOM.commandInput && DOM.commandInput.value.trim() && STATE.serverRunning) {
        const cmd = DOM.commandInput.value.trim();
        window.api.sendCommand(cmd);
        logToConsole(`> ${cmd}`);
        DOM.commandInput.value = '';
    }
}

function logToConsole(text) {
    if (!DOM.consoleOutput) return;

    // 1. DÉTECTION INTELLIGENTE :
    // On calcule si l'utilisateur est déjà tout en bas (avec une marge de 50px)
    // AVANT d'ajouter le nouveau texte.
    const isAtBottom = (DOM.consoleOutput.scrollHeight - DOM.consoleOutput.scrollTop - DOM.consoleOutput.clientHeight) < 50;

    const p = document.createElement('p');
    p.textContent = text;

    // Gestion des couleurs
    if (text.includes('ERROR') || text.includes('FAILED')) {
        p.style.color = '#f44336';
    } else if (text.includes('WARN')) {
        p.style.color = '#ff9800';
    } else if (text.includes('INFO')) {
        p.style.color = '#2196f3';
    } else if (text.includes('joined')) {
        p.style.color = '#4caf50';
    }

    DOM.consoleOutput.appendChild(p);

    // 2. SCROLL CONDITIONNEL :
    // On ne force la descente QUE si l'utilisateur était déjà en bas.
    // Sinon, on le laisse lire tranquillement ce qu'il y a plus haut.
    if (isAtBottom) {
        DOM.consoleOutput.scrollTop = DOM.consoleOutput.scrollHeight;
    }

    // Détection "Serveur Prêt"
    const lowerText = text.toLowerCase();
    if (!STATE.serverIsReady && (lowerText.includes('done') || lowerText.includes('for help, type'))) {
        onServerReady();
    }
}

/* ========================================
   ACTIONS GÉNÉRALES
   ======================================== */

async function browseForFolder() {
    try {
        const path = await window.api.selectFolder();
        if (path) {
            DOM.serverFolder.value = path;
        }
    } catch (e) {
        console.error(e);
    }
}

async function saveServerConfig(isSilent = false) {
    const config = getServerConfig();
    
    // Validation de base pour la sauvegarde manuelle
    if (!config.folderPath || !config.name) {
        if (!isSilent) showAlert('Erreur', 'Nom et dossier requis');
        return false; // Indique que la sauvegarde a échoué
    }
    
    // Si ce n'est pas le Wizard qui appelle (isSilent = false), on affiche le succès
    if (!isSilent) {
        showAlert('Ok', 'Configuration prête.');
    }
    
    return true; // Indique que la sauvegarde est OK
}
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

function initializePublicMode() {
    if (DOM.publicModeToggle) {
        DOM.publicModeToggle.addEventListener('change', () => {
            if (DOM.navBtnPublic) {
                if (DOM.publicModeToggle.checked) {
                    DOM.navBtnPublic.classList.add('visible');
                } else {
                    DOM.navBtnPublic.classList.remove('visible');
                }
            }
        });
    }
    if (DOM.navBtnPublic) {
        DOM.navBtnPublic.style.display = 'flex';
    }
}

function initializeBackups() {
    if (DOM.btnCreateBackup) {
        DOM.btnCreateBackup.addEventListener('click', createServerBackup);
    }
    const t = document.querySelector('[data-tab="backups"]');
    if (t) {
        t.addEventListener('click', loadBackups);
    }
}

async function createServerBackup() {
    if (!DOM.serverFolder.value) {
        showAlert('Erreur', 'Dossier ?');
        return;
    }

    const d = `backup-${new Date().toISOString().slice(0, 10)}`;
    const n = await showInput("Nom :", d);

    if (n === null) return;

    const c = n.trim() || d;

    if (DOM.btnCreateBackup) {
        DOM.btnCreateBackup.disabled = true;
        DOM.btnCreateBackup.textContent = '...';
    }

    try {
        const r = await window.api.createBackup(DOM.serverFolder.value, c);
        if (r.success) {
            showAlert('Ok', `Créé: ${r.path}`);
            loadBackups();
        } else {
            showAlert('Erreur', r.error);
        }
    } catch (e) {
        // Erreur silencieuse
    } finally {
        if (DOM.btnCreateBackup) {
            DOM.btnCreateBackup.disabled = false;
            DOM.btnCreateBackup.innerHTML = '<i class="fas fa-plus"></i> CRÉER';
        }
    }
}

async function loadBackups() {
    if (!DOM.serverFolder.value || !DOM.backupList) return;

    const b = await window.api.getBackups(DOM.serverFolder.value);
    DOM.backupList.innerHTML = '';

    if (!b || !b.length) {
        DOM.backupList.innerHTML = '<p style="text-align:center;color:#777;">Vide.</p>';
        return;
    }

    b.forEach(n => {
        const d = document.createElement('div');
        d.style.cssText = 'display:flex;justify-content:space-between;align-items:center;background:var(--bg-card);padding:12px;margin-bottom:8px;border-radius:5px;border:1px solid var(--border-secondary);';
        d.innerHTML = `<span style="font-family:monospace;">${n}</span><div style="display:flex;gap:10px;"><button class="btn-small btn-primary btn-restore"><i class="fas fa-undo"></i></button><button class="btn-small btn-danger btn-delete"><i class="fas fa-trash"></i></button></div>`;

        d.querySelector('.btn-restore').addEventListener('click', () => restoreServerBackup(n));
        d.querySelector('.btn-delete').addEventListener('click', () => deleteServerBackup(n));

        DOM.backupList.appendChild(d);
    });
}

async function restoreServerBackup(n) {
    if (STATE.serverRunning) {
        showAlert('Erreur', 'Stop serveur.');
        return;
    }

    if (await confirmAction('Restaurer', `Écraser avec ${n} ?`)) {
        try {
            const r = await window.api.restoreBackup(DOM.serverFolder.value, n);
            if (r.success) {
                showAlert('Ok', 'Restauré.');
            } else {
                showAlert('Erreur', r.error);
            }
        } catch (e) {
            // Erreur silencieuse
        }
    }
}

async function deleteServerBackup(n) {
    if (await confirmAction('Supprimer', `Supprimer ${n} ?`)) {
        try {
            const r = await window.api.deleteBackup(DOM.serverFolder.value, n);
            if (r.success) {
                loadBackups();
            } else {
                showAlert('Erreur', r.error);
            }
        } catch (e) {
            // Erreur silencieuse
        }
    }
}

async function importExistingServer() {
    const p = await window.api.selectFolder();
    if (!p) return;

    const r = await window.api.importServer(p);
    if (r.success) {
        showAlert('Ok', `Importé: ${r.name}`);
        loadSavedServers();
    } else {
        showAlert('Erreur', r.error);
    }
}

function onPlayerJoined(n) {
    if (!STATE.connectedPlayers.includes(n)) {
        STATE.connectedPlayers.push(n);
        updatePlayerList();
    }
}

function onPlayerLeft(n) {
    const i = STATE.connectedPlayers.indexOf(n);
    if (i > -1) {
        STATE.connectedPlayers.splice(i, 1);
        updatePlayerList();
    }
}

// VVVV COLLEZ CETTE NOUVELLE FONCTION VVVV
/**
 * Met à jour les valeurs CPU/RAM.
 */
// ========================================
// GRAPHIQUE PERFORMANCES PC
// ========================================

let pcChartInstance = null;

function initializePcChart() {
    const ctxElement = document.getElementById('pcPerfChart');
    if (!ctxElement) return;
    
    // --- CORRECTIF : Nettoyage de l'ancien graphique ---
    if (window.pcChartInstance instanceof Chart) {
        window.pcChartInstance.destroy();
    }
    // ---------------------------------------------------

    const ctx = ctxElement.getContext('2d');

    // Dégradés (Fonctionnent maintenant car le canvas est visible au moment de l'appel)
    const gradientCpu = ctx.createLinearGradient(0, 0, 0, 400);
    gradientCpu.addColorStop(0, 'rgba(33, 150, 243, 0.4)');
    gradientCpu.addColorStop(1, 'rgba(33, 150, 243, 0.0)');

    const gradientRam = ctx.createLinearGradient(0, 0, 0, 400);
    gradientRam.addColorStop(0, 'rgba(76, 175, 80, 0.4)');
    gradientRam.addColorStop(1, 'rgba(76, 175, 80, 0.0)');

    // Création (Notez l'utilisation de window.pcChartInstance pour être sûr de la portée globale)
    window.pcChartInstance = new Chart(ctx, {
        type: 'line',
        data: {
            labels: Array(60).fill(''),
            datasets: [
                {
                    label: 'CPU (%)',
                    data: Array(60).fill(0),
                    borderColor: '#2196F3',
                    backgroundColor: gradientCpu,
                    borderWidth: 2,
                    pointRadius: 0,
                    pointHoverRadius: 4,
                    tension: 0.4,
                    fill: true,
                    yAxisID: 'y'
                },
                {
                    label: 'RAM (MB)',
                    data: Array(60).fill(0),
                    borderColor: '#4CAF50',
                    backgroundColor: gradientRam,
                    borderWidth: 2,
                    pointRadius: 0,
                    pointHoverRadius: 4,
                    tension: 0.4,
                    fill: true,
                    yAxisID: 'y_ram'
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            interaction: { mode: 'index', intersect: false },
            plugins: {
                legend: { labels: { color: '#ccc', font: { family: 'Segoe UI, sans-serif' } } },
                tooltip: {
                    backgroundColor: 'rgba(30, 30, 30, 0.9)',
                    titleColor: '#fff',
                    bodyColor: '#ccc',
                    borderColor: '#444',
                    borderWidth: 1,
                    displayColors: true
                }
            },
            scales: {
                x: { display: false },
                y: {
                    beginAtZero: true, max: 100, position: 'left',
                    grid: { color: '#333', borderDash: [5, 5] },
                    ticks: { color: '#2196F3', font: { weight: 'bold' } },
                    title: { display: true, text: 'CPU %', color: '#2196F3' }
                },
                y_ram: {
                    type: 'linear', display: true, position: 'right',
                    grid: { display: false },
                    ticks: { color: '#4CAF50', font: { weight: 'bold' } },
                    title: { display: true, text: 'RAM (MB)', color: '#4CAF50' }
                }
            },
            animation: { duration: 0 }
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
    // 1. Mise à jour des textes en temps réel (Dashboard)
    if (DOM.statCpu) DOM.statCpu.textContent = `${stats.cpu.toFixed(1)}%`;
    
    if (DOM.statRam) {
        if (stats.memory > 1024) {
            DOM.statRam.textContent = `${(stats.memory / 1024).toFixed(2)} GB`;
        } else {
            DOM.statRam.textContent = `${stats.memory.toFixed(0)} MB`;
        }
    }

    // 2. CALCUL DES MOYENNES (Correctement intégré)
    // On ne calcule que si le serveur est marqué comme "running" dans le STATE
    if (STATE.serverRunning) {
        STATE.statsSum.count++;
        STATE.statsSum.cpu += stats.cpu;
        STATE.statsSum.ram += stats.memory;

        const avgCpu = STATE.statsSum.cpu / STATE.statsSum.count;
        const avgRam = STATE.statsSum.ram / STATE.statsSum.count;

        const elCpu = document.getElementById('avg-cpu-display');
        const elRam = document.getElementById('avg-ram-display');

        if (elCpu) elCpu.textContent = `${avgCpu.toFixed(1)}%`;
        if (elRam) {
            if (avgRam > 1024) elRam.textContent = `${(avgRam / 1024).toFixed(2)} GB`;
            else elRam.textContent = `${avgRam.toFixed(0)} MB`;
        }
    }

    // 3. Mise à jour du Graphique (Utilisation de window.pcChartInstance)
    if (window.pcChartInstance) {
        const cpuData = window.pcChartInstance.data.datasets[0].data;
        const ramData = window.pcChartInstance.data.datasets[1].data;

        // On décale les données vers la gauche
        cpuData.shift();
        cpuData.push(stats.cpu);

        ramData.shift();
        ramData.push(stats.memory);

        // On rafraîchit le graphique sans animation pour la fluidité
        window.pcChartInstance.update('none'); 
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
/**
 * Génère le formulaire HTML avancé pour server.properties
 */
function renderPropertiesForm(props) {
    const container = document.getElementById('properties-editor-container');
    container.innerHTML = '';

    // --- CONFIGURATION DU TRI ---
    
    // 1. Les options "VIP" (Celles qu'on veut voir en haut, bien présentées)
    const priorityKeys = {
        'Gameplay & Accès': [
            { key: 'motd', label: 'Description (MOTD)', type: 'text' },
            { key: 'max-players', label: 'Joueurs Max (Slots)', type: 'number' },
            { key: 'gamemode', label: 'Mode de jeu par défaut', type: 'select', options: ['survival', 'creative', 'adventure', 'spectator'] },
            { key: 'difficulty', label: 'Difficulté', type: 'select', options: ['peaceful', 'easy', 'normal', 'hard'] },
            { key: 'white-list', label: 'Activer la Whitelist', type: 'switch' },
            { key: 'online-mode', label: 'Mode Online (Premium)', type: 'switch' },
            { key: 'allow-flight', label: 'Autoriser le vol', type: 'switch' },
            { key: 'pvp', label: 'Combat (PVP)', type: 'switch' },
            { key: 'hardcore', label: 'Mode Hardcore (Mort = Ban)', type: 'switch' }
        ],
        'Monde & Génération': [
            { key: 'level-seed', label: 'Graine (Seed)', type: 'text', placeholder: 'Laisser vide pour aléatoire' },
            { key: 'level-name', label: 'Nom du dossier monde', type: 'text' },
            { key: 'generate-structures', label: 'Générer Structures (Villages...)', type: 'switch' },
            { key: 'spawn-protection', label: 'Protection du Spawn (rayon)', type: 'number' }
        ],
        'Performances & Réseau': [
            { key: 'view-distance', label: 'Distance de vue (Chunks)', type: 'number', min: 2, max: 32 },
            { key: 'simulation-distance', label: 'Distance de simulation', type: 'number', min: 2, max: 32 },
            { key: 'server-port', label: 'Port du Serveur', type: 'number' },
            { key: 'server-ip', label: 'IP Spécifique (Laisser vide)', type: 'text' }
        ]
    };

    // Copie des props pour savoir ce qu'il reste à la fin (les options avancées)
    const remainingProps = { ...props };

    // --- GÉNÉRATION DES SECTIONS PRIORITAIRES ---

    for (const [sectionName, fields] of Object.entries(priorityKeys)) {
        // Titre de section
        const title = document.createElement('div');
        title.className = 'prop-section-title';
        title.textContent = sectionName;
        container.appendChild(title);

        // Grille pour les champs
        const grid = document.createElement('div');
        grid.className = 'prop-grid';

        fields.forEach(field => {
            // On vérifie si la clé existe dans le fichier, sinon on l'ajoute avec une valeur par défaut
            let value = remainingProps[field.key];
            
            // Si la clé n'existe pas dans le fichier, on met une valeur par défaut (vide ou false)
            if (value === undefined) value = '';

            // On retire cette clé de la liste des "restants" car on va la traiter ici
            delete remainingProps[field.key];

            const item = document.createElement('div');
            item.className = 'prop-row';
            item.innerHTML = `
                <label>${field.label} <small style="opacity:0.5">(${field.key})</small></label>
                ${generateInputHtml(field.key, value, field)}
            `;
            grid.appendChild(item);
        });

        container.appendChild(grid);
    }

    // --- GÉNÉRATION DE LA ZONE AVANCÉE (Le reste) ---

    if (Object.keys(remainingProps).length > 0) {
        const advZone = document.createElement('div');
        advZone.className = 'prop-advanced-zone';
        
        advZone.innerHTML = `
            <div class="prop-advanced-warning">
                <i class="fas fa-exclamation-triangle"></i>
                ZONE AVANCÉE / TECHNIQUE - Ne modifiez pas ces valeurs si vous ne savez pas ce que vous faites.
            </div>
            <div class="prop-grid" id="advanced-grid"></div>
        `;
        
        const advGrid = advZone.querySelector('#advanced-grid');
        
        // On trie les clés restantes par ordre alphabétique
        Object.keys(remainingProps).sort().forEach(key => {
            const value = remainingProps[key];
            const item = document.createElement('div');
            item.className = 'prop-row';
            
            // Détection automatique simple du type
            let fieldConfig = { type: 'text' };
            if (value === 'true' || value === 'false') fieldConfig.type = 'select-bool';
            
            item.innerHTML = `
                <label>${key}</label>
                ${generateInputHtml(key, value, fieldConfig)}
            `;
            advGrid.appendChild(item);
        });

        container.appendChild(advZone);
    }
}

/**
 * Helper pour créer les inputs HTML
 */
function generateInputHtml(key, value, config) {
    const safeValue = String(value).replace(/"/g, '&quot;');
    
    if (config.type === 'switch' || config.type === 'select-bool') {
        const isChecked = (String(value) === 'true');
        return `
            <select class="styled-select" data-key="${key}" style="background-color: var(--bg-primary);">
                <option value="true" ${isChecked ? 'selected' : ''}>Activé (True)</option>
                <option value="false" ${!isChecked ? 'selected' : ''}>Désactivé (False)</option>
            </select>
        `;
    }
    
    if (config.type === 'select') {
        const optionsHtml = config.options.map(opt => 
            `<option value="${opt}" ${String(value) === opt ? 'selected' : ''}>${opt.charAt(0).toUpperCase() + opt.slice(1)}</option>`
        ).join('');
        return `<select class="styled-select" data-key="${key}" style="background-color: var(--bg-primary);">${optionsHtml}</select>`;
    }
    
    if (config.type === 'number') {
        return `<input type="number" class="styled-input" data-key="${key}" value="${safeValue}" style="background-color: var(--bg-primary);">`;
    }

    // Par défaut : Texte
    return `<input type="text" class="styled-input" data-key="${key}" value="${safeValue}" placeholder="${config.placeholder || ''}" style="background-color: var(--bg-primary);">`;
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
        showAlert('Recherche', 'Veuillez écrire un nom de mod.');
        return;
    }

    // Affichage chargement
    DOM.addonResultsList.innerHTML = '<p style="color:#777; text-align:center; padding: 20px;"><i class="fas fa-spinner fa-spin"></i> Recherche sur Modrinth...</p>';
    DOM.btnAddonSearch.disabled = true;

    // --- CORRECTION : On envoie un filtre VIDE pour la version ---
    // Cela permet de tout trouver (comportement d'avant)
    const filters = {
        type: DOM.addonTypeFilter.value,
        version: null // On ne filtre plus la version ici !
    };

    try {
        const result = await window.api.searchAddons(query, filters);
        if (result.success) {
            renderAddonResults(result.hits);
        } else {
            DOM.addonResultsList.innerHTML = `<p style="color:#e74c3c; text-align:center; padding: 20px;">Erreur : ${result.error}</p>`;
        }
    } catch (e) {
        DOM.addonResultsList.innerHTML = `<p style="color:#e74c3c; text-align:center; padding: 20px;">Erreur : ${e.message}</p>`;
    }

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

// ==================================================================
//  LOGIQUE COMPLETE DU WIZARD (NAVIGATION + CHOIX + SUIVANT)
// ==================================================================

// 1. Démarrage du processus (Remplace toute autre définition précédente)
function prepareNewServerCreation() {
    // Reset visuel
    if (DOM.currentServerName) {
        DOM.currentServerName.innerHTML = '<i class="fas fa-plus"></i> Nouveau Serveur';
        DOM.currentServerName.style.color = "var(--text-secondary)";
    }
    if (DOM.serverFolder) DOM.serverFolder.value = '';
    if (DOM.serverName) DOM.serverName.value = '';
    // Reset image
    if (DOM.serverIconPreview) DOM.serverIconPreview.src = DEFAULT_ICON;
    
    STATE.isCrossPlay = false;

    // Activer le mode Wizard
    STATE.wizardActive = true;
    STATE.wizardStepsVisited.clear();
    STATE.wizardStepsVisited.add('config');

    // Gestion des boutons
    if(DOM.btnSave) DOM.btnSave.style.display = 'none';
    if(DOM.btnWizardNext) {
        DOM.btnWizardNext.style.display = 'flex';
        updateWizardButton('config');
    }

    // Aller sur l'onglet config
    const configTabBtn = document.querySelector('[data-tab="config"]');
    if (configTabBtn) configTabBtn.click();

    // AFFICHER L'ÉCRAN DE CHOIX
    const configTab = document.getElementById('config');
    const choiceScreen = document.getElementById('wizard-choice-screen');
    
    if (configTab && choiceScreen) {
        // Cacher les enfants directs sauf le choice screen
        Array.from(configTab.children).forEach(child => {
            if(child.id !== 'wizard-choice-screen') child.style.display = 'none';
        });
        choiceScreen.style.display = 'flex';
        
        // Attachement des clics sur les cartes
        const btnJava = document.getElementById('btn-wizard-java');
        const btnCross = document.getElementById('btn-wizard-cross');
        // On utilise onclick pour éviter d'empiler les listeners si on ouvre plusieurs fois
        if (btnJava) btnJava.onclick = () => selectWizardMode('java');
        if (btnCross) btnCross.onclick = () => selectWizardMode('crossplay');
    }
    
    // Désactiver Start pendant la config
    if (DOM.btnStart) DOM.btnStart.disabled = true;
    if (DOM.statusText) DOM.statusText.textContent = 'Configuration...';
}

// 2. Choix du mode
function selectWizardMode(mode) {
    const configTab = document.getElementById('config');
    const choiceScreen = document.getElementById('wizard-choice-screen');

    // Cacher l'écran de choix
    if (choiceScreen) choiceScreen.style.display = 'none';

    // Réafficher le formulaire
    Array.from(configTab.children).forEach(child => {
        if (child.id !== 'wizard-choice-screen') {
            child.style.display = 'block'; 
        }
    });

    // Appliquer le choix
    if (mode === 'crossplay') {
        STATE.isCrossPlay = true;
        selectServerType('paper');
        window.MCServerManager.showAlert("Mode Cross-Play", "Configuration auto : PaperMC + Geyser.");
    } else {
        STATE.isCrossPlay = false;
        selectServerType('vanilla');
    }
}

// 3. Logique du bouton "SUIVANT"
function handleWizardNextStep() {
    // 1. Identifier l'étape actuelle
    const activeTab = document.querySelector('.tab-content.active');
    if (!activeTab) return;
    
    const currentTabId = activeTab.id; 
    let nextTabId = '';

    // 2. Logique de validation et navigation
    switch (currentTabId) {
        case 'config':
            // --- VALIDATION STRICTE ---
            const folderVal = DOM.serverFolder.value ? DOM.serverFolder.value.trim() : '';
            const nameVal = DOM.serverName.value ? DOM.serverName.value.trim() : '';

            // Si vide, on HURLE (Alerte) et on ARRÊTE (return)
            if (!folderVal) {
                showAlert("Action impossible", "Vous devez sélectionner un dossier d'installation.");
                return; 
            }
            if (!nameVal) {
                showAlert("Action impossible", "Vous devez donner un nom à votre serveur.");
                return;
            }

            // Si tout est bon, on sauvegarde SILENCIEUSEMENT (true)
            saveServerConfig(true); 
            
            // On valide l'étape et on prépare la suite
            STATE.wizardStepsVisited.add('config');
            nextTabId = 'performance';
            break;

        case 'performance':
            STATE.wizardStepsVisited.add('performance');
            nextTabId = 'backups';
            break;

        case 'backups':
            STATE.wizardStepsVisited.add('backups');
            const type = STATE.selectedServerType || 'vanilla';
            // Si Vanilla, on saute l'étape Addons
            if (type === 'vanilla') {
                nextTabId = 'worlds';
            } else {
                nextTabId = 'addons';
            }
            break;

        case 'addons':
            STATE.wizardStepsVisited.add('addons');
            nextTabId = 'worlds';
            break;

        case 'worlds':
            finishWizard();
            return; 
    }

    // 3. Changement d'onglet
    if (nextTabId) {
        const targetBtn = document.querySelector(`[data-tab="${nextTabId}"]`);
        if (targetBtn) {
            targetBtn.click();
            updateWizardButton(nextTabId);
        } else {
            // Fallback de sécurité
            console.error("Onglet introuvable:", nextTabId);
            if (nextTabId === 'worlds') finishWizard();
        }
    }
}

function updateWizardButton(stepId) {
    if (!DOM.btnWizardNext) return;
    
    DOM.btnWizardNext.disabled = false;
    DOM.btnWizardNext.style.display = 'flex';

    if (stepId === 'worlds') {
        DOM.btnWizardNext.innerHTML = '<span>Lancer l\'installation</span> <i class="fas fa-check"></i>';
        DOM.btnWizardNext.style.background = '#2196F3';
    } else {
        DOM.btnWizardNext.innerHTML = '<span>Étape Suivante</span> <i class="fas fa-arrow-right"></i>';
        DOM.btnWizardNext.style.background = 'var(--primary-color)';
    }
}

// 4. Installation Finale
async function finishWizard() {
    console.log("🚀 Démarrage de finishWizard...");

    const config = getServerConfig();
    const installOptions = {
        name: config.name,
        path: config.folderPath,
        version: config.versionId,
        type: config.type,
        isCrossPlay: STATE.isCrossPlay
    };

    // Feedback
    if (DOM.btnWizardNext) {
        DOM.btnWizardNext.disabled = true;
        DOM.btnWizardNext.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Installation...';
    }
    
    // Force Dashboard
    const dashBtn = document.querySelector('[data-tab="dashboard"]');
    if (dashBtn) dashBtn.click();
    
    if (DOM.statusText) DOM.statusText.textContent = "Installation en cours...";

    try {
        // APPEL MAIN PROCESS
        const result = await window.api.installServer(installOptions);

        if (result.success) {
            window.MCServerManager.showAlert("Succès", "Installation terminée ! Démarrage imminent...");
            
            // Mise à jour état
            STATE.wizardActive = false;
            if (DOM.btnWizardNext) DOM.btnWizardNext.style.display = 'none';
            if (DOM.btnSave) DOM.btnSave.style.display = 'block';

            if (DOM.btnStart) {
                DOM.btnStart.disabled = false;
                DOM.btnStart.textContent = 'LANCER LE SERVEUR';
            }
            if (DOM.statusText) DOM.statusText.textContent = 'Prêt';
            if (DOM.statusDot) DOM.statusDot.className = 'dot red';

            // IMPORTANT : On recharge et on sélectionne pour remplir les inputs
            await loadSavedServers(config.folderPath);
            
            selectServer({
                name: config.name,
                path: config.folderPath,
                version: config.versionId, // L'ID suffit souvent
                type: config.type,
                // On force l'URL si Vanilla pour éviter le bug "URL manquante"
                versionUrl: config.versionUrl 
            });

            // Délai de sécurité avant lancement auto
            console.log("🚀 Lancement automatique dans 1.5s...");
            setTimeout(() => {
                startServer();
            }, 1500);

        } else {
            throw new Error(result.error || "Erreur inconnue.");
        }

    } catch (e) {
        console.error("❌ Erreur finishWizard :", e);
        window.MCServerManager.showAlert("Échec", e.message);
        if (DOM.statusText) DOM.statusText.textContent = "Erreur Install";
        if (DOM.btnWizardNext) {
            DOM.btnWizardNext.disabled = false;
            DOM.btnWizardNext.innerHTML = '<span>Réessayer</span> <i class="fas fa-redo"></i>';
        }
        if (DOM.btnStart) DOM.btnStart.disabled = false;
    }
}