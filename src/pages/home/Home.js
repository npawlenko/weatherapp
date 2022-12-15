import {useGeolocation} from "../../hooks/useGeolocation";
import {useEffect, useRef} from "react";
import Constants from "../../data/constants";
import useAlert from "../../hooks/useAlert";

function Home() {
    const geolocation = useGeolocation();
    const cityName = useRef();
    const {setAlert} = useAlert();

    useEffect(() => {
        geolocation.then((response) => {
            if(Object.keys(response).length === 0) return setAlert("Nie udało się określić twojej lokalizacji", Constants.ALERT_DANGER);
            cityName.current.innerText = response.city;
        })
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