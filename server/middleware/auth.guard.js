const jwt = require('jsonwebtoken');
const { userSchema } = require('../models/user.model');

const authGuard = async(req, res, next) => {
    try {
        const userAuthToken = req.header('PUB_AUTH').replace('PUB_TOKEN_BEARER ', '');
        // const userData = await userSchema.findOne({
        //     'tokens.token': userAuthToken
        // });
        const UserDetailsFromToken = jwt.verify(userAuthToken, 'msp-packurbags');
        const userData = await userSchema.findOne({
            email: UserDetailsFromToken.email
        });
        if (userData) {
            req.user = userData;
        } else {
            res.status(404).send({
                message: 'User Not Found.',
                status: 404,
                dataObject: {
                    appName: 'Pack Ur Bags',
                    routeName: 'Check at auth guard middleware',
                    data: 'User not found. Token provided is invalid or expired. Please try the request logging in again.'
                }
            });
        }
        next();
    } catch (err) {
        res.status(403).send({
            message: 'Unauthorized User Request.',
            status: 403,
            dataObject: {
                appName: 'Pack Ur Bags',
                routeName: 'Check at auth guard middleware',
                data: 'User token provided is invalid or expired. Please try the request logging in again.'
            }
        });
    }
};

module.exports = {
    authGuard: authGuard
};