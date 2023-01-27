import {useEffect, useRef, useState} from "react";
import "./Forecast.scss";
import Constants from "../../data/constants";
import {findCityById, currentForecast} from "../../services/weatherAppService";
import forecastTranslations from "../../data/forecastTranslations";
import {Link} from "react-router-dom";

function Forecast(props) {
    const [getForecast, setForecast] = useState();
    const [getCity, setCity] = useState();
    const date = new Date();

    useEffect( () => {
        if(!props.city) return;

        if(!getForecast) {
            async function fetchCityAndForecast() {
                try {
                    let city = [];
                    if(Number.isInteger(props.city)) {
                        city = await findCityById(props.city);
                    }

                    if(!city) return {};

                    const forecast = await currentForecast(city.id);
                    return {
                        city,
                        forecast
                    };
                } catch (e) {
                    console.error(e);
                    return {};
                }
            }

            fetchCityAndForecast().then(({city, forecast}) => {
                setCity(city);
                setForecast(forecast);
            });
        }
    }, [props.city]);

    function toggleFavouriteCity(e) {
        let favouriteCities;
        if((favouriteCities = localStorage.getItem(Constants.LOCALSTORAGE_FAVOURITE_CITIES)) !== null) {
            favouriteCities = JSON.parse(favouriteCities);
        }
        else {
            favouriteCities = [];
        }

        let index;
        if((index = favouriteCities.findIndex((el) => el?.id === getCity?.id)) !== -1) {
            favouriteCities.splice(index, 1);
            if(props?.onFavouritesChange) props.onFavouritesChange(favouriteCities);
        }
        else {
            favouriteCities.push(getCity);
            if(props?.onFavouritesChange) props.onFavouritesChange(favouriteCities);
        }

        e.target.classList.toggle("forecast-star-favourite");
        localStorage.setItem(Constants.LOCALSTORAGE_FAVOURITE_CITIES, JSON.stringify(favouriteCities));
    }

    function isInFavourites() {
        let favouriteCities;
        if((favouriteCities = localStorage.getItem(Constants.LOCALSTORAGE_FAVOURITE_CITIES)) !== null) {
            favouriteCities = JSON.parse(favouriteCities);
        }
        else {
            return false;
        }

        return favouriteCities.findIndex((el) => el?.id === getCity?.id) !== -1;
    }

    return (
        <div className={`position-relative ${props?.className ?? ''}`}>
            <svg onClick={toggleFavouriteCity} className="forecast-star" version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 47.94 47.94">
                <path className={isInFavourites() ? 'forecast-star-favourite' : ''} d="M26.285,2.486l5.407,10.956c0.376,0.762,1.103,1.29,1.944,1.412l12.091,1.757
                        c2.118,0.308,2.963,2.91,1.431,4.403l-8.749,8.528c-0.608,0.593-0.886,1.448-0.742,2.285l2.065,12.042
                        c0.362,2.109-1.852,3.717-3.746,2.722l-10.814-5.685c-0.752-0.395-1.651-0.395-2.403,0l-10.814,5.685
                        c-1.894,0.996-4.108-0.613-3.746-2.722l2.065-12.042c0.144-0.837-0.134-1.692-0.742-2.285l-8.749-8.528
                        c-1.532-1.494-0.687-4.096,1.431-4.403l12.091-1.757c0.841-0.122,1.568-0.65,1.944-1.412l5.407-10.956
                        C22.602,0.567,25.338,0.567,26.285,2.486z"/>
            </svg>

            <Link to={`/forecast/${getCity?.id}`}>
                <div className={`forecast ${getForecast?.main} ${props.className ?? ''}`}>



                    <div className="row justify-content-center align-items-center">
                        <div className="col-4 text-center">
                            <img src={forecastTranslations[getForecast?.main]?.icon} alt="weather" />
                            <p className="fs-7">{forecastTranslations[getForecast?.main]?.translation}</p>
                        </div>

                        <div className="col-8">
                            <h3>{getCity?.name}</h3>
                            <h4>{getForecast?.temperature.toFixed()}°C</h4>
                            <p>{
                                Constants.DAY_OF_WEEK[date.getDay()] + " " +
                                date.getHours() + ":00"
                            }</p>
                        </div>
                    </div>
                </div>
            </Link>
        </div>

    )
}

export default Forecast;