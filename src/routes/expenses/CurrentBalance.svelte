<script lang="ts">
	import { toDisplayEur } from '$lib/expenses';
	import EditIcon from '$lib/icons/editIcon.svelte';
	import TrashIcon from '$lib/icons/trashIcon.svelte';
	import { deleteExpense, expensesState, participantsState } from '$lib/stores.svelte';
	import { timestampToDisplay } from '$lib/util';
	import { getBalance } from './calculateBalance';
	const [getParticipants] = participantsState;
	const [getExpenses] = expensesState;

	let balance = $derived.by(() => getBalance(getParticipants(), getExpenses()));
</script>

<div class="flex flex-col gap-4">
	<div class="flex gap-4 justify-center">
		{#each getParticipants() as participant}
			<div class="bg-slate-200 rounded-md p-2 text-center w-28">
				<div class="capitalize">{participant}</div>
				<div>{toDisplayEur(balance[participant])}</div>
			</div>
		{/each}
	</div>

	<div class="overflow-x-auto">
		<table class="table">
			<thead>
				<tr class="capitalize text-center">
					<th>Title</th>
					<th>Amount</th>
					<th>Last updated</th>
					<th>Category</th>
					<th>Payed by</th>
					<th>By Person</th>
					<th>Payment</th>
					<th></th>
				</tr>
			</thead>
			<tbody>
				{#each getExpenses() as { id, title, amount, by, category, date, participants, isPayment }}
					<!-- TODO add pinned rows of months later -->
					<tr class="text-center">
						<th>{title}</th>
						<td>{toDisplayEur(amount)}</td>
						<td>{timestampToDisplay(date)}</td>
						<td class="capitalize">{category}</td>
						<td class="capitalize">{by}</td>
						<td class="flex flex-col">
							{#each getParticipants() as participant}
								<div class="text-sm flex gap-1">
									<div class="capitalize">{participant}</div>
									{#if participants[participant].plus > 0}
										<div>+{toDisplayEur(participants[participant].plus)}</div>
									{/if}
									{#if participants[participant].minus < 0}
										<div>{toDisplayEur(participants[participant].minus)}</div>
									{/if}
								</div>
							{/each}
						</td>
						<td>{isPayment ? 'payment' : ''}</td>
						<td>
							<a class="btn btn-circle btn-outline" href={`/edit/${id}`}><EditIcon /></a>
							<button class="btn btn-circle btn-outline" onclick={() => deleteExpense(id)}
								><TrashIcon /></button
							>
						</td>
					</tr>
				{/each}
			</tbody>
		</table>
	</div>
</div>
