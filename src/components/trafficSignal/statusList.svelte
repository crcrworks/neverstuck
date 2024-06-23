<script lang="ts">
	import * as Table from '$lib/components/ui/table/index';
	import { selectedTS, time } from '@/store';
	import { Temporal } from '@js-temporal/polyfill';

	$: {
		if ($selectedTS) {
			selectedTS.set({
				...$selectedTS,
				signalData: $selectedTS.signalData.map((signal) => ({
					...signal,
					isInRange:
						Temporal.PlainTime.compare($time, signal.startTime) >= 0 &&
						Temporal.PlainTime.compare($time, signal.endTime) <= 0
				}))
			});
		}
	}

	function convertDateToString(date: Temporal.PlainTime) {
		const hour = date.hour.toString().padStart(2, '0');
		const minute = date.minute.toString().padStart(2, '0');
		const second = date.second.toString().padStart(2, '0');

		return `${hour}:${minute}:${second}`;
	}
</script>

<div class="space-y-5">
	<div class="flex flex-col space-y-2">
		<p class="text-2xl font-bold">{$selectedTS?.name}</p>
		<p>( {$selectedTS?.location.latitude}, {$selectedTS?.location.longitude} )</p>
	</div>
	<Table.Root>
		<Table.Caption>A list of light information</Table.Caption>
		<Table.Header>
			<Table.Row>
				<Table.Head class="w-[100px]">Color</Table.Head>
				<Table.Head>startTime</Table.Head>
				<Table.Head>endTime</Table.Head>
			</Table.Row>
		</Table.Header>
		<Table.Body>
			{#if $selectedTS}
				{#each $selectedTS.signalData as signal}
					<Table.Row data-active={signal.isInRange} class="data-[active=true]:bg-red-200">
						<Table.Cell>{signal.color}</Table.Cell>
						<Table.Cell>
							{convertDateToString(signal.startTime)}
						</Table.Cell>
						<Table.Cell>{convertDateToString(signal.endTime)}</Table.Cell>
					</Table.Row>
				{/each}
			{/if}
		</Table.Body>
	</Table.Root>
</div>
