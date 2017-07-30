
//declare variables
var Twitter = require('twitter');
var Spotify = require('node-spotify-api');
var keys = require('./keys.js');
var userChoice = process.argv[2];
var addChoice = process.argv[3];
var maxTweets = 0;
var request = require ('request');
var fs = require('fs');

//Run function based on user input
if (userChoice === "my-tweets") {
    twitterFunction();
} 
else if (userChoice === "spotify-this-song"){ 
  spotifyFunction(addChoice);
} 
else if (userChoice === "movie-this") {
  movieFunction(addChoice);
} 
else if (userChoice === "do-what-it-says") {
  doWhatItSaysFunction();
}

//Twitter Function /////////////////////////////////////////////
function twitterFunction(addChoice){
    var client = new Twitter(keys.twitterKeys);
    var params = {screen_name: 'ClassKrik'};
    client.get('statuses/user_timeline', params, function(error, tweets, response) {
        if (error) {
            console.log(error);
        }
        else {
            for (var i = 0; i < tweets.length; i++){
              console.log(tweets[i].created_at);
              console.log(tweets[i].text)
              console.log(i);
              maxTweets = maxTweets + 1;
              if (maxTweets == 20){
                i = i + tweets.length;
              }
          }
        }
    });
}

//Spotify Function ////////////////////////////////////////////
function spotifyFunction(addChoice){
	var spotify = new Spotify(keys.spotifyKeys);
  if (addChoice === undefined){
    addChoice = "The Sign";
  }

	spotify
  		.search({ type: 'track', query: addChoice })
  		.then(function(response) {
      for (var i = 0; i < 20; i++){  
    		console.log("Artist(s) " + response.tracks.items[i].artists.name);
        console.log("The song's name " + response.tracks.items[i].name);
        console.log("A preview link of the song from Spotify " + response.tracks.items[i].album.name);
        console.log("The album that the song is from " + response.tracks.items[i].preview_url);
      }  
  		})
  		.catch(function(err) {
    		console.log(err);
  	});

}

//Movie Function////////////////////////////////////////////////
function movieFunction(addChoice){
  var queryUrl = "http://www.omdbapi.com/?t=" + addChoice + "&tomatoes=true&y=&plot=short&apikey=40e9cece";
  if (addChoice === undefined){
    addChoice = "Mr. Nobody";
  }

    request(queryUrl, function (err, response, body){
    var data = JSON.parse(body);

    if(!err && response.statusCode === 200){
      console.log("* Title of the movie: " + data.Title);
      console.log("* Year the movie came out: " + data.Year);
      console.log("* IMDB Rating of the movie: " + data.imdbRating);
      console.log("* Country where the movie was produced: " + data.Country);
      console.log("* Language of the movie: " + data.Language);
      console.log("* Plot of the movie: " + data.Plot);
      console.log("* Actors in the movie: " + data.Actors);
      console.log("* Rotten Tomatoes URL: " + data.tomatoURL);
    } else{
      console.log(err);
    }
  })

//Do what it says Function ////////////////////////////////
  function doWhatItSaysFunction(fileInput) {
  fs.readFile("random.txt", "utf8", function(err, data){
      var split = data.split(",");
      userChoice = split[0];
      addChoice = split[1];

      if (userChoice === "my-tweets") {
        twitterFunction();
      } else if (userChoice === "spotify-this-song"){ 
        spotifyFunction(addChoice);
      } else if (userChoice === "movie-this") {
        movieFunction(addChoice);
      }
      else if (err){
        console.log(err)
      }

  })
}



}