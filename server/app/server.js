const fs = require("fs");
const path = require("path");
const { BASE_PATH } = require("./constants");
const express = require("express");
const router = express.Router();
const app = express();

module.exports = (
    port,
    options = {},
) => {
    let server;
    let serverOptions = {};

    const httpsConfig = options.https;
    if (httpsConfig) {
        if (!httpsConfig.key || !httpsConfig.cert) {
            throw new Error("Please specify HTTPS cert and key path values");
        }

        server = require("https");
        serverOptions = {
            key: fs.readFileSync(path.resolve(BASE_PATH, httpsConfig.key)),
            cert: fs.readFileSync(path.resolve(BASE_PATH, httpsConfig.cert))
        };
        console.log("Creating https server...");
    } else {
        server = require("http");
        console.log("Creating http server...");
    }

    server
        .createServer(serverOptions, app)
        .listen(port, () => {
            console.log(`Server started at port ${port}`);
        });

    return {
        app: app,
        router: router
    };
};