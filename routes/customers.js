const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Customer = mongoose.model('Customer', mongoose.Schema({
    isGold: Boolean,
    name: String,
    phone: String
}));

router.get('/', async (req, res) => {
    const customers = await Customer.find();
    res.send(customers);
})


router.get('/:id', async (req, res) => {
    const customer = await Customer.findById(req.params.id);
    // const customer = customers.find((c) => c.id === parseInt(req.params.id));
    if (!customer) return res.status(404).send('customer Not Found.');
    res.send(customer);
})

router.post('/', async (req, res) => {
    // const customerExists = await Customer.find({ name: req.body.name });
    // if (customerExists) return res.status(403).send('Access Denied: customer already exist.');

    let customer = new customer({
        name: req.body.name
    })

    customer = await Customer.save();
    res.send(customer);
})

router.put('/:id', async (req, res) => {
    const customer = await Customer.findByIdAndUpdate(req.params.id, {
        name: req.body.name
    }, {
        new: true
    });
    if (!customer) return res.status(404).send('customer Not Found.');

    res.send(customer);
})

router.delete('/:id', async (req, res) => {
    const customer = await Customer.findByIdAndRemove(req.params.id);
    if (!customer) return res.status(404).send('customer Not Found.');

    res.send(customer);
})

module.exports = router;