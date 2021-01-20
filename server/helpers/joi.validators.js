const joi = require('joi');

const joiSchemaForSignUpForm = joi.object().keys({
    password: joi.string().regex(/^(?=.*[A-Z])(?=.*[!@#$&*\^%\*\.])(?=.*[0-9])(?=.*[a-z]).{8,32}$/),
    confirmPassword: joi.string().regex(/^(?=.*[A-Z])(?=.*[!@#$&*\^%\*\.])(?=.*[0-9])(?=.*[a-z]).{8,32}$/),
    firstName: joi.string().min(3),
    lastName: joi.string().min(1),
    mobileNumber: joi.string().regex(/^[0-9]{10}$/),
    email: joi.string().regex(/^[\w\.?]+@\w+\.(com|net|edu)$/)
});
const schemaForSignUpForm = (req) => joiSchemaForSignUpForm.validate({
    password: req.body.password,
    confirmPassword: req.body.confirmPassword,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    mobileNumber: req.body.mobileNumber,
    email: req.body.email
});


const joiSchemaForEmailSignInForm = joi.object().keys({
    password: joi.string().regex(/^(?=.*[A-Z])(?=.*[!@#$&*\^%\*\.])(?=.*[0-9])(?=.*[a-z]).{8,32}$/),
    email: joi.string().regex(/^[\w\.?]+@\w+\.(com|net|edu)$/)
});
const schemaForEmailSignInForm = (req) => joiSchemaForEmailSignInForm.validate({
    password: req.body.password,
    email: req.body.email
});

const joiSchemaForPhNumSignInForm = joi.object().keys({
    password: joi.string().regex(/^(?=.*[A-Z])(?=.*[!@#$&*\^%\*\.])(?=.*[0-9])(?=.*[a-z]).{8,32}$/),
    mobileNumber: joi.string().regex(/^[0-9]{10}$/)
});
const schemaForPhNumSignInForm = (req) => joiSchemaForPhNumSignInForm.validate({
    password: req.body.password,
    mobileNumber: req.body.mobileNumber
});

module.exports = {
    schemaForSignUpForm,
    schemaForEmailSignInForm,
    schemaForPhNumSignInForm
};