import { derived, writable } from 'svelte/store';
import type { Expense } from './types';

export const expensesStore = writable<Expense[]>([]);

export const loadedEpxenseIdsStore = derived(expensesStore, ($expensesStore) => {
	return Object.fromEntries($expensesStore.map((item) => [item.id, true]));
});

export const participantsStore = writable<string[]>(['marek', 'lydia']);
