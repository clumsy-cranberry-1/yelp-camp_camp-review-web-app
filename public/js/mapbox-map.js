mapboxgl.accessToken = process.env.MAPBOX_TOKEN;

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
