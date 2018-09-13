const mongoose = require('mongoose');
const config = require('config');
const Joi = require('joi');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 60
  },
  email: {
    type: String,
    required: true,
    unique: true,
    minlength: 5,
    maxlength: 60
  },
  password: {
    type: String,
    required: true,
    minlength: 5
  }
});

userSchema.methods.generateAuthToken = function() {
  return jwt.sign({ _id: this._id }, config.get('jwtPrivateKey'));
}

const User = mongoose.model('User', userSchema);

function validateUser(user) {
  const schema = {
    name: Joi.string().min(5).max(60).required(),
    email: Joi.string().min(5).max(60).required().email(),
    password: Joi.string().min(5).required()
  };

  return Joi.validate(user, schema);
}

exports.User = User;
exports.validate = validateUser;