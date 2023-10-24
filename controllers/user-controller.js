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

// Redirect the user to the requested URL after Authentication (by default, the Passport "locals strategy" allows successRedirect to only a single predefined url, so this allows us to log the user in and then redirect them to the same page that they last viewed.)
module.exports.logUserIn = (req, res) => {
	if (req.session.reqUrl) {
		return res.redirect(req.session.reqUrl);
	}
	else res.redirect('/campgrounds');
}

module.exports.logUserOut = (req, res) => {
	req.logout();
	res.redirect("/");
};
