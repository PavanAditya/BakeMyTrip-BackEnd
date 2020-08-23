const express = require('express');
const router = express.Router();
const { authController } = require('../controllers/auth.controllers');

// ! Backend Test Auth Route
// ? http://localhost:3000/api/v1/auth
router.get('/', (req, res) => {
    res.status(200).send({
        message: 'Success',
        status: 200,
        data: {
            appName: 'Bake My Trip',
            routeName: 'Auth Service Test Route',
            workingStatus: 'Working as expected'
        }
    });
});
// ! Backend Test Auth Route

module.exports = router;