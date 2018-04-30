var service = {}
service.deezer = function(){
  this.init = function () {
    // initialize deezer javascript sdk
    DZ.init({
  		appId  : '277182',
  		channelUrl : 'http://localhost/harmonizeJS/'
  	});
  	console.log('deezer initialized');
  }
  this.login = function (){
    // login to deezer-api
    DZ.login(function(response) {
  		if (response.authResponse) {
  			console.log('Token: ' + response.authResponse.accessToken);
  			show_playlists_btn();
  		} else {
  			console.log('User cancelled login or did not fully authorize.');
  		}
  	}, {perms: 'basic_access, manage_library'});
  }
  this.sync = function (other){
    console.log('not implemented yet')
  }
  this.export = function (type){
    var get_playlists = function(){
      var playlists = [];
      return new Promise(function(resolve, reject){
        // get all playlists from user
        DZ.api('/user/me/playlists', function(response) {
          // put playlist-titles with empty value to hashtable
          var raw_playlists = response.data;
          // iterate all playlists and init them
          for (var playlist_key in raw_playlists){
            var playlist = raw_playlists[playlist_key];
            playlists.push({'name':playlist.title, 'id':playlist.id, 'track_count':playlist.nb_tracks});
          }
          resolve(playlists);
        });
      });
    }
    var get_tracks = function(playlist){
      return new Promise(function(resolve, reject){
        // get all tracks from playlist and writes them into the given dictionary
        DZ.api('/playlist/' + playlist.id + '/tracks', function(response) {
          var tracks = response.data;
          var simplified_tracks = [];
          // simplify tracks and list them
          for (var track_key in tracks){
            var track = tracks[track_key];
            var simplified_track = {'title':track.title, 'artist':track.artist.name};
            simplified_tracks.push(simplified_track)
          }

          // writing simplified tracklist to dictionary
          playlist['track_data'] = simplified_tracks;
          resolve(playlist);
        });
      });
    }
    var download = function(data){
      var element = document.createElement('a');
      data = JSON.stringify(data);
      element.setAttribute('href', 'data:application/json;charset=utf-8,' + encodeURIComponent(data));
      element.setAttribute('download', 'export.json');
      element.style.display = 'none';
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);
    }

    var data = {};
    console.log('export start');

    let playlist_promise = get_playlists();
    playlist_promise.then(function(value){
        var playlists = value;
        var track_promises = [];
        for(var playlist_key in playlists){
          var playlist = playlists[playlist_key];
          track_promises.push(get_tracks(playlist));
        }
        Promise.all(track_promises).then(function(playlists){
          data['playlist_count'] = playlists.length;
          data['playlist_data'] = playlists;
          download(data);
        }, function(err){
          console.log('Error in track_promises ('+err+')');
        });
    }).catch((reason) => {
        console.log('Handle rejected playlist_promise ('+reason+') here.');
    });

    console.log('export end');
  }
}

service.spotify = function(){
  // TODO: spotify
	console.log('not implemented yet');
}

service.factory = function(type){
  return new service[type];
}
