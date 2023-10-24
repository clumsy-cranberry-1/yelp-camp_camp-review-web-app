const express = require("express");
const passport = require("passport");
const router = express.Router();
const userCtrl = require("../controllers/user-controller");

const { validateUser } = require("../middleware/middleware");


// CREATE
router.get("/register", userCtrl.renderRegisterUserForm);

router.post(
	"/register",
	validateUser,
	userCtrl.registerUser
);


// READ
router.get("/login", userCtrl.renderLoginForm);

router.post(
	"/login",
	passport.authenticate('local', { failureRedirect: '/login', failureFlash: true }),
	userCtrl.logUserIn,
	validateUser
);


// DELETE
router.get("/logout", userCtrl.logUserOut);

module.exports = router;


// --------------------------------------------------
// restructure routes (nesting):

// router
// 	.route("/register")
// 	.get(userCtrl.renderRegisterUserForm)
// 	.post(userCtrl.registerUser);

// router
// 	.route("/login")
// 	.get(userCtrl.renderLoginForm)
// 	.post(
// 		passport.authenticate("local", {
// 			failureFlash: true,
// 			failureRedirect: "/login",
// 		}),
// 		validateUser
// 	);

// router.get("/logout", userCtrl.logUserOut);

// module.exports = router;
