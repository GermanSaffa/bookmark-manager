const sqlite3 = require("sqlite3").verbose();
const fetch = require("node-fetch");
const db = new sqlite3.Database("./db.sqlite"); // Your SQLite database file

// Initialize the database schema for folders and bookmarks
db.serialize(() => {
  // Create folders table
  db.run(`
    CREATE TABLE IF NOT EXISTS folders (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT UNIQUE NOT NULL
    )
  `);

  // Create bookmarks table
  db.run(`
    CREATE TABLE IF NOT EXISTS bookmarks (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      url TEXT NOT NULL UNIQUE,
      folder_id INTEGER,
      status TEXT,
      FOREIGN KEY (folder_id) REFERENCES folders (id)
    )
  `);
});

// Get all bookmarks
const getBookmarks = (req, res) => {
  db.all("SELECT * FROM bookmarks", [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
};

// Add a new bookmark
const addBookmark = (req, res) => {
  const { title, url, folder_id } = req.body;
  db.run(
    "INSERT INTO bookmarks (title, url, folder_id) VALUES (?, ?, ?)",
    [title, url, folder_id],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      res.status(201).json({ id: this.lastID });
    }
  );
};

// Create a new folder
const createFolder = (req, res) => {
  const { name } = req.body;
  db.run("INSERT INTO folders (name) VALUES (?)", [name], function (err) {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ id: this.lastID, name });
  });
};

// Get all folders
const getFolders = (req, res) => {
  db.all("SELECT * FROM folders", [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
};

// Move a bookmark to another folder
const moveBookmark = (req, res) => {
  const { folder_id } = req.body;
  const { id } = req.params;
  
  db.run(
    "UPDATE bookmarks SET folder_id = ? WHERE id = ?",
    [folder_id, id],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      if (this.changes === 0) return res.status(404).json({ error: "Bookmark not found" });
      res.json({ message: "Bookmark moved successfully" });
    }
  );
};

// Edit folder name
const editFolder = (req, res) => {
  const { name } = req.body;
  const { id } = req.params;

  db.run("UPDATE folders SET name = ? WHERE id = ?", [name, id], function (err) {
    if (err) return res.status(500).json({ error: err.message });
    if (this.changes === 0) return res.status(404).json({ error: "Folder not found" });
    res.json({ message: "Folder updated successfully" });
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

// Export bookmarks
const exportBookmarks = (req, res) => {
  db.all("SELECT * FROM bookmarks", [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });

    // Set response headers for file download
    res.setHeader("Content-Type", "application/json");
    res.setHeader("Content-Disposition", "attachment; filename=bookmarks.json");

    // Send bookmarks as JSON
    res.send(JSON.stringify(rows, null, 2));
  });
};

module.exports = {
  getBookmarks,
  addBookmark,
  createFolder,
  getFolders,
  moveBookmark,
  editFolder,
  exportBookmarks,
};
