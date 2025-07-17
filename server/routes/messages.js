const express = require('express');
const pool = require('../db');
const router = express.Router();

router.get('/', async (req, res) => {
  const { userId } = req.params;
  if (!userId) return res.status(400).json({ error: 'User ID required' });
  try {
    const { rows } = await pool.query(
      'SELECT * FROM "Message" WHERE "userId" = $1 ORDER BY "createdAt" DESC',
      [userId]
    );
    res.json({ messages: rows });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch messages' });
  }
});

module.exports = router;
