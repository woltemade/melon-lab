require('dotenv-extended').config();

const { format } = require('url');
const path = require('path');
const { BrowserWindow, app } = require('electron');
const isDev = require('electron-is-dev');
const prepareNext = require('electron-next');

// Prepare the renderer once the app is ready.
app.on('ready', async () => {
  // Since electron is hoisted to the workspace, this path is relative
  // to the workspace root.
  await prepareNext('./packages/manager-interface/src', process.env.PORT);

  const mainWindow = new BrowserWindow({
    width: 1024,
    height: 800,
  });

  const devPath = `http://localhost:${process.env.PORT}/`;

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
