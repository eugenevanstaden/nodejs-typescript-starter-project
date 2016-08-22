/// <reference path="../typings/index.d.ts" />
import debug = require("debug");
import nconf = require("nconf");
import expressConfig = require("./config/express");

// get the logger
const debugr = debug("server:start");

// import config file
nconf.file({ file: __dirname + "/config.json" });

// Get the configured app
const app = expressConfig();

// listen
app.listen(app.get("port"), () => {
    debugr(`Server listening on port ${app.get("port")}`);
});

export default app;