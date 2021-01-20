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

// ! User Registration
// ? ${BASE_URL}/auth/register
router.post('/register', authController.signUp);

// ! User Login with Email
// ? ${BASE_URL}/auth/login/email
router.post('/login/email', authController.signInWithEmail);

// ! User Login with Phone Number
// ? ${BASE_URL}/auth/login/phone
router.post('/login/phone', authController.signInWithPhNum);

// ! User Logout
// ? ${BASE_URL}/auth/logout
router.post('/logout', authGuard, authController.logout);

module.exports = router;