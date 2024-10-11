<script lang="ts">
	import { currentUserStore, sendMessageStore } from '$lib/stores';
	import type { Expense, MessageToServer } from '$lib/types';
	import CurrencyInput from '../routes/CurrencyInput.svelte';

	let sendMessage = $sendMessageStore;

	let title: string;
	let amount: number;
	let by: string;

	let error = '';

	const availableCategores = ['groceries', 'holidays', 'pharmacy', 'drugstore', 'cat'];

	const validateInput = (selectedCategory?: string) => {
		if (!title) {
			error = 'Title is required';
			return false;
		}
		if (!amount) {
			error = 'Amount is required';
			return false;
		}

		if (by === 'Payed by') {
			error = 'Payed by is required';
			return false;
		}

		error = '';
		return true;
	};

	const getPlusFor = (participant: string, amount: number) => {
		return by === participant ? amount : 0;
	};

	const saveExpense = (category: string) => {
		if (!validateInput()) {
			return;
		}

		const newExpense: Expense = {
			id: crypto.randomUUID(),
			title,
			amount,
			currency: 'EUR',
			by,
			date: Date.now(),
			category,
			isPayment: false,
			participants: {
				marek: { minus: parseInt((amount / 2).toFixed()), plus: getPlusFor('marek', amount) },
				lydia: { minus: parseInt((amount / 2).toFixed()), plus: getPlusFor('lydia', amount) }
			}
		};

		console.log('Save expense', newExpense);

		sendMessage({ createExpense: newExpense });

		title = '';
		amount = 0;
	};
</script>

<div class="flex flex-col gap-4">
	<CurrencyInput bind:cents={amount} />
	<input class="input input-bordered w-full max-w-xs" bind:value={title} placeholder="Title" />
	<select class="select select-bordered w-full max-w-xs" bind:value={$currentUserStore}>
		<option disabled selected value="">Payed by</option>
		<!-- TODO -->
		<option value="marek">Marek</option>
		<option value="lydia">Lydia</option>
	</select>

	{#if error}
		<p class="text-red-600">{error}</p>
	{/if}

	<!-- TODO add previous top titles that can be clicked instead of the category -->

	<div class="flex gap-4">
		{#each availableCategores as category}
			<button class="btn text-xs font-light w-16" on:click={() => saveExpense(category)}
				>{category}</button
			>
		{/each}
	</div>
</div>
