import { json } from '@sveltejs/kit';

const PROMPTS = {
  default: `
You are Football Aliens' decision intelligence.
Recommend ONE action that minimizes future regret.
Focus on sleep, energy, consistency, momentum.
Return JSON only.
`,
  ruthless: `
You are a ruthless alien optimizer.
Eliminate comfort. Maximize discipline.
Return JSON only.
`,
  gentle: `
You are a compassionate alien guide.
Reduce burnout. Optimize sustainability.
Return JSON only.
`
};

export async function POST({ request }) {
  const { context, alien } = await request.json();
  const apiKey = process.env.GEMINI_API_KEY;

  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1/models/gemini-3:generateContent?key=${apiKey}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [
          { role: 'system', parts: [{ text: PROMPTS[alien] || PROMPTS.default }] },
          { role: 'user', parts: [{ text: context }] }
        ]
      })
    }
  );

  const data = await response.json();
  const text = data.candidates[0].content.parts[0].text;

  return json(JSON.parse(text));
}
