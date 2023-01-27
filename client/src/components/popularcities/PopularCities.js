import {useEffect, useState} from "react";
import Forecast from "../forecast/Forecast";
import {popularCities} from "../../services/weatherAppService";

function PopularCities() {
    const [getPopularCities, setPopularCities] = useState([]);

    useEffect(() => {
        async function fetchPopularCities() {
            return await popularCities();
        }

        fetchPopularCities().then((cities) => {
            setPopularCities(cities);
        });
    }, []);

    return (
        <div className="row">
            {getPopularCities.map((element, i) =>
                <div key={i} className="col-12 mb-4 col-md-6 col-lg-4">
                    <Forecast city={element.id} />
                </div>
            )}
        </div>
    )
}

export default PopularCities;