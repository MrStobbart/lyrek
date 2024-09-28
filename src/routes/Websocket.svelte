<script lang="ts">
	import type { Expense } from '$lib/expenses';
	import { writable } from 'svelte/store';
	import CurrentBalance from './CurrentBalance.svelte';
	import NewExpense from './NewExpense.svelte';

	type WebsocketMessageToClient = {
		expenses?: Expense[];
		newExpense?: Expense;
		participants?: string[];
	};

	const wsUri = 'ws://127.0.0.1:5000/';
	let webSocket = new WebSocket(wsUri);

	let expensesStore = writable<Expense[]>([]);
	let loadedExpenseIdsStore = writable<Record<string, boolean>>({});
	let participantsStore = writable<string[]>([]);

	const wsIsOpen = (ws: WebSocket) => {
		return ws.readyState === ws.OPEN;
	};

	const sendMessage = (message: string) => {
		if (wsIsOpen(webSocket)) {
			console.log(`SENT: ${message}`);
			webSocket.send(message);
		} else {
			console.log('Aborting, not connected. Reconnecting...');
			webSocket = new WebSocket(wsUri);
		}
	};

	webSocket.onopen = (e) => {
		console.log('CONNECTED');
	};

	webSocket.onclose = (e) => {
		console.log('DISCONNECTED');
	};

	webSocket.onmessage = (e) => {
		console.log(`RECEIVED: ${e.data}`);
		const { expenses, newExpense, participants }: WebsocketMessageToClient = JSON.parse(e.data);
		if (expenses) {
			console.log('set expensesStore');

			expensesStore.set(expenses);
			const loadedIds = Object.fromEntries(expenses.map(({ id }) => [id, true]));
			loadedExpenseIdsStore.set(loadedIds);
		}

		if (participants) {
			participantsStore.set(participants);
		}

		if (newExpense && !$loadedExpenseIdsStore[newExpense.id]) {
			expensesStore.update((oldExpenses) => [...oldExpenses, newExpense]);
		}
	};

	webSocket.onerror = (e) => {
		console.error(e);
	};

	console.log('expenses', $expensesStore);
</script>

<CurrentBalance expenses={$expensesStore} participants={$participantsStore} />

<NewExpense {sendMessage} />
