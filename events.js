// playlists with tracks
var playlists_dic = {}

// deezer service object
var deezer = service.factory('deezer');
deezer.init();

$(document).ready(function(){
    $("#login_btn").click(function(){
		deezer.login();
    });
	$("#export_btn").click(function(){
		deezer.export('test');
    });
});
