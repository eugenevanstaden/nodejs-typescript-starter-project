import bodyParser = require("body-parser");
import compression = require("compression");
import cors = require("cors");
import cookieParser = require("cookie-parser");
import express = require("express");
import flash = require("connect-flash");
import helmet = require("helmet");
import methodOverride = require("method-override");
import morgan = require("morgan");

export = () : express.Application =>  {

    const app = express();

    // Set application port
    app.set("port", process.env.PORT || 3000);

    // HTTP request logger middleware for node.js
    if ("development" === app.get("env")) {
        app.use(morgan("dev"));
    }

    // Parse incoming request bodies in a middleware before your handlers, available under the req.body property.
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));

    // Helmet helps you secure your Express apps by setting various HTTP headers. It's not a silver bullet, but it can help!
    app.use(helmet());

    // Parse Cookie header and populate req.cookies with an object keyed by the cookie names
    app.use(cookieParser());

    // Node.js compression middleware.
    app.use(compression());

    // Lets you use HTTP verbs such as PUT or DELETE in places where the client doesn't support it.
    app.use(methodOverride());
    
    // Enable CORS - Cross Origin Resource Sharing
    app.use(cors());

    // Connect flash for flash messages
    app.use(flash());

    return app;
};