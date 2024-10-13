import { expensesStore } from '$lib/stores';
import { get } from 'svelte/store';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ params }) => {
	const expenses = get(expensesStore);

	console.log('expenses in edit', expenses);

	const expenseToEdit = expenses.find(({ id }) => id === params.id);

	console.log('expense to edit', expenseToEdit);

	return {
		expenseToEdit
	};
};
