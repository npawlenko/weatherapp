import "./SearchCity.scss";
import {useRef, useState} from "react";
import {findCityByName} from "../../services/weatherAppService";
import {Link} from "react-router-dom";
function SearchCity(props) {
    const [results, setResults] = useState([]);
    const [resultsVisible, setResultsVisible] = useState(false);
    const input = useRef();


    window.addEventListener('click', (e) => {
        const target = e.target;
        console.log(target.parentNode);
        if(e.target.parentNode?.id === "searchButton"
            || e.target.id === "searchButton")
            return;

        setResultsVisible(false);
    });

    function submit(e) {
        e.preventDefault();

        async function search() {
            const q = input.current.value;
            return await findCityByName(q);
        }

        search().then(r => {
           setResults(r);
           setResultsVisible(true);
        });
    }

    return (
        <form className="d-flex flex-column" onSubmit={submit}>
            <div className="input-group">
                <input ref={input} type="text" className="form-control" placeholder="Wyszukaj miejscowość..." id="searchInput" />
                <button className="btn btn-outline-secondary" onClick={submit} type="button" id="searchButton"><span className="icon icon-search"></span></button>
            </div>


                <div className="search-results">
                    <ul className={resultsVisible ? " visible" : ""}>
                        {results.map(el =>
                            <li><Link to={`/forecast/${el.id}`}>{el.name}, {el.state ? el.state+"," : ""} {el.countryCode}</Link></li>
                        )}
                    </ul>
                </div>
        </form>
    );
}

export default SearchCity;