import { describe, expect, it } from 'vitest';
import { toDisplayEur } from './expenses';

describe('toDisplayEur', () => {
	it.each([
		{ amount: undefined, displayAmount: '' },
		{ amount: 0, displayAmount: '0,00€' },
		{ amount: 12, displayAmount: '0,12€' },
		{ amount: 123, displayAmount: '1,23€' },
		{ amount: -123, displayAmount: '-1,23€' }
	])('$amount to become $displayAmount ', ({ amount, displayAmount }) => {
		expect(toDisplayEur(amount)).toBe(displayAmount);
	});
});
