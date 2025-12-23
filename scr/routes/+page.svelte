<script>
  import AlienSelector from '$lib/AlienSelector.svelte';
  import AlienCard from '$lib/AlienCard.svelte';
  import { memory, streak } from '$lib/store';

  let mode = 'sleep';
  let alien = 'default';
  let result = null;
  let loading = false;

  let sleepData = {
    sleptAt: '',
    wokeAt: '',
    energy: 5,
    goal: ''
  };

  async function askAlien() {
    loading = true;
    result = null;

    const res = await fetch('/api/ask-alien', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ alien, mode, data: sleepData })
    });

    result = await res.json();

    memory.update(m => [...m, { mode, result, date: Date.now() }]);
    streak.update(s => s + 1);

    loading = false;
  }
</script>

<div class="container">
  <h1>👽 Football Aliens</h1>
  <p class="subtitle">Optimize the human vessel</p>

  <AlienSelector bind:alien />

  <div class="mode">
    <button class:selected={mode==='sleep'} on:click={() => mode='sleep'}>🌙 Sleep</button>
    <button class:selected={mode==='decision'} on:click={() => mode='decision'}>🧠 Decision</button>
  </div>

  {#if mode === 'sleep'}
    <input type="time" bind:value={sleepData.sleptAt} />
    <input type="time" bind:value={sleepData.wokeAt} />
    <input type="range" min="1" max="10" bind:value={sleepData.energy} />
    <input placeholder="Tomorrow’s priority" bind:value={sleepData.goal} />
  {/if}

  <button on:click={askAlien} disabled={loading}>
    {loading ? 'Analyzing…' : 'Ask the Alien'}
  </button>

  {#if result}
    <AlienCard {result} />
  {/if}
</div>

<style>
  .container { max-width: 480px; }
  .mode { display:flex; gap:0.5rem; margin-bottom:1rem; }
  .mode button { flex:1; }
  input { width:100%; margin-bottom:0.6rem; padding:0.6rem; }
</style>
