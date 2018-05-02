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
            playlists.push({'title':playlist.title, 'identifier':playlist.id});
          }
          resolve(playlists);
        });
      });
    }
    var get_tracks = function(playlist){
      return new Promise(function(resolve, reject){
        // get all tracks from playlist and writes them into the given dictionary
        DZ.api('/playlist/' + playlist.identifier + '/tracks', function(response) {
          var tracks = response.data;
          var simplified_tracks = [];
          // simplify tracks and list them
          for (var track_key in tracks){
            var track = tracks[track_key];
            var simplified_track = {'title':track.title, 'artist':track.artist.name};
            simplified_tracks.push(simplified_track)
          }

          // writing simplified tracklist to dictionary
          playlist['track'] = simplified_tracks;
          resolve(playlist);
        });
      });
    }
    var pack = function(data){
      var zip = new JSZip();
      for(var key in data){
        var element = data[key];
        var json_element = JSON.stringify(element);
        var blob = new Blob([json_element], {type: "application/json"})
        zip.file(element.title+'.jspf', blob);
      }
      var promise = null;
      if (JSZip.support.blob) {
        promise = zip.generateAsync({type : "blob"});
      } else {
        promise = zip.generateAsync({type : "string"});
      }
      promise.then(function(zipped_blob){
        saveAs(zipped_blob, "playlists.zip");
        console.log("zipping successful");
      }).catch((reason) => {
        console.log('Handle rejected zipping ('+reason+') here.');
      });
    }

    let playlist_promise = get_playlists();
    playlist_promise.then(function(value){
        var playlists = value;
        var track_promises = [];
        for(var playlist_key in playlists){
          var playlist = playlists[playlist_key];
          track_promises.push(get_tracks(playlist));
        }
        Promise.all(track_promises).then(function(playlists){
          pack(playlists);
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
