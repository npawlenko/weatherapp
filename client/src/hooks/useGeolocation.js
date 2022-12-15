import axios from "axios";
import Constants from "../data/constants";

async function useGeolocation(force=false) {
    let location;
    // load location from localstorage if exists
    if(!force && (location = localStorage.getItem(Constants.LOCALSTORAGE_LOCATION)) !== null) return JSON.parse(location);

    await axios.get("https://ipinfo.io/json")
        .then((response) => {
            location = response.data; // TODO: make similiar response to OpenWeatherMap Geolocation API
            // update localstorage
            localStorage.setItem(Constants.LOCALSTORAGE_LOCATION, JSON.stringify(response.data));
        })
        .catch(async () => {
            location = {};
            await getNavigatorGeolocation().then((coords) => {
                    // TODO: call OpenWeatherMap Geolocation API
                }
            );
        });
    console.log(location);
    return location;
}

async function getNavigatorGeolocation() {
    let coords;
    if('geolocation' in navigator) {
        await new Promise((resolve, reject) => navigator.geolocation.getCurrentPosition((position) => {
                    coords = position.coords;
                    resolve(coords);
                },
                (error) => {
                    reject(error);
                }
            ));
    }
    return coords;
}

export {useGeolocation}