<script lang="ts">
	import { toDisplayEur } from '$lib/expenses';
	import { expensesStore } from '$lib/stores';
	import Websocket from './Websocket.svelte';

	$: data = $expensesStore;
</script>

<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>

<Websocket />

<ul>
	{#each data as item}
		<li>Title: {item.title}: {toDisplayEur(item.amount)}</li>
	{/each}
</ul>
