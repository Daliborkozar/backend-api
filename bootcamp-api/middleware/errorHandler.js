const ErrorResponse = require('../utils/errorResponse')

const errorHandler = (err,req,res,next) => {
    console.log(err)

    let error = {...err}

    error.message = err.message
    // check for 3 TYPES of errors
    // casterror ex: id not found
    if(err.name === "CastError") {
        const message = "Resource not found"
        error = new ErrorResponse(message, 404)
    }

    // Error status code of 11000 duplicate key error
    if(err.code === 11000) {
        const message = "Duplicate field value entered"
        error = new ErrorResponse(message, 400)
    }

    // Model validation fail
    if(err.name === "ValidationError"){
        const message = Object.values(err.errors).map(error => error.message).join(", ")
        error = new ErrorResponse(message, 400)
    }

    // add more checks...

    res.status(error.statusCode || 500).json({
        success: false,
        error: error.message || "Server error"
    })
}

module.exports = errorHandler

// da bi koristili errorHandler moramo ga staviti u najnizi nivo middlewera(na kraju)