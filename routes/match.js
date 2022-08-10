var express = require('express');
var router = express.Router();

var userModel = require('../models/users')
var gameModel = require('../models/games')
var moodModel = require('../models/mood')
var langueModdel = require('../models/langues')
var plateformeModel = require('../models/plateforme')


//---------------------------------------------------------------------------------------------------------------------------------------//


router.put('/like',async  function(req,res,next){                //terminé//


    var like = req.body.like
  console.log("like", like);

  console.log("token", req.body.like);
  var searchLike = await userModel.findOne({token :req.body.like})

    var update =   await userModel.updateOne(                           // update des langues
    { token : req.body.token},  
    { 
    like :  searchLike._id
    }
    );
  
    var searchUser = await userModel.findOne({token :req.body.token}).populate('like')  
  
    res.json( {result:"updated" ,langue :  searchUser.like});
  })
  //-----

  module.exports = router;