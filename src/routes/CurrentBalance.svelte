<script lang="ts">
	import { toDisplayEur, type Expense } from '$lib/expenses';
	import { writable, type Writable } from 'svelte/store';

	export let expenses: Expense[];
	export let participants: string[];

	$: console.log('participants', participants);
	$: console.log('expenses', expenses);

	$: balance = Object.fromEntries(
		participants.map((name) => [
			name,
			expenses.reduce(
				(sum, { participants }) =>
					sum + (participants[name].plus ?? 0) - (participants[name].minus ?? 0),
				0
			)
		])
	);

	$: console.log('balance', balance);
</script>

<div class="flex flex-col gap-4">
	<div>Marek: {toDisplayEur(balance.marek)}</div>
	<div>Lydia: {toDisplayEur(balance.lydia)}</div>

	<div class="flex gap-4 flex-col">
		{#each expenses as { title, amount, by, category }}
			<div class="text-xs font-light">{title} ({category}): {toDisplayEur(amount)} by {by}</div>
		{/each}
	</div>
</div>
