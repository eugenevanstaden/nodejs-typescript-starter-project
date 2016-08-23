/// <reference path="../typings/index.d.ts" />
import debug = require("debug");
import dotenv = require("dotenv");
import express = require("express");
import httpServerConfig = require("./config/express");
import databaseConfig = require("./config/mongoose");

// declare the app for export
let app: express.Application;

/**
 * Load environment variables from .env file, where API keys and passwords are configured.
 */
dotenv.config({ path: __dirname + "/.env.example" });

/**
 * Get the default debugger for the http server
 */
const debugr = debug("server:http");

/**
 * Database configuration
 */
const dbConnection = databaseConfig();
dbConnection.connect().then(() => {
    /**
     * Application configuration.
     */
    app = httpServerConfig();

    // If the Node process ends, close every thing that need to be closed
    process.on("SIGINT", () => {
        // For the moment, we only need to close the db.
        Promise.all([dbConnection.close()]).then(() => {
            process.exit(0);
        });
    });

    // Start listening
    app.listen(app.get("port"), () => {
        debugr(`Server listening on port ${app.get("port")}`);
    });
}).catch((error: any) => {
    debugr("MongoDB Connection Error. Please make sure that MongoDB is running:\r\n" + error);
    process.exit(1);
});

export default app;