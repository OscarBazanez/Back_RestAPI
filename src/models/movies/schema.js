const mongoose = require('mongoose')

const FavoritesSchema = new mongoose.Schema({
    id:  Number,
    original_title: String,
    title: String,
    overview: String,
    popularity: Number,
    poster_path: String,
    release_date: String,
    vote_average:   Number,
    vote_count:   Number

})
const FavoritesModel = mongoose.model('favorites',FavoritesSchema)
module.exports = FavoritesModel