import React, { useState } from "react";

const UploadForm = () => {
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [folder, setFolder] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("/api/bookmarks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, url, folder }),
    })
      .then(() => alert("Bookmark added!"))
      .catch((err) => alert("Error adding bookmark"));
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <input
        type="url"
        placeholder="URL"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Folder"
        value={folder}
        onChange={(e) => setFolder(e.target.value)}
      />
      <button type="submit">Add Bookmark</button>
    </form>
  );
};

export default UploadForm;
