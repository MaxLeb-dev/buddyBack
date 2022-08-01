var mongoose = require('mongoose');

var options = {
    connectTimeoutMS: 5000,
    useUnifiedTopology : true,
    useNewUrlParser: true,
}

mongoose.connect('mongodb+srv://KevinNuttin:QaFx3cBGmaY7o4CT@cluster0.mj0vad5.mongodb.net/Buddy?retryWrites=true&w=majority',
    options,
    (err) => {
        if(err) console.log(err) 
        else console.log("mongdb is connected");
       }
)


module.exports = mongoose