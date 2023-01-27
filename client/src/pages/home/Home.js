import {useEffect, useState} from "react";
import Constants from "../../data/constants";
import useAlert from "../../hooks/useAlert";
import useGeolocation from "../../hooks/useGeolocation";
import {motion} from "framer-motion";
import Forecast from "../../components/forecast/Forecast";
import PopularCities from "../../components/popularcities/PopularCities";

function Home() {
    const geolocation = useGeolocation();
    const [getCity, setCity] = useState();
    const {setAlert} = useAlert();

    useEffect(  () => {
        fetchLocation().then((location) => setCity(location));
    }, []);

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
                        <h4>Pogoda na teraz w <span className="fw-light">{getCity?.name ?? "twojej miejscowości"}</span></h4>
                        <p className="mb-4">Naciśnij na prognozę aby zobaczyć więcej.</p>

                        <div className="col-12 col-md-8">
                            <Forecast city={getCity?.id} state={getCity?.state} country={getCity?.name} />
                        </div>
                    </div>
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