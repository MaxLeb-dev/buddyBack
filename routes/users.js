var express = require('express');
var router = express.Router();

var userModel = require('../models/users')

var bcrypt = require('bcrypt');                                                  // requis pour encodager le mdp
var uid2 = require('uid2');                                                      // requi pour générer un token unique


//---------------------------------------------------------------------------------------------------------------------------------------//

router.post('/sign-up', async function(req,res,next){


  var searchUser = await userModel.findOne({mail: req.body.mail})       // verification des doublons par mail
  var searchUser2 = await userModel.findOne({pseudo: req.body.pseudo }); // verification  par pseudo

  
  if(searchUser == null & searchUser2 == null){


  const hash = bcrypt.hashSync(req.body.password, 10);

    var  Token = uid2(32)

    var gamelist = [];                                                           // AJOUTER LA RECHERCHE DES JEUX ICI POUR L'AJOUTER AU USER


    var newUser = new userModel({
      pseudo: req.body.pseudo,
      mail: req.body.mail,
      password: hash,
      birthday : req.body.birthday,
      picture : "",                                                             //// IMAGE PAR DéFAUT ICI
      visible :  true ,
      
      
      discord : "",                                                             // ??????
      token : Token,
      games : gamelist,                                                               // ATTENDRE LES JEUX
      plateforme : [req.body.plateforme],
      langue : [req.body.langue],
    })
  
    var newUserSave = await newUser.save();                                     //enregistrement de l'user
  
    res.json(result = true , user  = newUser);
  } else {
    res.json(result  = false)
  }
  
})

//---------------------------------------------------------------------------------------------------------------------------------------//

router.post('/sign-in', async function(req,res,next){

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

router.put('/games',async  function(req,res,next){


  var gamelist = req.body.listGameFromFront

  var update =   await userModel.updateOne(                           // update des jeux
  {  token : req.body.token},  
  { 
  games : gamelist
  }
  );

  res.json( result="updated" );
})
//---------------------------------------------------------------------------------------------------------------------------------------//

router.put('/mood',async  function(req,res,next){


  var mood = req.body.moodFromFront

  var update =   await userModel.updateOne(                           // update des moods
  {  token : req.body.token},  
  { 
  mood : mood
  }
  );

  res.json( result="updated" );
})
//---------------------------------------------------------------------------------------------------------------------------------------//


router.put('/langues',async  function(req,res,next){


  var langues = req.body.langues

  var update =   await userModel.updateOne(                           // update des langues
  {  token : req.body.token},  
  { 
  langue : langues
  }
  );

  res.json( result="updated" );
})
//---------------------------------------------------------------------------------------------------------------------------------------//

router.put('/picture',async  function(req,res,next){


  var picture = "new"

  var update =   await userModel.updateOne(                           // update de la pp
  {  token : req.body.token},  
  { 
    picture : picture
  }
  );

  res.json( result="updated" );
})
//---------------------------------------------------------------------------------------------------------------------------------------//

router.put('/description',async  function(req,res,next){


  var description = req.body.descriptionFromFront

  var update =   await userModel.updateOne(                           // update de la description
  {  token : req.body.token},  
  { 
    description : description
  }
  );

  res.json( result="updated" );
})
//---------------------------------------------------------------------------------------------------------------------------------------//
router.put('/hide',async  function(req,res,next){
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

router.delete('/delete',async  function(req,res,next){                // supprime l'utilisateur


  var searchUser = await userModel.findOne({token: req.body.token });

  var del = searchUser.mail

  await userModel.deleteOne({ del});

  
  res.json(result =  " deleted");
})
//---------------------------------------------------------------------------------------------------------------------------------------//


module.exports = router;