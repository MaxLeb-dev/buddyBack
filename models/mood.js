const mongoose = require('mongoose')

const moodSchema = mongoose.Schema({
    mood: String
})

const moodModel = mongoose.model('mood', moodSchema)

module.exports = moodModel