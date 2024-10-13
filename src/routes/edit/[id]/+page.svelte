<script lang="ts">
	import { goto } from '$app/navigation';
	import NewExpense from '$lib/NewExpense.svelte';
	import { updateExpense } from '$lib/stores';
	import type { Expense } from '$lib/types';
	import type { PageData } from './$types';

	export let data: PageData;

	const save = (updatedExpense: Expense) => {
		updateExpense(updatedExpense);
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
		{save}
	/>
{:else}
	<div>Loading ...</div>
{/if}
