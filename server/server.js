// ! npm imports
const express = require('express');
const bodyParser = require('body-parser');
let cors = require('cors');
// ! npm imports

// ! linked imports
const adminRoute = require('./routes/admin.routes');
const authRoute = require('./routes/auth.routes');
const bookingRoute = require('./routes/booking.routes');
const flightRoute = require('./routes/flight.routes');
const passportRoute = require('./routes/passport.routes');
const userRoute = require('./routes/user.routes');
const passportConfig = require('./helpers/passport.config');
// ! linked imports

// ! operating vars
const PORT = process.env.PORT || 4000;
const app = express();
const httpServer = app.listen(PORT, () => { });
// ! operating vars

// ! parsing input request bodies
app.use(bodyParser.json());
// ! parsing input request bodies

// ! CORS configuration
// app.use((req, resp, next) => {
//     // ? before continuing the request to next middleware just written below this middleware want to remove CORS error
//     resp.header('Access-Control-Allow-Origin', '*'); // ? Allowing access to specific the url/paths
//     resp.header('Access-Control-Allow-Credentials', true); // ? Allowing access Credentials
//     resp.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization, PUB_AUTH'); // ? Allowing these headers key
//     resp.setHeader('Access-Control-Expose-Headers', 'record-count, my-token, x-auth'); // ? Allowing the custom-header to be exposed to frontend
//     resp.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, PUT, OPTIONS'); // ? Allowing these REST Methods
//     next();
// });
app.use(cors());
// ! CORS configuration

// ! Passport Confogurations
passportConfig.passportConfig(app);
// ! Passport Confogurations

// ! Backend Test Route
app.get('/', (req, res) => {

    res.status(200).send({
        message: 'Success',
        status: 200,
        dataObject: {
            appName: 'Pack Ur Bags',
            routeName: 'Server Test Route',
            workingStatus: 'Working as expected'
        }
    });
});
// ! Backend Test Route

// ! Routes Definiton

// ! Admin Routes
// ? ${BASE_URL}/admin
app.use('/api/v1/admin', adminRoute);
// ! Admin Routes

// ! Auth Routes
// ? ${BASE_URL}/auth
app.use('/api/v1/auth', authRoute);
// ! Auth Routes

// ! Booking Routes
// ? ${BASE_URL}/bookings
app.use('/api/v1/bookings', bookingRoute);
// ! Booking Routes

// ! Flight Routes
// ? ${BASE_URL}/flights
app.use('/api/v1/flights', flightRoute);
// ! Flight Routes

// ! Passport Routes
// ? ${BASE_URL}/passport
app.use('/api/v1/passport', passportRoute);
// ! Passport Routes

// ! User Routes
// ? ${BASE_URL}/users
app.use('/api/v1/users', userRoute);
// ! User Routes


// ! Routes Definiton