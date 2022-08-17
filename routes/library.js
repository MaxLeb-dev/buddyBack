var express = require('express');
var router = express.Router();
var gameModel = require('../models/games')
var userModel = require('../models/users')

/* POST all games. */
router.get('/games', async function(req, res, next) {
  var games = []
  if(games.length <100 ){
  var rawlibrary = await fetch(`https://rawg.io/api/games/?key=8bcf0f5081504d7cb5f11906cde4028d`); // requete pour récupérer tous les jeux disponible sur l'API
  var library = await rawlibrary.json()

  for(var i =0; i< library.results.length; i++){ // création d'un tableau avec uniquement le nom, le slug (nom complet avec des tirets) et l'image
    games.push(
      {name: library.results[i].name,
      slug:library.results[i].slug,
      img: library.results[i].background_image,
      })
  }
  }
    res.json(games);   // renvoie le tableau
  });

  /* POST add a newGame. */
router.post('/addgames', async function(req, res, next) {   // ajout d'un nouveau jeu à la BDD
  var gameID = []
  var gamesfromfront = await req.body.wishgame
  var gamesList = JSON.parse(gamesfromfront)
  var token = await req.body.token

 
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
// récuperation et tri des noms, des genres,des platefromes
      for(var i =0; i< library.parent_platforms.length; i++){
        platforms.push(library.parent_platforms[i].platform.name)
       }
       for(var i =0; i< library.genres.length; i++){
        genres.push(library.genres[i].name)
       }
       for(var i =0; i< library.tags.length; i++){
        tags.push(library.tags[i].name)
       }
      var newGame = new gameModel({   // création du nouveau jeu
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
      saveGame = await newGame.save() // sauvegarde en BDD du nouveau jeu
      gameID.push(saveGame._id)
    }
    else {
      gameID.push(existingGame[0]._id) 
    }
}
  await userModel.updateOne({ token: token}, {games : gameID}) // modification de la collection des jeux de l'utilisateurs avec tous les IDs récupérés
  res.json("done");
});

 /* GET add a GamesDB. */  //! Non utilisé
router.post('/getgamesDB',async  function(req,res,next){                  
  var searchGame = await gameModel.find({_id : req.body._id})
  res.json( {result:"done" , game : searchGame});
})

  module.exports = router;

  //? prop API : name, platform (array), rating, ratings_count, added, id, tags, genres, description, metacritic_url, image

