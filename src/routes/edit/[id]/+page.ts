import { expensesState } from '$lib/stores.svelte';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ params }) => {
	const [getExpenses] = expensesState;

	console.log('expenses in edit', getExpenses());

	const expenseToEdit = getExpenses().find(({ id }) => id === params.id);

	console.log('expense to edit', expenseToEdit);

	return {
		expenseToEdit
	};
};
