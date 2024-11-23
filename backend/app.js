const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const multer = require('multer');
const app = express();
const PORT = 3000;

// Database setup
const db = new sqlite3.Database('./db.sqlite');
db.run(`
  CREATE TABLE IF NOT EXISTS bookmarks (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT,
    url TEXT,
    folder TEXT
  )
`);

// Middleware
app.use(express.json());

// Routes
app.get('/api/bookmarks', (req, res) => {
  db.all('SELECT * FROM bookmarks', [], (err, rows) => {
    if (err) return res.status(500).send(err);
    res.json(rows);
  });
});

app.post('/api/bookmarks', (req, res) => {
  const { title, url, folder } = req.body;
  db.run('INSERT INTO bookmarks (title, url, folder) VALUES (?, ?, ?)', [title, url, folder], function (err) {
    if (err) return res.status(500).send(err);
    res.status(201).json({ id: this.lastID });
  });
});

// Start server
app.listen(PORT, () => console.log(`Backend running on http://localhost:${PORT}`));
