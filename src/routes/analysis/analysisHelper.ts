import type { Expense } from '$lib/types';

export const sumExpenses = (expenses: Expense[]): number => {
	return expenses.reduce((prev, curr) => prev + curr.amount, 0);
};
