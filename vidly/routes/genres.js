const express = require('express');
const router = express.Router();

const GENRES = [];
const MSG404 = 'The genre with the given ID was not found';


router.get('/', (req, res) => {
    res.send(GENRES);
});

router.get('/:id', (req, res) => {
    const genre = GENRES.find(g => g.id === parseInt(req.params.id));
    if (!genre) return res.status(404).send(MSG404);
    res.send(genre);
});

router.put('/:id', (req, res) => {
    const genre = GENRES.find(g => g.id === parseInt(req.params.id));
    if (!genre) return res.status(404).send(MSG404);

    const { error } = validateGenre(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    genre.name = req.body.name;
    res.send(genre);
});

router.post('/', (req, res) => {
    const { error } = validateGenre(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const genre = {
        id: GENRES.length + 1,
        name: req.body.name
    };

    GENRES.push(genre);
    res.send(genre);
});

router.delete('/:id', (req, res) => {
    const genre = GENRES.find(g => g.id === parseInt(req.params.id));
    if (!genre) return res.status(404).send(MSG404);
    const index = GENRES.indexOf(genre);
    GENRES.splice(index, 1);
    res.send(genre);
});


function validateGenre(genre) {
    const schema = {
        name: Joi.string().min(3).required()
    }

    return Joi.validate(genre, schema);
}

module.exports = router;