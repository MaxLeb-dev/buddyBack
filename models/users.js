var mongoose = require('mongoose')

var range = mongoose.Schema({
  min : Number,
  max : Number

});




var userSchema = mongoose.Schema({
    pseudo: String,
    mail: String,
    password: String,
    birthday : Date,
    picture : String,
    visible : Boolean,
    description : String,
    token : String,
    range : range,
    discord : String,
     games : [{ type : mongoose.Schema.Types.ObjectId, ref: 'games'}],
    match : [{ type : mongoose.Schema.Types.ObjectId, ref: 'users'}],
    like : [{ type : mongoose.Schema.Types.ObjectId, ref: 'users'}],
    
   
    plateforme : [{ type : mongoose.Schema.Types.ObjectId, ref: 'plateforme'}],
    mood : [{ type : mongoose.Schema.Types.ObjectId, ref: 'mood'}],
    langue : [{ type : mongoose.Schema.Types.ObjectId, ref: 'langue'}],
    message : [{ type : mongoose.Schema.Types.ObjectId, ref: 'message'}],

})

var userModel = mongoose.model('users', userSchema)

module.exports = userModel;