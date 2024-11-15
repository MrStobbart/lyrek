<script lang="ts">
	import '../app.css';
	import Menu from './Menu.svelte';
	import Websocket from './Websocket.svelte';
</script>

<div class="h-screen bg-sky-50 p-4">
	<div class="flex flex-col items-center justify-center gap-4">
		<Menu />
		<main>
			<slot />
		</main>
		<Websocket />
	</div>
</div>
