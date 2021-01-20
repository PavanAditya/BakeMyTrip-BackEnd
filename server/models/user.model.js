const uniqueValidator = require('mongoose-unique-validator');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { mongoose } = require('../db/mongoose.config');

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        default: null
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    mobileNumber: {
        type: String,
        unique: true
    },
    picture: {
        type: String,
        required: false,
        default: null
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
    },
    lastUpdateDateTime: {
        type: Date,
        default: Date.now,
        required: true
    },
    userType: {
        type: String,
        required: true,
        default: 'passenger'
    }
});

userSchema.plugin(uniqueValidator);

userSchema.methods.generateAuthToken = async function () {
    const user = this;
    const userAuthToken = jwt.sign({
        email: user.email,
        mobileNumber: user.mobileNumber
    }, 'msp-packurbags');
    user.tokens.push(userAuthToken);
    await user.save();
    return {
        userAuthToken,
        user
    };
};

userSchema.methods.getNewAuthToken = function (email, mobileNumber) {
    const userAuthToken = jwt.sign({
        email,
        mobileNumber
    }, 'msp-packurbags');
    return userAuthToken;
};

userSchema.statics.findByCredentialsEmail = async (email, password) => {
    const user = await mongooseUserSchema.findOne({
        email: email
    });

    if (!user) {
        return null;
    }
    const isMatch = await bcryptjs.compare(password, user.password);
    if (!isMatch) {
        return false;
    }
    return user;
};

userSchema.statics.findByCredentialsPhNum = async (mobileNumber, password) => {
    const user = await mongooseUserSchema.findOne({
        mobileNumber: mobileNumber
    });

    if (!user) {
        return null;
    }
    const isMatch = await bcryptjs.compare(password, user.password);
    if (!isMatch) {
        return false;
    }
    return user;
};

userSchema.pre('save', async function (next) {
    const user = this;
    if (user.signUp) {
        user.password = await bcryptjs.hash(user.password, 10);
    }
    next();
});

const mongooseUserSchema = new mongoose.model('users', userSchema);

module.exports = {
    userSchema: mongooseUserSchema
};