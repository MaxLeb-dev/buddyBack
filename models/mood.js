const mongoose = require('mongoose')   // schema de la collection des moods

const moodSchema = mongoose.Schema({
    mood: String
})

const moodModel = mongoose.model('mood', moodSchema)

module.exports = moodModel