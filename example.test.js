import assert from "node:assert";
import test from "node:test";
import { getUserIds } from "./storage.js";
import { sortBookmarks } from "./utils.js";

test("User count is correct", () => {
  assert.equal(getUserIds().length, 5);
});

test("Bookmarks are sorted newest first", () => {
  const bookmarks = [
    {
      title: "Old bookmark",
      timestamp: "2026-08-20T10:00:00Z"
    },
    {
      title: "New bookmark",
      timestamp: "2026-08-23T10:00:00Z"
    },
    {
      title: "Middle bookmark",
      timestamp: "2026-08-22T10:00:00Z"
    }
  ];

  const sortedBookmarks = sortBookmarks(bookmarks);

  assert.equal(sortedBookmarks[0].title, "New bookmark");
  assert.equal(sortedBookmarks[1].title, "Middle bookmark");
  assert.equal(sortedBookmarks[2].title, "Old bookmark");
  // Sorting for display must not change the stored array's order.
  assert.equal(bookmarks[0].title, "Old bookmark");
  assert.notEqual(sortedBookmarks, bookmarks);
});

test("Sorting handles empty collections and numeric timestamps", () => {
  assert.deepEqual(sortBookmarks([]), []);
  assert.deepEqual(sortBookmarks([{ timestamp: 100 }, { timestamp: 300 }, { timestamp: 200 }]),
    [{ timestamp: 300 }, { timestamp: 200 }, { timestamp: 100 }]);
});
