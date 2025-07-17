const express = require('express');
const pool = require('../db');
const bcrypt = require('bcryptjs');
const router = express.Router();

router.post('/', async (req, res) => {
  const { email, password, name } = req.body;
  if (!email || !password) return res.status(400).json({ error: 'Email and password required' });
  try {
    const { rows: existing } = await pool.query('SELECT * FROM "User" WHERE email = $1', [email]);
    if (existing.length) return res.status(400).json({ error: 'Email already in use' });
    const hashed = await bcrypt.hash(password, 10);
    const { rows } = await pool.query(
      'INSERT INTO "User" (email, password, name, "createdAt", "updatedAt") VALUES ($1, $2, $3, NOW(), NOW()) RETURNING id, email',
      [email, hashed, name]
    );
    res.json(rows[0]);
  } catch (err) {
    console.error(err); // <--- Add this line to see the real error in your terminal!
    res.status(500).json({ error: 'Signup failed' });
  }
});

module.exports = router;