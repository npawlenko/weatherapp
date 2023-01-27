
import {motion} from "framer-motion";
import {useEffect, useState} from "react";
import Constants from "../../data/constants";
import Forecast from "../../components/forecast/Forecast";

function Favourites() {
    const [getFavourites, setFavourites] = useState(getFromLocalStorage());

    function update(favourites) {
        setFavourites(favourites);
    }

    function getFromLocalStorage() {
        let favouriteCities;
        if((favouriteCities = localStorage.getItem(Constants.LOCALSTORAGE_FAVOURITE_CITIES)) !== null) {
            favouriteCities = JSON.parse(favouriteCities);
        }
        else {
            favouriteCities = [];
        }

        return favouriteCities;
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
                <h1 className="mb-4">Ulubione lokalizacje</h1>

                <div className="row">
                    {
                        getFavourites.map(el =>
                            <div className="col-12 mb-4 col-md-6 col-lg-4">
                                <Forecast key={el?.id} city={el?.id} onFavouritesChange={update} />
                            </div>
                        )
                    }
                </div>
            </div>
        </motion.main>
    )
}

export default Favourites;