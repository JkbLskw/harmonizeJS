function show_playlists_btn(){
	$(".hidden_btn").show();
}

function show_playlists(playlists){
	clear_playlists();
	playlists.forEach(append_playlist);
}

function show_tracks(track_list, playlist_id){
	clear_tracks();
	for (var i = 0; i < track_list.length; i++){
		append_track(track_list[i], playlist_id);
	}
}

function clear_playlists(){
	$('#playlist_list').empty();
}

function clear_tracks(){
	$('.track_list').empty();
}

function append_playlist(playlist){
	var playlist_holder = $('<li>').text(playlist.title).attr({'id':playlist.id, 'class':'playlist'}).append($('<ul>').attr({'id':'tracklist_' + playlist.id, 'class':'tracklist'}));
	$('#playlist_list').append(playlist_holder);
}

function append_track(track, playlist_id){
	var track_holder = $('<li>').attr('id', track.id).text(track.title);
	$('#tracklist_' + playlist_id).append(track_holder);
}