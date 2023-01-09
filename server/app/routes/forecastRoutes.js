function forecastRoutes(db) {
    const express = require("express");
    const router = express.Router();
    const forecastController = require("./../controllers/forecastController")(db);

    router.get("/:cityId", forecastController.forecastForCity);

    return router;
}

module.exports = forecastRoutes;