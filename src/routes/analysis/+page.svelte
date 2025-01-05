<script lang="ts">
	import { toDisplayEur } from '$lib/expenses';
	import { availableCategoriesDerived, expensesState, participantsState } from '$lib/stores.svelte';
	import { Chart } from 'chart.js/auto';
	import { sumExpenses } from './analysisHelper';
	import { onMount } from 'svelte';

	const [getExpenses] = expensesState;
	const [getParticipants] = participantsState;

	let canvas: HTMLCanvasElement | undefined = undefined;

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
				expenses: fullyTrackedYears.filter(
					(expense) => expense.category?.toLocaleLowerCase() === category.toLocaleLowerCase()
				)
			};
		})
	);

	onMount(() => {
		if (canvas) {
			const chartInstance = new Chart(canvas, {
				type: 'bar',
				data: {
					labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
					datasets: [
						{
							label: '# of Votes',
							data: [12, 19, 3, 5, 2, 3],
							borderWidth: 1,
							stack: 'toast'
						},
						{
							label: '# of Votes 2',
							data: [12, 19, 3, 5, 2, 3],
							borderWidth: 1,
							stack: 'toast'
						},
						{
							label: '# of Votes 2',
							data: [12, 19, 3, 5, 2, 3],
							borderWidth: 1,
							stack: 'tomate'
						}
					]
				},
				options: {
					scales: {
						y: {
							beginAtZero: true
						}
					}
				}
			});
			return () => {
				chartInstance.destroy();
			};
		}
	});
</script>

<div class="flex flex-col">
	{#each categoriesWithExpenses as { category, expenses }}
		<span
			>{category}: {toDisplayEur(sumExpenses(expenses))} - Per month: {toDisplayEur(
				sumExpenses(expenses) / 24
			)}</span
		>
	{/each}

	<canvas bind:this={canvas}></canvas>
</div>
