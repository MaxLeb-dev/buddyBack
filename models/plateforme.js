const mongoose = require('mongoose')

const plateformeSchema = mongoose.Schema({
    plateforme: String
})

const plateformeModel = mongoose.model('plateforme', plateformeSchema)

module.exports = plateformeModel