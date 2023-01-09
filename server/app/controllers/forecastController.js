function forecastController(db) {
    const Joi = require("joi");
    const {City, Forecast} = db;
    const {response} = require("./../helpers/requestHelper");

    const currentForecast = async (req, res) => {
        const {error: validationError, value: cityId} = Joi.number().integer().min(1).required()
            .validate(req.params.cityId);
        if (typeof validationError !== "undefined") {
            return res.send(response(validationError.message, false));
        }

        res.send("Not implemented yet");
    };

    const todayForecast = async (req, res) => {
        const {error: validationError, value: cityId} = Joi.number().integer().min(1).required()
            .validate(req.params.cityId);
        if (typeof validationError !== "undefined") {
            return res.send(response(validationError.message, false));
        }


        res.send("Not implemented yet");
    };

    const fiveDayForecast = async (req, res) => {
        const {error: validationError, value: cityId} = Joi.number().integer().min(1).required()
            .validate(req.params.cityId);
        if (typeof validationError !== "undefined") {
            return res.send(response(validationError.message, false));
        }

        res.send("Not implemented yet");
    };

    return {
        currentForecast,
        todayForecast,
        fiveDayForecast
    };
}

module.exports = forecastController;

