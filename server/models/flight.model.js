const { mongoose } = require('../db/mongoose.config');

const flightSchema = mongoose.Schema({
    name: {
        type: String,
        required: false,
    },
    from: {
        type: String,
        required: false,
    },
    to: {
        type: String,
        required: false,
    },
    price: {
        type: Number,
        required: false
    },
    numOfStops: {
        type: Number,
        default: 0,
        required: false
    },
    arrival: {
        type: String,
        required: false,
    },
    dept: {
        type: String,
        required: false,
    },
    numOfSeats: {
        type: Number,
        required: false
    },
    seatsAvailable: {
        type: Number,
        required: false
    },
    flightImage: {
        type: String,
        required: false,
    },
    flightTail: {
        type: String,
        required: false,
    },
    brand: {
        type: String,
        required: false,
    },
    handicappedAllowed: {
        type: Boolean,
        default: false,
        required: false,
    },
    ancillaryServices: [{
        type: String,
        required: false,
    }],
    createdDate: {
        type: Date,
        default: Date.now,
        required: false
    }
});

const mongooseFlightSchema = new mongoose.model('flights', flightSchema);

module.exports = {
    flightSchema: mongooseFlightSchema
};