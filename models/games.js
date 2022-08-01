const mongoose = require('mongoose')

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
    tags: Array,
    usersList: [{type: mongoose.Schema.Types.ObjectId, ref: 'users'}]
})

const gameModel = mongoose.model('games', gameSchema)

module.exports = gameModel