const express = require('express');
const router = express.Router();
const { bookingController } = require('../controllers/booking.controllers');

// ! Backend Test  Booking Route
// ? ${BASE_URL}/bookings
router.get('/', (req, res) => {
    res.status(200).send({
        message: 'Success',
        status: 200,
        dataObject: {
            appName: 'Pack Ur Bags',
            routeName: 'Booking Service Test Route',
            workingStatus: 'Working as expected'
        }
    });
});
// ! Backend Test  Booking Route

module.exports = router;