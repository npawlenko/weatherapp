const axios = require("axios");
const {Op} = require("sequelize");
const integrations = require("./../config/integrations.json");
const {response} = require("../helpers/requestHelper");

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

        const currentDate = new Date();
        const startDate = new Date(currentDate);
        startDate.setHours(startDate.getHours());
        clearMinutesAndSeconds(startDate);
        const endDate = new Date(currentDate);
        endDate.setTime(endDate.getTime() + (60*60*1000));
        clearMinutesAndSeconds(endDate);

        const city = await City.findOne({
            where: {
                id: cityId
            }
        });
        if(!city) {
            return res.send(response("City not found", false));
        }

        const cachedForecast = await Forecast.findOne({
           where: {
               cityId: cityId,
               date: {
                   [Op.between]: [startDate, endDate]
               }
           }
        });
        if(cachedForecast) {
           return res.send(cachedForecast);
        }

        try {
            const response = await axios
                .get(`https://api.openweathermap.org/data/2.5/weather?lat=${city.lat}&lon=${city.lon}&units=metric&appid=${integrations.openWeatherMap.apiKey}`);
            const data = response.data;

            const newForecast = await Forecast.create({
                main: data.weather[0].main,
                description: data.weather[0].description,
                date: new Date(),
                temperature: data.main.temp,
                temperatureFeelsLike: data.main.feels_like,
                humidity: data.main.humidity,
                cloudiness: data.clouds.all,
                pressure: data.main.pressure,
                windSpeed: data.wind.speed,
                windDeg: data.wind.deg,
                visibility: data.visibility,
                rain: data?.rain?.['1h'] ?? data?.rain?.['3h'],
                snow: data?.snow?.['1h'] ?? data?.snow?.['3h'],
                CityId: city.id
            });

            return res.send(newForecast);
        } catch(e) {
            console.error(e);
        }
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

const clearMinutesAndSeconds = (date) => {
    date.setMinutes(0);
    date.setSeconds(0);
    date.setMilliseconds(0);
};

module.exports = forecastController;

