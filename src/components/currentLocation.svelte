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
		detail = e.detail;
		currentLocation = {
			latitude: detail.coords.latitude,
			longitude: detail.coords.longitude
		};
	}}
/>

<div class="space-y-3">
	<Button
		data-active={getPositionAgain}
		class="size-sm bg-black data-[active=true]:bg-red-500"
		on:click={() => {
			getPositionAgain = !getPositionAgain;
		}}>Update Current Location</Button
	>
	{#if currentLocation}
		<p>{currentLocation.latitude} , {currentLocation.longitude}</p>
	{/if}
</div>
