// Local development entry point — imports the shared Express app and starts listening.
// On Vercel, api/index.js is used instead (no listen needed).
const app = require('./app');
const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`💕 Who Will Move On First server running on http://localhost:${PORT}`);
});
