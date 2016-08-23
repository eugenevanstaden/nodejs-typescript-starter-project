/// <reference path="../typings/index.d.ts" />
import debug = require("debug");
import dotenv = require("dotenv");
import httpServerConfig = require("./config/express");
import mongoose = require("mongoose");
import Promise = require("bluebird");

/**
 * Load environment variables from .env file, where API keys and passwords are configured.
 */
dotenv.config({ path: __dirname +  "/.env.example" });

/**
 * Get the default debugger for the http server
 */
const debugr = debug("server:http");


mongoose.Promise = Promise; 
// Handle Error connection
mongoose.connection.on("error", (error: any) => {
    debugr("MongoDB Connection Error. Please make sure that MongoDB is running:\r\n" + error);
});

mongoose.connection.once("open", () => {
    debugr("conected to db");
});

mongoose.connect(process.env.DB_URI).then(() => {
    debugr("connected ???");
}).catch((error: any) => {
    debugr(error);
    process.exit(1);
});

/**
 * Application configuration.
 */
const app = httpServerConfig();


//const db = mongooseConfig();

// listen
app.listen(app.get("port"), () => {
    debugr(`Server listening on port ${app.get("port")}`);
});



export default app;