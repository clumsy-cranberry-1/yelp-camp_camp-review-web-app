// helmet config
/* Helmet helps you secure your Express apps by setting various HTTP headers */

const scriptSrcUrls = [
	"https://api.mapbox.com/",
	"https://cdn.jsdelivr.net/",
];
const styleSrcUrls = [
	"https://api.mapbox.com/",
	"https://cdn.jsdelivr.net/",
	"https://fonts.googleapis.com"
];
const connectSrcUrls = [
	"https://api.mapbox.com/",
	"https://a.tiles.mapbox.com/",
	"https://b.tiles.mapbox.com/",
	"https://events.mapbox.com/",
];

const imgSrcUrls = [
	"https://images.unsplash.com/",
];

const fontSrcUrls = [
	"https://cdn.jsdelivr.net/",
	"https://fonts.gstatic.com"
];

module.exports.helmetContentSecurityPolicyOptions = {
	directives: {
		connectSrc: ["'self'", ...connectSrcUrls],
		defaultSrc: [],
		imgSrc: ["'self'", "blob:", "data:", ...imgSrcUrls],
		fontSrc: ["'self'", ...fontSrcUrls],
		objectSrc: [],
		scriptSrc: ["'unsafe-inline'", "'self'", ...scriptSrcUrls],
		styleSrc: ["'self'", "'unsafe-inline'", ...styleSrcUrls],
		workerSrc: ["'self'", "blob:"],
	},
};
