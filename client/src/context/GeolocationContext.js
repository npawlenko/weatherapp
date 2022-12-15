import {createContext, useState} from "react";
import Constants from "../data/constants";
import axios from "axios";

const initialState = {
    location: {}
}

const GeolocationContext = createContext({
    ...initialState,
    update: async (force=false) => {}
});

export const GeolocationProvider = ({children}) => {
    const [location, setLocation] = useState({});

    const update = async (force=false) => {
        // load location from localstorage if exists
        let locationStorage;
        if(!force
            && (locationStorage = localStorage.getItem(Constants.LOCALSTORAGE_LOCATION)) !== null)
        {
            let parsedLocation = JSON.parse(locationStorage);
            setLocation(parsedLocation);
            return parsedLocation;
        }

        let out = {};
        await axios.get("https://ipinfo.io/json")
            .then((response) => {
                const data = response.data;
                const coords = data.split(",");
                const locationResponse = {
                    city: data.city,
                    lat: coords[0],
                    lon: coords[1],
                };

                out = locationResponse;
                setLocation(locationResponse);
                // update localstorage
                localStorage.setItem(Constants.LOCALSTORAGE_LOCATION, JSON.stringify(locationResponse));


            })
            .catch(async () => {
                await getNavigatorGeolocation()
                    .then((coords) => {
                        // TODO: call OpenWeatherMap Geolocation API

                        const cityMock = "Białystok";
                        const locationCoded = {
                            city: cityMock,
                            lat: coords.latitude,
                            lon: coords.longitude
                        };

                        out = locationCoded;
                        setLocation(locationCoded);
                        // update localstorage
                        localStorage.setItem(Constants.LOCALSTORAGE_LOCATION, JSON.stringify(locationCoded));
                    });
            });

        return out;
    };

    const getNavigatorGeolocation = async () => {
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

            return coords;
        }

        throw new Error("Could not get user's geolocation");
    };


    return (
        <GeolocationContext.Provider
            value={{
                location,
                update
            }}
        >
            {children}
        </GeolocationContext.Provider>
    )
};

export default GeolocationContext;

