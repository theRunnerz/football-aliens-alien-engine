<script>
  export let alien = 'default';
</script>

<select bind:value={alien}>
  <option value="default">👽 Neutral Alien</option>
  <option value="ruthless">🔥 Ruthless Alien</option>
  <option value="gentle">🌱 Gentle Alien</option>
</select>

<style>
  select {
    padding: 0.5rem;
    margin-bottom: 1rem;
  }
</style>
