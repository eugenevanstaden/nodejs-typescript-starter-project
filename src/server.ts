/// <reference path="../typings/index.d.ts" />
import express = require("express");
import http = require("http");

const debug = require("debug")("app-start");
const app = express();


app.set("port", process.env.PORT || 5000);

http.createServer(app).listen(this.app.get("port"), () => {
    debug("Server listening on port 5000");
});

