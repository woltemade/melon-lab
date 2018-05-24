require('dotenv-extended').config();

import electron from 'electron';
import debug from 'electron-debug';
import isDev from 'electron-is-dev';
import http from 'http';
import next from 'next';
import path from 'path';
import url from 'url';
import startServer from './server';

const isWindows = process.platform === 'win32';
const isMac = process.platform === 'darwin';

debug({ enabled: true, showDevTools: true });

const appUrl = async () => {
  if (!isDev) {
    return url.format({
      pathname: 'index.html',
      protocol: 'file:',
      slashes: true,
    });
  }

  const app = next({
    dev: true,
    // TODO: Figure out the proper path.
    dir: path.resolve('...'),
  });

  await app.prepare();

  const server = http.createServer(app.getRequestHandler());

  server.listen(3000, () => {
    // Make sure to stop the server when the app closes
    // Otherwise it keeps running on its own
    electron.app.on('before-quit', () => server.close());
  });
};

let mainWindow;
const restoreMainWindow = async () => {
  startServer();

  mainWindow = new electron.BrowserWindow({
    width: 1024,
    height: 800,
    webPreferences: {
      // TODO: Figure out a way to disable this.
      nodeIntegration: true,
      preload: path.resolve(__dirname, 'preload.js'),
    },
  });

  mainWindow.loadURL(await appUrl());

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
};

electron.app.on('window-all-closed', () => {
  if (!isMac) {
    electron.app.quit();
  }
});

electron.app.on('activate', () => {
  if (!mainWindow) {
    restoreMainWindow();
  }
});

electron.app.on('ready', () => {
  if (!isDev) {
    electron.protocol.interceptFileProtocol('file', (request, callback) => {
      const reqUrl = request.url.substr(isWindows ? 8 : 7);
      const reqUrlFinal = isWindows
        ? reqUrl.replace(path.parse(reqUrl).root, '')
        : reqUrl;

      callback(path.normalize(path.join(__dirname, reqUrlFinal)));
    });
  }

  restoreMainWindow();
});
