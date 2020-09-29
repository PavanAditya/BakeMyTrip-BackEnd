const express = require('express');
const passport = require('passport');
const router = express.Router();
const authController = require('../controllers/auth.controllers');

// ! Backend Test Passport Route
// ? ${BASE_URL}/passport
router.get('/', (req, res) => {
    res.status(200).send({
        message: 'Success',
        status: 200,
        dataObject: {
            appName: 'Pack Ur Bags',
            routeName: 'Passport Service Test Route',
            workingStatus: 'Working as expected'
        }
    });
});
// ! Backend Test Passport Route

// ! Google Passport Login
// ? ${BASE_URL}/passport/google
router.route('/google').get(passport.authenticate('google', {
    scope: [
        // 'profile',
        // 'email'
        'https://www.googleapis.com/auth/userinfo.profile',
        'https://www.googleapis.com/auth/userinfo.email',
        'https://www.googleapis.com/auth/user.phonenumbers.read',
        'https://www.googleapis.com/auth/user.addresses.read',
        'https://www.googleapis.com/auth/user.gender.read'
    ]
}));
// ! Google Passport Login

// ! Failure Redirect route
// ? ${BASE_URL}/passport/failure
router.route('/failure').get((req, resp) => {
    // resp.redirect('https://packurbags.pavanaditya.com/');
    resp.redirect('http://localhost:3000/login');
});
// ! Failure Redirect route

// ! Generate auth token for google login
// ? ${BASE_URL}/passport/google/generateToken
router.route('/google/generateToken').get(passport.authenticate('google', {
    failureRedirect: '/failure'
}), authController.signInWithGoogle);
// ! Generate auth token for google login

module.exports = router;