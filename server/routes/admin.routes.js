const express = require('express');
const router = express.Router();
const { adminController } = require('../controllers/admin.controllers');

// ! Backend Test Admin Route
// ? http://localhost:3000/api/v1/admin
router.get('/', (req, res) => {
    res.status(200).send({
        message: 'Success',
        status: 200,
        data: {
            appName: 'Bake My Trip',
            routeName: 'Admin Service Test Route',
            workingStatus: 'Working as expected'
        }
    });
});
// ! Backend Test Admin Route

module.exports = router;