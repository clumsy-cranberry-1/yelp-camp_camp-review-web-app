const express = require("express");
const router = express.Router();

// controllers
const campgroundCtrl = require("../controllers/campground-controller");

// middleware
const methodOverride = require("method-override");
router.use(express.urlencoded({ extended: true })); // extract HTML form data from a POST req.body
router.use(methodOverride("_method"));

// imported middleware
const { isLoggedIn, validateCampground, saveReqUrl } = require("../middleware/middleware.js");
const { route } = require("./review-routes");


// CREATE
router.get(
	"/campgrounds/new",
	isLoggedIn,
	campgroundCtrl.renderNewCampgroundForm
);

router.post(
	"/campgrounds",
	validateCampground,
	campgroundCtrl.createCampground
);

// READ
router.get(
	"/",
	campgroundCtrl.home
);

router.get(
	"/campgrounds",
	campgroundCtrl.index
);

router.get(
	"/campgrounds/:campId",
	saveReqUrl,
	campgroundCtrl.viewCampgroundDetails
);

// UPDATE
router.get(
	"/campgrounds/:campId/edit",
	isLoggedIn,
	campgroundCtrl.renderEditCampgroundForm
);

router.put(
	"/campgrounds/:campId/edit",
	validateCampground,
	campgroundCtrl.updateCampground
);

// DELETE
router.delete(
	"/campgrounds/:campId",
	isLoggedIn,
	campgroundCtrl.deleteCampground
);

module.exports = router;

// --------------------------------------------------
// restructure routes (nesting):

// router
// 	.route("/campgrounds")
// 	.get(catchAsyncError(campgroundCtrl.index))
// 	.post(validateCampground, catchAsyncError(campgroundCtrl.createCampground));

// router
// 	.route("/campgrounds/:campId")
// 	.get(catchAsyncError(campgroundCtrl.viewCampgroundDetails))
// 	.delete(isLoggedIn, catchAsyncError(campgroundCtrl.deleteCampground));

// router
// 	.route("/campgrounds/:campId/edit")
// 	.get(isLoggedIn, catchAsyncError(campgroundCtrl.renderEditCampgroundForm))
// 	.put(validateCampground, catchAsyncError(campgroundCtrl.updateCampground));