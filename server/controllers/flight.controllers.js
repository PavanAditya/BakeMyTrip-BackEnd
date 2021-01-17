const { flightSchema } = require('../models/flight.model');

const allFlightDetails = async (req, res, next) => {
    try {
        const allFlights = await flightSchema.find({});
        if (!allFlights) {
            res.status(404).send({
                message: 'Flights Not Found.',
                status: 404,
                dataObject: {
                    appName: 'Pack Ur Bags',
                    routeName: 'All Flight Details Route',
                    data: 'No Flights found.'
                }
            });
            return;
        }
        res.status(200).send({
            message: 'Flights Fetched Successfully',
            status: 200,
            dataObject: {
                appName: 'Pack Ur Bags',
                routeName: 'All Flight Details Route',
                data: allFlights
            }
        });
    } catch (err) {
        res.status(500).send({
            message: 'Flights Fetch Error.',
            status: 500,
            dataObject: {
                appName: 'Pack Ur Bags',
                routeName: 'All Flight Details Route',
                data: {
                    errorMessage: 'Flights fetch failed at DB level.',
                    error: `${err}`
                }
            }
        });
    }
};

const singleFlightDetails = async (req, res, next) => {
    try {
        const flightDetails = await flightSchema.find({name: req.body.name});
        if (!flightDetails) {
            res.status(404).send({
                message: 'Flight Not Found.',
                status: 404,
                dataObject: {
                    appName: 'Pack Ur Bags',
                    routeName: 'Single Flight Details Route',
                    data: 'No Flight with the given name found.'
                }
            });
            return;
        }
        res.status(200).send({
            message: 'Flight Fetched Successfully',
            status: 200,
            dataObject: {
                appName: 'Pack Ur Bags',
                routeName: 'Single Flight Details Route',
                data: flightDetails
            }
        });
    } catch (err) {
        res.status(500).send({
            message: 'Flights Fetch Error.',
            status: 500,
            dataObject: {
                appName: 'Pack Ur Bags',
                routeName: 'Single Flight Details Route',
                data: {
                    errorMessage: 'Flight Details fetch failed at DB level.',
                    error: `${err}`
                }
            }
        });
    }
};

const routeFlightDetails = async (req, res, next) => {
    try {
        const routeFlightDetails = await flightSchema.find({
            from: req.body.from,
            to: req.body.to,
        });
        if (!routeFlightDetails) {
            res.status(404).send({
                message: 'Flight Not Found.',
                status: 404,
                dataObject: {
                    appName: 'Pack Ur Bags',
                    routeName: 'Particular Route Flight Details Route',
                    data: 'No Flights found between the mentioned airports.'
                }
            });
            return;
        }
        res.status(200).send({
            message: 'Flight Fetched Successfully',
            status: 200,
            dataObject: {
                appName: 'Pack Ur Bags',
                routeName: 'Particular Route Flight Details Route',
                data: routeFlightDetails
            }
        });
    } catch (err) {
        res.status(500).send({
            message: 'Flights Fetch Error.',
            status: 500,
            dataObject: {
                appName: 'Pack Ur Bags',
                routeName: 'Particular Route Flight Details Route',
                data: {
                    errorMessage: 'Flights Details fetch failed at DB level.',
                    error: `${err}`
                }
            }
        });
    }
};

const flightController = {
    allFlightDetails,
    routeFlightDetails,
    singleFlightDetails
};

module.exports = { flightController };