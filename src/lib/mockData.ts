export const mockExpenses = [
	{
		id: '4',
		title: 'Flüge Edinburgh ',
		amount: 47108,
		currency: 'EUR',
		by: 'Marek',
		date: 1653912000000,
		category: 'holidays',
		isPayment: false,
		participants: {
			lydia: { plus: 0, minus: -23446 },
			marek: { plus: 47108, minus: -23446 }
		}
	},
	{
		id: '5',
		title: 'Flüge Mallorca ',
		amount: 35794,
		currency: 'EUR',
		by: 'Marek',
		date: 1655380800000,
		category: 'holidays',
		isPayment: false,
		participants: {
			lydia: { plus: 0, minus: -17703 },
			marek: { plus: 35794, minus: -17703 }
		}
	},
	{
		id: '6',
		title: 'Mietwagen Anteil ',
		amount: 22256,
		currency: 'EUR',
		by: 'Marek',
		date: 1656936000000,
		category: 'holidays',
		isPayment: false,
		participants: {
			lydia: { plus: 0, minus: -11072 },
			marek: { plus: 22256, minus: -11072 }
		}
	}
];
export const mockParticipants = ['marek', 'lydia'];
