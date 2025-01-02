import { describe, expect, it } from 'vitest';
import { getBalance } from './calculateBalance';
import { mockExpenses, mockParticipants } from '$lib/mockData';

describe('getBalance', () => {
	it('worked ok', () => {
		expect(getBalance(mockParticipants, mockExpenses)).toEqual({
			lydia: -52221,
			marek: 52937
		});
	});
});
