const bcrypt = require('bcrypt');
const _ = require('lodash');
const express = require('express');
const router = express.Router();
const {User} = require('../models/user');
const Joi = require('joi');

router.post('/', async (req, res) => {
  const {error} = validate(req.body);
  if (error) res.status(400).send(error.details[0].message);

  let user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send('User already registered');

  let validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) return res.status(400).send('Invalid email or password');

  let token = user.generateAuthToken();
  res.send(token);
});

function validate(user) {
  const schema = {
    email: Joi.string().min(5).max(60).required().email(),
    password: Joi.string().min(5).required()
  };

  return Joi.validate(user, schema);
}

module.exports = router;