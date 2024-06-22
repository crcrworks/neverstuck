<script lang="ts">
	import TrafficSignals from '@/components/trafficSignal/trafficSignals.svelte';
	import StatusList from '@/components/trafficSignal/statusList.svelte';
	import { onMount } from 'svelte';
	import { trafficSignals } from '@/store';
	import type { TrafficSignal } from '@/types';
	import { v4 as uuidv4 } from 'uuid';
	import { Temporal } from '@js-temporal/polyfill';

	onMount(async () => {
		fetch('/TS-Data.json')
			.then((res) => res.json())
			.then((data) =>
				trafficSignals.set(
					data.map((item: TrafficSignal) => ({
						...item,
						signalData: item.signalData.map((signal) => ({
							...signal,
							startTime: Temporal.PlainTime.from(signal.startTime),
							endTime: Temporal.PlainTime.from(signal.endTime),
							isInRange: false
						})),
						id: uuidv4()
					}))
				)
			);
	});
</script>

<div class="flex flex-row space-x-20 items-stretch">
	<TrafficSignals />
	<StatusList />
</div>
