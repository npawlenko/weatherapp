import {useEffect, useRef, useState} from "react";
import Constants from "../../data/constants";
import useAlert from "../../hooks/useAlert";
import useGeolocation from "../../hooks/useGeolocation";
import {motion} from "framer-motion";
import Forecast from "../../components/forecast/Forecast";
import placeholder from "../../assets/images/image-placeholder.png";
import PopularCities from "../../components/popularcities/PopularCities";

function Home(props) {
    const geolocation = useGeolocation();
    const [getCityName, setCityName] = useState();
    const {setAlert} = useAlert();

    useEffect(  () => {
        async function fetchLocation() {
            try {
                const location = await geolocation.update();
                if (Object.keys(location).length === 0) {
                    setAlert(
                        "Nie udało się określić twojej lokalizacji. Zezwól na udostępnianie lokalizacji tej stronie" +
                        " w ustawieniach przeglądarki, aby mieć dostęp do wszystkich funkcjonalności.",
                        Constants.ALERT_DANGER
                    );
                }
                return location;
            } catch (e) {
                console.error(e);
                return {};
            }
        }

        fetchLocation().then((location) => {
            setCityName(location?.name);
        });
    }, []);



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
                        <h1>Dzień dobry!</h1>
                        <h4>Pogoda na teraz w <span className="fw-light">{getCityName ?? "twojej miejscowości"}</span></h4>
                        <p>Naciśnij na prognozę aby zobaczyć więcej.</p>

                        <div className="col-12 col-md-6">
                            <Forecast city={getCityName} />
                        </div>

                    </div>

                    {/*<div className="col-lg-4">*/}
                    {/*    <img src={placeholder} width="300px" alt="alt"/>*/}
                    {/*</div>*/}
                </div>

                <div className="mt-100">
                    <h1 className="mb-4">Popularne lokalizacje</h1>

                    <PopularCities/>
                </div>
            </div>
        </motion.main>
    )
}

export default Home;