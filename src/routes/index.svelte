<script>
	import {io} from "$lib/realtime";
	import { onMount } from "svelte";

	let username = "";
	let textfield = "";

	let messages = []

	onMount(() => {
		io.on('message', message => {
			messages = [...messages, message]
		})
		io.on('username', name => {
			username = name;
		})
	})

	function sendMessage() {
		// Socket frontend code
		const message = textfield;
		if (!message) {
			return
		}
		textfield = "";
		io.emit("message", message)
	}

</script>

<form action="#" on:submit|preventDefault={sendMessage}>
	<input type="text" bind:value="{textfield}" placeholder="Message..." />
</form>

<div class="messageHistory">
	{#each messages as message}
		<p>{message.from}: {message.message}</p>
	{/each}
</div>

<style>
input {
	width: 100%;
	margin-right: 10px;
}
</style>
