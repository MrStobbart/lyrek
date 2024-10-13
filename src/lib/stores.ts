import { derived, get, writable } from 'svelte/store';
import type { Expense, SendMessageToServer } from './types';
import { persistentWritable } from './persistentWritable';

export const expensesStore = writable<Expense[]>([]);

export const deleteExpense = (deleteExpenseId: string) => {
	expensesStore.update((expenses) => expenses.filter(({ id }) => id !== deleteExpenseId));
	get(sendMessageStore)({ deleteExpenseId });
};

export const updateExpense = (updateExpense: Expense) => {
	expensesStore.update((expenses) =>
		expenses.map((expense) => {
			if (updateExpense.id === expense.id) {
				return updateExpense;
			}
			return expense;
		})
	);
	get(sendMessageStore)({ updateExpense });
};

export const createExpense = (createExpense: Expense) => {
	expensesStore.update((expenses) => expenses.concat(createExpense));
	get(sendMessageStore)({ createExpense });
};

export const loadedExpenseIdsStore = derived(expensesStore, ($expensesStore) => {
	return Object.fromEntries($expensesStore.map((item) => [item.id, true]));
});

export const sendMessageStore = writable<SendMessageToServer>();

export const participantsStore = writable<string[]>(['marek', 'lydia']);

export const currentUserStore = persistentWritable<string>('currentUser', '');
