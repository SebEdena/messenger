<script>
  import { typewriter } from '$lib/animations/typewriter';
  import chat from '$lib/images/chat.svg';
  import { onMount } from 'svelte';
  import Header from './Header.svelte';
  import Login from './Login.svelte';

  let ready = false;
  onMount(() => (ready = true));
</script>

<svelte:head>
  <title>Home</title>
  <meta name="description" content="Svelte demo app" />
</svelte:head>

<Header />

<main class="w-8/12 mx-auto">
  <section class="grid grid-cols-2">
    {#if ready}
      <div>
        <h1
          class="gradient max-w-prose font-bold text-5xl text-transparent bg-clip-text pb-10"
          in:typewriter={{ speed: 1.5 }}
        >
          Your friends. Anytime. Anywhere.
        </h1>
        <p>Talk, Exchange, Debate. All your friends' stories in your pocket with Messenger!</p>
        <Login />
      </div>
      <div class="flex justify-center">
        <img class="illustration-main" alt="" src={chat} />
      </div>
    {/if}
  </section>
</main>

<style>
  .illustration-main {
    filter: drop-shadow(5px 5px 15px rgb(var(--color-secondary) / 0.9));
  }
</style>
