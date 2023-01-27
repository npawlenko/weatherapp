const Joi = require("joi");
const {response} = require("../helpers/requestHelper");
const {Op} = require("sequelize");
const axios = require("axios");
const integrations = require("./../config/integrations.json");

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

        const explodedQuery = req.params.q.split(',');
        const name = explodedQuery[0];
        const state = explodedQuery[1];
        const country = explodedQuery[2];

        const searchOptions = {
            where: {
                name: {
                    [Op.like]: `${name}%`
                }
            }
        };
        if(state) searchOptions.where.state = {[Op.like]: `${state}%`};
        if(country) searchOptions.where.countryCode = {[Op.like]: `${country}%`};

        const cities = await City.findAll(searchOptions);
        if(cities.length) {
            return res.send(cities);
        }

        try {
            const response = await axios
                .get(`http://api.openweathermap.org/geo/1.0/direct?q=${req.params.q}&limit=100&lang=pl&appid=${integrations.openWeatherMap.apiKey}`);
            const data = response.data;

            const out = [];
            for (const city of data) {
                const found = await City.findOne({
                    where: {
                        name: city.name,
                        countryCode: city.country
                    }
                });
                if(!found) {
                    out.push(await City.create({
                        name: city.name,
                        countryCode: city.country,
                        state: city?.state,
                        lat: city.lat,
                        lon: city.lon
                    }));
                }
            }

            return res.send(out);
        } catch(e) {
            console.error(e);
        }

        res.send([]);
    };

    const popularCities = async (req, res) => {
        try {
            const cities = await City.findAll({
                limit: 6,
                order: [
                    ['visits', 'DESC']
                ]
            });
            return res.send(cities);
        } catch (e) {
            console.error(e);
        }
        res.send([]);
    };

    return {
        cityById,
        citiesByName,
        popularCities
    };
}

module.exports = cityController;