export type MessageToServer = {
	createExpense?: Expense;
	updateExpense?: Expense;
	deleteExpenseId?: string;
};

export type SendMessageToServer = (message: MessageToServer, withRetry?: boolean) => Promise<void>;

export type MessageToClient = {
	expenses?: Expense[];
	createdExpense?: Expense;
	updatedExpense?: Expense;
	deletedExpenseId?: string;
};

export type ExpenseByParticipant = {
	plus: number;
	minus: number;
};

export type Expense = {
	id: string;
	title: string;
	amount: number;
	currency: string;
	by: string;
	date: number;
	category?: string;
	isPayment: boolean;
	participants: Record<string, ExpenseByParticipant>;
};
