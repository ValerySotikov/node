const mongoose = require('mongoose');
const Joi = require('joi');

const genreSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 255
    }
});

const Genre = mongoose.model('Genre', genreSchema);

function validateGenre(name) {
    const schema = {
        name: Joi.string().min(3).required()
    }

    return Joi.validate(name, schema);
}

exports.genreSchema = genreSchema;
exports.Genre = Genre;
exports.validate = validateGenre