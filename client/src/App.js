import Navbar from "./components/navbar/Navbar";
import Routes from "./Routes";
import {BrowserRouter as Router, useLocation} from "react-router-dom";
import Footer from "./components/footer/Footer";
import AlertPopup from "./components/alertpopup/AlertPopup";


function App() {
    return (
        <Router>
            <AlertPopup/>

            <Navbar/>
            <Routes/>
            <Footer/>
        </Router>
    );
}

export default App;
