import { derived, writable } from 'svelte/store';
import type { Expense, SendMessageToServer } from './types';
import { persistentWritable } from './persistentWritable';

export const expensesStore = writable<Expense[]>([]);

export const loadedExpenseIdsStore = derived(expensesStore, ($expensesStore) => {
	return Object.fromEntries($expensesStore.map((item) => [item.id, true]));
});

export const sendMessageStore = writable<SendMessageToServer>();

export const participantsStore = writable<string[]>(['marek', 'lydia']);

export const currentUserStore = persistentWritable<string>('currentUser', '');
