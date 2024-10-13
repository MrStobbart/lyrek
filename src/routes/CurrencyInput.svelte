<script lang="ts">
	export let cents: number;
	let displayAmount = '0,00';
	let textWidth: number;
	let inputHeight: number;
	$: actualTextWidth = !displayAmount ? 0 : textWidth;

	const handleInput = (newValue: string) => {
		cents = parseInt((newValue || '0').replaceAll('.', '').replaceAll(',', ''));
		const paddedValue = cents.toString().padStart(3, '0');
		displayAmount = `${paddedValue.slice(0, -2)},${paddedValue.slice(-2)}`;
		console.log({ newValue, cents, displayAmount });
	};

	handleInput(cents.toString());
</script>

<div id="input-container" bind:clientHeight={inputHeight}>
	<!-- svelte-ignore a11y-autofocus -->
	<input
		type="text"
		pattern="[0-9]+([\.,][0-9]+)?"
		inputmode="numeric"
		bind:value={displayAmount}
		class="input input-bordered w-full max-w-xs"
		on:input={(event) => handleInput(event.currentTarget.value)}
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
