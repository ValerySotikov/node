const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);
const mongoose = require('mongoose');
const express = require('express');
const genres = require('./routes/genres');
const customers = require('./routes/customers');
const movies = require('./routes/movies');
const rentals = require('./routes/rentals')

const app = express();

const PORT = process.env.PORT || 8000;

mongoose.connect('mongodb://localhost/vidly')
    .then(() => {console.log('Connected to the MongoDB...')})
    .catch(err => console.error('Couldn\'t connect to MongoDB ', err));

app.use(express.json());
app.use('/api/genres', genres);
app.use('/api/customers', customers);
app.use('/api/movies', movies);
app.use('/api/rentals', rentals);

app.listen(PORT, () => { console.log(`Listening on port ${PORT}`); });

