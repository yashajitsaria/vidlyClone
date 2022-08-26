const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Genre = mongoose.model('Genre', new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minLength: 5,
        maxLength: 50
    }
}));

router.get('/', async (req, res) => {
    const genres = await Genre.find().sort('name');
    res.send(genres);
})

router.get('/:id', async(req, res) => {
    const genre = await Genre.findById(req.params.id);
    // const genre = genres.find((c) => c.id === parseInt(req.params.id));
    if (!genre) return res.status(404).send('Genre Not Found.');
    res.send(genre);
})

router.post('/', async (req, res) => {
    // const genreExists = await Genre.find({ name: req.body.name });
    // if (genreExists) return res.status(403).send('Access Denied: Genre already exist.');

    let genre = new Genre({
        name: req.body.name
    })

    genre = await genre.save();
    res.send(genre);
})

router.put('/:id', async (req, res) => {
    const genre = await Genre.findByIdAndUpdate(req.params.id, {
        name: req.body.name
    }, {
        new: true
    });
    if (!genre) return res.status(404).send('Genre Not Found.');

    res.send(genre);
})

router.delete('/:id', async (req, res) => {
    const genre = await Genre.findByIdAndRemove(req.params.id);
    if (!genre) return res.status(404).send('Genre Not Found.');

    res.send(genre);
})

module.exports = router;