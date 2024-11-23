import React, { useState, useEffect } from "react";
import BookmarkList from "./components/BookmarkList";
import UploadForm from "./components/UploadForm";
import SearchBar from "./components/SearchBar";

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

  return (
    <div>
      <h1>Bookmark Manager</h1>
      <SearchBar query={query} setQuery={setQuery} />
      <UploadForm />
      <BookmarkList bookmarks={filteredBookmarks} />
    </div>
  );
};

export default App;
