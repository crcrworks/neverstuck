<script lang="ts">
	import Geolocation from 'svelte-geolocation';
	import { getDirections, type Coordinates, type DirectionsRequest } from '../api/getmap';

	let getPositionAgain = false;
	let detail: GeolocationPosition;

	let currentLocation: Coordinates;
	let routeData: RouteData;

	type RouteData = {
		origin: Coordinates;
		destination: Coordinates;
		distanceUnit: string;
		durationUnit: string;
		travelDuration: number;
		travelDistance: number;
	};

	function onClick() {
		console.log('clicked');

		let { latitude, longitude } = detail.coords;

		let directionsReq: DirectionsRequest = {
			origin: { latitude, longitude },
			destination: { latitude: 34.52994, longitude: 135.49786 }
		};

		getDirections(directionsReq)
			.then((res) => {
				res.json().then((data) => {
					console.log(data);
					const resources = data.resourceSets[0].resources[0];
					routeData = {
						origin: { latitude: resources.bbox[0], longitude: resources.bbox[1] },
						destination: {
							latitude: resources.bbox[2],
							longitude: resources.bbox[3]
						},
						distanceUnit: resources.distanceUnit,
						durationUnit: resources.durationUnit,
						travelDuration: resources.travelDuration,
						travelDistance: resources.travelDistance
					};
				});
			})
			.catch((err) => {
				console.error(err.json());
			});
	}
</script>

<Geolocation
	getPosition={getPositionAgain}
	watch={true}
	on:position={(e) => {
		detail = e.detail;
		currentLocation = {
			latitude: detail.coords.latitude,
			longitude: detail.coords.longitude
		};
	}}
/>

<div class="container">
	<button on:click={() => (getPositionAgain = !getPositionAgain)}> Get Current Location </button>
	{#if currentLocation}
		<p>{currentLocation.latitude} , {currentLocation.longitude}</p>
	{/if}
	<hr />
	<button on:click={onClick}>Get Directions</button>
	{#if routeData}
		<p>Time:</p>
		<p>{routeData.travelDuration} {routeData.durationUnit}</p>
		<p>Route Distance:</p>
		<p>{routeData.travelDistance} {routeData.distanceUnit}</p>
	{/if}
</div>
