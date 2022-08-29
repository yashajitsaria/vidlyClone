const mongoose = require('mongoose');
const Joi = require('joi');
const { func } = require('joi');

const Rental = mongoose.model('Rental', mongoose.Schema({
    customer: {
        type: new mongoose.Schema({
            name: {
                type: String,
                required: true
            },
            isGold: {
                type: Boolean,
                default: false
            },
            phone: {
                type: String,
                required: true
            }
        }),
        required: true
    },
    movie: {
        type: mongoose.Schema({
            title: {
                type: String,
                required: true
            },
            dailyRentalRate: {
                type: Number,
                required: true
            }
        }),
        required: true
    },
    dateOut: {
        type: Date,
        required: true,
        default: Date.now
    },
    dateReturned: {
        type: Date,
    },
    rentalFee: {
        type: Number
    }
}));

function validateRental(rental){
    const schema = {
        customerId: Joi.string().required(),
        movieId: Joi.string().required()
    }
    return Joi.validate(rental, schema);
}