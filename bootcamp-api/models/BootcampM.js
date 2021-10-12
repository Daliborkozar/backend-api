const mongoose = require('mongoose')


// Schema
const bootcampsSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please provide a name to the bootcamo'],
        unique: true,
    },
    rating: {
        type: Number,
        required: [true.valueOf, 'please provide a rating for bootcamp'],
    },
    description: {
        type: String,
        required: [true, 'please provide description for bootcamp'],
    },
    price: {
        type: Number,
        required: [true, 'please provide price for bootcamp']
    }
})

// Model
const bootcamp = mongoose.model('Bootcamp', bootcampsSchema)
module.exports = bootcamp