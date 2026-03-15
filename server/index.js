require('dotenv').config({ path: require('path').join(__dirname, '..', '.env') });
const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const checkinRoutes = require('./routes/checkins');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/checkins', checkinRoutes);

app.listen(PORT, () => {
  console.log(`💕 Who Will Move On First server running on http://localhost:${PORT}`);
});
