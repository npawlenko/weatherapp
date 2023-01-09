const express = require("express");
const {app, db} = require("./app/app");

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type')

    next();
});
app.use(express.json());
app.use(express.urlencoded({ extended: false }))

app.use("/forecast", require("./app/routes/forecastRoutes")(db));
app.use("/city", require("./app/routes/cityRoutes")(db));
app.use("/location", require("./app/routes/locationRoutes")(db));