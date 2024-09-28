export type ExpenseByParticipant = {
	plus: number;
	minus: number;
};

// TODO this does need and id
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

export const sheetToExpenses = (sheetData: string[][] | null | undefined): Expense[] => {
	return sheetData ? sheetData.map(rowToExpense).slice(1) : [];
};

export const rowToExpense = (row: string[]): Expense => {
	try {
		const [title, amount, currency, by, date, lydiaPlus, lydiaMinus, marekPlus, marekMinus] = row;
		return {
			id: crypto.randomUUID(),
			title,
			amount: toCent(amount),
			currency,
			by,
			date: new Date(date).getTime(),
			isPayment: false,
			participants: {
				lydia: { minus: toCent(lydiaMinus), plus: toCent(lydiaPlus) },
				marek: { minus: toCent(marekMinus), plus: toCent(marekPlus) }
			}
		};
	} catch (error) {
		console.error('Data in row is missing');
		throw error;
	}
};

export const toCent = (amount: string): number => {
	return parseFloat((amount ?? '').replaceAll(',', '.')) * 100 || 0;
};

export const toDisplayEur = (amount?: number) =>
	amount ? `${amount.toString().slice(0, -2)},${amount.toString().slice(-2)}€` : 0;
