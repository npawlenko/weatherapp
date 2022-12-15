import {useGeolocation} from "../../hooks/geolocation";
import {useEffect, useRef} from "react";

function Home() {
    const geolocation = useGeolocation();
    const cityName = useRef();

    useEffect(() => {
        geolocation.then((response) => {
            console.log(response);
            cityName.current.innerText = response.city;
        }).catch((error) => {
            console.error(error);
        })
    }, []);


    return (
        <main className="page-main">
            <div className="container">
                <div className="row">
                    <div className="col-lg-8">
                        <h1>Dzień dobry!</h1>
                        <h4>Pogoda na dziś w <span ref={cityName} className="fw-light">twojej miejscowości</span></h4>
                        <p>Dzisiaj będzie mroźnie, ubierz się w kilka warstw <span className="icon icon-onion"></span></p>
                    </div>

                    <div className="col-lg-4">

                    </div>
                </div>
            </div>
        </main>
    )
}

export default Home;