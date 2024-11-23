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

  const [folderName, setFolderName] = useState("");
  const createFolder = () => {
    fetch("/api/bookmarks/folders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: folderName }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Folder created:", data);
        // Optionally refresh the folder list
      })
      .catch((err) => alert("Error creating folder"));
  };

  const moveBookmark = (bookmarkId, folderId) => {
    fetch(`/api/bookmarks/${bookmarkId}/move`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ folder_id: folderId }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Bookmark moved:", data);
        // Optionally refresh the bookmark list
      })
      .catch((err) => alert("Error moving bookmark"));
    };
  
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
      <input
      type="text"
      value={folderName}
      onChange={(e) => setFolderName(e.target.value)}
      placeholder="New folder name"
      />
      <button onClick={createFolder}>Create Folder</button><input
      type="text"
      value={folderName}
      onChange={(e) => setFolderName(e.target.value)}
      placeholder="New folder name"
      />
      <button onClick={createFolder}>Create Folder</button>
      <button onClick={checkLiveStatus}>Check Live Status</button>
      <button onClick={exportBookmarks}>Export Bookmarks</button>
      <UploadForm />
      <DuplicateViewer />
      <BookmarkList bookmarks={filteredBookmarks} />
    </div>
  );
};

export default App;
