/*
 *
 */
const appConfig = require("./config/application.json");

const db = require("./database");
const {app} = require("./server")(
    appConfig.server.port,
    appConfig.server.https
);

module.exports = {
    app,
    db
};