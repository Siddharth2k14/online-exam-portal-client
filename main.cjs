const path = require('path');
const { app, BrowserWindow } = require("electron");

function createWindow() {
    const win = new BrowserWindow({
        width: 1400,
        height: 900,
        autoHideMenuBar: true,

        icons: path.join(__dirname, "assets/ExamPortalLogo.png")
    });

    win.loadURL("https://online-exam-portal-client.vercel.app/");
}

app.whenReady().then(createWindow);