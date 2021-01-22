const express = require('express');
const router = express.Router();
const { flightController } = require('../controllers/flight.controllers');

// ! Backend Test Flight Route
// ? ${BASE_URL}/flights
router.get('/', (req, res) => {
    res.status(200).send({
        message: 'Success',
        status: 200,
        dataObject: {
            appName: 'Pack Ur Bags',
            routeName: 'Flight Service Test Route',
            workingStatus: 'Working as expected'
        }
    });
});
// ! Backend Test Flight Route

// ! Get All Flights Details
// ?  ${BASE_URL}/flights/all
router.get('/all', flightController.allFlightDetails);

// ! Get Selected route Flights Details
// ?  ${BASE_URL}/flights/search/:searchQuery
router.get('/search/:searchQuery', flightController.searchFlightDetails);

// ! Get Single Flight Details
// ?  ${BASE_URL}/flights/one/:id
router.get('/one/:id', flightController.singleFlightDetails);

module.exports = router;