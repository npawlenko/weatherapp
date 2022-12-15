import {useEffect} from "react";
import Constants from "../../data/constants";

function MultiForecast(props) {
    let elementClassName;

    useEffect(() => {
        switch(props.orientation) {
            case Constants.ORIENTATION_VERTICAL:
                elementClassName = "multiforecast multiforecast-vertical";
                break;
            default:
                elementClassName = "multiforecast multiforecast-horizontal";
        }
    }, []);

    return (
        <div ref="fo" className={elementClassName}>
            {props.children}
        </div>
    )
}

export default MultiForecast;