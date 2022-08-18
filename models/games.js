const mongoose = require('mongoose') // schema de la collection des jeux

const gameSchema = mongoose.Schema({
    name: String,
    description: String,
    image: String,
    metacritic: Number,
    rating: Number,
    review_count: Number,
    added: Number,
    platforms: Array,
    developers: String,
    genres: Array,
    tags: Array

})

const gameModel = mongoose.model('games', gameSchema)

module.exports = gameModel