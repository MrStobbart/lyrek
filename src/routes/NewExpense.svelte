<script lang="ts">
	import type { Expense } from '$lib/expenses';
	import CurrencyInput from './CurrencyInput.svelte';

	export let sendMessage: (message: string) => void;

	let title: string;
	let amount: number;
	let by: string;

	$: console.log(amount);

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

		if (!by) {
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

		sendMessage(JSON.stringify({ newExpense }));

		title = '';
		amount = 0;
	};
</script>

<div class="flex flex-col gap-4">
	<CurrencyInput bind:cents={amount} />
	<input class="input input-bordered w-full max-w-xs" bind:value={title} placeholder="Title" />
	<select class="select select-bordered w-full max-w-xs" bind:value={by}>
		<option disabled selected>Payed by</option>
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
