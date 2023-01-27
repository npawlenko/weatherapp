import "./City.scss";
import {motion} from "framer-motion";
import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {findCityById} from "../../services/weatherAppService";
import Forecast from "../../components/forecast/Forecast";
import MultiForecast from "../../components/multiforecast/MultiForecast";

function City(props) {
    const [getCity, setCity] = useState({});
    let { cityId } = useParams();

    useEffect(() => {
        if(!cityId) return;
        try {
            Number.parseInt(cityId);
        } catch (e) {
            return;
        }

        async function fetchCity() {
            try {
                const city = await findCityById(cityId);

                if(!city)
                    return {};
                return city;
            } catch(e) {
                console.error(e);
                return {};
            }
        }

        fetchCity().then(c => {
            setCity(c);
        });
    }, [cityId]);

    return (
        <motion.main className="page-main"
                     initial={{
                         x: -window.innerWidth,
                     }}
                     animate={{
                         x: 0,
                     }}
                     exit={{
                         x: window.innerWidth,
                     }}
        >
            <div className="container">
                <div className="row align-items-center">
                    <div className="col-lg-8">
                        <h1>Pogoda na teraz</h1>
                        <h4 className="mb-4">w mieście <span className="fw-light">
                            {getCity?.name},{'\u00A0'}
                            {getCity?.state ? getCity?.state+"," : ""}{'\u00A0'}
                            <img className="flag" src={`https://flagsapi.com/${getCity?.countryCode}/shiny/64.png`} />{'\u00A0'}
                            {getCity?.countryCode}</span></h4>

                        <div className="col-12 col-md-8">
                            <Forecast city={getCity?.id} />
                        </div>
                    </div>
                </div>




                <div className="mt-100">
                    <h1 className="mb-4">Najbliższy dzień</h1>
                    <MultiForecast city={getCity?.id} type={1}/>
                </div>


                <div className="mt-100">
                    <h1 className="mb-4">Prognoza pięciodniowa</h1>
                    <MultiForecast city={getCity?.id} type={2}/>
                </div>
            </div>
        </motion.main>
    )
}

export default City;