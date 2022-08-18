var express = require('express');
var router = express.Router();

var userModel = require('../models/users')
var gameModel = require('../models/games')
var moodModel = require('../models/mood')
var langueModdel = require('../models/langues')
var plateformeModel = require('../models/plateforme')


//---------------------------------------------------------------------------------------------------------------------------------------//


router.put('/like',async  function(req,res,next){                //terminé//


    var like = req.body.like                                  // récupère le token de la personne liké

  var searchLike = await userModel.findOne({token :req.body.like})   // récupération de l'utilisateur avec son token

    var update =   await userModel.updateOne(                           // update des like
    { token : req.body.token},  
    { $push: { like: searchLike._id } }
    );
    var searchUser = await userModel.findOne({token :req.body.token}).populate('like')    // récupération des profils de tous les utilisateurs liké 
                                                                                          //! .populate() permet d'associer l'ensemble des infos de l'utilisateur liké (id compris)
    res.json( {result:"updated" ,langue :  searchUser.like});    //renvoie pour l'utiliser dans le front
  })
  //-----

  module.exports = router;