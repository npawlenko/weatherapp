/*
 *
 */
const appConfig = require("./config/application.json");

const db = require("./database");
const {app, router} = require("./server")(
    appConfig.server.port,
    appConfig.server.https
);

module.exports = {
    app: app,
    router: router,
    db: db
};