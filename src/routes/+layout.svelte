<script lang="ts">
	import '../app.css';
	import Menu from './Menu.svelte';
	import Websocket from './Websocket.svelte';
</script>

<div>
	<Menu />
	<main>
		<slot />
	</main>
	<Websocket />
</div>
