import "./About.scss";
import openweather from "../../assets/images/openweather-logo.png";
import ipinfo from "../../assets/images/ipinfo-logo.png";
import img from "../../assets/images/image-placeholder.png";

function About() {
    return (
        <main className="page-main">
            <div className="container">
                <h1>Dowiedz się o <span className="fw-light">WeatherApp</span></h1>
                <h4 className="space-below">Czyli mała porcja informacji o projekcie</h4>

                <div className="row align-items-center space-below">
                    <div className="col-12 col-lg-6 mb-5 mb-lg-0">
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer sodales condimentum purus,
                            et venenatis enim interdum eu. Curabitur convallis hendrerit gravida. Nam vitae orci nec enim
                            tincidunt aliquet. Pellentesque ullamcorper velit in accumsan egestas. In hac habitasse platea dictumst.
                            Fusce nulla tellus, eleifend vel velit in, ultricies accumsan arcu. Sed quis consequat leo. Sed est lectus,
                            mollis et convallis et, venenatis ac nunc. Curabitur iaculis eros id ante volutpat scelerisque.
                        </p>
                    </div>

                    <div className="col-12 col-lg-6 mb-5 mb-lg-0 text-center text-lg-end">
                        <img src={img} width="300px" alt="alt"/>
                    </div>
                </div>

                <div className="dependencies text-center">
                    <h4 className="mb-3">Powstaliśmy dzięki</h4>

                    <a className="me-4" href="https://openweathermap.org" target="_blank" rel="norefferer"><img src={openweather} alt="OpenWeatherMap.org" /></a>
                    <a href="https://ipinfo.io" target="_blank" rel="norefferer"><img src={ipinfo} alt="ipinfo.io" /></a>
                </div>
            </div>
        </main>
    )
}

export default About;