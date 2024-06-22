<script lang="ts">
	import { getDirections, type Coordinates, type DirectionsRequest } from '@/api/getmap';
	import { Button } from '$lib/components/ui/button';

	export let currentLocation: Coordinates;

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
		let { latitude, longitude } = currentLocation;

		let directionsReq: DirectionsRequest = {
			origin: { latitude, longitude },
			destination: { latitude: 34.81043, longitude: 135.55898 }
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

<div class="flex flex-row space-x-5">
	<div>
		<Button on:click={onClick}>Get Directions</Button>
	</div>
	<div>
		{#if routeData}
			<p>Time:</p>
			<p>{routeData.travelDuration} {routeData.durationUnit}</p>
			<p>Route Distance:</p>
			<p>{routeData.travelDistance} {routeData.distanceUnit}</p>
		{/if}
	</div>
</div>
