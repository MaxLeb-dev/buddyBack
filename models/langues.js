const mongoose = require('mongoose') // schema de la collection des langues

const languesSchema = mongoose.Schema({
    langue: String
})

const langueModel = mongoose.model('langue', languesSchema)

module.exports = langueModel