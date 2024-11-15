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

export const updateExpense = (updateExpense: Expense) => {
	const [getExpenses, setExpenses] = expensesState;
	const [getSendMessage] = sendMessageState;
	setExpenses(
		getExpenses().map((expense) => {
			if (updateExpense.id === expense.id) {
				return updateExpense;
			}
			return expense;
		})
	);
	getSendMessage()?.({ updateExpense });
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

export const sendMessageState = createGlobalState<SendMessageToServer | undefined>(undefined);

export const participantsState = createGlobalState<string[]>(['marek', 'lydia']);

export const currentUserState = createGlobalPersistantState<string>('currentUser', '');
