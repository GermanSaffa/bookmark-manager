import React, { useState, useEffect } from "react";
import BookmarkList from "./components/BookmarkList";
import UploadForm from "./components/UploadForm";
import SearchBar from "./components/SearchBar";
import DuplicateViewer from "./components/DuplicateViewer";

const App = () => {
  const [bookmarks, setBookmarks] = useState([]);
  const [query, setQuery] = useState("");

  useEffect(() => {
    fetch("/api/bookmarks")
      .then((res) => res.json())
      .then((data) => setBookmarks(data));
  }, []);

  const filteredBookmarks = bookmarks.filter((b) =>
    b.title.toLowerCase().includes(query.toLowerCase())
  );

  const checkLiveStatus = () => {
    fetch("/api/bookmarks/status")
      .then(() => alert("Status check completed!"))
      .catch((err) => alert("Error checking status"));
  };

  const exportBookmarks = () => {
  fetch("/api/bookmarks/export")
    .then((res) => res.blob())
    .then((blob) => {
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "bookmarks.json");
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
    })
    .catch((err) => alert("Error exporting bookmarks"));
};

  return (
    <div>
      <h1>Bookmark Manager</h1>
      <SearchBar query={query} setQuery={setQuery} />
      <button onClick={checkLiveStatus}>Check Live Status</button>
      <button onClick={exportBookmarks}>Export Bookmarks</button>
      <UploadForm />
      <DuplicateViewer />
      <BookmarkList bookmarks={filteredBookmarks} />
    </div>
  );
};

export default App;
