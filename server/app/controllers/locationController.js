const {response} = require("../helpers/requestHelper");
const {TMP_PATH} = require("../constants");
const geocoder = require("local-reverse-geocoder");
let geocoderReady = false;

geocoder.init({
    dumpDirectory: TMP_PATH
}, () => {
    geocoderReady = true;
    console.log("Reverse geocoder is ready to use");
});


function locationController(db) {
    const {City} = db;
    const Joi = require("Joi");

    const reverseGeocoder = async (req, res) => {
        if(!geocoderReady) {
            return res.status(500).send(response("Geocoder is not ready to use. Please try again in a while.", false));
        }

        const schema = Joi.object({
            //The numbers are in decimal degrees format and range from
            // -90 to 90 for latitude and -180 to 180 for longitude
            lat: Joi.number().min(-90).max(90).required(),
            lon: Joi.number().min(-180).max(180).required()
        });
        const {error: validationError, value: coordinates} = schema.validate(req.query);
        if(typeof validationError !== "undefined") {
            return res.status(400).send(response(validationError.message, false));
        }

        geocoder.lookUp({
            latitude: coordinates.lat,
            longitude: coordinates.lon
        }, 1, async (err, data) => {
            if(err) {
                return res.status(500).send(response(err, false));
            }

            data = data[0][0];
            const cityData = {
                name: data.name,
                ...coordinates,
                countryCode: data.countryCode,
                state: data?.admin1Code?.name ?? null,
            };
            const similarCity = await City.findOne({
                where: {
                    name: cityData.name,
                    countryCode: cityData.countryCode,
                    state: cityData.state
                }
            });
            if(similarCity !== null) {
                const city = City.create(cityData);
                return res.send(city);
            }
            res.send(similarCity);
        });
    };

    return {
        reverseGeocoder
    };
}

module.exports = locationController;