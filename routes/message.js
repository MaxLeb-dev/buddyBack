var express = require('express');
const messageModel = require('../models/message');
const userModel = require('../models/users')
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


//---------------------------------------------------------------------------------------------------------------------------------------//
router.get('/historique',async  function(req,res,next){                  //terminé//   liste message
    var searchUser = await userModel.findOne({token: req.query.token}).populate('message')
    


    res.json( {result:"done" , message : searchUser.message});
  })
  //---------------------------------------------------------------------------------------------------------------------------------------//
router.put('/send',async  function(req,res,next){                // envoi message

    var message = await messageModel.findOne({ _id : req.body.id})

var date = new Date();

    var copy = [...message.content,{pseudo : req.body.pseudo , date : date, message : req.body.content }]


    var update =   await messageModel.updateOne(                           // update des plateforme
  { _id: req.body.id},  
  { 
    content : copy
  }
  );

   


    
    res.json({result :  " sent" });
  })
//---------------------------------------------------------------------------------------------------------------------------------------//
router.post('/new', async function(req,res,next){             //terminé//
  

 
 
      var newMessagerie = new messageModel({
        user1: {pseudo : req.body.user1, picture : req.body.picture1},
        user2:  {pseudo : req.body.user2, picture : req.body.picture2},
        content  :[],
      })
    
      var newHistorique = await newMessagerie.save();                                    
    
      res.json({result :"created"});

  })
  
  //---------------------------------------------------------------------------------------------------------------------------------------//



module.exports = router;
