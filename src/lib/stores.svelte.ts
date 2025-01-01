import type { Expense, SendMessageToServer } from './types';
import {
	createGlobalState,
	createGlobalPersistantState,
	createGlobalDerivedState
} from './persistentWritable.svelte';

export const expensesState = createGlobalState<Expense[]>([]);

export const deleteExpense = (deleteExpenseId: string) => {
	const [getExpenses, setExpenses] = expensesState;
	const [sendMessage] = sendMessageState;

	setExpenses(getExpenses().filter(({ id }) => id !== deleteExpenseId));
	sendMessage()?.({ deleteExpenseId });
};

export const updateExpenses = (updatedExpenses: Expense[]) => {
	const [getExpenses, setExpenses] = expensesState;
	const [getSendMessage] = sendMessageState;

	setExpenses(
		getExpenses().map((expense) => updatedExpenses.find(({ id }) => id === expense.id) ?? expense)
	);
	getSendMessage()?.({ updateExpenses: updatedExpenses });
};

export const createExpense = (createExpense: Expense) => {
	const [getExpenses, setExpenses] = expensesState;
	const [getSendMessage] = sendMessageState;

	setExpenses(getExpenses().concat(createExpense));
	getSendMessage()?.({ createExpense });
};

export const loadedExpenseIdsDerived = createGlobalDerivedState(() => {
	const [getExpenses] = expensesState;
	return Object.fromEntries(getExpenses().map((item) => [item.id, true]));
});
const initialDefaultCategorie = ['groceries', 'holidays', 'pharmacy', 'drugstore', 'cat'];
export const availableCategoriesDerived = createGlobalDerivedState(() => {
	const [getExpenses] = expensesState;
	console.time('start');
	const categories = [
		...new Set([
			...initialDefaultCategorie,
			...getExpenses().flatMap(({ category }) => (category ? category.toLocaleLowerCase() : []))
		])
	];

	console.timeEnd('start');
	return categories;
});

export const sendMessageState = createGlobalState<SendMessageToServer | undefined>(undefined);

export const participantsState = createGlobalState<string[]>(['marek', 'lydia']);

export const currentUserState = createGlobalPersistantState<string>('currentUser', '');
