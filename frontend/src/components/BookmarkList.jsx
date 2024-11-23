import React from "react";

const BookmarkList = ({ bookmarks }) => (
  <table>
    <thead>
      <tr>
        <th>Title</th>
        <th>URL</th>
        <th>Folder</th>
        <th>Status</th>
      </tr>
    </thead>
    <tbody>
      {bookmarks.map((b) => (
        <tr key={b.id}>
          <td>{b.title}</td>
          <td><a href={b.url} target="_blank" rel="noopener noreferrer">{b.url}</a></td>
          <td>{b.folder}</td>
          <td>{b.status}</td>
        </tr>
      ))}
    </tbody>
  </table>
);

export default BookmarkList;
