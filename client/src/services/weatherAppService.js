import {serverAddress} from "../data/config";
import axios from "axios";

const request = async (resource) => {
    let response = {};
    await axios.get(serverAddress + resource)
        .then((res) => response = res.data)
        .catch((err) => {
            throw err
        });
    return response;
};

export const findCityById = async (id) => {
    return await request(`/city/${id}`);
};

export const findCityByName = async (name) => {
    return await request(`/city/find/${encodeURIComponent(name)}`);
};

export const popularCities = async () => {
    return await request('/city/popular');
};

export const currentForecast = async (cityId) => {
    return await request(`/forecast/current/${cityId}`);
};

export const todayForecast = async (cityId) => {
    return await  request(`/forecast/today/${cityId}`);
};

export const fiveDayForecast = async (cityId) => {
    return await request(`/forecast/fiveDay/${cityId}`);
};

export const coordinatesToCity = async (lat, lon) => {
    return await request(`/location/georeverse?lat=${lat}&lon=${lon}`);
};
