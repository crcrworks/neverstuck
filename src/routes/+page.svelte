<script lang="ts">
	import '../app.css';
	import { type Coordinates } from '../api/getmap';

	import Database from '../components/database.svelte';
	import Route from '../components/route.svelte';
	import CurrentLocation from '../components/currentLocation.svelte';

	let currentLocation: Coordinates;

	let tsList: TSData[] = [
		{
			location: {
				latitude: 34.81043,
				longitude: 135.55898
			}
		}
	];

	type TSData = {
		location: Coordinates;
	};
</script>

<div class="flex flex-col m-10 space-y-5">
	<div class="flex flex-row space-x-20">
		<CurrentLocation bind:currentLocation />
		<Route {currentLocation} />
	</div>
	<hr />
	<Database />
</div>
