require('dotenv-extended').config();

import { app, BrowserWindow } from 'electron';
import isDev from 'electron-is-dev';
import prepareNext from 'electron-next';
import path from 'path';
import { format } from 'url';
import startServer from './server';

app.on('ready', async () => {
  // The graphql server runs via an ipc transport. There is no
  // asynchronous bootstrap necessary.
  startServer();

  // Since electron is hoisted to the workspace, this path is relative
  // to the workspace root.
  await prepareNext('./packages/manager-interface/src', 3000);

  const mainWindow = new BrowserWindow({
    width: 1024,
    height: 800,
    webPreferences: {
      nodeIntegration: false,
      preload: path.resolve(__dirname, 'preload.js')
    },
  });

  const devPath = `http://localhost:3000/`;

  const prodPath = format({
    pathname: path.resolve(process.cwd(), 'export', 'index.html'),
    protocol: 'file:',
    slashes: true,
  });

  const url = isDev ? devPath : prodPath;
  mainWindow.loadURL(url);
});

// Quit the app once all windows are closed.
app.on('window-all-closed', app.quit);
