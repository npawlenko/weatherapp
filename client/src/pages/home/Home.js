import {useEffect, useRef} from "react";
import Constants from "../../data/constants";
import useAlert from "../../hooks/useAlert";
import useGeolocation from "../../hooks/useGeolocation";

function Home() {
    const geolocation = useGeolocation();
    const cityName = useRef();
    const {setAlert} = useAlert();

    useEffect( () => {
        geolocation.update(true).then((location) => {
            if(Object.keys(location).length === 0) {
                setAlert(
                    "Nie udało się określić twojej lokalizacji. Zezwól na udostępnianie lokalizacji tej stronie" +
                    " w ustawieniach przeglądarki, aby mieć dostęp do wszystkich funkcjonalności.",
                    Constants.ALERT_DANGER
                );
            }
            else {
                cityName.current.innerText = location.city;
            }
        });
    }, []);


    return (
        <main className="page-main">
            <div className="container">
                <div className="row">
                    <div className="col-lg-8">
                        <h1>Dzień dobry!</h1>
                        <h4>Pogoda na dziś w <span ref={cityName} className="fw-light">twojej miejscowości</span></h4>
                        <p>Dzisiaj będzie mroźnie, ubierz się w kilka warstw <span className="icon icon-onion"/></p>
                    </div>

                    <div className="col-lg-4">

                    </div>
                </div>
            </div>
        </main>
    )
}

export default Home;