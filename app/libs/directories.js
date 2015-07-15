var path = require('path');
var storage = require('./storage');

function get(folderName) {
	var folderPath = storage.get(folderName);
	return folderPath;
}

function set(folderName, folderPath) {
	var path = path.normalize(folderPath);
	storage.set(folderName, folderPath);
}

exports.getFolderPath = function (folderName) {
	get(folderName);
}

exports.setFolderPath = function (folderName, folderPath) {
	set(folderName, folderPath);
}

exports.getDownloadsFolderPath = function () {
	get("Downloads");
}

exports.setDownloadsFolderPath = function (folderPath) {
	set("Downloads", folderPath);
}