module.exports.sessionConfig = {
	secret: "keyboard cat",
	resave: false,
	saveUninitialized: true,
	cookie: {
		maxAge: 1000 * 60 * 60 * 24 * 7,
	},
};