var express = require('express');
var router = express.Router();

var userModel = require('../models/users')
var gameModel = require('../models/games')
var moodModel = require('../models/mood')
var langueModdel = require('../models/langues')
var plateformeModel = require('../models/plateforme')



var bcrypt = require('bcrypt');                                                  // requis pour encodager le mdp
var uid2 = require('uid2');                                                      // requi pour générer un token unique


//---------------------------------------------------------------------------------------------------------------------------------------//

router.post('/sign-up', async function(req,res,next){             //route utilisé lors de la création d'un utilisateur
  

  var searchUser = await userModel.findOne({mail: req.body.mail})       // verification des doublons par mail
  var searchUser2 = await userModel.findOne({pseudo: req.body.pseudo }); // verification  par pseudo
  
  
  if(searchUser == null & searchUser2 == null){


  const hash = bcrypt.hashSync(req.body.password, 10);      // cryptage du MDP

    var  Token = uid2(32)                 // création d'un token unique

    var newUser = new userModel({           // création d'un nouveau user
      pseudo: req.body.pseudo,
      mail: req.body.mail,
      password: hash,
      birthday : req.body.birthday,
      picture : "https://res.cloudinary.com/dkfnuq353/image/upload/v1659442405/avatar5_vphxrt.png",                                                             //// IMAGE PAR DéFAUT ICI
      visible :  true , //! non utilisé pour le moment
      description: "Bonjour c'est moi M.Larbin",
      range  : {min : req.body.min ,  max : req.body.max}, //! non utilisé pour le moment
      discord : "Const Bg",     //! non utilisé pour le moment                                                       
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

router.post('/sign-in', async function(req,res,next){             //route utilisé pour se connecter

    var user = await userModel.findOne({mail: req.body.mail });   // recherche du user par mail
 
      if(user){
        var password = req.body.password
        if (bcrypt.compareSync(password, user.password)) {                    // comparaison des MDP
          res.json({ result: true, user, token : user.token});
      }else{
       res.json({result : "mdp ou mail incorrect"})
      }
     }else{
        res.json({result : "mdp ou mail incorrect"});
      }
})
//---------------------------------------------------------------------------------------------------------------------------------------//

router.put('/mood',async  function(req,res,next){                       //modification des moods

  var mood1 = req.body.mood1
  var mood2 = req.body.mood2
  var mood3 = req.body.mood3
  var mood4 = req.body.mood4

  var update =   await userModel.updateOne(                           // update des moods
  {  token : req.body.token},  
  { 
  mood : [mood1 , mood2 , mood3, mood4]
  }
  );

  var searchUser = await userModel.findOne({token :req.body.token}).populate('mood')  // récupération des moods

  res.json( {result:"updated" ,mood :  searchUser.mood}); // renvoie de l'id des moods au front
})
//---------------------------------------------------------------------------------------------------------------------------------------//


router.put('/langues',async  function(req,res,next){                // update de la liste des langues

  var langue1 = req.body.langue1
  var langue2 = req.body.langue2
  var langue4 = req.body.langue4
  var langue5 = req.body.langue5

  var update =   await userModel.updateOne(                           // update des langues
  {  token : req.body.token},  
  { 
  langue : [langue1 , langue2 , langue4, langue5]
  }
  );

  var searchUser = await userModel.findOne({token :req.body.token}).populate('langue')   //récupération des nom des langues

  res.json( {result:"updated" ,langue :  searchUser.langue}); // renvoie au front pour le traitement
})
//---------------------------------------------------------------------------------------------------------------------------------------//

router.put('/picture',async  function(req,res,next){           //! Non terminé et non utilisé
  

  var picture = "new"

  var update =   await userModel.updateOne(                           // update de la pp
  {  token : req.body.token},  
  { 
    picture : "https://.closermag.fr/var/closermag/storage/images/1/3/8/4/1/13841748/le-prince-harry.jpeg?alias=width400&size=x100&format=jpeg"
});

  res.json( {result:"updated" });
})
//---------------------------------------------------------------------------------------------------------------------------------------//

router.put('/description',async  function(req,res,next){                  //! Non utilisé 

  var update =   await userModel.updateOne(                           // update de la description
  {  token : req.body.token},  
  { 
    description : req.body.description
  }
  );

  res.json( result="updated" );
})
//---------------------------------------------------------------------------------------------------------------------------------------//

router.put('/discord',async  function(req,res,next){                  //! Non utilisé


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
router.put('/plateforme',async  function(req,res,next){               // route pour modifier les plateformes

  var plateforme = JSON.parse(req.body.plateforme)
  console.log(plateforme);

  var update =   await userModel.updateOne(                           // update des plateforme
  {  token : req.body.token},  
  { plateforme : plateforme}
  );
  var searchUser = await userModel.findOne({token :req.body.token}).populate('plateforme')   // récupération des noms des plateformes
  res.json( {result:"updated" ,plateforme :  searchUser.plateforme});  // renvoie au front pour traitement
})

//---------------------------------------------------------------------------------------------------------------------------------------//
router.put('/hide',async  function(req,res,next){                           // ! non utilisé 
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
    res.json(result = "error")
  }
})
//---------------------------------------------------------------------------------------------------------------------------------------//

router.delete('/delete',async  function(req,res,next){               //! non utilisé // supprime l'utilisateur //terminé//

  var searchUser = await userModel.findOne({token: req.body.token });

  var del = searchUser.mail

  await userModel.deleteOne({ del});

  
  res.json(result =  " deleted");
})
//---------------------------------------------------------------------------------------------------------------------------------------//
router.get('/mood',async  function(req,res,next){                //permet d'ajouter un moods dans la BDD 

  var newMood = new moodModel({
    mood : req.body.mood
  })
  var saving = await newMood.save();        

  res.json(result =  " added");
})
//---------------------------------------------------------------------------------------------------------------------------------------//
router.post('/langue',async  function(req,res,next){                // permet d'ajouter une langue dans le BDD

  var newLangue = new langueModdel({
    langue : req.body.langue
  })
  var saving = await newLangue.save();        

  res.json(result =  " added");
})
//---------------------------------------------------------------------------------------------------------------------------------------//
router.post('/plateforme',async  function(req,res,next){                // permet d'ajouter une nouvelle plateforme en BDD

  var newPlatefrome = new plateformeModel({
    plateforme : req.body.plateforme
  })
  var saving = await newPlatefrome.save();        

  res.json(result =  " added");
})

//---------------------------------------------------------------------------------------------------------------------------------------//

router.get('/getprofil',async  function(req,res,next){                  //récupère toutes les infos d'un user
  var searchUser = await userModel.find().populate("games").populate('mood').populate('plateforme').populate("langue")
  res.json( {result:"done" , user : searchUser});
})
//---------------------------------------------------------------------------------------------------------------------------------------//

//? à voir pour modifier en GET car pas de modification
router.put('/getmyprofil',async  function(req,res,next){                  //terminé//
  var searchUser = await userModel.findOne({token :req.body.token}).populate('plateforme').populate('mood').populate('games')

  res.json( {result:"done" , user : searchUser});
}) 
//-
module.exports = router;