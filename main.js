const {
  app,
  BrowserWindow,
  protocol,
  clipboard,
  ipcMain,
} = require("electron");
const path = require("node:path");

const isDev = !app.isPackaged;

const servePath = isDev
  ? "./frontend/dist/index.html"
  : "./frontend/dist/index.html";

const preloadPath = isDev
  ? path.join(__dirname, "./preload.js")
  : path.join(__dirname, "../app.asar.unpacked/preload.js");

ipcMain.on("copy-to-clipboard", (event, text) => {
  clipboard.writeText(text);
});

function createWindow() {
  protocol.handle("app", (request, callback) => {
    const url = request.url.substr(7);
    callback({ path: path.normalize(`${__dirname}/${url}`) });
  });

  const win = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      contextIsolation: true,
      nodeIntegration: false,
      preload: preloadPath,
      icon: "assets/icons/main.svg",
    },
  });

  win.setMenuBarVisibility(false);
  win.loadFile(servePath);

  // win.webContents.openDevTools();
}

app.whenReady().then(createWindow);
