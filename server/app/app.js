/*
 *
 */
const appConfig = require("./config/app.config");

const {app, router} = require("./server")(
    appConfig.server.port,
    appConfig.server.https
);

module.exports = {
    app: app,
    router: router,
};