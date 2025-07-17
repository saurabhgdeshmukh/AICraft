const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const authRoutes = require('./routes/auth');
const chatRoutes = require('./routes/chat');
const messagesRoutes = require('./routes/messages');
const signupRoutes = require('./routes/signup');

dotenv.config();
console.log('DATABASE_URL:', process.env.DATABASE_URL); // Add this line for debugging

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/chat', chatRoutes);
app.use('/api/messages', messagesRoutes);
app.use('/api/signup', signupRoutes);

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});