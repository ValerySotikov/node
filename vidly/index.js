const mongoose = require('mongoose');
const express = require('express');
const genres = require('./routes/genres');
const customers = require('./routes/customers');
const app = express();

const PORT = process.env.PORT || 8000;

mongoose.connect('mongodb://localhost/vidly')
    .then(() => {console.log('Connected to the MongoDB...')})
    .catch(err => console.error('Couldn\'t connect to MongoDB ', err));

app.use(express.json());
app.use('/api/genres', genres);
app.use('/api/customers', customers);

app.listen(PORT, () => { console.log(`Listening on port ${PORT}`); });

