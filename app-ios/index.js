let html5QrCode;

function connect(ipAddress) {
    const ip = ipAddress || document.getElementById('ip-input').value;
    if (ip) {
        document.getElementById('home-screen').style.display = 'none';
        document.getElementById('scan-screen').style.display = 'none';
        document.getElementById('web-screen').style.display = 'block';
        document.getElementById('app-frame').src = ip;
    }
}

function disconnect() {
    document.getElementById('home-screen').style.display = 'flex';
    document.getElementById('web-screen').style.display = 'none';
    document.getElementById('app-frame').src = '';
}

async function startScan() {
    document.getElementById('home-screen').style.display = 'none';
    document.getElementById('scan-screen').style.display = 'flex';
    
    html5QrCode = new Html5Qrcode("reader");
    const config = { fps: 10, qrbox: { width: 250, height: 250 } };

    try {
        await html5QrCode.start({ facingMode: "environment" }, config, (decodedText) => {
            stopScan();
            connect(decodedText); // Connecte automatiquement avec l'IP du QR Code
        });
    } catch (err) {
        alert("Erreur caméra : " + err);
        stopScan();
    }
}

function stopScan() {
    if (html5QrCode) {
        html5QrCode.stop().then(() => {
            document.getElementById('scan-screen').style.display = 'none';
            document.getElementById('home-screen').style.display = 'flex';
        }).catch(err => console.log(err));
    } else {
        document.getElementById('scan-screen').style.display = 'none';
        document.getElementById('home-screen').style.display = 'flex';
    }
}
