var express = require('express');
var router = express.Router();

var newGame = []
var platforms= []
var genres =[]
var tags =[]

/* GET all games. */
router.get('/games', async function(req, res, next) {
  var rawlibrary = await fetch(`https://rawg.io/api/games/portal-2/?key=8bcf0f5081504d7cb5f11906cde4028d`);
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

 newGame = {
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
 }
 
    res.render(library);
  });

  module.exports = router;

  //? prop API : name, platform (array), rating, ratings_count, added, id, tags, genres, description, metacritic_url, image

