<script lang="ts">
	import NewExpense from '$lib/NewExpense.svelte';
	import { createExpense } from '$lib/stores.svelte';
</script>

<NewExpense save={createExpense} />
