// playlists with tracks
var playlist_hashtable = {}

//initialize deezer javascript sdk
window.dzAsyncInit = function() {
	DZ.init({
		appId  : '277182',
		channelUrl : 'http://localhost/harmonizeJS/'
	});
	console.log('DZ initialized');
};

// login to deezer-api
function login_deezer() {
	DZ.login(function(response) {
		if (response.authResponse) {
			console.log('Token: ' + response.authResponse.accessToken);
			show_playlists_btn();
		} else {
			console.log('User cancelled login or did not fully authorize.');
		}
	}, {perms: 'basic_access, manage_library'});
}

// get user playlists from deezer-api
function get_playlists() {
	DZ.api('/user/me/playlists', function(response) {
		// put playlist-titles with empty value to hashtable
		var playlists = response.data;
		for (var i = 0; i < playlists.length; i++){
			var current_playlist = playlists[i];
			playlist_hashtable[current_playlist.title] = []
			get_tracks_by_playlist(current_playlist)
		}
		// show playlists as button-list in html
		console.log(playlists);
		show_playlists(playlists);
	});
}

// get tracks of a playlist from deezer-api
function get_tracks_by_playlist(current_playlist){
	var local_playlist_id = current_playlist.id;
	DZ.api('/playlist/' + local_playlist_id + '/tracks', function(response) {
		var tracks = response.data;
		var tracklist = [];
		for (var i = 0; i < tracks.length; i++){
			var track = [tracks[i].title, tracks[i].artist.name];
			tracklist.push(track)
		}
		playlist_hashtable[current_playlist.title] = tracklist;
		// show tracks as list in html
		show_tracks(tracks, local_playlist_id);
		console.log(tracks);
	});

	console.log(playlist_hashtable);
}
