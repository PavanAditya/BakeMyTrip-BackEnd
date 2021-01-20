const express = require('express');
const router = express.Router();
const { userController } = require('../controllers/user.controllers');
const { authGuard } = require('../middleware/auth.guard');

// ! Backend Test User Route
// ? ${BASE_URL}/users
router.get('/', (req, res) => {
    res.status(200).send({
        message: 'Success',
        status: 200,
        dataObject: {
            appName: 'Pack Ur Bags',
            routeName: 'User Service Test Route',
            workingStatus: 'Working as expected'
        }
    });
});
// ! Backend Test User Route

// ! Get All Users Details
// ?  ${BASE_URL}/users/all
router.get('/all', userController.allUserDetails);

// ! Get Single User Details
// ? ${BASE_URL}/users/one
router.get('/one', authGuard, userController.singleUserDetails);

// ! Update Single User Details
// ? ${BASE_URL}/users/update
router.put('/update', userController.updateUserDetails);

module.exports = router;