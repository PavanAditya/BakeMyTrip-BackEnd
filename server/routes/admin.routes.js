const express = require('express');
const router = express.Router();
const { adminController } = require('../controllers/admin.controllers');

// ! Backend Test Admin Route
// ? ${BASE_URL}/admin
router.get('/', (req, res) => {
    res.status(200).send({
        message: 'Success',
        status: 200,
        dataObject: {
            appName: 'Pack Ur Bags',
            routeName: 'Admin Service Test Route',
            workingStatus: 'Working as expected'
        }
    });
});
// ! Backend Test Admin Route

module.exports = router;