<script lang="ts">
	import NewExpense from '$lib/NewExpense.svelte';
	import type { Expense } from '$lib/types';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<NewExpense
	title={data.expenseToEdit?.title || ''}
	amount={data.expenseToEdit?.amount || 0}
	by={data.expenseToEdit?.by || ''}
	category={data.expenseToEdit?.category || ''}
	isUpdate={true}
/>
