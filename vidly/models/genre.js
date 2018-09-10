const mongoose = require('mongoose');
const Joi = require('joi');

const Genre = mongoose.model('Genre', new mongoose.Schema({
    name: {
        type: String,
        required: true,
        lowercase: true,
        minlength: 2,
        maxlength: 255
    }
}));


function validateGenre(name) {
    const schema = {
        name: Joi.string().min(3).required()
    }

    return Joi.validate(name, schema);
}


exports.Genre = Genre;
exports.validate = validateGenre