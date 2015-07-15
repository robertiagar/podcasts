$(document).ready(function () {
	var podcasts = require('./libs/podcasts');

	podcasts.on('added', function () {
		console.log(podcasts.podcasts);
		podcasts.podcasts.forEach(function (value, index) {
			console.log(value.title);
			var $li = $('<li>').text(value.title);
			$("#list").append($li);
		})
	});

	$('#click').click(function () {
		var feedUrl = $("#feedurl").val();
		podcasts.add(feedUrl);
	});
});