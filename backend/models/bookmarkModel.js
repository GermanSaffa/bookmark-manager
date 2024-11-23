const sqlite3 = require("sqlite3").verbose();
const fetch = require("node-fetch");

// Database connection
const db = new sqlite3.Database("./db.sqlite");

// Get all bookmarks
const getBookmarks = (req, res) => {
  db.all("SELECT * FROM bookmarks", [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
};

// Add a new bookmark
const addBookmark = (req, res) => {
  const { title, url, folder } = req.body;
  db.run("INSERT INTO bookmarks (title, url, folder) VALUES (?, ?, ?)", [title, url, folder], function (err) {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ id: this.lastID });
  });
};

// Check live status
const checkLiveStatus = async (req, res) => {
  db.all("SELECT id, url FROM bookmarks", [], async (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });

    for (const { id, url } of rows) {
      try {
        const response = await fetch(url, { method: "HEAD", timeout: 5000 });
        const status = response.ok ? "Live" : "Broken";
        db.run("UPDATE bookmarks SET status = ? WHERE id = ?", [status, id]);
      } catch {
        db.run("UPDATE bookmarks SET status = ? WHERE id = ?", ["Broken", id]);
      }
    }
    res.json({ message: "Status updated!" });
  });
};

// Get duplicates
const getDuplicates = (req, res) => {
  db.all("SELECT url, COUNT(*) as count FROM bookmarks GROUP BY url HAVING count > 1", [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
};

module.exports = { getBookmarks, addBookmark, checkLiveStatus, getDuplicates };
