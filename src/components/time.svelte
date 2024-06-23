<script lang="ts">
	import { onMount } from 'svelte';
	import { time } from '@/store';
	import { Temporal } from '@js-temporal/polyfill';

	let hours: string;
	let minutes: string;
	let seconds: string;

	$: {
		hours = String($time.hour).padStart(2, '0');
		minutes = String($time.minute).padStart(2, '0');
		seconds = String($time.second).padStart(2, '0');
	}

	onMount(() => {
		const interval = setInterval(() => {
			time.set(Temporal.Now.plainTimeISO());
		}, 1000);
		return () => {
			clearInterval(interval);
		};
	});
</script>

<div>
	<p class="text-xl">{hours}:{minutes}:{seconds}</p>
</div>
