const mongoose = require('mongoose')

// schema de la collection des messages

var content = mongoose.Schema({  // sous document pour définir le schéma d'un message
    pseudo : String,
    date : Date,
    message : String
  
  });
  
  var user = mongoose.Schema({ // sous document pour définir le schéma d'un user
    pseudo : String,
    picture : String
  });

const messageSchema = mongoose.Schema({
    user1: user,
    user2 : user,
    room : String,
    content : [content]
})

const messageModel = mongoose.model('message', messageSchema)

module.exports = messageModel