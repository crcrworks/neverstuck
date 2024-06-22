<script lang="ts">
	import { Input } from '@/components/ui/input';
	import type { Coordinate } from '../types';

	import { createTable, Render, Subscribe } from 'svelte-headless-table';
	import { readable } from 'svelte/store';
	import * as Table from '$lib/components/ui/table';
	import { Root } from '@/components/ui/button';

	let str: string = '';

	type TrafficSignalStatus = {
		color: 'red' | 'blue' | 'yellow';
		startTime: Date;
		endTime: Date;
	};

	type TrafficSignal = {
		id: string;
		location: Coordinate;
		signalData: TrafficSignalStatus[];
	};

	let trafficSignalStatus: TrafficSignalStatus[] = [
		{
			color: 'red',
			startTime: new Date(2024, 6, 20),
			endTime: new Date(2024, 6, 20)
		}
	];

	const table = createTable(readable(trafficSignalStatus));
	const colmuns = table.createColumns([
		table.column({
			accessor: 'color',
			header: 'Color'
		}),
		table.column({
			accessor: 'startTime',
			header: 'StartTime'
		}),
		table.column({
			accessor: 'endTime',
			header: 'EndTime'
		})
	]);

	const { headerRows, pageRows, tableAttrs, tableBodyAttrs } = table.createViewModel(colmuns);
</script>

<div class="space-y-5">
	<div class="rounded-md border">
		<Table.Root {...$tableAttrs}>
			<Table.Header>
				{#each $headerRows as headerRow}
					<Subscribe rowAttrs={headerRow.attrs()}>
						<Table.Row>
							{#each headerRow.cells as cell (cell.id)}
								<Subscribe attrs={cell.attrs()} let:attrs props={cell.props()}>
									<Table.Head {...attrs}>
										<Render of={cell.render()} />
									</Table.Head>
								</Subscribe>
							{/each}
						</Table.Row>
					</Subscribe>
				{/each}
			</Table.Header>
			<Table.Body {...$tableBodyAttrs}>
				{#each $pageRows as row (row.id)}
					<Subscribe rowAttrs={row.attrs()} let:rowAttrs>
						<Table.Row {...rowAttrs}>
							{#each row.cells as cell (cell.id)}
								<Subscribe attrs={cell.attrs()} let:attrs>
									<Table.Cell {...attrs}>
										<Render of={cell.render()} />
									</Table.Cell>
								</Subscribe>
							{/each}
						</Table.Row>
					</Subscribe>
				{/each}
			</Table.Body>
		</Table.Root>
	</div>
</div>
