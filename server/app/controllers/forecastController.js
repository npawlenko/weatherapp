function forecastController(db) {
    const Joi = require("joi");
    const {City, Forecast} = db;
    const {response} = require("./../helpers/requestHelper");

    const forecastForCity = async (req, res) => {
        const {error: validationError, value: cityId} = Joi.number().integer().min(1).required()
            .validate(req.params.cityId);
        if (typeof validationError !== "undefined") {
            return res.send(response(validationError.message, false));
        }

        const forecasts = await Forecast.findAll({
            include: [{
                model: City
            }]
        });
        res.send(forecasts);
    };


    return {
        forecastForCity
    };
}

module.exports = forecastController;

