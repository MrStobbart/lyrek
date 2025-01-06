<script lang="ts">
	import CategorySelection from '$lib/CategorySelection.svelte';
	import { toDisplayEur } from '$lib/expenses';
	import {
		availableCategoriesDerived,
		expensesState,
		participantsState,
		updateExpenses
	} from '$lib/stores.svelte';
	import type { Expense } from '$lib/types';
	import { dateToDisplay } from '$lib/util';

	const [getExpenses] = expensesState;
	const [getParticipants] = participantsState;

	let categoryToRedo = $state('');
	const categorisedExpenseIds = $state<Set<string>>(new Set());

	const expensesWithoutCategories = $derived.by(() =>
		getExpenses().filter(({ category, isPayment, id }) => {
			if (categoryToRedo === '') {
				return (category === undefined || category === '' || category === '–') && !isPayment;
			}

			return !categorisedExpenseIds.has(id) && category === categoryToRedo;
		})
	);

	const firstExpenseWithoutCategory = $derived(expensesWithoutCategories[0]);

	const setCategory = (selectedCategory: string, currentExpense: Expense) => {
		const updatedExpenses = getExpenses().map((expense) => {
			if (expense.title.toLocaleLowerCase() === currentExpense.title.toLocaleLowerCase()) {
				expense.category = selectedCategory;
			}
			return expense;
		});
		categorisedExpenseIds.add(currentExpense.id);
		updateExpenses(updatedExpenses);
	};
</script>

<div class="flex flex-col gap-4 items-center">
	<select class="select w-full max-w-xs" bind:value={categoryToRedo}>
		<option disabled selected value=""></option>
		{#each availableCategoriesDerived() as availableCategory}
			<option value={availableCategory}>{availableCategory}</option>
		{/each}
	</select>
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
				{#if firstExpenseWithoutCategory.participants[participant]?.plus > 0}
					<div>+{toDisplayEur(firstExpenseWithoutCategory.participants[participant]?.plus)}</div>
				{/if}
				{#if firstExpenseWithoutCategory.participants[participant]?.minus < 0}
					<div>{toDisplayEur(firstExpenseWithoutCategory.participants[participant]?.minus)}</div>
				{/if}
			</div>
		{/each}
		<CategorySelection
			onClick={(selectedCategory) => setCategory(selectedCategory, firstExpenseWithoutCategory)}
		/>
	{/if}
</div>
