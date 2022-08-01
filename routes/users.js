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
  
    res.render(result = true);
  } else {
    res.redirect(result = false)
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

router.put('/update/games', function(req,res,next){

  var update =   await userModel.updateOne(                           // update du user ( jeux, langues moods etc...)
  {  email: req.body.emailFromFront},  
  { 
  games : [],
  mood : [],
  
  
  
  
  }
  );

  res.redirect('/')
})
//---------------------------------------------------------------------------------------------------------------------------------------//




module.exports = router;