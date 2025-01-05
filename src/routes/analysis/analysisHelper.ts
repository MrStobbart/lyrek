import type { Expense } from '$lib/types';
import type { ChartData } from 'chart.js';

export const sumExpenses = (expenses: Expense[]): number => {
	return expenses.reduce((prev, curr) => prev + curr.amount, 0);
};

const months = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11] as const;
type Month = (typeof months)[number];
const monthLabels = [
	'Jan',
	'Feb',
	'Mar',
	'Apr',
	'May',
	'Jun',
	'Jul',
	'Aug',
	'Sep',
	'Okt',
	'Nov',
	'Dec'
] as const;

type Year = number;
type ExpensesByYear = Record<Year, ExpensesByMonth>;
type ExpensesByMonth = Record<Month, Expense[]>;

export const sortExpensesByMonthAndYear = (expenses: Expense[]): ExpensesByYear => {
	expenses.sort((a, b) => a.date - b.date); // TODO maybe do this somewhere else
	const expensesByYear: ExpensesByYear = {};
	for (let i = 0; i < expenses.length; i++) {
		const expense = expenses[i]!;
		const date = new Date(expense.date);
		const year = date.getFullYear();
		const month = date.getMonth() as Month;
		(expensesByYear[year][month] ??= []).push(expense);
	}
	// return { datasets, labels:  };
};

const getChartData = (): ChartData<'bar'> => {};
