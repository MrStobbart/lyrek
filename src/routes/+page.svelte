<script lang="ts">
	import NewExpense from '$lib/NewExpense.svelte';
	import { createExpense } from '$lib/stores';
</script>

<NewExpense save={createExpense} />
