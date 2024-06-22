<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import type { Coordinates } from '@/api/getmap';
	import Geolocation from 'svelte-geolocation';

	export let currentLocation: Coordinates;

	let getPositionAgain: boolean;
	let detail: GeolocationPosition;
</script>

<Geolocation
	getPosition={getPositionAgain}
	watch={true}
	on:position={(e) => {
		console.log(e);
		detail = e.detail;
		currentLocation = {
			latitude: detail.coords.latitude,
			longitude: detail.coords.longitude
		};
	}}
/>

<div class="space-y-3">
	<Button
		class="size-sm"
		on:click={() => {
			getPositionAgain = !getPositionAgain;
		}}>Get Current Location</Button
	>
	{#if currentLocation}
		<p>{currentLocation.latitude} , {currentLocation.longitude}</p>
	{/if}
</div>
