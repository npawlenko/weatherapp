import logo from '../../assets/images/logo.png';
import {Link, useLocation} from "react-router-dom";
import './Navbar.scss';

function Navbar() {
    const location = useLocation();

    const generateLink = (text, to) => {
        const active = location.pathname === to;

        return (
            <Link to={to} className={active ? "nav-link active" : "nav-link"}>
                {text}
            </Link>
        )
    };

    return (
        <header className="page-header">
            <div className="container">
                <nav className="navbar navbar-expand-lg">
                    <Link to="/" className="navbar-brand me-0"><img src={logo} className="nav-logo" alt="logo" /> WeatherApp</Link>
                    <button className="navbar-toggler"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#navbar-content"
                            aria-controls="navbar-content"
                            aria-expanded="false"
                            aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse text-center text-lg-start" id="navbar-content">
                        <ul className="navbar-nav ms-auto me-auto">
                            <li className="nav-item">
                                {generateLink("Ulubione", "/")}
                            </li>
                            <li className="nav-item">
                                {generateLink("Strona główna", "/")}
                            </li>
                            <li className="nav-item">
                                {generateLink("O nas", "/about")}
                            </li>
                        </ul>

                        <form>
                            <div className="input-group">
                                <input type="text" className="form-control" placeholder="Wyszukaj miejscowość..." aria-describedby="searchButton"/>
                                <button className="btn btn-outline-secondary" type="button" id="searchButton"><span className="icon icon-search"></span></button>
                            </div>
                        </form>
                    </div>


                </nav>
            </div>
        </header>
    );
}

export default Navbar;