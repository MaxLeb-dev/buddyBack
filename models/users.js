var mongoose = require('mongoose')

var userSchema = mongoose.Schema({
    pseudo: String,
    mail: String,
    password: String,
    //birthday : String,
    picture : String,
    visible : Boolean,
    description : String,
   token : String,
  //  range : { min : Number , max : Number},
    discord : String,
   /* match : [{ type : mongoose.Schema.Types.ObjectId, ref: 'users'}],
    like : [{ type : mongoose.Schema.Types.ObjectId, ref: 'users'}],
    
    games : [{ type : mongoose.Schema.Types.ObjectId, ref: 'games'}],
    plateforme : [{ type : mongoose.Schema.Types.ObjectId, ref: 'plateforme'}],
    mood : [{ type : mongoose.Schema.Types.ObjectId, ref: 'mood'}],
    langue : [{ type : mongoose.Schema.Types.ObjectId, ref: 'langue'}],
    message : [{ type : mongoose.Schema.Types.ObjectId, ref: 'message'}],
*/
})

var userModel = mongoose.model('users', userSchema)

module.exports = userModel;