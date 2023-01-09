function locationRoutes(db) {
    const express = require("express");
    const router = express.Router();
    const locationController = require("./../controllers/locationController")(db);

    router.get("/georeverse", locationController.reverseGeocoder);

    return router;
}

module.exports = locationRoutes;