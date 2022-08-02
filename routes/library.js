var express = require('express');
var router = express.Router();
var gameModel = require('../models/games')
var userModel = require('../models/users')

var games = []
var platforms= []
var genres =[]
var tags =[]

/* POST all games. */
router.post('/games', async function(req, res, next) {
  var gameName = req.body.gameName
  console.log("gameName",gameName);
  var inputGameName = "Tomb"
  var rawlibrary = await fetch(`https://rawg.io/api/games/?key=8bcf0f5081504d7cb5f11906cde4028d&search=`+inputGameName);
  var library = await rawlibrary.json()
  for(var i =0; i< library.results.length; i++){
    games.push(library.results[i].name)
  }

 console.log("gamesList", games);
    res.render(games);
  });

  /* POST add a newGame. */
router.post('/addgames', async function(req, res, next) {
  const user = await userModel.findOne({
    token: req.body.token,
  })
  
  var rawlibrary = await fetch(`https://rawg.io/api/games/grand-theft-auto-v/?key=8bcf0f5081504d7cb5f11906cde4028d`);
  var library = await rawlibrary.json()
 for(var i =0; i< library.platforms.length; i++){
  platforms.push(library.platforms[i].platform.name)
 }
 for(var i =0; i< library.genres.length; i++){
  genres.push(library.genres[i].name)
 }
 for(var i =0; i< library.tags.length; i++){
  tags.push(library.tags[i].name)
 }

 //Vérification que le jeux n'est pas déjà en DB avec le titre avant de l'ajouter

 var existingGame = await gameModel.findOne({ name: "Grand Theft Auto V" })
 console.log("existingGame",existingGame);
    if (!existingGame) {
      var newGame = new gameModel({
        name: library.name,
        description: library.description,
        image: library.background_image,
        metacritic: library.metacritic,
        rating: library.rating,
        review_count: library.reviews_count,
        added: library.added,
        platforms: platforms,
        developers: library.developers[0].name,
        genres: genres,
        tags: tags
      })
      console.log(newGame);
      newGame.usersList.push(user._id)
      saveGame = await newGame.save()
      
    }
    else {
      userHasLiked = await gameModel.findOne({ usersList: user._id })
      if (!userHasLiked) {
        existingGame.usersList.push(user._id)
        await existingGame.save()
      }
    }
 
  res.render("coucou");
});

  module.exports = router;

  //? prop API : name, platform (array), rating, ratings_count, added, id, tags, genres, description, metacritic_url, image

