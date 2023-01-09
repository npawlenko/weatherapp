function forecastRoutes(db) {
    const express = require("express");
    const router = express.Router();
    const forecastController = require("./../controllers/forecastController")(db);

    router.get("/current/:cityId", forecastController.currentForecast);
    router.get("/today/:cityId", forecastController.todayForecast);
    router.get("/fiveDay/:cityId", forecastController.fiveDayForecast);

    return router;
}

module.exports = forecastRoutes;