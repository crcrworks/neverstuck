const BING_MAPS_API_KEY = import.meta.env.VITE_BING_MAPS_API_KEY;
const type = 'Warking';
const endpoint = 'http://dev.virtualearth.net/REST/v1/Routes';

export type Coordinates = {
	latitude: number;
	longitude: number;
};

export type DirectionsRequest = {
	origin: Coordinates;
	destination: Coordinates;
};

export async function getDirections(req: DirectionsRequest) {
	let { latitude: originLatitude, longitude: originLongitude } = req.origin;
	let { latitude: destLatitude, longitude: destLongitude } = req.destination;

	if (!BING_MAPS_API_KEY) {
		throw new Error('API Key is required');
	}

	const url = `${endpoint}/${type}?wp.0=${originLatitude},${originLongitude}&wp.1=${destLatitude},${destLongitude}&key=${BING_MAPS_API_KEY}`;
	return await fetch(url);
}
