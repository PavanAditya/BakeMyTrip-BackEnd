const { userSchema } = require('../models/user.model');
const joiValidators = require('../helpers/joi.validators');
var request = require('request');

const signInWithEmail = async(req, res, next) => {
    const {
        error,
        value
    } = joiValidators.schemaForEmailSignInForm();

    if (error) {
        const errorResponse = new Error(`Input Request Pattern doesn't match the requirements.`);
        errorResponse.status = 500;
        errorResponse.message = error;
        next(errorResponse);
        return;
    }
    try {
        const user = await userSchema.findByCredentialsEmail(req.body.email, req.body.password);
        if (user === null) {
            res.status(404).send({
                message: 'User Not Found.',
                status: 404,
                dataObject: {
                    appName: 'Pack Ur Bags',
                    routeName: 'SignIn User Route',
                    data: 'No User found with the given email-id'
                }
            });
        } else if (user === false) {
            res.status(401).send({
                message: 'User Unauthorized. Email and Password combination incorrect.',
                status: 401,
                dataObject: {
                    appName: 'Pack Ur Bags',
                    routeName: 'SignIn User Route',
                    data: `User provided email and password combination didn't match with records`
                }
            });
        } else {
            const userLoginData = await user.generateAuthToken();
            if (!userLoginData) {
                res.status(500).send({
                    message: 'User Login Failed',
                    status: 500,
                    dataObject: {
                        appName: 'Pack Ur Bags',
                        routeName: 'SignIn User Route',
                        data: 'User session cannot be created.'
                    }
                });
            } else {
                res.status(200).send({
                    message: 'User Login Successful',
                    status: 200,
                    dataObject: {
                        appName: 'Pack Ur Bags',
                        routeName: 'SignIn User Route',
                        data: {
                            sessionToken: userLoginData.token,
                            firstName: userLoginData.user.firstName
                        }
                    }
                });
            }
        }
    } catch (err) {
        res.status(503).send({
            message: 'User Login Failed',
            status: 503,
            dataObject: {
                appName: 'Pack Ur Bags',
                routeName: 'SignIn User Route',
                data: {
                    errorMessage: 'Error encountered while handling the login request.',
                    error: err
                }
            }
        });
    }
}

const signInWithPhNum = async(req, res, next) => {
    const {
        error,
        value
    } = joiValidators.schemaForPhNumSignInForm();

    if (error) {
        const errorResponse = new Error(`Input Request Pattern doesn't match the ideal signin form requirements.`);
        errorResponse.status = 500;
        errorResponse.message = error;
        next(errorResponse);
        return;
    }
    try {
        const user = await userSchema.findByCredentialsPhNum(req.body.mobileNumber, req.body.password);
        if (user === null) {
            res.status(404).send({
                message: 'User Not Found.',
                status: 404,
                dataObject: {
                    appName: 'Pack Ur Bags',
                    routeName: 'SignIn User Route',
                    data: 'No User found with the given phone number'
                }
            });
        } else if (user === false) {
            res.status(401).send({
                message: 'User Unauthorized. Phone Number and Password combination incorrect.',
                status: 401,
                dataObject: {
                    appName: 'Pack Ur Bags',
                    routeName: 'SignIn User Route',
                    data: `User provided phone number and password combination didn't match with records`
                }
            });
        } else {
            const userLoginData = await user.generateAuthToken();
            if (!userLoginData) {
                res.status(500).send({
                    message: 'User Login Failed',
                    status: 500,
                    dataObject: {
                        appName: 'Pack Ur Bags',
                        routeName: 'SignIn User Route',
                        data: 'User session cannot be created.'
                    }
                });
            } else {
                res.status(200).send({
                    message: 'User Login Successful',
                    status: 200,
                    dataObject: {
                        appName: 'Pack Ur Bags',
                        routeName: 'SignIn User Route',
                        data: {
                            sessionToken: userLoginData.token,
                            firstName: userLoginData.user.firstName
                        }
                    }
                });
            }
        }
    } catch (err) {
        res.status(503).send({
            message: 'User Login Failed',
            status: 503,
            dataObject: {
                appName: 'Pack Ur Bags',
                routeName: 'SignIn User Route',
                data: {
                    errorMessage: 'Error encountered while handling the login request.',
                    error: err
                }
            }
        });
    }
}

const signInWithGoogle = async(req, res) => {
    try {
        if (req.isAuthenticated()) {
            res.status(200);
            res.redirect(`http://localhost:4200?token=${req.user.token}`);
        } else {
            res.status(404).send({
                message: 'User Not Found.',
                status: 404,
                dataObject: {
                    appName: 'Pack Ur Bags',
                    routeName: 'Google SignIn User Route',
                    data: 'No User found with the given google id.'
                }
            });
        }
    } catch (err) {
        res.status(503).send({
            message: 'User Login Failed',
            status: 503,
            dataObject: {
                appName: 'Pack Ur Bags',
                routeName: 'Google SignIn User Route',
                data: {
                    errorMessage: 'Error encountered while handling the Google Login request.',
                    error: err
                }
            }
        });
    }
};

