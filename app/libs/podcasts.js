var download = require('./download');
//var directories = require('./directories');
var podcast = require('./podcast');
var podcastsList = [];
var events = {}

function addPodcast(podcast) {
	podcastsList.push(podcast);
	if (events['added'] !== null){
		console.log('before added');
		events['added'](podcast);
		console.log('after added');
	}
}

function getPodcast(podcastLink) {
	podcast.on('done', function (podcast) {
		console.log(podcast);
		addPodcast(podcast);
	})

	podcast.get(podcastLink);
}

function search(nameKey, myArray) {
    for (var i = 0; i < myArray.length; i++) {
        if (myArray[i].guid === nameKey) {
            return myArray[i];
        }
    }
}

exports.add = function (podcastLink) {
	getPodcast(podcastLink);
}

exports.podcasts = podcastsList;

exports.on = function (eventName, callback) {
	events[eventName] = callback;
}

exports.downloadEpisode = function (episodeGuid) {
	var episode = search(episodeGuid, podcastsList);
	var downloadPath = "path";
	download.download(episode.enclosure.url, downloadPath);
}