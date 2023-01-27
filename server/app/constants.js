const path = require("path");

module.exports = {
    BASE_PATH: path.resolve(__dirname, ".."),
    APP_PATH: path.resolve(__dirname),
    TMP_PATH: path.resolve(__dirname, "tmp"),

    SECOND: 1000,
    MINUTE: 60*1000,
    HOUR: 60*60*1000,
    DAY: 60*60*24*1000
};

