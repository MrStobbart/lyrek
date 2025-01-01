<script lang="ts">
	import CategorySelection from '$lib/CategorySelection.svelte';
	import { toDisplayEur } from '$lib/expenses';
	import { expensesState, participantsState, updateExpenses } from '$lib/stores.svelte';
	import type { Expense } from '$lib/types';
	import { dateToDisplay } from '$lib/util';

	const [getExpenses] = expensesState;
	const [getParticipants] = participantsState;

	console.log(
		'categories',
		getExpenses().map(({ category }) => category)
	);

	const expensesWithoutCategories = $derived.by(() =>
		getExpenses().filter(
			({ category, isPayment }) =>
				(category === undefined || category === '' || category === '–') && !isPayment
		)
	);

	const firstExpenseWithoutCategory = $derived(expensesWithoutCategories[0]);

	const setCategory = (selectedCategory: string, currentExpense: Expense) => {
		const updatedExpenses = getExpenses().map((expense) => {
			console.log('firstExpenseWithoutCategory.title', currentExpense.title);
			console.log('expense.title', expense.title);

			if (expense.title.toLocaleLowerCase() === currentExpense.title.toLocaleLowerCase()) {
				expense.category = selectedCategory;
			}
			return expense;
		});
		updateExpenses(updatedExpenses);
	};
</script>

<div class="flex flex-col gap-4 items-center">
	<span>Exenses without categories: {expensesWithoutCategories.length}</span>
	{#if firstExpenseWithoutCategory === undefined}
		<span>All expenses categorised</span>
	{:else}
		<span>{firstExpenseWithoutCategory.title}</span>
		<span>{dateToDisplay(new Date(firstExpenseWithoutCategory.date))}</span>
		<span>{toDisplayEur(firstExpenseWithoutCategory.amount)}€</span>
		<span>Is payment: {firstExpenseWithoutCategory.isPayment}</span>
		{#each getParticipants() as participant}
			<div class="text-sm flex gap-1">
				<div class="capitalize">{participant}</div>
				{#if firstExpenseWithoutCategory.participants[participant].plus > 0}
					<div>+{toDisplayEur(firstExpenseWithoutCategory.participants[participant].plus)}</div>
				{/if}
				{#if firstExpenseWithoutCategory.participants[participant].minus < 0}
					<div>{toDisplayEur(firstExpenseWithoutCategory.participants[participant].minus)}</div>
				{/if}
			</div>
		{/each}
		<CategorySelection
			onClick={(selectedCategory) => setCategory(selectedCategory, firstExpenseWithoutCategory)}
		/>
	{/if}
</div>
