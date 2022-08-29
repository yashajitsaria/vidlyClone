const express = require('express');
const router = express.Router();
const { Customer } = require('../models/customers');

router.get('/', async (req, res) => {
    const customers = await Customer.find();
    res.send(customers);
})


router.get('/:id', async (req, res) => {
    const customer = await Customer.findById(req.params.id);
    if (!customer) return res.status(404).send('customer Not Found.');
    res.send(customer);
})

router.post('/', async (req, res) => {
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