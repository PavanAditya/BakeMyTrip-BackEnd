const express = require('express');
const router = express.Router();
const { bookingController } = require('../controllers/booking.controllers');

// ! Backend Test  Booking Route
// ? http://localhost:3000/api/v1/bookings
router.get('/', (req, res) => {
    res.status(200).send({
        message: 'Success',
        status: 200,
        data: {
            appName: 'Bake My Trip',
            routeName: 'Booking Service Test Route',
            workingStatus: 'Working as expected'
        }
    });
});
// ! Backend Test  Booking Route

module.exports = router;