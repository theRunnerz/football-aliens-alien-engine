<script>
  export let result;
</script>

<div class="card">
  <div class="alien">👽</div>

  <h2>Alien Recommendation</h2>

  <p><strong>Decision</strong></p>
  <p>{result.decision}</p>

  <p><strong>Why</strong></p>
  <p>{result.reasoning}</p>

  <p><strong>Tradeoff</strong></p>
  <p>{result.tradeoff}</p>

  <div class="score">
    Regret Score: {result.regretScore}
  </div>
</div>

<style>
  .card {
    background: #0b0f1a;
    border: 1px solid #1aff64;
    border-radius: 16px;
    padding: 1.2rem;
    margin-top: 1.5rem;
  }

  .alien {
    font-size: 2.5rem;
    text-align: center;
    margin-bottom: 0.5rem;
  }

  h2 {
    text-align: center;
  }

  .score {
    margin-top: 1rem;
    text-align: center;
    font-weight: bold;
    color: #1aff64;
  }
</style>
