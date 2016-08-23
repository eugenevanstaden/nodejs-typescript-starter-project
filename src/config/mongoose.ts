import debug = require("debug");
import mongoose = require("mongoose");
import Promise = require("bluebird");
const debugr = debug("server:database");

export = () => {

    // Set bluebird as the promise library for mongoose.
    mongoose.Promise = Promise;

    // Handle Error connection
    mongoose.connection.on("error", (error: any) => {
        debugr("MongoDB Connection Error. Please make sure that MongoDB is running:\r\n" + error);
    });

    return mongoose.connect(process.env.DB_URI);
};
