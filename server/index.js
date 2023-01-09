const express = require("express");
const {app, db} = require("./app/app");

app.use(express.json());
app.use(express.urlencoded({ extended: false }))

app.use("/forecast", require("./app/routes/forecastRoutes")(db));
app.use("/city", require("./app/routes/cityRoutes")(db));
app.use("/location", require("./app/routes/locationRoutes")(db));