/// <reference path="../typings/index.d.ts" />
import express = require("express");
import http = require("http");

let app = express();
app.set("port", process.env.PORT || 5000);

http.createServer(app).listen(this.app.get("port"), () => {
    console.log("Server listening on port 5000");
});

