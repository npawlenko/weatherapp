const Joi = require("joi");
const {response} = require("../helpers/requestHelper");
const {Op} = require("sequelize");

function cityController(db) {
    const {City} = db;

    const cityById = async (req, res) => {
        const {error: validationError, value: cityId} = Joi.number().integer().min(1).required()
            .validate(req.params.cityId);
        if (typeof validationError !== "undefined") {
            return res.send(response(validationError.message, false));
        }

        const city = await City.findOne({
            where: {
                id: cityId
            }
        });
        if (!city) {
            return res.send(response("City not found", false));
        }

        city.set({
            visits: city.visits + 1
        });
        await city.save();

        res.send(city);
    };

    const citiesByName = async (req, res) => {
        const {error: validationError, value: q} = Joi.string().min(3).required()
            .validate(req.params.q);
        if(typeof validationError !== "undefined") {
            return res.send(response(validationError.message, false));
        }

        const cities = await City.findAll({
           where: {
               name: {
                   [Op.like]: `${q}%`
               }
           }
        });

        res.send(cities);
    };

    return {
        cityById,
        citiesByName
    };
}

module.exports = cityController;