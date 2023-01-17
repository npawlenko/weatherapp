function cityRoutes(db) {
    const express = require("express");
    const router = express.Router();
    const cityController = require("../controllers/cityController")(db);

    router.get("/popular", cityController.popularCities);
    router.get("/:cityId", cityController.cityById);
    router.get("/find/:q", cityController.citiesByName);


    return router;
}

module.exports = cityRoutes;