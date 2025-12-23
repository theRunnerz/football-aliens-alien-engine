<script>
  export let alien = 'default';
</script>

<div class="aliens">
  <button
    class:selected={alien === 'default'}
    on:click={() => alien = 'default'}>
    👽 Neutral
  </button>

  <button
    class:selected={alien === 'ruthless'}
    on:click={() => alien = 'ruthless'}>
    🔥 Ruthless
  </button>

  <button
    class:selected={alien === 'gentle'}
    on:click={() => alien = 'gentle'}>
    🌱 Gentle
  </button>
</div>

<style>
  .aliens {
    display: flex;
    gap: 0.5rem;
    margin-bottom: 1rem;
  }

  button {
    flex: 1;
    padding: 0.8rem;
    border-radius: 10px;
    border: 1px solid #1aff64;
    background: transparent;
    color: #eafff1;
    font-weight: bold;
    cursor: pointer;
  }

  .selected {
    background: #1aff64;
    color: #02030a;
  }
</style>
