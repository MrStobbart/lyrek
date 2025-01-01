<script lang="ts">
	import { availableCategoriesDerived } from './stores.svelte';

	let {
		selectedCategory = '',
		onClick
	}: {
		selectedCategory?: string;
		onClick: (selectedCategory: string) => void;
	} = $props();
	let newCategory = $state('');
</script>

<div class="grid grid-cols-3 gap-4">
	{#each availableCategoriesDerived() as availableCategory}
		<button
			class="btn text-xs font-light w-16 btn-sm capitalize"
			class:btn-accent={selectedCategory === availableCategory}
			onclick={() => {
				onClick(availableCategory);
			}}>{availableCategory}</button
		>
	{/each}
	<input
		class="input w-full max-w-xs input-sm"
		bind:value={newCategory}
		placeholder="New category name"
	/>
	<button
		class="btn text-xs font-light btn-sm"
		onclick={() => {
			onClick(newCategory);
		}}>Save with new category</button
	>
</div>
