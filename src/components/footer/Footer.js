import './Footer.scss';
import logo from '../../assets/images/logo.png';
import {Link} from "react-router-dom";

function Footer() {
    return (
        <footer className="page-footer">
            <nav className="nav-footer">
                <div className="container">
                    <div className="row align-items-center">

                        <div className="col-12 col-lg-6">
                            <div className="row align-items-center justify-content-center" id="appDescription">
                                <div className="col-1 me-3">
                                    <img className="gray-logo mb-2" src={logo} alt="logo" />
                                </div>

                                <div className="col-8 col-lg-6 fs-7">
                                    <p>
                                        WeatherApp umożliwia śledzenie pogody
                                        w sposób najbardziej przyjazny użytkownikowi.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="col-12 col-lg-3">
                            <h5>Przydatne linki</h5>
                            <ul className="list">
                                <li><Link to="/">Link</Link></li>
                                <li><Link to="/">Link</Link></li>
                                <li><Link to="/">Link</Link></li>
                                <li><Link to="/">Link</Link></li>
                                <li><Link to="/">Link</Link></li>
                            </ul>
                        </div>

                        <div className="col-12 col-lg-3">
                            <h5>Skontaktuj się z nami</h5>
                            <ul className="list">
                                <li><Link to="/">Link</Link></li>
                                <li><Link to="/">Link</Link></li>
                                <li><Link to="/">Link</Link></li>
                                <li><Link to="/">Link</Link></li>
                                <li><Link to="/">Link</Link></li>
                            </ul>
                        </div>

                    </div>
                </div>
            </nav>

            <div className="copyright">
                <div className="container">
                    <div className="row">
                        <div className="col">
                            <p className="mb-0">Copyright &copy; 2022 WeatherApp</p>
                        </div>
                        <div className="col text-end">
                            <p className="mb-0">Zasilane przez <a href="https://openweathermap.org/api" target="_blank">OpenWeatherMap API</a></p>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer;