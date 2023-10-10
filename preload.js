const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("electronAPI", {
  copyToClipboard: (text) => {
    ipcRenderer.send("copy-to-clipboard", text);
  },
});
