export function getCenter(coordinates) {
	var latitudes = [];
	var longitudes = [];

	coordinates.forEach(coordinate => {
		latitudes.push(coordinate.lat);
		longitudes.push(coordinate.lng);
	});

	const meanLat = latitudes.reduce(function(a, b) {
		return a + b;
	}, 0);

	const meanLng = longitudes.reduce(function(a, b) {
		return a + b;
	}, 0);

	return { lat: meanLat / latitudes.length, lng: meanLng / longitudes.length };
}
