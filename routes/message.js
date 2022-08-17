var express = require('express');
const messageModel = require('../models/message');
const userModel = require('../models/users')
var router = express.Router();

var uid2 = require('uid2');     // permet la création d'un token utilisé pour créer des rooms uniques dans le webserver


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


//---------------------------------------------------------------------------------------------------------------------------------------//
router.get('/historique',async  function(req,res,next){   // récupération de l'historique de messagerie

                  
    var searchUser = await userModel.findOne({token: req.query.token}).populate('message')
    if(searchUser){


    res.json( {result:"done" , message : searchUser.message});}else{res.json( {result:"pas de messages" });}
  })
  //---------------------------------------------------------------------------------------------------------------------------------------//
router.put('/send',async  function(req,res,next){                // envoi message

    var message = await messageModel.findOne({ _id : req.body.id})

var date = new Date();    // création d'une date à associer au message

    var copy = [...message.content,{pseudo : req.body.pseudo , date : date, message : req.body.content }]

    var update =   await messageModel.updateOne(                           // update des du contenu de la messagerie
  { _id: req.body.id},  
  { 
    content : copy
  }
  );

    res.json({result :  " sent" });
  })
//---------------------------------------------------------------------------------------------------------------------------------------//
router.post('/new', async function(req,res,next){             // création d'une nouvelle messagerie
  
  var  room = uid2(31)   // création d'un token utilisé pour créer des rooms uniques dans le webserver 

  var userOne = await userModel.findOne({ _id : req.body.user1})  // récupération des deux utilisateurs 
  var userTwo = await userModel.findOne({ _id : req.body.user2})
 
      var newMessagerie = new messageModel({
        user1: {pseudo : userOne.pseudo, picture : userOne.picture},  // exploitation du pseudo et des photos de profil des deux utilisateurs
        user2:  {pseudo : userTwo.pseudo, picture : userTwo.picture},
        room : room,
        content  :[],
      })
    
      var newHistorique = await newMessagerie.save();   
      var conv = newHistorique._id

      var update1 =   await userModel.updateOne(        // ajout de la clef étrangère de la messagerie aux deux utilisateurs
      {  _id : req.body.user1},  
      { 
      message  : [...userOne.message, conv ]
      }
      );

      var update2 =   await userModel.updateOne(                         
      {  _id : req.body.user2},  
      { 
      message  : [...userTwo.message, conv ]
      }
      );
      res.json({result :"created",id : newHistorique._id});
  })
  
  //---------------------------------------------------------------------------------------------------------------------------------------//
  router.get('/messagerie',async  function(req,res,next){                  // récupération de tous les messages d'une messagerie
    var messagerie = await messageModel.findOne({_id: req.query.id})

    res.json( {result:"done" , message : messagerie});
  })
  //---------------------------------------------------------------------------------------------------------------------------------------//

  router.delete('/del', async function(req,res,next){     //! Utilisé pour nettoyer la messagerie d'un utilisateur pour la présentation
  
        var update1 =   await userModel.updateOne(                           
        {  _id : req.body.user1},  
        { 
        message  : [] 
        }
        );
          res.json({result :"deleted"});
    })
module.exports = router;
