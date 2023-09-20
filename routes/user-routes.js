const express = require("express");
const passport = require("passport");
const router = express.Router();
const userCtrl = require("../controllers/user-controller");

// util
const catchAsyncError = require("../util/async-error");

const { validateUser } = require("../middleware/middleware");

// ========================================= START OF CRUD =========================================
// ===== CREATE =====
router.get("/register", userCtrl.renderRegisterUserForm);

router.post(
	"/register",
	validateUser,
	catchAsyncError(userCtrl.registerUser)
);

// ===== READ =====
router.get("/login", userCtrl.renderLoginForm);

router.post(
	"/login",
	passport.authenticate("local", {
		successRedirect: "/campgrounds",
		failureRedirect: "/login",
		failureFlash: true,
		success: true,
	}),
	validateUser
);

// ===== DELETE =====
router.get("/logout", userCtrl.logUserOut);

module.exports = router;

// -------------------------------------------------------------------------------------------------
// restructure routes (nesting):

// router
// 	.route("/register")
// 	.get(userCtrl.renderRegisterUserForm)
// 	.post(catchAsyncError(userCtrl.registerUser));

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
