const mongoose = require('mongoose')


var content = mongoose.Schema({
    pseudo : String,
    date : Date,
    message : String
  
  });
  

const messageSchema = mongoose.Schema({
    user1: String,
    user2 : String,
    content : [content]
})

const messageModel = mongoose.model('message', messageSchema)

module.exports = messageModel