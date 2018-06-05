# harmonizeJS
### services
- Deezer with [JavascriptSDK](https://developers.deezer.com/sdk/javascript)
- Spotify with [Spotify-Web-API-JS](https://github.com/jmperez/spotify-web-api-js) and [Spotify-Web-API](https://beta.developer.spotify.com/documentation/web-api/) (in process)
### sync
##### procedure

      1. create and initialize first service
      2. create and initialize second service
      3. use syncer with them both as parameter (not implemented yet)

### export
- export all playlists from a service and zip them
- [JSPF](http://www.xspf.org/jspf/) as playlist-format.

##### procedure
      1. create and initialize service
      2. login to service
      3. export from service
