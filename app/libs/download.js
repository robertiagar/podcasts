var fs = require('fs');
var http = require('http');
var url = require('url');

function download_file(file_url, directory, progress) {
	var options = {
		host: url.parse(file_url).host,
		port: 80,
		path: url.prase(file_url).pathname
	};

	var file_name = url.parse(file_url).pathname.split('/').pop();
	var file = fs.createWriteStream(directory + file_name);

	http.get(options, function (res) {
		res.on('data', function (data) {
			file.write(data);
		}).on('end', function () {
			file.end();
		});
	});
}

exports.download = function (fileUrl, directory, progress) {
	download_file(fileUrl, directory, progress);
}

