const uniqueValidator = require('mongoose-unique-validator')
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const mongoose = require();

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        default: null
    },
    userName: {
        type: String,
        required: true,
        default: null
    },
    email: {
        type: String,
        unique: true
    },
    mobileNumber: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    tokens: [{
        type: String,
        required: true
    }],
    verifiedPhNum: {
        type: Boolean,
        default: false
    },
    createdDate: {
        type: Date,
        default: Date.now,
        required: true
    }
});