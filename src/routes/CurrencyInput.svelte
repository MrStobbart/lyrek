<script lang="ts">
	let { cents = $bindable() }: { cents: number } = $props();
	let textWidth = $state(0);
	let inputHeight = $state(0);
	let displayAmount = $derived.by(() => centsToDisplayAmount(cents));
	let actualTextWidth = $derived(!displayAmount ? 0 : textWidth);

	const centsToDisplayAmount = (cents: number) => {
		const paddedValue = cents.toString().padStart(3, '0');
		return `${paddedValue.slice(0, -2)},${paddedValue.slice(-2)}`;
	};

	const displayAmountToCents = (newValue: string) => {
		return parseInt((newValue || '0').replaceAll('.', '').replaceAll(',', ''));
	};
</script>

<div id="input-container" bind:clientHeight={inputHeight} class="w-full max-w-xs">
	<!-- svelte-ignore a11y-autofocus -->
	<input
		type="text"
		pattern="[0-9]+([\.,][0-9]+)?"
		inputmode="numeric"
		value={displayAmount}
		class="input w-full max-w-xs"
		oninput={(event) => {
			cents = displayAmountToCents(event.currentTarget.value);
		}}
		autofocus
	/>
	<div id="a" bind:clientWidth={textWidth}>{displayAmount}</div>
	<span id="suffix" style={`left: ${actualTextWidth + 20}px;`}>€</span>
</div>

<style>
	#a {
		width: auto;
		display: inline-block;
		visibility: hidden;
		position: fixed;
		overflow: auto;
		min-width: 0;
	}

	#input-container {
		display: inline-block;
		position: relative;
	}

	#suffix {
		position: absolute;
		left: 0;
		top: 13px;
	}
</style>
