const express = require('express');
const router = express.Router();
const { passportController } = require('../controllers/flight.controllers');

// ! Backend Test Passport Route
// ? http://localhost:3000/api/v1/passport
router.get('/', (req, res) => {
    res.status(200).send({
        message: 'Success',
        status: 200,
        data: {
            appName: 'Pack Ur Bags',
            routeName: 'Passport Service Test Route',
            workingStatus: 'Working as expected'
        }
    });
});
// ! Backend Test Passport Route

module.exports = router;