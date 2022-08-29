const mongoose = require('mongoose');

const Customer = mongoose.model('Customer', mongoose.Schema({
    isGold: Boolean,
    name: String,
    phone: String
}));

module.exports = Customer;