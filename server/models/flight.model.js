const { mongoose } = require('../db/mongoose.config');

const flightSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    from: {
        type: String,
        required: true,
    },
    to: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true
    },
    numOfStops: {
        type: Number,
        default: 0,
        required: true
    },
    arrival: {
        type: String,
        required: true,
    },
    dept: {
        type: String,
        required: true,
    },
    nomOfSeats: {
        type: Number,
        required: true
    },
    seatsBooked: {
        type: Number,
        required: true
    },
    flightImage: {
        type: String,
        required: true,
    },
    handicappedAllowed: {
        type: Boolean,
        default: false,
        required: true,
    },
    createdDate: {
        type: Date,
        default: Date.now,
        required: true
    }
});

const mongooseFlightSchema = new mongoose.model('flights', flightSchema);

module.exports = {
    flightSchema: mongooseFlightSchema
};