<script lang="ts">
	import * as RadioGroup from '$lib/components/ui/radio-group/index';
	import { Label } from '$lib/components/ui/label';
	import { selectedTS, trafficSignals } from '@/store';

	let currentID: string;

	$: {
		let foundTS = $trafficSignals.find((item) => item.id === currentID);
		if (foundTS) {
			selectedTS.set(foundTS);
		}
	}
</script>

<div>
	<RadioGroup.Root bind:value={currentID} class="flex flex-col">
		{#each $trafficSignals as item}
			<Label
				for={item.id}
				class="flex flex-col items-center justify-between rounded-md border-2
				border-muted bg-popover p-4
				hover:bg-accent hover:text-accent-foreground [&:has([data-state=checked])]:border-primary"
			>
				<RadioGroup.Item value={item.id} id={item.id} class="sr-only" aria-label="Card" />
				<p>{item.name}</p>
			</Label>
		{/each}
	</RadioGroup.Root>
</div>
