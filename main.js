const {
  app,
  BrowserWindow,
  protocol,
  clipboard,
  ipcMain,
  screen,
} = require("electron");
const Store = require("electron-store");
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

const store = new Store();

function createWindow() {
  protocol.handle("app", (request, callback) => {
    const url = request.url.substr(7);
    callback({ path: path.normalize(`${__dirname}/${url}`) });
  });

  const screenWidth = screen.getPrimaryDisplay().workAreaSize.width;
  const screenHeight = screen.getPrimaryDisplay().workAreaSize.height;
  const winWidth = Math.floor(screenWidth * 0.75);
  const winHeight = Math.floor(screenHeight * 0.85);

  const winBounds = store.get("winBounds", {
    width: winWidth,
    height: winHeight,
  });

  const win = new BrowserWindow({
    ...winBounds,
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

  win.on("close", () => {
    store.set("winBounds", win.getBounds());
  });
}

app.whenReady().then(createWindow);
