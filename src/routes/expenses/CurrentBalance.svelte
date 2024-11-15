<script lang="ts">
	import { toDisplayEur } from '$lib/expenses';
	import EditIcon from '$lib/icons/editIcon.svelte';
	import TrashIcon from '$lib/icons/trashIcon.svelte';
	import { deleteExpense, expensesState, participantsState } from '$lib/stores.svelte';
	const [getParticipants] = participantsState;
	const [getExpenses] = expensesState;

	let balance = $derived.by(() =>
		Object.fromEntries(
			getParticipants().map((name) => [
				name,
				getExpenses().reduce(
					(sum, { participants }) =>
						sum + (participants[name].plus ?? 0) - (participants[name].minus ?? 0),
					0
				)
			])
		)
	);
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
				{#each getExpenses() as { id, title, amount, by, category }}
					<!-- TODO add pinned rows of months later -->
					<tr>
						<th>{title}</th>
						<td>{category}</td>
						<td>{toDisplayEur(amount)}</td>
						<td>{by}</td>
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
