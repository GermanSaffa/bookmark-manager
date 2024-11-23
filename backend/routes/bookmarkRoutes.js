const express = require("express");
const router = express.Router();
const {
  getBookmarks,
  addBookmark,
  createFolder,
  getFolders,
  moveBookmark,
  editFolder,
  exportBookmarks
} = require("../models/bookmarkModel");

// Get all bookmarks
router.get("/", getBookmarks);

// Add a new bookmark
router.post("/", addBookmark);

// Create a new folder
router.post("/folders", createFolder);

// Get all folders
router.get("/folders", getFolders);

// Move a bookmark to a different folder
router.put("/bookmarks/:id/move", moveBookmark);

// Edit folder name
router.put("/folders/:id", editFolder);

// Check live status
router.get("/status", checkLiveStatus);

// Get duplicates
router.get("/duplicates", getDuplicates);

// Export bookmarks
router.get("/export", exportBookmarks);

module.exports = router;
