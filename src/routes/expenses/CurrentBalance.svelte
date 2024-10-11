<script lang="ts">
	import { toDisplayEur } from '$lib/expenses';
	import EditIcon from '$lib/icons/editIcon.svelte';
	import TrashIcon from '$lib/icons/trashIcon.svelte';
	import { expensesStore, participantsStore, sendMessageStore } from '$lib/stores';
	import type { Expense } from '$lib/types';
	import { writable, type Writable } from 'svelte/store';

	let expenses = $expensesStore;
	let participants = $participantsStore;

	let sendMessage = $sendMessageStore;

	$: console.log('participants', participants);
	$: console.log('expenses', expenses);

	$: balance = Object.fromEntries(
		participants.map((name) => [
			name,
			expenses.reduce(
				(sum, { participants }) =>
					sum + (participants[name].plus ?? 0) - (participants[name].minus ?? 0),
				0
			)
		])
	);

	$: console.log('balance', balance);
</script>

<div class="flex flex-col gap-4">
	<div>Marek: {toDisplayEur(balance.marek)}</div>
	<div>Lydia: {toDisplayEur(balance.lydia)}</div>

	<div class="overflow-x-auto">
		<table class="table">
			<!-- head -->
			<thead>
				<tr>
					<th>Title</th>
					<th>Category</th>
					<th>Amount</th>
					<th>Payed by</th>
					<th></th>
				</tr>
			</thead>
			<tbody>
				{#each expenses as { title, amount, by, category }}
					<!-- TODO add pinned rows of months later -->
					<tr>
						<th>{title}</th>
						<td>{category}</td>
						<td>{toDisplayEur(amount)}</td>
						<td>{by}</td>
						<td>
							<button class="btn btn-circle btn-outline"><EditIcon /></button>
							<button class="btn btn-circle btn-outline"><TrashIcon /></button>
						</td>
					</tr>
				{/each}
			</tbody>
		</table>
	</div>
</div>
