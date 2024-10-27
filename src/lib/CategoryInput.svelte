<script lang="ts">
	export let saveExpense;
</script>

<div class="flex flex-col gap-4">
	<div class="flex gap-4">
		{#each availableCategories as availableCategory}
			<button
				class="btn text-xs font-light w-16"
				class:btn-accent={category === availableCategory}
				on:click={() => {
					saveExpense(availableCategory);
				}}>{availableCategory}</button
			>
		{/each}
	</div>
</div>
