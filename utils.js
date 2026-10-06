export function sortBookmarks(bookmarks) {
  return [...bookmarks].sort(
    (a, b) => new Date(b.timestamp) - new Date(a.timestamp)
  );
}
