<script lang="ts">
	import '@/app.css';
	import { type Coordinates } from '@/api/getmap';

	import TrafficSignal from '@/components/trafficSignal/init.svelte';
	import Route from '@/components/route.svelte';
	import CurrentLocation from '@/components/currentLocation.svelte';
	import Time from '@/components/time.svelte';

	let currentLocation: Coordinates;
</script>

<div class="flex flex-col m-10 space-y-5">
	<div class="flex flex-row space-x-5">
		<CurrentLocation bind:currentLocation />
		<Route {currentLocation} />
	</div>
	<hr />

	<Time />
	<TrafficSignal />
</div>
