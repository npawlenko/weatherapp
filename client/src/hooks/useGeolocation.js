import {useContext} from "react";
import GeolocationContext from "../context/GeolocationContext";

function useGeolocation() {
    return useContext(GeolocationContext);
}

export default useGeolocation;