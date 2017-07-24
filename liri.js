var Twitter = require('twitter');
var Spotify = require('node-spotify-api');
var keys = require('./keys.js');
var userchoice = process.argv[2];


if (userchoice === 'my-tweets'){
    var client = new Twitter(keys.twitterKeys);
    var params = {screen_name: 'ClassKrik'};
    client.get('statuses/user_timeline', params, function(error, tweets, response) {
        if (!error) {
            console.log(tweets);
        }
    });

}
else if (userchoice === 'spotify-this-song'){
	var spotify = new Spotify(keys.spotifyKeys);
	spotify
  		.search({ type: 'track', query: 'All the Small Things' })
  		.then(function(response) {
    		console.log(response);
    		console.log(data.tracks.items)

  		})
  		.catch(function(err) {
    		console.log(error);
  	});

}
