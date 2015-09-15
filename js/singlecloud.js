!(function (document, window, $, undefined) {
	$(function() {

		SC.initialize({
		    client_id: "40286ff4d20dba7d7755e3d8bab929e7",
		    redirect_uri: "http://singlecloud.toughtype.com/callback",
		});

		var SingleCloudRouter = Backbone.Router.extend({
			routes: {
				'tracks/:trackId': "playTrack"
			},

			playTrack: function(trackId) {
				SC.get('/tracks/' + trackId, function(track) {
					var trackUrl = track.permalink_url;
					embedSongAndPlay(trackUrl);
				});
			}
		});

		var router = new SingleCloudRouter();

		Backbone.history.start({pushState: true})

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
				console.log(track);
				router.navigate("tracks/" + trackId);
			});

		};

		// TODO: add validation & error handling
		$("#find").click(function(e) {
		    var songUrl = $("#song_url").val();
		    embedSongAndPlay(songUrl);
		});

		$("#song_url").keypress(function(e) {
		    console.log("event");
		    if (e.which == 13) {
		        console.log("event");
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
