const express = require("express");
const router = express.Router();
const { getBookmarks, addBookmark, checkLiveStatus, getDuplicates } = require("../models/bookmarkModel");

// Get all bookmarks
router.get("/", getBookmarks);

// Add a new bookmark
router.post("/", addBookmark);

// Check live status
router.get("/status", checkLiveStatus);

// Get duplicates
router.get("/duplicates", getDuplicates);

// Export bookmarks
router.get("/export", exportBookmarks);

module.exports = router;
