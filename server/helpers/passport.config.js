const passport = require('passport');
const { googlePassportStratergy } = require('./google.passport');

const passportConfig = app => {
    app.use(passport.initialize());
    passport.serializeUser((user, done) => {
        done(null, user);
    });
    googlePassportStratergy();
};

module.exports = {
    passportConfig: passportConfig
};