<script>
	import { typewriter } from '$lib/animations/typewriter';
	import chat from '$lib/images/chat.svg';
	import { onMount } from 'svelte';
	import Header from './Header.svelte';

	let ready = false;
	onMount(() => (ready = true));
</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<Header />

<main class="w-10/12 mx-auto">
	<section class="grid grid-cols-2">
		{#if ready}
			<h1
				class="w- font-bold text-5xl text-transparent bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text"
				in:typewriter={{ speed: 1.5 }}
			>
				Your friends. Anytime. Anywhere.
			</h1>
			<div>
				<img alt="" src={chat} />
			</div>
		{/if}
	</section>
</main>
