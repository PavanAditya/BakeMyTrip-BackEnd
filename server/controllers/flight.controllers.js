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
        const flightDetails = await flightSchema.find({ name: req.body.name });
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

const searchFlightDetails = async (req, res, next) => {
    try {
        const reqSearchObj = JSON.parse(req.params.searchQuery);
        let flightFliterQuery = {
            from: reqSearchObj.from,
            to: reqSearchObj.to,
            seatsAvailable: { $gte: ((reqSearchObj.adults * 1) + (reqSearchObj.children * 1)) }
        };
        if (reqSearchObj.priceRange) {
            flightFliterQuery = {
                ...flightFliterQuery,
                price: {
                    $elemMatch: {
                        $gte: (reqSearchObj.priceRange.spilt('-')[0] * 1),
                        $lt: (reqSearchObj.priceRange.spilt('-')[1] * 1)
                    }
                }
            };
        }
        if (reqSearchObj.ancillaryServices) {
            flightFliterQuery = {
                ...flightFliterQuery,
                ancillaryServices: { $all: reqSearchObj.ancillaryServices }
            };
        }
        if (reqSearchObj.handicappedAllowed) {
            flightFliterQuery = {
                handicappedAllowed: reqSearchObj.handicappedAllowed
            };
        }
        if (reqSearchObj.numOfStops === 0) {
            flightFliterQuery = {
                ...flightFliterQuery,
                numOfStops: 0
            };
        }
        if (reqSearchObj.arrival) {
            flightFliterQuery = {
                ...flightFliterQuery,
                arrival: {
                    $elemMatch: {
                        $gte: (reqSearchObj.arrivalRange.spilt('-')[0] * 1),
                        $lt: (reqSearchObj.arrivalRange.spilt('-')[1] * 1)
                    }
                }
            };
        }
        if (reqSearchObj.dept) {
            flightFliterQuery = {
                ...flightFliterQuery,
                dept: {
                    $elemMatch: {
                        $gte: (reqSearchObj.deptRange.spilt('-')[0] * 1),
                        $lt: (reqSearchObj.deptRange.spilt('-')[1] * 1)
                    }
                }
            };
        }
        if (reqSearchObj.brand) {
            flightFliterQuery = {
                ...flightFliterQuery,
                brand: { $in: reqSearchObj.brand }
            };
        }
        if (reqSearchObj.toDate) {
            flightFliterQuery = {
                $or: [
                    {...flightFliterQuery},
                    {
                        ...flightFliterQuery,
                        from: reqSearchObj.to,
                        to: reqSearchObj.from,
                    }
                ]
            };
        }
        console.log(flightFliterQuery, 'flight search');
        const routeFlightDetails = await flightSchema.find(flightFliterQuery);
        if (!routeFlightDetails) {
            res.status(404).send({
                message: 'Flights Not Found.',
                status: 404,
                dataObject: {
                    appName: 'Pack Ur Bags',
                    routeName: 'Search Flight Details Route',
                    data: 'Flights search for the Applied Filters failed.'
                }
            });
            return;
        }
        if (!routeFlightDetails[0]) {
            res.status(204).send({
                message: 'No Flights found the Applied Filters.',
                status: 204,
                dataObject: {
                    appName: 'Pack Ur Bags',
                    routeName: 'Search Flight Details Route',
                    dataMessage: 'No Flights found the Applied Filters.'
                }
            });
            return;
        }
        res.status(200).send({
            message: 'Flight Fetched Successfully',
            status: 200,
            dataObject: {
                appName: 'Pack Ur Bags',
                routeName: 'Search Flight Details Route',
                data: routeFlightDetails
            }
        });
    } catch (err) {
        res.status(500).send({
            message: 'Flights Fetch Error.',
            status: 500,
            dataObject: {
                appName: 'Pack Ur Bags',
                routeName: 'Search Flight Details Route',
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
    searchFlightDetails,
    singleFlightDetails
};

module.exports = { flightController };