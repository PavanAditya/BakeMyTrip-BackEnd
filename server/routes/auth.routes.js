const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controllers');
const { authGuard } = require('../middleware/auth.guard');

// ! Backend Test Auth Route
// ? ${BASE_URL}/auth
router.get('/', (req, res) => {
    res.status(200).send({
        message: 'Success',
        status: 200,
        dataObject: {
            appName: 'Pack Ur Bags',
            routeName: 'Auth Service Test Route',
            workingStatus: 'Working as expected'
        }
    });
});
// ! Backend Test Auth Route

// ! User Logout
// ? ${BASE_URL}/auth/logout
router.post('/logout', authGuard, authController.logout);

module.exports = router;