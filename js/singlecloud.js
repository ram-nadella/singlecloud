!(function (document, window, $, undefined) {
	$(function() {

		SC.initialize({
		    client_id: "40286ff4d20dba7d7755e3d8bab929e7",
		    redirect_uri: "http://singlecloud.toughtype.com/callback",
		});

		var SingleCloudRouter = Backbone.Router.extend({
			routes: {
				'tracks/:trackId/(:trackText)': "playTrack"
			},

			playTrack: function(trackId, trackText) {
				SC.get('/tracks/' + trackId, function(track) {
					var trackUrl = track.permalink_url;
					embedSongAndPlay(trackUrl);
				});
			}
		});

		var router = new SingleCloudRouter();

		Backbone.history.start({pushState: false});

		var embedSongAndPlay = function(songUrl) {

		    SC.oEmbed(
		        songUrl,
		        {
		            auto_play: true,
		            hide_related: true,
		            show_comments: false,
		            show_user: false,
		            show_reposts: false,
		            visual: false
		        },
		        function(oembed) {
		            $("#embed").html(oembed.html);
		    });

			SC.get('/resolve', { url: songUrl }, function(track) {
				var trackId = track.id;
				var url = generateUrlFromTrackInfo(track);
				router.navigate(url);
			});

		};

		var generateUrlFromTrackInfo = function(track) {
			var trackId = track.id;
			var trackText = track.permalink;
			return ["tracks", trackId, trackText].join("/");
		};

		// TODO: add validation & error handling
		$("#find").click(function(e) {
		    var songUrl = $("#song_url").val();
		    embedSongAndPlay(songUrl);
		});

		$("#song_url").keypress(function(e) {
		    if (e.which == 13) {
		        var songUrl = $("#song_url").val();
		        embedSongAndPlay(songUrl);
		    }
		});

		$("#song_url").focus(function(e) {
		    $("#song_url").select();
		});

		// TODO: for search
		// SC.get("/tracks", {q: "Nils Frahm"}, function(tracks) {
		//     console.log(tracks);
		// });

		// SC.oEmbed(
		//     "http://soundcloud.com/forss/flickermood",
		//     {
		//         auto_play: true,
		//         hide_related: true,
		//         show_comments: false,
		//         show_user: false,
		//         show_reposts: false,
		//         visual: false
		//     },
		//     function(oembed) {
		//         console.log("oEmbed response: ", oembed);
		//         $("#embed").html(oembed.html);
		//
		// });

	});
})(document, window, jQuery);
