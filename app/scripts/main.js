$(document).ready(function () {
	var podcasts = require('./libs/podcasts');
	var $podcasstList = $("#podcasts");
	var $podcastItems = $("#podcast-items");

	podcasts.on('added', function (podcast) {
		var value = podcast;
		console.log(value.title);
		
		//<li><a href="">Hospital Records Podcast</a></li>
		var $title = $("<li>").append($("<a>").attr("href", value.link).text(value.title));
		$podcasstList.append($title);

		var $div = $('<div>').text(value.title);
		var $ul = $('<ul>');

		value.items.forEach(function (value, index) {
			/*<div class="media">
			  <div class="media-left">
				<a href="#">
				  <img class="media-object" src="..." alt="...">
				</a>
			  </div>
			  <div class="media-body">
				<h4 class="media-heading">Media heading</h4>
				...
			  </div>
			</div>*/

			/*<audio controls>
			  <source src="horse.ogg" type="audio/ogg">
			  <source src="horse.mp3" type="audio/mpeg">
			Your browser does not support the audio element.
			</audio>*/

			console.log(value);
			console.log(value.image);
			var $media = $("<div class='media'>");
			var $mediaLeft = $("<div class='media-left'>").append(
				$("<a>").attr('href', value.link).append(
					$("<img class='media-object'>").attr('src', value.image.url).attr('alt', value.image.title).attr('height', 64)
					)
				);
			var $mediaBody = $("<div class='media-body'>").append(
				$("<h4 class='media-heading'>").text(value.title)
				).append(
					$("<audio controls>").append(
						$("<source>").attr("src", value.enclosure.url)
						)
					);
			$media.append($mediaLeft).append($mediaBody);
			$podcastItems.append($media);
			//$ul.append($item);
		});
		$div.append($ul);
	});

	$('#addButton').click(function () {
		var feedUrl = $("#feedUrl").val();
		podcasts.add(feedUrl);
	});
});