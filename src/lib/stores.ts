import { writable } from 'svelte/store';
import type { Expense } from './expenses';

export const expensesStore = writable<Expense[]>([]);
