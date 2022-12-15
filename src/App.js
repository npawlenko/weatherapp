import Navbar from "./components/navbar/Navbar";
import Routes from "./Routes";
import {BrowserRouter as Router} from "react-router-dom";
import Footer from "./components/footer/Footer";


function App() {
    return (
        <Router>
          <Navbar/>
          <Routes/>
          <Footer/>
        </Router>
    );
}

export default App;