const signUp = async(req, res, next) => {
    const {
        error,
        value
    } = joiValidators.schemaForSignUpForm(req);

    if (error) {
        const errorResponse = new Error(`Input Request Pattern doesn't match the ideal sigup form requirements.`);
        errorResponse.status = 500;
        errorResponse.message = error;
        next(errorResponse);
        return;
    }

    if (req.body.password === req.body.confirmPassword) {
        const userEmail = req.body.email;
        const userPhNum = req.body.mobileNumber;
        const userWithEmail = new userSchema.findOne({
            email: userEmail
        });
        const userWithPhNum = new userSchema.findOne({
            email: userPhNum
        });
        if (userWithEmail || userWithPhNum) {
            res.status(403).send({
                message: 'Duplicate Entry.',
                status: 403,
                dataObject: {
                    appName: 'Pack Ur Bags',
                    routeName: 'Signup User Route',
                    data: `Existing User found with the given ${userWithEmail ? ' email-id ' : ''} ${userWithEmail && userWithPhNum ? 'and' : ''} ${userWithPhNum ? ' phone number ' : ''}. Try Again.`
                }
            });
        } else {
            user.signUp = true;
            const newUser = user.save();
            if (!newUser) {
                res.status(500).send({
                    message: 'User Creation Failed.',
                    status: 500,
                    dataObject: {
                        appName: 'Pack Ur Bags',
                        routeName: 'Signup User Route',
                        data: 'User creation failed at DB level. Try Again.'
                    }
                });
            } else {
                // const userName = newUser.userName;
                const userFirstName = newUser.firstName;
                const userPhNum = newUser.mobileNumber;
                try {
                    const options = {
                        'method': 'POST',
                        'url': 'https://rest-api.d7networks.com/secure/send',
                        'headers': {
                            'Content-Type': 'application/x-www-form-urlencoded',
                            'Authorization': 'Basic eXhpYzY2Nzc6NmhIWW5PbFc' // ? dup
                                // 'Authorization': 'Basic eXhpYzY2Nzc6NmhIWW5PbFc=' // ? original
                        },
                        body: `{
                            "to": "+91${userPhNum}",
                            "from": "PUBSMS",
                            "content": "Hi ${userFirstName}\nWelcome to Pack Ur Bags. Your Account with a first name: ${userFirstName} is created Successfully.\nNow you can browse through your desired flights and can add them to you journey favourites list. Please verify your mobile number as soon as possible so that you can also get the access for booking tickets for any journey.",
                            "dlr": "yes",
                            "dlr-level": "3",
                            "dlr-url": "https://packurbags.pavanaditya.com"
                        }`
                    };

                    request(options, function(error, response) {
                        if (error) {
                            // throw new Error(error);
                            res.status(203).send({
                                message: 'User Creation Successful. SMS Notification alert Failed',
                                status: 203,
                                dataObject: {
                                    appName: 'Pack Ur Bags',
                                    routeName: 'Signup User Route',
                                    data: {
                                        errorMessage: 'SMS sending failed at d7networks server level.',
                                        errorData: error,
                                        firstName: userFirstName
                                    }
                                }
                            });
                        } else {
                            res.status(200).send({
                                message: 'User Created and Notified Successfully.',
                                status: 200,
                                dataObject: {
                                    appName: 'Pack Ur Bags',
                                    routeName: 'Signup User Route',
                                    data: {
                                        firstName: userFirstName,
                                        smsId: response.body
                                    }
                                }
                            });
                        }
                    });
                } catch (err) {
                    res.status(203).send({
                        message: 'User Creation Successful. SMS Notification alert Failed',
                        status: 203,
                        dataObject: {
                            appName: 'Pack Ur Bags',
                            routeName: 'Signup User Route',
                            data: {
                                errorMessage: 'SMS sending failed at pack ur bags server level.',
                                errorData: error,
                                firstName: userFirstName
                            }
                        }
                    });
                }
            }
        }
    } else {
        res.status(500).send({
            message: 'Bad Request. User Creation Failed',
            status: 500,
            dataObject: {
                appName: 'Pack Ur Bags',
                routeName: 'Signup User Route',
                data: `User account cannot be created as passwords doesn't match.`
            }
        });
    }
};

const logout = async(req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter(userAuthToken => {
            return userAuthToken != req.token;
        });
        req.user.signUp = false;
        const logoutUser = await req.user.save();
        if (!logoutUser) {
            res.status(500).send({
                message: 'User Logout Failed',
                status: 500,
                dataObject: {
                    appName: 'Pack Ur Bags',
                    routeName: 'Logout User Route',
                    data: 'User session cannot be terminated.'
                }
            });
        } else {
            res.status(200).send({
                message: 'User Logged out Successfully',
                status: 200,
                dataObject: {
                    appName: 'Pack Ur Bags',
                    routeName: 'Logout User Route',
                    data: 'Session Terminated.'
                }
            });
        }
    } catch (err) {
        res.status(503).send({
            message: 'User Logout Failed',
            status: 503,
            dataObject: {
                appName: 'Pack Ur Bags',
                routeName: 'Logout User Route',
                data: {
                    errorMessage: 'Error encountered while handling the logout request.',
                    error: err
                }
            }
        });
    }
};

module.exports = {
    signInWithEmail,
    signInWithPhNum,
    signInWithGoogle,
    signUp,
    logout
};