import { describe, expect, it } from 'vitest';
import { getBalance } from './calculateBalance';
import { mockExpenses, mockParticipants } from '$lib/mockData';

describe('getBalance', () => {
	it('worked ok', () => {
		expect(getBalance(mockParticipants, mockExpenses)).toEqual({
			Lydia: -52221,
			Marek: 52937
		});
	});
});
