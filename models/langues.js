const mongoose = require('mongoose')

const languesSchema = mongoose.Schema({
    langue: String
})

const langueModel = mongoose.model('langue', languesSchema)

module.exports = langueModel