// playlists with tracks
var playlists_dic = {}

// init deezer service object
var deezer = service.factory('deezer');
deezer.init();

// init spotify service object
var spotify = service.factory('spotify');
spotify.init();


$(document).ready(function(){
    $("#login_deezer_btn").click(function(){
		deezer.login();
    });
    $("#export_deezer_btn").click(function(){
		deezer.export();
    });
    $("#login_spotify_btn").click(function(){
		spotify.login();
    });
    $("#export_spotify_btn").click(function(){
		spotify.export();
    });
});
