/*
 *
 */
const appConfig = require("./config/app.config");

const {app, router} = require("./server")(
    appConfig.server.port,
    appConfig.server.https
);
const db = require("./database/database");

module.exports = {
    app: app,
    router: router,
    database: db
};