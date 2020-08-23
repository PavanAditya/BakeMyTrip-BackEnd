const express = require('express');
const router = express.Router();
const { userController } = require('../controllers/user.controllers');

// ! Backend Test User Route
// ? http://localhost:3000/api/v1/users
router.get('/', (req, res) => {
    res.status(200).send({
        message: 'Success',
        status: 200,
        data: {
            appName: 'Bake My Trip',
            routeName: 'User Service Test Route',
            workingStatus: 'Working as expected'
        }
    });
});
// ! Backend Test User Route

module.exports = router;