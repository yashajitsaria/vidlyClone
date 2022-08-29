const mongoose = require('mongoose');
const {genreSchema} = require('./genres');

const Movie = mongoose.model('Movie', mongoose.Schema({
    title: String,
    genre: {
        type: genreSchema,
        required: true
    },
    numberInStock: Number,
    dailyRentalRate: Number
}));

module.exports = Movie;