const joi = require('joi');

const joiSchemaForSignUpForm = joi.object().keys({
    password: joi.string().regex(/^{8,30}$/),
    confirmPassword: joi.string().regex(/^{8,30}$/),
    // userName: joi.string().regex(/^[a-zA-Z]+$/),
    firstName: joi.string().regex(/^[a-zA-Z]+$/),
    lastName: joi.string().regex(/^[a-zA-Z]+$/),
    mobileNumber: joi.string().regex(/^[0-9]{10}$/),
    email: joi.string().regex(/^[\w\.?]+@\w+\.(com|net|edu)$/)
});
const schemaForSignUpForm = (req) => joi.validate({
    password: req.body.password,
    confirmPassword: req.body.confirmPassword,
    // userName: req.body.userName,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    mobileNumber: req.body.mobileNumber,
    email: req.body.email
}, joiSchemaForSignUpForm);


const joiSchemaForEmailSignInForm = joi.object().keys({
    password: joi.string().regex(/^{8,30}$/),
    email: joi.string().regex(/^[\w\.?]+@\w+\.(com|net|edu)$/)
});
const schemaForEmailSignInForm = (req) => joi.validate({
    password: req.body.password,
    email: req.body.email
}, joiSchemaForEmailSignInForm);

const joiSchemaForPhNumSignInForm = joi.object().keys({
    password: joi.string().regex(/^{8,30}$/),
    email: joi.string().regex(/^[\w\.?]+@\w+\.(com|net|edu)$/)
});
const schemaForPhNumSignInForm = (req) => joi.validate({
    password: req.body.password,
    mobileNumber: req.body.mobileNumber
}, joiSchemaForPhNumSignInForm);

module.exports = {
    schemaForSignUpForm,
    schemaForEmailSignInForm,
    schemaForPhNumSignInForm
};