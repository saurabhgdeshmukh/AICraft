    const express = require('express');
    const pool = require('../db');
    const bcrypt = require('bcryptjs');
    const jwt = require('jsonwebtoken');
    const router = express.Router();

    router.post('/login', async (req, res) => {
      const { email, password } = req.body;
      if (!email || !password) return res.status(400).json({ error: 'Email and password required' });
      try {
        const { rows } = await pool.query('SELECT * FROM "User" WHERE email = $1', [email]);
        const user = rows[0];
        if (!user) return res.status(401).json({ error: 'Invalid credentials' });
        const isValid = await bcrypt.compare(password, user.password);
        if (!isValid) return res.status(401).json({ error: 'Invalid credentials' });
        const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '7d' });
        res.json({ token, user: { id: user.id, email: user.email, name: user.name } });
      } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Login failed' });
      }
    });

    module.exports = router;  