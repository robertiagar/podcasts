var FeedParser = require('feedparser');
var request = require('request');
var events = {};
var podcast = {};
var items = null;

function getPodcast(feedLink) {
	items = [];
	var req = request(feedLink, { timeout: 10000, pool: false });
	req.setMaxListeners(50);
	req.setHeader('user-agent', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_8_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/31.0.1650.63 Safari/537.36');
	req.setHeader('accept', 'text/html,application/xhtml+xml');

	var parser = new FeedParser();

	req.on('error', done);
	req.on('response', function (res) {
		if (res.statusCode != 200) return this.emit('error', new Error('Bad status code'));
		res.pipe(parser);
	});

	parser.on('eror', done);
	parser.on('end', done);
	parser.on('readable', function () {
		var item;
		var meta = this.meta;
		podcast = {
			title: meta.title,
			description: meta.description,
			link: meta.link,
			author: meta.author,
			image: meta.image
		}
		while (item = this.read()) {
			var episode = {
				title: item.title,
				summary: item.summary,
				permalink: item.permalink,
				guid: item.guid,
				enclosure: item.enclosures[0],
				image: item.image,
				date: item.date
			};
			items.push(episode);
		}
		items = items.sort(function(a,b){
			console.log(a.date);
			console.log(b.date);
			if(a.date<b.date)
				return 1;
			else if(a.date>b.date)
				return -1;
			else
				return 0;
		});
	})
}

function done(err) {
	if (err) {
		console.log(err, err.stack);
	}

	podcast.items = items;

	if (events['done'] !== null) {
		events['done'](podcast);
	}
}

exports.get = function (feedLink) {
	getPodcast(feedLink);
}

exports.on = function (eventName, callback) {
	events[eventName] = callback;
}

exports.Podcast = function () {
	return podcast;
}