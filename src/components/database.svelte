<script lang="ts">
	import { Input } from '@/components/ui/input';
	let str: string = '';
</script>

<div>
	<p class="text-xl">Database</p>
	<div class="flex flex-row space-x-3">
		<Input bind:value={str} />
		<p>{str}</p>
	</div>
</div>
