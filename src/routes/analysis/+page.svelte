<script lang="ts">
	import { toDisplayEur } from '$lib/expenses';
	import { availableCategoriesDerived, expensesState, participantsState } from '$lib/stores.svelte';
	import { sumExpenses } from './analysisHelper';

	const [getExpenses] = expensesState;
	const [getParticipants] = participantsState;

	const fullyTrackedYears = $derived.by(() =>
		getExpenses().filter((expense) => {
			const date = new Date(expense.date);
			if (date.getFullYear() === 2023 || date.getFullYear() === 2024) {
				return true;
			}
			return false;
		})
	);

	const categoriesWithExpenses = $derived.by(() =>
		availableCategoriesDerived().map((category) => {
			return {
				category,
				expenses: fullyTrackedYears.filter((expense) => expense.category === category)
			};
		})
	);
</script>

<div class="flex flex-col">
	{#each categoriesWithExpenses as { category, expenses }}
		<span
			>{category}: {toDisplayEur(sumExpenses(expenses))} - Per month: {toDisplayEur(
				sumExpenses(expenses) / 24
			)}</span
		>
	{/each}
</div>
