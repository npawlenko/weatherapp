const axios = require("axios");
const {Op} = require("sequelize");
const integrations = require("./../config/integrations.json");
const {response} = require("../helpers/requestHelper");
const {DAY, HOUR} = require("../constants");
const { array } = require("joi");

function forecastController(db) {
    const Joi = require("joi");
    const {City, Forecast} = db;
    const {response} = require("./../helpers/requestHelper");


    const getCity = async (cityId) => {
        return await City.findOne({
            where: {
                id: cityId
            }
        });
    };

    const buildForecast = async (data, city) => {
          return await Forecast.create({
            main: data.weather[0].main,
            description: data.weather[0].description,
            date: data?.dt ? new Date(data?.dt * 1000) : new Date(),
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
    };



    const currentForecast = async (req, res) => {
        const {error: validationError, value: cityId} = Joi.number().integer().min(1).required()
            .validate(req.params.cityId);
        if (typeof validationError !== "undefined") {
            return res.send(response(validationError.message, false));
        }

        const startDate = new Date();
        clearMinutesAndSeconds(startDate);
        const endDate = new Date(startDate);
        endDate.setTime(endDate.getTime() + HOUR);

        const city = await getCity(cityId);
        if(city === null) {
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
        if(cachedForecast !== null) {
           return res.send(cachedForecast);
        }

        try {
            const response = await axios
                .get(`https://api.openweathermap.org/data/2.5/weather?lat=${city.lat}&lon=${city.lon}&units=metric&lang=pl&appid=${integrations.openWeatherMap.apiKey}`);
            const data = response.data;

            const newForecast = await buildForecast(data, city);

            return res.send(newForecast);
        } catch(e) {
            console.error(e);
            return res.send(e);
        }
    };

    const todayForecast = async (req, res) => {
        const {error: validationError, value: cityId} = Joi.number().integer().min(1).required()
            .validate(req.params.cityId);
        if (typeof validationError !== "undefined") {
            return res.send(response(validationError.message, false));
        }

        const city = await getCity(cityId);
        if(city === null) {
            return res.send(response("City not found", false));
        }

        const startDate = new Date();
        clearMinutesAndSeconds(startDate);
        const endDate = new Date(startDate);
        endDate.setTime(endDate.getTime() + DAY);

        let cachedForecast = await Forecast.findAll({
            where: {
                cityId: cityId,
                date: {
                    [Op.between]: [startDate, endDate]
                }
            }
        });
        if(cachedForecast.length === 8) {
            return res.send(cachedForecast);
        }
        else if(cachedForecast.length > 8) {
            cachedForecast = cachedForecast.slice(0, 8);
            return res.send(cachedForecast);
        }


        try {
            const response = await axios
                .get(`https://api.openweathermap.org/data/2.5/forecast?lat=${city.lat}&lon=${city.lon}&units=metric&lang=pl&appid=${integrations.openWeatherMap.apiKey}`);
            const data = response.data;

            let out = [];
            for(let i in data.list) {
                const forecast = data.list[i];
                const newForecast = await buildForecast(forecast, city);
                out.push(newForecast);
            }
            out = out.slice(0, 8);
            return res.send(out);
        } catch(e) {
            console.error(e);
            return res.send(e);
        }
    };

    const fiveDayForecast = async (req, res) => {
        const {error: validationError, value: cityId} = Joi.number().integer().min(1).required()
            .validate(req.params.cityId);
        if (typeof validationError !== "undefined") {
            return res.send(response(validationError.message, false));
        }

        const city = await getCity(cityId);
        if(!city) {
            return res.send(response("City not found", false));
        }

        const startDate = new Date();
        clearMinutesAndSeconds(startDate);
        const endDate = new Date(startDate);
        endDate.setTime(endDate.getTime() + DAY*5);

        let cachedForecast = await Forecast.findAll({
            where: {
                cityId: cityId,
                date: {
                    [Op.between]: [startDate, endDate]
                }
            }
        });
        if(cachedForecast.length === 40) {
            return res.send(cachedForecast);
        }
        else if(cachedForecast.length > 40) {
            cachedForecast = cachedForecast.slice(0, 40);
            return res.send(cachedForecast);
        }


        try {
            const response = await axios
                .get(`https://api.openweathermap.org/data/2.5/forecast?lat=${city.lat}&lon=${city.lon}&units=metric&lang=pl&appid=${integrations.openWeatherMap.apiKey}`);
            const data = response.data;

            const out = [];
            for(let i in data.list) {
                const forecast = data.list[i];
                const newForecast = await buildForecast(forecast, city);
                out.push(newForecast);
            }
            return res.send(out);
        } catch(e) {
            console.error(e);
            return res.send(e);
        }
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

