<script lang="ts">
	import type { Expense, MessageToClient, MessageToServer, SendMessageToServer } from '$lib/types';
	import { writable } from 'svelte/store';
	import CurrentBalance from './expenses/CurrentBalance.svelte';
	import NewExpense from '../lib/NewExpense.svelte';
	import {
		expensesStore,
		loadedExpenseIdsStore,
		participantsStore,
		sendMessageStore
	} from '$lib/stores';
	import { wait } from '$lib/util';

	const wsUri = 'ws://127.0.0.1:5000/lyrek/ws';
	let webSocket = new WebSocket(wsUri);

	const wsIsOpen = (ws: WebSocket) => {
		return ws.readyState === ws.OPEN;
	};

	const sendMessage: SendMessageToServer = async (message, withRetry = true) => {
		if (wsIsOpen(webSocket)) {
			console.log(`SENT: ${message}`);
			webSocket.send(JSON.stringify(message));
		} else {
			console.log('Aborting, not connected. Reconnecting...');
			webSocket = new WebSocket(wsUri);
			if (withRetry) {
				await wait(1000);
				console.log('Retrying...');
				sendMessage(message, false);
			}
		}
	};

	webSocket.onopen = (e) => {
		console.log('CONNECTED');
		sendMessageStore.set(sendMessage);
	};

	webSocket.onclose = (e) => {
		console.log('DISCONNECTED');
	};

	webSocket.onmessage = (e) => {
		console.log(`RECEIVED: ${e.data}`);
		const { expenses, createdExpense, updatedExpense, deletedExpenseId }: MessageToClient =
			JSON.parse(e.data);

		if (expenses) {
			console.log('load expenses', expenses);
			expensesStore.set(expenses);
		}

		if (createdExpense && !$loadedExpenseIdsStore[createdExpense.id]) {
			expensesStore.update((oldExpenses) => [...oldExpenses, createdExpense]);
		}

		if (updatedExpense) {
			expensesStore.update((oldExpenses) =>
				oldExpenses.map((oldExpense) =>
					oldExpense.id === updatedExpense.id ? updatedExpense : oldExpense
				)
			);
		}

		if (deletedExpenseId) {
			expensesStore.update((oldExpenses) =>
				oldExpenses.filter(({ id }) => id !== deletedExpenseId)
			);
		}
	};

	webSocket.onerror = (e) => {
		console.error(e);
	};

	console.log('expenses', $expensesStore);
</script>
