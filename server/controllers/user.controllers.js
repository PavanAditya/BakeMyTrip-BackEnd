const { userSchema } = require('../models/user.model');

const allUserDetails = async (req, res, next) => {
    try {
        const allUsers = await userSchema.find({});
        if (!allUsers) {
            res.status(404).send({
                message: 'User Not Found.',
                status: 404,
                dataObject: {
                    appName: 'Pack Ur Bags',
                    routeName: 'All User Details Route',
                    data: 'No Users found.'
                }
            });
            return;
        }
        res.status(200).send({
            message: 'Users Fetched Successfully',
            status: 200,
            dataObject: {
                appName: 'Pack Ur Bags',
                routeName: 'All User Details Route',
                data: allUsers
            }
        });
    } catch (err) {
        res.status(500).send({
            message: 'Users Fetch Error.',
            status: 500,
            dataObject: {
                appName: 'Pack Ur Bags',
                routeName: 'All User Details Route',
                data: {
                    errorMessage: 'Users fetch failed at DB level.',
                    error: `${err}`
                }
            }
        });
    }
};

const singleUserDetails = async (req, res, next) => {
    try {
        const userProfile = await userSchema.find({
            email: req.user.email
        });
        if (!userProfile) {
            res.status(404).send({
                message: 'User Not Found.',
                status: 404,
                dataObject: {
                    appName: 'Pack Ur Bags',
                    routeName: 'Single User Details Route',
                    data: 'No Users found.'
                }
            });
            return;
        }
        res.status(200).send({
            message: 'User Data Fetched Successfully',
            status: 200,
            dataObject: {
                appName: 'Pack Ur Bags',
                routeName: 'Single User Details Route',
                data: userProfile
            }
        });
    } catch (err) {
        res.status(500).send({
            message: 'Users Fetch Error.',
            status: 500,
            dataObject: {
                appName: 'Pack Ur Bags',
                routeName: 'Single User Details Route',
                data: {
                    errorMessage: 'Users fetch failed at DB level.',
                    error: `${err}`
                }
            }
        });
    }
};

const updateUserDetails = async (req, res, next) => {
    try {
        const userProfile = await userSchema.findOneAndUpdate(
            { email: req.body.email },
            {
                $set: {
                    firstName: req.body.firstName,
                    lastName: req.body.lastName,
                    email: req.body.email,
                    mobileNumber: req.body.mobileNumber,
                    picture: req.body.picture
                }
            }, { new: true, useFindAndModify: false });
        if (!userProfile) {
            res.status(404).send({
                message: 'User Not Found.',
                status: 404,
                dataObject: {
                    appName: 'Pack Ur Bags',
                    routeName: 'Update User Details Route',
                    data: 'No Users found.'
                }
            });
            return;
        }
        res.status(200).send({
            message: 'User Data Updated Successfully',
            status: 200,
            dataObject: {
                appName: 'Pack Ur Bags',
                routeName: 'Update User Details Route',
                data: [userProfile]
            }
        });
    } catch (err) {
        res.status(500).send({
            message: 'Users Update Error.',
            status: 500,
            dataObject: {
                appName: 'Pack Ur Bags',
                routeName: 'Update User Details Route',
                data: {
                    errorMessage: 'Users update failed at DB level.',
                    error: `${err}`
                }
            }
        });
    }
};

const userController = {
    allUserDetails,
    singleUserDetails,
    updateUserDetails
};

module.exports = { userController }