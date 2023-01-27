import "./MultiForecast.scss";
import {useEffect, useState} from "react";
import {findCityById, fiveDayForecast, todayForecast} from "../../services/weatherAppService";
import forecastTranslations from "../../data/forecastTranslations";
import dateFormat, {masks} from "dateformat";

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
                            forecast = await fiveDayForecast(city.id);
                            //TODO: foreach day make summary
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
                console.log(forecast);
            });
        }
    }, [props]);

    return (
        <div className="multiforecast">
            <div className="row justify-content-center align-items-center">
                {
                    getForecast.map(el =>
                        <div key={el.id} className="col-12 col-sm-6 text-center col-md-2 mb-5">
                            <img className="float-start align-middle" width="60px" src={forecastTranslations[el?.main]?.icon} alt="weather" />

                            <p className="fs-7 mb-1">{forecastTranslations[el?.main]?.translation}</p>
                            <h4 className="mb-1">{el?.temperature.toFixed()}°C</h4>
                            <p className="mb-0">{dateFormat(new Date(el?.date), "hammerTime")}</p>
                        </div>
                    )
                }
            </div>
        </div>
    )
}

export default MultiForecast;