const express = require('express');
const router = express.Router();
const { Movie } = require('../models/movies');

router.get('/', async (req, res) => {
    const movies = await Movie.find().sort('title');
    res.send(movies);
})

router.get('/:id', async (req, res) => {
    const movie = await Movie.findById(req.params.id);
    if (!movie) return res.status(404).send('Movie Not Found.');
    res.send(movie);
})

router.post('/', async (req, res) => {
    let movie = new Movie({
        title: req.body.title,
        genre: genreSchema,
        numberInStock: req.body.numberInStock,
        dailyRentalRate: req.body.dailyRentalRate
    })

    movie = await movie.save();
    res.send(movie);
})

router.put('/:id', async (req, res) => {
    const movie = await Movie.findByIdAndUpdate(req.params.id, {
        title: req.body.title,
        genre: genreSchema,
        numberInStock: req.body.numberInStock,
        dailyRentalRate: req.body.dailyRentalRate
    }, {
        new: true
    });
    if (!movie) return res.status(404).send('Movie Not Found.');

    res.send(movie);
})

router.delete('/:id', async (req, res) => {
    const movie = await Movie.findByIdAndRemove(req.params.id);
    if (!movie) return res.status(404).send('Movie Not Found.');

    res.send(movie);
})

module.exports = router;