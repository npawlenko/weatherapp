import React from "react";
import {Route, Routes as ReactRoutes} from 'react-router-dom';
import {useLocation} from "react-router-dom";
import {AnimatePresence} from "framer-motion";
import Home from "./pages/home/Home";

function Routes() {
    const location = useLocation();

    return (
        <AnimatePresence mode="wait">
            <ReactRoutes key={location.pathname} location={location}>
                <Route path="/" element={<Home />} />
            </ReactRoutes>
        </AnimatePresence>
    )
}

export default Routes;