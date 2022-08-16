var express = require('express');
const messageModel = require('../models/message');
const userModel = require('../models/users')
var router = express.Router();

var uid2 = require('uid2');  


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


//---------------------------------------------------------------------------------------------------------------------------------------//
router.get('/historique',async  function(req,res,next){
                    //terminé//   liste message
                  
    var searchUser = await userModel.findOne({token: req.query.token}).populate('message')
    if(searchUser){


    res.json( {result:"done" , message : searchUser.message});}else{res.json( {result:"problème" });}
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
  
  var  room = uid2(31)

  var userOne = await userModel.findOne({ _id : req.body.user1})
  var userTwo = await userModel.findOne({ _id : req.body.user2})


console.log(userOne,  userTwo);
 
      var newMessagerie = new messageModel({
        user1: {pseudo : userOne.pseudo, picture : userOne.picture},
        user2:  {pseudo : userTwo.pseudo, picture : userTwo.picture},
        room : room,
        content  :[],
      })
    
      var newHistorique = await newMessagerie.save();   
                                    
    

      var conv = newHistorique._id

      

      var update1 =   await userModel.updateOne(                           // update des plateforme
      {  _id : req.body.user1},  
      { 
    
      message  : [...userOne.message, conv ]
    
      }
      );


      var update2 =   await userModel.updateOne(                           // update des plateforme
      {  _id : req.body.user2},  
      { 
    
      message  : [...userTwo.message, conv ]
    
      }
      );
    


      res.json({result :"created",id : newHistorique._id});

  })
  
  //---------------------------------------------------------------------------------------------------------------------------------------//
  router.get('/messagerie',async  function(req,res,next){                  //terminé//   liste message
    var messagerie = await messageModel.findOne({_id: req.query.id})
    


    res.json( {result:"done" , message : messagerie});
  })

  router.delete('/del', async function(req,res,next){             //terminé//
  

  
        var update1 =   await userModel.updateOne(                           // update des plateforme
        {  _id : req.body.user1},  
        { 
      
        message  : [] 

        }
        );
  
        res.json({result :"deleted"});
  
    })
module.exports = router;
