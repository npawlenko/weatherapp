import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import './assets/_variables.scss';
import 'bootstrap/scss/bootstrap.scss';
import './assets/index.scss';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import 'jquery/dist/jquery.min';
import {AlertProvider} from "./context/AlertContext";
import {GeolocationProvider} from "./context/GeolocationContext";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <GeolocationProvider>
        <AlertProvider>
            <App />
        </AlertProvider>
    </GeolocationProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
