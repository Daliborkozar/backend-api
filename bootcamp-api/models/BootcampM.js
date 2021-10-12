const mongoose = require('mongoose')


// Schema
const bootcampsSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please privide a name"],
        unique: true,
    },
    rating: {
        type: Number,
        required: [true, "Please provide a rating"],
    },
    description: {
        type: String,
        required: [true, "Please provide a description"],
    },
    price: {
        type: Number,
        required: [true, "Please provide a price"],
    },
})

// Model
const bootcamp = mongoose.model("Bootcamp", bootcampsSchema)
module.exports = bootcamp