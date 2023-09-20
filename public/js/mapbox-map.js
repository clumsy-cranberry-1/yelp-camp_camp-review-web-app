// mapboxgl.accessToken = process.env.MAPBOX_TOKEN;

mapboxgl.accessToken = "pk.eyJ1IjoiY2x1bXN5LWNyYW5iZXJyeS0xIiwiYSI6ImNrcTJkYjk1MDA4cDcycG8wNWJrNHVsZDcifQ.xrBpNF65EPpHd_0p2urt2g";

var map = new mapboxgl.Map({
	container: "map", // container ID
	style: "mapbox://styles/mapbox/light-v10", // style URL
	center: campgroundCoordinates.geometry.coordinates, // starting position [lng, lat]
	zoom: 12, // starting zoom
});

// Create a default Marker and add it to the map.
var marker1 = new mapboxgl.Marker({ color: "#0d6efd" })
	.setLngLat(campgroundCoordinates.geometry.coordinates)
	.addTo(map);
