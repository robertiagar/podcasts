const electron = require('electron');
// Module to control application life.
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
var storage = require("./libs/storage");
var podcast = require("./libs/podcast");

var mainWindow = null;

app.on('window-all-close', function () {
	if (process.platform != 'darwin')
		app.quit();
});

app.on('ready', function () {
	var lastWindowState = storage.get("lastWindowState");
	if (lastWindowState === null) {
		lastWindowState = {
			width: 1280,
			height: 720,
			maximized: false
		}
	}

	mainWindow = new BrowserWindow({
		width: lastWindowState.width,
		height: lastWindowState.height,
		x: lastWindowState.x,
		y: lastWindowState.y
	});

	if (lastWindowState.maximized) {
		mainWindow.maximize();
	}

	mainWindow.loadURL('file://' + __dirname + '/index.html');

	mainWindow.on('close', function () {
		var bounds = mainWindow.getBounds();
		storage.set("lastWindowState", {
			x: bounds.x,
			y: bounds.y,
			width: bounds.width,
			height: bounds.height,
			maximized: mainWindow.isMaximized()
		});
	});

	

	mainWindow.on('closed', function () {
		mainWindow = null;
	});
});