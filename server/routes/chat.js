const express = require('express');
const pool = require('../db');
const { generateHtmlCss } = require('../gemini');
const router = express.Router();

router.post('/', async (req, res) => {
  const { prompt, userId } = req.body;
  if (!prompt || !userId) return res.status(400).json({ error: 'Prompt and userId required' });
  try {
    const { html, css } = await generateHtmlCss(prompt);
    console.log(html, css);
    const { rows } = await pool.query(
      'INSERT INTO "Message" (content, html, css, "userId", "createdAt") VALUES ($1, $2, $3, $4, NOW()) RETURNING *',
      [prompt, html, css, userId]
    );
    res.json({ message: rows[0] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to generate code' });
  }
});

module.exports = router;