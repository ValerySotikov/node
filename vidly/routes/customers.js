const express = require('express');
const {Customer, validate} = require('../models/customer'); //.Customer
const auth = require('../middleware/auth');

const router = express.Router();
const MSG404 = 'The customer with the given ID was not found';


router.get('/:id', async (req, res) => {
    let customer = await getSingleCustomer(req.params.id);
    if (!customer) return res.status(404).send(MSG404);
    res.send(customer);
});


router.get('/', async (req, res) => {
    let customers = await getCustomers();
    if (!customers) return res.status(404).send(MSG404);
    res.send(customers);
});


router.delete('/:id', auth, async (req, res) => {
    let customer = await deleteCustomer(req.params.id);
    if (!customer) res.status(404).send(MSG404);
    res.send(customer);
});


router.put('/:id', auth, async (req, res) => {
    const {error} = validate(req.body);
    if (error) res.status(400).send(error.details[0].message);

    let customer = await putCustomer(req.params.id, req.body);
    if (!customer) res.status(404).send(MSG404);
    res.send(customer);
});


router.post('/', auth, async (req, res) => {
    const {error} = validate(req.body);
    if (error) res.status(400).send(error.details[0].message);
    
    let result = await postCustomer(req.body);
    res.send(result);
});


async function getSingleCustomer(id) {
    let result = await Customer.findById(id);
    return result;
}


async function getCustomers() {
    let customers = Customer.find().sort();
    return customers;
}


async function postCustomer(body) {
    let customer = new Customer(body);
    customer = await customer.save();
    return customer;
}


async function putCustomer(id, body) {
    let customer = await Customer.findByIdAndUpdate(id, body, {new: true});
    let result = await customer.save();
    return result;
}


async function deleteCustomer(id) {
    let result = await Customer.findByIdAndRemove(id);
    return result;
}


module.exports = router;
