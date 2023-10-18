if (process.env.NODE_ENV === undefined) {
	require("dotenv").config();
};

const express = require("express");
const app = express();

// ESTABLISH MONOGO DATABSE CONNECTION
const connectMongoDB = require("./config/database-config");
connectMongoDB();

// express application settings
const ejsMate = require("ejs-mate");
const path = require("path");
app.set("views", path.join(__dirname, "views")); // views directory
app.set("view engine", "ejs"); // view engine
app.engine("ejs", ejsMate);

// express custom error handler class
const expressError = require("./util/express-error");

// ---------- MIDDLEWARE ----------
/* the path that you provide to the 
express.static function is relative to the directory from where you launch your node process. 
If you run the express app from another directory, it’s safer to use the absolute path of the 
directory that you want to serve */
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true })); // extract HTML form data from a POST req.body

// prevent MongoDB operator injection
const mongoSanitize = require("express-mongo-sanitize");
app.use(mongoSanitize());

// helmet helps you secure your Express apps by setting various HTTP headers
const helmet = require("helmet");
const {
	helmetContentSecurityPolicyOptions,
} = require("./config/helmet-config");
app.use(helmet.contentSecurityPolicy(helmetContentSecurityPolicyOptions));

// express-session
// IMPORTANT: The default server-side session storage, MemoryStore, is purposely not designed for a production environment. It will leak memory under most conditions, does not scale past a single process, and is meant for debugging and developing only.
const session = require("express-session");
const { sessionConfig } = require("./config/sessions-config");
app.use(session(sessionConfig));

// flash messages are stored in the session
const flash = require("connect-flash");
app.use(flash());

const passport = require("passport");
const passportLocalStrategy = require("passport-local");
// import the model with Passport-Local Mongoose plugged in
const userModel = require("./models/user-model");
// required to initialise Passport in Connect/Express-based apps
app.use(passport.initialize());
// required when application uses persistent login sessions *(make sure session() is used before passport.session)*
app.use(passport.session());

// use static authenticate method of model in LocalStrategy
passport.use(new passportLocalStrategy(userModel.authenticate()));

// use static serialize and deserialize of model for passport session support
passport.serializeUser(userModel.serializeUser());
passport.deserializeUser(userModel.deserializeUser());

// NB: passport middlewares must lie before local variables
app.use((req, res, next) => {
	res.locals.isAuthenticatedUser = req.user; // Passport: If authentication succeeded, the req.user property will be set to the authenticated user.
	res.locals.success = req.flash("success");
	res.locals.error = req.flash("error");
	next();
});

// add routers to the middleware handling path
const campgroundRoutes = require("./routes/campground-routes");
const reviewRoutes = require("./routes/review-routes");
const userRoutes = require("./routes/user-routes");
app.use("/", campgroundRoutes);
app.use("/", reviewRoutes);
app.use("/", userRoutes);


// ERROR HANDLING
// this code will only run if none of the routes are matched to the requested URL (Page not found: 404)
app.all("*", (req, res, next) => {
	next(new expressError(404, `PAGE NOT FOUND. We're sorry, we couldn't find the page you requested.`));
});

// NB: must be placed AFTER all other middlewares and routes.
app.use((err, req, res, next) => {
	err.statusCode = err.statusCode || 500;
	res.status(err.statusCode).render("pages/camps/errors.ejs", { err });
});

// ---------- ESTABLISH HTTP SERVER CONNECTION ----------
const port = process.env.PORT || 4001;
app.listen(port, () =>
	console.log(`Yelp-Camp app listening on http://localhost:${port}`)
);