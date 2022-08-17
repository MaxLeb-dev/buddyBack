var mongoose = require('mongoose')

// schema de la collection des users

var range = mongoose.Schema({ // sous document pour la tranche d'âge
  min : Number,
  max : Number

});




var userSchema = mongoose.Schema({
    pseudo: String,
    mail: String,
    password: String,
    birthday : String,
    picture : String,
    visible : Boolean,
    description : String,
    token : String,
    range : range,
    discord : String,
     games : [{ type : mongoose.Schema.Types.ObjectId, ref: 'games'}], // utilisation de clef étrangère pour lier la collection "games" au users
    match : [{ type : mongoose.Schema.Types.ObjectId, ref: 'users'}], // utilisation de clef étrangère pour ajouter des clefs étangères d'autre utilisateurs
    like : [{ type : mongoose.Schema.Types.ObjectId, ref: 'users'}], // utilisation de clef étrangère pour ajouter des clefs étangères d'autre utilisateurs
    
   
    plateforme : [{ type : mongoose.Schema.Types.ObjectId, ref: 'plateforme'}],   // utilisation de clef étrangère pour lier la collection "plateforme" au users
    mood : [{ type : mongoose.Schema.Types.ObjectId, ref: 'mood'}], // utilisation de clef étrangère pour lier la collection "mood" au users
    langue : [{ type : mongoose.Schema.Types.ObjectId, ref: 'langue'}],   // utilisation de clef étrangère pour lier la collection "langues" au users
    message : [{ type : mongoose.Schema.Types.ObjectId, ref: 'message'}],     // utilisation de clef étrangère pour lier la collection "message" au users

})

var userModel = mongoose.model('users', userSchema)

module.exports = userModel;