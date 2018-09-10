const express = require('express');
const {Genre, validate} = require('../models/genre');

const router = express.Router();
const MSG404 = 'The genre with the given ID was not found';


router.get('/', async (req, res) => {
    let result = await getGenres();
    if (!result) return res.status(404).send(MSG404);
    res.send(result);
});


router.get('/:id', async (req, res) => {
    let result = await getSingleGenre( req.params.id );
    if (!result) return res.status(404).send(MSG404);
    res.send(result);
});


router.put('/:id', async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let result = await putGenre( req.params.id, req.body.name );
    if (!result) return res.status(404).send(MSG404);
    res.send(result);
});


router.post('/', async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let result = await postGenre(req.body.name);
    res.send(result);
});


router.delete('/:id', async (req, res) => {
    let result = deleteGenre(req.params.id);
    if (!result) return res.status(404).send(MSG404);
    res.send(result);
});


async function getSingleGenre(id) {
    let result = await Genre.findById(id);
    return result;
}


async function getGenres() {
    let genres = await Genre.find().sort('name');
    return genres;
}


async function putGenre(id, title) {
    let genre = await Genre.findByIdAndUpdate(id, {name: title}, {new: true});

    let result = await genre.save();
    return result;
}


async function postGenre(title) {
    let genre = new Genre({ name: title });

    try {
        genre = await genre.save();
        return genre;
    } catch (ex) {
        for (field in ex.errors)
            console.log(ex.errors[field].message);
    }
}


async function deleteGenre(id) {
    let result = await Genre.findByIdAndRemove(id);
    return result;
}


module.exports = router;