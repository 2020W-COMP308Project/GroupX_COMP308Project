// Load the module dependencies
const config = require("./config");
const express = require("express");
const morgan = require("morgan");
const compress = require("compression");
const bodyParser = require("body-parser");
const methodOverride = require("method-override");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const flash = require("connect-flash");
const passport = require("passport");

// Define the Express configuration method
module.exports = function () {
  // Create a new Express application instance
  const app = express();

  // Use the 'NDOE_ENV' variable to activate the 'morgan' logger or 'compress' middleware
  if (process.env.NODE_ENV === "development") {
    app.use(morgan("dev"));
  } else if (process.env.NODE_ENV === "production") {
    app.use(compress());
  }

  // Use the 'body-parser' and 'method-override' middleware functions
  app.use(
    bodyParser.urlencoded({
      extended: true,
    })
  );
  app.use(bodyParser.json());
  app.use(methodOverride());
  app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
  });
  app.use(cors());

  //handle the use of PUT or DELETE methods
  //override with POST having ?_method=DELETE or
  // ?_method=PUT
  app.use(methodOverride("_method"));

  // Configure the 'session' middleware
  app.use(
    session({
      saveUninitialized: true,
      resave: true,
      secret: config.sessionSecret, // secret used to sign the session ID cookie
    })
  );

  // Set the application view engine and 'views' folder
  app.set("views", "./app/views");
  app.set("view engine", "ejs");
  app.engine("html", require("ejs").renderFile);

  // Configure the flash messages middleware
  app.use(flash());

  // Configure the Passport middleware
  app.use(passport.initialize());
  app.use(passport.session());

  // Load the routing files
  require("../app/routes/alert.server.routes.js")(app);
  require("../app/routes/clinicalVisit.server.routes.js")(app);
  require("../app/routes/dailyInfo.server.routes.js")(app);
  require("../app/routes/login.server.routes.js")(app);
  require("../app/routes/ml.server.routes.js")(app);

  // Configure static file serving
  app.use(express.static("./public"));

  // Return the Express application instance
  return app;
};
