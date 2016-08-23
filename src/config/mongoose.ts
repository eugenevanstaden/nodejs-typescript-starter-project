import mongoose = require("mongoose");
import Promise = require("bluebird");

export = (): DbConnection => {
    // Set bluebird as the promise library for mongoose.
    mongoose.Promise = Promise;

    // Return the Dbconnection object
    return {
        connect: () => {
            return mongoose.connect(process.env.DB_URI).then(() => {
                return Promise.resolve();
            });
        },
        close: () => {
            return mongoose.connection.close();
        }
    };
};

interface DbConnection {
    connect: () => Promise<void>;
    close: () => Promise<void>;
}
