function connect() {
    const ip = document.getElementById('ip-input').value;
    if (ip) {
        document.getElementById('home-screen').style.display = 'none';
        document.getElementById('web-screen').style.display = 'block';
        document.getElementById('app-frame').src = ip;
    }
}

function disconnect() {
    document.getElementById('home-screen').style.display = 'flex';
    document.getElementById('web-screen').style.display = 'none';
    document.getElementById('app-frame').src = '';
}
