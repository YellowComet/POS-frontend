// preload.js
const { contextBridge, ipcRenderer } = require('electron');

// Exponer una API segura al renderizador
contextBridge.exposeInMainWorld('api', {
  send: (channel, data) => {
    // restringir los canales que pueden ser utilizados
    let validChannels = ['toMain'];
    if (validChannels.includes(channel)) {
      ipcRenderer.send(channel, data);
    }
  },
  receive: (channel, func) => {
    let validChannels = ['fromMain'];
    if (validChannels.includes(channel)) {
      // del canal al frontend
      ipcRenderer.on(channel, (event, ...args) => func(...args));
    }
  }
});