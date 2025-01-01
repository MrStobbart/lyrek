<script lang="ts">
	import CategorySelection from '$lib/CategorySelection.svelte';
	import { expensesState } from '$lib/stores.svelte';

	const [getExpenses] = expensesState;

	console.log(
		'categories',
		getExpenses().map(({ category }) => category)
	);

	const expensesWithoutCategories = $derived.by(() =>
		getExpenses().filter(
			({ category }) => category === undefined || category === '' || category === '–'
		)
	);

	const firstExpenseWithoutCategory = $derived(expensesWithoutCategories[0]);

	const setCategory = (selectedCategory: string) => {
		console.log('set', selectedCategory);
	};
</script>

<div class="flex flex-col gap-4 items-center">
	<span>Exenses without categories: {expensesWithoutCategories.length}</span>
	{#if firstExpenseWithoutCategory === undefined}
		<span>All expenses categorised</span>
	{:else}
		{firstExpenseWithoutCategory.title}
		<CategorySelection onClick={setCategory} />
	{/if}
</div>
