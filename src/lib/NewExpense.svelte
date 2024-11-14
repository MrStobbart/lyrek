<script lang="ts">
	import { goto } from '$app/navigation';
	import {
		createExpense,
		currentUserStore,
		expensesStore,
		sendMessageStore,
		updateExpense
	} from '$lib/stores';
	import type { Expense, MessageToServer } from '$lib/types';
	import CurrencyInput from '../routes/CurrencyInput.svelte';

	let {
		id = crypto.randomUUID(),
		title = '',
		amount = 0,
		by = '',
		category = '',
		save
	}: {
		id?: string;
		title?: string;
		amount?: number;
		by?: string;
		category?: string;
		save: (expense: Expense) => void;
	} = $props();

	let error = $state('');

	const availableCategories = ['groceries', 'holidays', 'pharmacy', 'drugstore', 'cat'];

	const validateInput = (selectedCategory?: string) => {
		if (!title) {
			error = 'Title is required';
			return false;
		}
		if (!amount) {
			error = 'Amount is required';
			return false;
		}

		if (by === 'Payed by' || by === '') {
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

		save({
			id,
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
		});

		title = '';
		amount = 0;
	};
</script>

<div class="flex flex-col gap-4">
	<CurrencyInput bind:cents={amount} />
	<input class="input input-bordered w-full max-w-xs" bind:value={title} placeholder="Title" />
	<select class="select select-bordered w-full max-w-xs" bind:value={by}>
		<option disabled selected value="">Payed by</option>
		<!-- TODO -->
		<option value="marek">Marek</option>
		<option value="lydia">Lydia</option>
	</select>

	{#if error}
		<p class="text-red-600">{error}</p>
	{/if}

	<!-- TODO add previous top titles that can be clicked instead of the category -->
	<!-- TODO availableCagetories are all that were already selected in expenses -->
	<!-- TODO alternatively you can also create a new one  -->
	<div class="flex gap-4">
		{#each availableCategories as availableCategory}
			<button
				class="btn text-xs font-light w-16"
				class:btn-accent={category === availableCategory}
				onclick={() => {
					saveExpense(availableCategory);
				}}>{availableCategory}</button
			>
		{/each}
	</div>
</div>
