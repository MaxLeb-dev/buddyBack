var express = require('express');
var router = express.Router();
var gameModel = require('../models/games')
var userModel = require('../models/users')

var platforms= []
var genres =[]
var tags =[]
var data =[]
var games =[]

/* POST all games. */
router.get('/games', async function(req, res, next) {
  var games = []
  var gameName = req.body.gameName
  if(games.length <100 ){
  var rawlibrary = await fetch(`https://rawg.io/api/games/?key=8bcf0f5081504d7cb5f11906cde4028d`);
  var library = await rawlibrary.json()

  console.log(library.results.length);
  for(var i =0; i< library.results.length; i++){
    games.push(
      {name: library.results[i].name,
      slug:library.results[i].slug,
      img: library.results[i].background_image,
      })
  }
  }
    res.json(games);
  });

  /* POST add a newGame. */
router.post('/addgames', async function(req, res, next) {
  var gameID = []
  var gamesfromfront = await req.body.wishgame
  var gamesList = JSON.parse(gamesfromfront)
  var token = await req.body.token
  console.log("tokenfromfront", token);
 
   //Vérification que le jeux n'est pas déjà en DB avec le titre avant de l'ajouter
  var gameName =""
 for (var i=0; i< gamesList.length; i++){
  gameName = gamesList[i].name
  gameSlug = gamesList[i].slug
 

  var existingGame = await gameModel.find({ name: gameName})
    if (existingGame.length == 0) {

      var rawlibrary = await fetch(`https://rawg.io/api/games/${gameSlug}/?key=8bcf0f5081504d7cb5f11906cde4028d`);
      var library = await rawlibrary.json()

      var platforms=[]
      var genres=[]
      var tags=[]

      for(var i =0; i< library.parent_platforms.length; i++){
        platforms.push(library.parent_platforms[i].platform.name)
       }
       for(var i =0; i< library.genres.length; i++){
        genres.push(library.genres[i].name)
       }
       for(var i =0; i< library.tags.length; i++){
        tags.push(library.tags[i].name)
       }
      var newGame = new gameModel({
        name: library.name,
        description: library.description,
        image: library.background_image,
        metacritic: library.metacritic,
        rating: library.rating,
        review_count: library.reviews_count,
        added: library.added,
        platforms: platforms,
        developers: typeof library.developers == "string" ? library.developers : library.developers[0].name,
        genres: genres,
        tags: tags
      })
      saveGame = await newGame.save()
      gameID.push(saveGame._id)
    }
    else {
      gameID.push(existingGame[0]._id)
      console.log("existingGame", existingGame[0]._id);
    }
}
  await userModel.updateOne({ token: token}, {games : gameID})
  console.log("gameID", gameID);
    var rawlibrary = await fetch(`https://rawg.io/api/games/Portal-2/?key=8bcf0f5081504d7cb5f11906cde4028d`);
    var library = await rawlibrary.json()


  res.json("coucou");
});

 /* GET add a GamesDB. */
router.post('/getgamesDB',async  function(req,res,next){                  
  var searchGame = await gameModel.find({_id : req.body._id})
  console.log(searchGame);
  res.json( {result:"done" , game : searchGame});

})

  module.exports = router;

  //? prop API : name, platform (array), rating, ratings_count, added, id, tags, genres, description, metacritic_url, image

