var express = require('express');
var router = express.Router();

var userModel = require('../models/users')
var gameModel = require('../models/games')
var moodModel = require('../models/mood')
var langueModdel = require('../models/langues')


var bcrypt = require('bcrypt');                                                  // requis pour encodager le mdp
var uid2 = require('uid2');                                                      // requi pour générer un token unique


//---------------------------------------------------------------------------------------------------------------------------------------//

router.post('/sign-up', async function(req,res,next){             //terminé//
  

  var searchUser = await userModel.findOne({mail: req.body.mail})       // verification des doublons par mail
  var searchUser2 = await userModel.findOne({pseudo: req.body.pseudo }); // verification  par pseudo
  
  
  if(searchUser == null & searchUser2 == null){


  const hash = bcrypt.hashSync(req.body.password, 10);

    var  Token = uid2(32)

    var newUser = new userModel({
      pseudo: req.body.pseudo,
      mail: req.body.mail,
      password: hash,
      birthday : req.body.birthday,
      picture : "https://res.cloudinary.com/dkfnuq353/image/upload/v1659442405/avatar5_vphxrt.png",                                                             //// IMAGE PAR DéFAUT ICI
      visible :  true ,
      description: req.body.description,
      range  : {min : req.body.min ,  max : req.body.max},
      discord : req.body.discord,                                                             // ??????
      token : Token,
      games : [],                                                           
      plateforme : [],
      langue : [],
      like : [],
      match : [],
      message: [],
      mood : []
    })
  
    var newUserSave = await newUser.save();                                     //enregistrement de l'user
  
    res.json({result : true , user  : newUser});
  } else {
    res.json(result  = false)
  }
  
})

//---------------------------------------------------------------------------------------------------------------------------------------//

router.post('/sign-in', async function(req,res,next){             // terminé//

    var user = await userModel.findOne({mail: req.body.mail });   // recherche du user par mail
 
      if(user){
        var password = req.body.password
        if (bcrypt.compareSync(password, user.password)) {                    // comparaison des md
          res.json({ result: true, user, token : user.token});
      }else{
        res.json(result = "mdp ou mail incorrect")
      }
     }else{
        res.json(result = "mdp ou mail incorrect");
      }
})
//---------------------------------------------------------------------------------------------------------------------------------------//

router.put('/games',async  function(req,res,next){                  //terminé//


  var game1 = req.body.game1
  var game2 = req.body.game2
  var game3 = req.body.game3


  var update =   await userModel.updateOne(                           // update des jeux
  {  token : req.body.token},  
  { 
  games : [game1 , game2 , game3]
  }
  );

  var searchUser = await userModel.findOne({token :req.body.token}).populate('games')  
  


  res.json( {result:"updated" ,games :  searchUser.games});
})
//---------------------------------------------------------------------------------------------------------------------------------------//

router.put('/mood',async  function(req,res,next){                       //terminé//


  var mood1 = req.body.mood1
  var mood2 = req.body.mood2
  var mood3 = req.body.mood3
  var mood4 = req.body.mood4


  var update =   await userModel.updateOne(                           // update des moods
  {  token : req.body.token},  
  { 
  mood : [mood1 , mood2 , mood3,mood4]
  }
  );

  var searchUser = await userModel.findOne({token :req.body.token}).populate('mood')  

  res.json( {result:"updated" ,mood :  searchUser.mood});
})
//---------------------------------------------------------------------------------------------------------------------------------------//


router.put('/langues',async  function(req,res,next){                //terminé//


  var langue1 = req.body.langue1
  var langue2 = req.body.langue2
  var langue3 = req.body.langue3
  var langue4 = req.body.langue4


  var update =   await userModel.updateOne(                           // update des langues
  {  token : req.body.token},  
  { 
  langue : [langue1 , langue2 , langue3,langue4]
  }
  );

  var searchUser = await userModel.findOne({token :req.body.token}).populate('langue')  

  res.json( {result:"updated" ,langue :  searchUser.langue});
})
//---------------------------------------------------------------------------------------------------------------------------------------//

router.put('/picture',async  function(req,res,next){           //terminé//
  

  var picture = "new"

  var update =   await userModel.updateOne(                           // update de la pp
  {  token : req.body.token},  
  { 
    picture : req.body.picture
  }
  );

  res.json( {result:"updated" });
})
//---------------------------------------------------------------------------------------------------------------------------------------//

router.put('/description',async  function(req,res,next){                  //terminé


  var description = req.body.descriptionFromFront

  var update =   await userModel.updateOne(                           // update de la description
  {  token : req.body.token},  
  { 
    description : req.body.description
  }
  );

  res.json( result="updated" );
})
//---------------------------------------------------------------------------------------------------------------------------------------//

router.put('/discord',async  function(req,res,next){                  //terminé


  var discord = req.body.discord

  var update =   await userModel.updateOne(                           // update de discord
  {  token : req.body.token},  
  { 
    discord : req.body.discord
  }
  );

  res.json( result="updated" );
})
//---------------------------------------------------------------------------------------------------------------------------------------//
router.put('/hide',async  function(req,res,next){                           //terminé//
if(req.body.token){
  var searchUser = await userModel.findOne({token: req.body.token });
  
  if(searchUser.visible){
    var update =   await userModel.updateOne(                           // cache l'utilisateur
  {  token : req.body.token},  
  { 
    visible : false
  }
  );
  }else {
    var update =   await userModel.updateOne(                           // montre l'utilisateur
    {  token : req.body.token},  
    { 
      visible : true
    }
    ); 
  }
  let user = await userModel.findOne({token: req.body.token });
  res.json( searchUser );}
  else{
    res.json(result = "pb")
  }
})
//---------------------------------------------------------------------------------------------------------------------------------------//

router.delete('/delete',async  function(req,res,next){                // supprime l'utilisateur //terminé//


  var searchUser = await userModel.findOne({token: req.body.token });

  var del = searchUser.mail

  await userModel.deleteOne({ del});

  
  res.json(result =  " deleted");
})
//---------------------------------------------------------------------------------------------------------------------------------------//
router.get('/mood',async  function(req,res,next){                // ajout des moods

  var newMood = new moodModel({
    mood : req.body.mood
  })
  var saving = await newMood.save();        

  res.json(result =  " added");
})
//---------------------------------------------------------------------------------------------------------------------------------------//
router.post('/langue',async  function(req,res,next){                // ajout des langues



  var newLangue = new langueModdel({
    langue : req.body.langue
  })
  var saving = await newLangue.save();        

  res.json(result =  " added");
})

module.exports = router;