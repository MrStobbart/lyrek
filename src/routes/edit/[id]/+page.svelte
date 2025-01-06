<script lang="ts">
	import { goto } from '$app/navigation';
	import NewExpense from '$lib/NewExpense.svelte';
	import { updateExpenses } from '$lib/stores.svelte';
	import type { Expense } from '$lib/types';
	import type { PageData } from './$types';

	export let data: PageData;

	const save = (updatedExpense: Expense) => {
		updateExpenses([updatedExpense]);
		goto('/expenses');
	};
</script>

{#if data.expenseToEdit}
	<NewExpense
		id={data.expenseToEdit.id}
		title={data.expenseToEdit.title}
		amount={data.expenseToEdit.amount}
		by={data.expenseToEdit.by}
		category={data.expenseToEdit.category}
		date={data.expenseToEdit.date}
		{save}
	/>
{:else}
	<div>Loading ...</div>
{/if}
