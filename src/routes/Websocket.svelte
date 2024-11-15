<script lang="ts">
	import type { MessageToClient, SendMessageToServer } from '$lib/types';
	import { expensesState, loadedExpenseIdsDerived, sendMessageState } from '$lib/stores.svelte';
	import { wait } from '$lib/util';

	const [_, setSendMessage] = sendMessageState;
	const [getExpenses, setExpenses] = expensesState;

	const wsUri = 'ws://127.0.0.1:5000/lyrek/ws';
	let webSocket = new WebSocket(wsUri);

	const wsIsOpen = (ws: WebSocket) => {
		return ws.readyState === ws.OPEN;
	};

	const sendMessage: SendMessageToServer = async (message, withRetry = true) => {
		if (wsIsOpen(webSocket)) {
			console.log('Sent message', message);
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
		setSendMessage(sendMessage);
	};

	webSocket.onclose = (e) => {
		console.log('DISCONNECTED');
	};

	webSocket.onmessage = (e) => {
		console.log('Received message:', e.data);
		const { expenses, createdExpense, updatedExpense, deletedExpenseId }: MessageToClient =
			JSON.parse(e.data);

		if (expenses) {
			console.log('load expenses', expenses);
			setExpenses(expenses);
		}

		if (createdExpense && !loadedExpenseIdsDerived()[createdExpense.id]) {
			setExpenses([...getExpenses(), createdExpense]);
		}

		if (updatedExpense) {
			console.log({ updatedExpense });

			setExpenses(
				getExpenses().map((oldExpense) =>
					oldExpense.id === updatedExpense.id ? updatedExpense : oldExpense
				)
			);
			console.log({ expenses: getExpenses() });
		}

		if (deletedExpenseId) {
			setExpenses(getExpenses().filter(({ id }) => id !== deletedExpenseId));
		}
	};

	webSocket.onerror = (e) => {
		console.error(e);
	};

	console.log('expenses', getExpenses());
</script>
