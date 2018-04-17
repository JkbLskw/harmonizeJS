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
	var playlist_holder = $('<div>').attr({'class':'playlist_holder'});
	var playlist_image = $('<img>').attr({'src':playlist.picture, 'alt':playlist.title});
	var playlist_title = $('<h2>').text(playlist.title).attr({'id':playlist.id, 'class':'playlist'});
	var playlist_image_title_holder = $('<div>').attr({'display':'inline'});
	var tracklist_element = $('<ul>').attr({'id':'tracklist_' + playlist.id, 'class':'tracklist'})
	playlist_image_title_holder.append(playlist_image).append(playlist_title)
	playlist_holder.append(playlist_image_title_holder).append(tracklist_element);
	$('#playlist_list').append(playlist_holder);
}

function append_track(track, playlist_id){
	var track_holder = $('<li>').attr('id', track.id).text(track.title);
	$('#tracklist_' + playlist_id).append(track_holder);
}