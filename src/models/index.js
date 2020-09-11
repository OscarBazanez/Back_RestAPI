const favoritesModel = require('./movies/schema')

class Favorites {
    async add(movie) { // CREATE
        return favoritesModel.create(movie)
    }
    
    async getAll() { // READ
        return favoritesModel.find()
    }

    async deleteById(movieId) { // DELETE
        return favoritesModel.findOneAndDelete(movieId)
    }
}

module.exports =  new Favorites();