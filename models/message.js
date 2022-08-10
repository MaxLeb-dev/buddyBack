const mongoose = require('mongoose')


var content = mongoose.Schema({
    pseudo : String,
    date : Date,
    message : String
  
  });
  
  var user = mongoose.Schema({
    pseudo : String,
    picture : String
  });

const messageSchema = mongoose.Schema({
    user1: user,
    user2 : user,
    content : [content]
})

const messageModel = mongoose.model('message', messageSchema)

module.exports = messageModel