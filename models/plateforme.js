const mongoose = require('mongoose')  // schema de la collection des plateformes

const plateformeSchema = mongoose.Schema({
    plateforme: String
})

const plateformeModel = mongoose.model('plateforme', plateformeSchema)

module.exports = plateformeModel