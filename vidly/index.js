const Joi = require('joi');
const express = require('express');
const genres = require('./routes/genres');
const app = express();

const PORT = process.env.PORT || 8000;

app.use(express.json());
app.use('/api/genres', genres);

app.listen(PORT, () => { console.log(`Listening on port ${PORT}`); });

