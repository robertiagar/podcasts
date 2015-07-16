$(document).ready(function () {
	var podcasts = require('./libs/podcasts');

	podcasts.on('added', function (podcast) {
		var value = podcast;
		console.log(value.title);
		var $div = $('<div>').text(value.title);
		var $ul = $('<ul>');

		value.items.forEach(function (value, index) {
			var $item = $('<li>').text(value.title);
			$ul.append($item);
		});
		$div.append($ul);

		var $li = $('<li>').html($div);
		$("#list").append($li);
	});

	$('#click').click(function () {
		var feedUrl = $("#feedurl").val();
		podcasts.add(feedUrl);
	});
});