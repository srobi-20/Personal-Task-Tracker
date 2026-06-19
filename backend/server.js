const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000; // use whatever port the environment provides, fallback to 3000 locally

// Serve the frontend's built static files (HTML, CSS, JS bundle)
// from frontend/dist. This only exists after you run `npm run build`
// inside the frontend folder — dev mode (npm run dev) doesn't need this.
app.use(express.static(path.join(__dirname, '../frontend/dist')));

// A simple test route to prove the backend itself is alive and responding,
// separate from whether the frontend is being served correctly.
// Visiting /api/health should return { "status": "ok" }.
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Catch-all route: any request that doesn't match a static file above
// (e.g. if you add client-side routes later, or someone refreshes
// on a sub-page) just gets sent the same index.html. The frontend's
// own JS then takes over from there.
app.get('/*splat', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/dist/index.html'));
});

// Start the server and listen for incoming requests on PORT.
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));