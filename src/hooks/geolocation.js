import axios from "axios";
import Constants from "../data/constants";

async function useGeolocation(force=false) {
    let location;
    // load location from localstorage if exists
    if(!force && (location = localStorage.getItem(Constants.LOCALSTORAGE_LOCATION)) !== null) return JSON.parse(location);

    await axios.get("https://ipinfo.io/json")
        .then((response) => {
            location = response.data;
            // update localstorage
            localStorage.setItem(Constants.LOCALSTORAGE_LOCATION, JSON.stringify(response.data));
        })
        .catch((err) => {
            location = {};
        });
    return location;
}

export {useGeolocation}