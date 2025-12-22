<script>
  import AlienSelector from '$lib/AlienSelector.svelte';
  import AlienCard from '$lib/AlienCard.svelte';
  import { history } from '$lib/store';

  let context = '';
  let alien = 'default';
  let result = null;
  let loading = false;

  async function askAlien() {
    loading = true;

    const res = await fetch('/api/ask-alien', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ context, alien })
    });

    result = await res.json();
    history.update(h => [result, ...h]);
    loading = false;
  }
</script>

<h1>👽 Football Aliens</h1>
<p>Alien Tradeoff Engine</p>

<AlienSelector bind:alien />

<textarea
  placeholder="Describe your real-life situation..."
  bind:value={context}
/>

<button on:click={askAlien} disabled={loading}>
  {loading ? 'Analyzing...' : 'Ask the Alien'}
</button>

{#if result}
  <AlienCard {result} />
{/if}

<style>
  textarea {
    width: 100%;
    min-height: 120px;
    margin: 1rem 0;
  }

  button {
    background: #1aff64;
    border: none;
    padding: 0.7rem 1.2rem;
    font-weight: bold;
    cursor: pointer;
  }
</style>
