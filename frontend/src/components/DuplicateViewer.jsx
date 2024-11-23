import React, { useEffect, useState } from "react";

const DuplicateViewer = () => {
  const [duplicates, setDuplicates] = useState([]);

  useEffect(() => {
    fetch("/api/bookmarks/duplicates")
      .then((res) => res.json())
      .then((data) => setDuplicates(data));
  }, []);

  return (
    <div>
      <h2>Duplicate Bookmarks</h2>
      <ul>
        {duplicates.map((d, index) => (
          <li key={index}>{d.url} (Count: {d.count})</li>
        ))}
      </ul>
    </div>
  );
};

export default DuplicateViewer;
