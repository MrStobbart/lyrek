import { describe, expect, it } from 'vitest';
import { sumExpenses } from './analysisHelper';
import { mockExpenses } from '$lib/mockData';

describe('sumExpenses', () => {
	it('sums correctly', () => {
		expect(sumExpenses(mockExpenses)).toBe(105158);
	});
});
