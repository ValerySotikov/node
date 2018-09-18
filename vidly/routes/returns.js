const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const {Rental, validate} = require('../models/rental');

router.post('/api/returns', async (req, res) => {
//   //  Return 401 if client is not logged in *** DONE
// //  Return 400 if customerId is not provided *** DONE
// //  Return 400 if movieId is not provided *** DONE
//   const { error } = validate(req.body);
//     if (error) return res.status(400).send(error.details[0].message);
// //  Return 404 if no rental found for this customer/movie *** DONE
//   const rental = Rental.find({
//     customerId: req.body.customerId,
//     movieId: req.body.movieId
//   });

//   if (!rental) return res.status(404).send('No rental found for this customer / movie');
// //  Return 400 if rental already processed
// if (rental.returnedDate.getTime() <= Date.now()) return res.status(400).send('It is processed');
// //  Return 200 if is valid request

// //  Set the return date
// //  Calculate the rental fee
// //  Increase the stock
// //  Return the rental

  if (!req.body.customerId) return res.status(400).send('customerId not provided');
  if (!req.body.movieId) return res.status(400).send('movieId not provided');
  res.status(401).send('Unauthorized');
});

module.exports = router;