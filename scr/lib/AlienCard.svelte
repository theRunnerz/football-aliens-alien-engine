<script>
  export let result;
</script>

<div class="card">
  <h2>👽 Alien Decision</h2>
  <p><strong>Decision:</strong> {result.decision}</p>
  <p><strong>Reasoning:</strong> {result.reasoning}</p>
  <p><strong>Tradeoff:</strong> {result.tradeoff}</p>
  <p><strong>Regret Score:</strong> {result.regretScore}</p>
</div>

<style>
  .card {
    background: #0b0f1a;
    border: 1px solid #1aff64;
    padding: 1rem;
    border-radius: 12px;
    margin-top: 1rem;
  }
</style>
