const electron = require('electron');
const app = electron.app;  // Модуль контролирующей жизненый цикл нашего приложения.
const BrowserWindow = electron.BrowserWindow;  // Модуль создающий браузерное окно.
var dialog = require('electron').dialog;
yaml = require('js-yaml');
fs = require('fs');

var mainWindow = null;
app.on('window-all-closed', function() {
  if (process.platform != 'darwin') {
    app.quit();
  }
});

app.on('ready', function() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    }
  });

  mainWindow.loadURL('file://' + __dirname + '/index.html');

  // // Открываем DevTools.
  mainWindow.webContents.openDevTools();

  // Этот метод будет выполнен когда генерируется событие закрытия окна.
  mainWindow.on('closed', function() {
    mainWindow = null;
  });
});

const { ipcMain } = require('electron')

ipcMain.on('main-data', (event, arg) => {
  console.log(arg)
  var filePath = dialog.showOpenDialogSync(mainWindow, {
    title: "Open Pain",
    properties: ['openFile', 'showHiddenFiles '],
    filters: [
      {name: 'JavaScripn', extensions: ['js']},
      {name: 'Yaml', extensions: ['yaml', 'yml']},
      {name: 'JSON', extensions: ['json']},
      {name: 'all', extensions: ['*']}
    ]
  }
  );
  const data = yaml.safeLoad(fs.readFileSync(filePath[0], 'utf8'));
  console.log(JSON.stringify(data, undefined, 2))
  event.returnValue = data;
})