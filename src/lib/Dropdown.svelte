<script lang="ts">
	let { items, selectItem }: { items: string[]; selectItem: (selectedItem: string) => void } =
		$props();
</script>

<div class="dropdown">
	<div tabindex="0" role="button" class="btn m-1">Click</div>
	<ul tabindex="0" class="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
		{#each items as item}
			<li><a>{item} </a></li>
		{/each}
	</ul>
</div>
