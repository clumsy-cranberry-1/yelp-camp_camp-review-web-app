const userModel = require("../models/user-model.js");

module.exports.renderRegisterUserForm = (req, res, next) => {
	res.render("pages/users/register.ejs");
};

module.exports.registerUser = async (req, res, next) => {
	try {
		const { email, username, password } = req.body;
		const user = new userModel({ email, username });
		await userModel.register(user, password);

		req.flash("success", "Your account has been created successfully. Please continue by logging in."
		);

		res.redirect("/login");
	} catch (error) {
		req.flash("error", error.message);

		res.redirect("/register");
		next(error);
	}
};

module.exports.renderLoginForm = (req, res, next) => {
	res.render("pages/users/login.ejs");
};

module.exports.logUserOut = (req, res, next) => {
	req.logout();
	res.redirect("/");
};
