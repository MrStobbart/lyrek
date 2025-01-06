<script lang="ts">
	import type { Expense, MessageToServer } from '$lib/types';
	import CurrencyInput from '../routes/CurrencyInput.svelte';
	import CategorySelection from './CategorySelection.svelte';
	import { availableCategoriesDerived } from './stores.svelte';

	let {
		id = crypto.randomUUID(),
		title = '',
		amount = 0,
		by = '',
		category = '',
		date = Date.now(),
		save
	}: {
		id?: string;
		title?: string;
		amount?: number;
		by?: string;
		date?: number;
		category?: string;
		save: (expense: Expense) => void;
	} = $props();

	let error = $state('');

	const validateInput = () => {
		if (!title) {
			error = 'Title is required';
			return false;
		}
		if (!amount) {
			error = 'Amount is required';
			return false;
		}

		console.log('by', by);

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
			date,
			category,
			isPayment: false,
			participants: {
				Marek: { minus: -parseInt((amount / 2).toFixed()), plus: getPlusFor('Marek', amount) },
				Lydia: { minus: -parseInt((amount / 2).toFixed()), plus: getPlusFor('Lydia', amount) }
			}
		});

		title = '';
		amount = 0;
	};
</script>

<div class="flex flex-col gap-4 items-center">
	<CurrencyInput bind:cents={amount} />
	<input class="input w-full max-w-xs" bind:value={title} placeholder="Title" />
	<select class="select w-full max-w-xs" bind:value={by}>
		<option disabled selected value="">Payed by</option>
		<!-- TODO -->
		<option value="Marek">Marek</option>
		<option value="Lydia">Lydia</option>
	</select>

	{#if error}
		<p class="text-red-600">{error}</p>
	{/if}

	<CategorySelection selectedCategory={category} onClick={saveExpense} />
</div>
