const fetch = require('node-fetch');

async function generateHtmlCss(prompt) {
  try {
    const systemPrompt = `You are an expert web developer. Generate a single HTML file with embedded CSS for the following landing page prompt. Return only the HTML and CSS, no explanations.`;
    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1/models/gemini-2.0-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [
            { role: 'user', parts: [{ text: systemPrompt + '\n' + prompt }] }
          ]
        })
      }
    );
    const data = await res.json();
    console.log('Gemini API response:', JSON.stringify(data, null, 2)); // <-- Add this line
    const code = data.candidates?.[0]?.content?.parts?.[0]?.text || '';
    return { html: code, css: '' };
  } catch (err) {
    console.error('Gemini API error:', err);
    return { html: '', css: '' };
  }
}

module.exports = { generateHtmlCss };