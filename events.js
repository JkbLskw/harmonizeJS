$(document).ready(function(){
    $("#login_btn").click(function(){
		login_deezer();
    });
	$("#playlists_btn").click(function(){
		get_playlists();
    });
	$("#data").on('click', 'button.playlist', function(){
		var id = $(this).attr('id');
		get_tracks_by_playlist(id);
    });
});