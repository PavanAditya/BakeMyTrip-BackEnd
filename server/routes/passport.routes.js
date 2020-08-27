const express = require('express');
const router = express.Router();
const { authController } = require('../controllers/auth.controllers');

// ! Backend Test Passport Route
// ? http://localhost:3000/api/v1/passport
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
// ? http://localhost:3000/api/v1/passport/google
router.route('/google').get(passport.authenticate('google', {
    scope: [
        'profile',
        'email'
    ]
}));
// ! Google Passport Login

// ! Failure Redirect route
// ? http://localhost:3000/api/v1/passport/failure
router.route('/failure').get((req, resp) => {
    // resp.redirect('https://packurbags.pavanaditya.com/');
    resp.redirect('http://localhost:4200/login');
});
// ! Failure Redirect route

// ! Generate auth token for google login
// ? http://localhost:3000/api/v1/passport/google/generateToken
router.route('/google/generateToken').get(passport.authenticate('google', {
    failureRedirect: '/failure'
}), authController.generateAuthToken);
// ! Generate auth token for google login

module.exports = router;