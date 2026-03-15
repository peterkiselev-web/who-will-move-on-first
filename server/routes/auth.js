const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();

const USERS = {
  peter: () => process.env.PETER_PASSWORD || 'peter123',
  niloufar: () => process.env.NILOUFAR_PASSWORD || 'niloufar123',
};

router.post('/login', (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password required' });
  }

  const user = username.toLowerCase();
  if (!USERS[user] || USERS[user]() !== password) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }

  const token = jwt.sign(
    { username: user },
    process.env.JWT_SECRET || 'dev-secret-change-in-prod',
    { expiresIn: '7d' }
  );

  res.json({ token, username: user });
});

module.exports = router;
