import "./MultiForecast.scss";
import {useEffect, useState} from "react";
import {findCityById, fiveDayForecast, todayForecast} from "../../services/weatherAppService";
import forecastTranslations from "../../data/forecastTranslations";
import dateFormat, {masks} from "dateformat";
import Constants from "../../data/constants";

function MultiForecast(props) {
    masks.hammerTime = 'HH:MM';
    const [getForecast, setForecast] = useState([]);
    const [getCity, setCity] = useState({});

    useEffect(() => {
        if(!props.type) props.type = 1;
        if(typeof props?.city === "undefined") return;

        if(getForecast.length === 0) {
            async function fetchCityAndForecast() {
                try {
                    const city = await findCityById(props.city);
                    if(!city) return {};

                    let forecast = {};
                    switch(props.type) {
                        case 1:
                            forecast = await todayForecast(city.id);
                            break;
                        case 2:
                            let generalizedForecast = [];
                            const weatherDisplayHierarchy = {
                                Thunderstorm: 10,
                                Snow: 9,
                                Rain: 8,
                                Drizzle: 7,
                                Clear: 6,
                                Clouds: 5,
                                Mist: 4,
                                Fog: 3,
                                Haze: 2,
                            };
                            forecast = await fiveDayForecast(city.id);
                            

                            const dayNow = new Date().getDay();
                            for(let i=0; i<5; i++) {
                                const thatDayForecasts = forecast.filter(el => new Date(el.date).getDay() === (i+dayNow) % 7);
                                generalizedForecast.push({
                                    ...thatDayForecasts[0],
                                    main: thatDayForecasts.slice(1).reduce(
                                        (prev, next) => weatherDisplayHierarchy[prev] > weatherDisplayHierarchy[next.main] ? prev : next?.main,
                                        thatDayForecasts[0]?.main
                                    ),
                                    temperature: thatDayForecasts.slice(1).reduce(
                                        (prev, next) => (prev+next?.temperature)/2,
                                        thatDayForecasts[0]?.temperature
                                    )
                                });
                            }

                            forecast = generalizedForecast;
                        
                            break;
                    }

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
    }, [props]);

    return (
        <div className="multiforecast">
            <div className="row justify-content-center align-items-center">
                { props.type === 1 ?
                    getForecast.map(el =>
                        <div key={el.id} className="col-12 col-sm-6 text-center col-md">
                            <img className="" width="60px" src={forecastTranslations[el?.main]?.icon} alt="weather" />

                            <p className="fs-7 mb-1">{forecastTranslations[el?.main]?.translation}</p>
                            <h4 className="mb-1">{el.temperature.toFixed()}°C</h4>
                            <p className="mb-0">{
                                Constants.DAY_OF_WEEK[new Date(el.date).getDay()] + ", " +
                                dateFormat(new Date(el.date), "hammerTime")
                            }</p>
                        </div>
                    )
                :
                    getForecast.map(el =>
                        <div key={el.id} className="col-12 col-sm-6 text-center col-md">
                            <img className="" width="60px" src={forecastTranslations[el?.main]?.icon} alt="weather" />

                            <p className="fs-7 mb-1">{forecastTranslations[el?.main]?.translation}</p>
                            <h4 className="mb-1">{el.temperature.toFixed()}°C</h4>
                            <p className="mb-0">{
                                Constants.DAY_OF_WEEK[new Date(el.date).getDay()]
                            }</p>
                        </div>
                    )
                }
            </div>
        </div>
    )
}

export default MultiForecast;