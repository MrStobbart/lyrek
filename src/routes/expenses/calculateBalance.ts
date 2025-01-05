import type { Expense } from '$lib/types';

export const getBalance = (participants: string[], expenses: Expense[]) => {
	return Object.fromEntries(
		participants.map((name) => [
			name,
			expenses.reduce(
				(sum, { participants }) =>
					sum + (participants[name]?.plus ?? 0) + (participants[name]?.minus ?? 0),
				0
			)
		])
	);
};
