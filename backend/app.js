const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const fetch = require('node-fetch');
const cors = require('cors');
const bodyParser = require('body-parser');

const bookmarkRoutes = require("./routes/bookmarkRoutes");

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use("/api/bookmarks", bookmarkRoutes);

// Get all bookmarks
app.get('/api/bookmarks', (req, res) => {
  db.all('SELECT * FROM bookmarks', [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

// Add a new bookmark
app.post('/api/bookmarks', (req, res) => {
  const { title, url, folder } = req.body;
  db.run('INSERT INTO bookmarks (title, url, folder) VALUES (?, ?, ?)', [title, url, folder], function (err) {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ id: this.lastID });
  });
});

// Check bookmark live status
app.get('/api/bookmarks/status', async (req, res) => {
  db.all('SELECT id, url FROM bookmarks', [], async (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });

    for (const { id, url } of rows) {
      try {
        const response = await fetch(url, { method: 'HEAD', timeout: 5000 });
        const status = response.ok ? 'Live' : 'Broken';
        db.run('UPDATE bookmarks SET status = ? WHERE id = ?', [status, id]);
      } catch {
        db.run('UPDATE bookmarks SET status = ? WHERE id = ?', ['Broken', id]);
      }
    }
    res.json({ message: 'Status updated!' });
  });
});

// Get duplicate bookmarks
app.get('/api/bookmarks/duplicates', (req, res) => {
  db.all(
    'SELECT url, COUNT(*) as count FROM bookmarks GROUP BY url HAVING count > 1',
    [],
    (err, rows) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json(rows);
    }
  );
});

// Start server
app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});
