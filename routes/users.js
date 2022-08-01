var express = require('express');
var router = express.Router();

var userModel = require('../models/users')

var bcrypt = require('bcrypt');                                                  // requis pour encodager le mdp
var uid2 = require('uid2');                                                      // requi pour générer un token unique


//---------------------------------------------------------------------------------------------------------------------------------------//

router.post('/sign-up', async function(req,res,next){


  var searchUser = await userModel.findOne({email: req.body.mailFromFront})       // verification des doublons par mail
  var searchUser2 = await userModel.findOne({pseudo: req.body.pseudoFromFront }); // verification  par pseudo

  
  if(searchUser == null & searchUser2 == null){

    var  Token = uid2(32)

    var gamelist = [];                                                           // AJOUTER LA RECHERCHE DES JEUX ICI POUR L'AJOUTER AU USER


    var newUser = new userModel({
      pseudo: req.body.pseudoFromFront,
      mail: req.body.mailFromFront,
      password: req.body.passwordFromFront,
      birthday : req.body.birthdayFromFront,
      picture : "",                                                             //// IMAGE PAR DéFAUT ICI
      visible :  true ,
      
      range : { min : req.body.minFromFront, max : req.body.maxFromFront},
      discord : "",                                                             // ??????
      token : Token,
      games : gamelist,                                                               // ATTENDRE LES JEUX
      plateforme : req.body.plateformeFromFront,
      langue : req.body.langueFromFront,
    })
  
    var newUserSave = await newUser.save();                                     //enregistrement de l'user
  
    res.render(result = true, newUser);
  } else {
    res.redirect(result = false, newUser = false)
  }
  
})

//---------------------------------------------------------------------------------------------------------------------------------------//

router.post('/sign-in', async function(req,res,next){

    var user = await userModel.findOne({ email: req.body.emailFromFront });   // recherche du user par mail
 
      if(user){
        var password = req.body.passwordFromFront
        if (bcrypt.compareSync(password, user.password)) {                    // comparaison des md
      res.json({ result: true, user, token : user.token});
      } }else{
        error.push('email ou mot de passe incorrect')
        res.json({ result: false , token : user.token});
      }
})
//---------------------------------------------------------------------------------------------------------------------------------------//

router.put('/update/games',async  function(req,res,next){


  var gamelist = req.body.listGameFromFront

  var update =   await userModel.updateOne(                           // update des jeux
  {  token : req.body.token},  
  { 
  games : gamelist
  }
  );

  res.json({ result: true});
})
//---------------------------------------------------------------------------------------------------------------------------------------//

router.put('/update/mood',async  function(req,res,next){


  var mood = req.body.moodFromFront

  var update =   await userModel.updateOne(                           // update des moods
  {  token : req.body.token},  
  { 
  mood : mood
  }
  );

  res.json({ result: true});
})
//---------------------------------------------------------------------------------------------------------------------------------------//


router.put('/update/langues',async  function(req,res,next){


  var langues = req.body.langues

  var update =   await userModel.updateOne(                           // update des langues
  {  token : req.body.token},  
  { 
  langue : langues
  }
  );

  res.json({ result: true});
})
//---------------------------------------------------------------------------------------------------------------------------------------//

router.put('/update/picture',async  function(req,res,next){


  var picture = ""

  var update =   await userModel.updateOne(                           // update de la pp
  {  token : req.body.token},  
  { 
    picture : picture
  }
  );

  res.json({ result: true});
})
//---------------------------------------------------------------------------------------------------------------------------------------//

router.put('/update/description',async  function(req,res,next){


  var description = req.body.descriptionFromFront

  var update =   await userModel.updateOne(                           // update de la description
  {  token : req.body.token},  
  { 
    description : description
  }
  );

  res.json({ result: true});
})
//---------------------------------------------------------------------------------------------------------------------------------------//
router.put('/update/hide',async  function(req,res,next){

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
  res.json({ result: true});
})
//---------------------------------------------------------------------------------------------------------------------------------------//

router.delete('/update/delete',async  function(req,res,next){


  var searchUser = await userModel.findOne({token: req.body.token });

  var del = searchUser.mail

  await userModel.deleteOne({ del});

  
  res.json({ result: true});
})
//---------------------------------------------------------------------------------------------------------------------------------------//


module.exports = router;