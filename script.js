import { getUserIds, getData, setData } from "./storage.js";
import { sortBookmarks } from "./utils.js";

// Find the HTML elements we need to work with.
const userSelect = document.querySelector("#user-select");
const bookmarkForm = document.querySelector("#bookmark-form");
const bookmarkList = document.querySelector("#bookmark-list");
const statusMessage = document.querySelector("#status-message");

const urlInput = document.querySelector("#bookmark-url");
const titleInput = document.querySelector("#bookmark-title");
const descriptionInput = document.querySelector("#bookmark-description");

// Get the user IDs and create an option for each user.
const userIds = getUserIds();

for (const userId of userIds) {
  const option = document.createElement("option");

  option.value = userId;
  option.textContent = `User ${userId}`;

  userSelect.appendChild(option);
}

// Display the bookmarks belonging to a particular user.
function renderBookmarks(userId) {
  // Clear the previous user's bookmarks from the page.
  bookmarkList.textContent = "";

  // If no user is selected, stop here.
  if (userId === "") {
    const message = document.createElement("li");
    message.textContent = "Choose a user to view their bookmarks.";
    bookmarkList.appendChild(message);
    return;
  }

  // Read this user's bookmarks. Use an empty array if none are saved.
  const bookmarks = getData(userId) ?? [];

  // Display a message if the array is empty.
  if (bookmarks.length === 0) {
    const message = document.createElement("li");
    message.textContent = "This user has no bookmarks yet.";

    bookmarkList.appendChild(message);
    return;
  }

  // Sort bookmarks with newest first.
  const sortedBookmarks = sortBookmarks(bookmarks);

  // Display each bookmark.
  for (const bookmark of sortedBookmarks) {
    const listItem = document.createElement("li");

    // Create a clickable title.
    const title = document.createElement("a");
    title.href = bookmark.url;
    title.textContent = bookmark.title;
    title.target = "_blank";
    title.rel = "noopener noreferrer";

    // Create the Copy URL button.
    const copyButton = document.createElement("button");
    copyButton.type = "button";
    copyButton.textContent = "Copy URL";
    copyButton.setAttribute("aria-label", `Copy URL for ${bookmark.title}`);

    copyButton.addEventListener("click", async () => {
      try {
        await navigator.clipboard.writeText(bookmark.url);
        statusMessage.textContent = `URL copied for "${bookmark.title}".`;
      } catch {
        statusMessage.textContent = `Could not copy automatically. Copy this URL: ${bookmark.url}`;
      }
    });

    // Create the description.
    const description = document.createElement("p");
    description.textContent = bookmark.description;

    // Create and display the timestamp.
    const timestamp = document.createElement("time");
    const date = new Date(bookmark.timestamp);

    timestamp.dateTime = date.toISOString();
    timestamp.textContent = `Created: ${date.toLocaleString("en-GB")}`;

    // Create the like button.
    const likeButton = document.createElement("button");
    likeButton.type = "button";
    likeButton.textContent = `Like (${bookmark.likes || 0})`;
    likeButton.setAttribute("aria-label", `Like ${bookmark.title}. ${bookmark.likes || 0} likes.`);

    likeButton.addEventListener("click", () => {
      bookmark.likes = (bookmark.likes || 0) + 1;

      // Save the updated likes so they persist across sessions.
      setData(userId, bookmarks);

      likeButton.textContent = `Like (${bookmark.likes})`;
      likeButton.setAttribute("aria-label", `Like ${bookmark.title}. ${bookmark.likes} likes.`);
      statusMessage.textContent = `"${bookmark.title}" now has ${bookmark.likes} likes.`;
    });

    // Add everything to the bookmark list item.
    listItem.appendChild(title);
    listItem.appendChild(copyButton);
    listItem.appendChild(description);
    listItem.appendChild(timestamp);
    listItem.appendChild(likeButton);

    bookmarkList.appendChild(listItem);
  }
}

// Display the correct bookmarks when the dropdown changes.
userSelect.addEventListener("change", function () {
  const selectedUserId = userSelect.value;

  statusMessage.textContent = "";
  renderBookmarks(selectedUserId);
});

renderBookmarks(userSelect.value);

// Add a bookmark when the user submits the form.
bookmarkForm.addEventListener("submit", function (event) {
  // Stop the form from reloading the page.
  event.preventDefault();

  const selectedUserId = userSelect.value;

  // A bookmark must belong to a selected user.
  if (selectedUserId === "") {
    statusMessage.textContent = "Please select a user first.";
    userSelect.focus();
    return;
  }

  // Read the input values and remove spaces at the beginning and end.
  const url = urlInput.value.trim();
  const title = titleInput.value.trim();
  const description = descriptionInput.value.trim();

  // Prevent titles or descriptions containing only spaces.
  if (title === "" || description === "") {
    statusMessage.textContent = "Please enter a title and description.";
    (title === "" ? titleInput : descriptionInput).focus();
    return;
  }

  // Allow website links using HTTP or HTTPS.
  let websiteUrl;
  try {
    websiteUrl = new URL(url);
  } catch {
    statusMessage.textContent = "Please enter a valid website URL.";
    urlInput.focus();
    return;
  }

  if (
    websiteUrl.protocol !== "http:" &&
    websiteUrl.protocol !== "https:"
  ) {
    statusMessage.textContent = "Please enter a website URL starting with http:// or https://.";
    urlInput.focus();
    return;
  }

  // Get the user's existing bookmarks.
  const bookmarks = getData(selectedUserId) ?? [];

  // Create an object containing the new bookmark's information.
  const newBookmark = {
    url: websiteUrl.href,
    title: title,
    description: description,
    timestamp: Date.now(),
    likes: 0
  };

  // Add the new bookmark to the array.
  bookmarks.push(newBookmark);

  // Save the updated array for this user.
  setData(selectedUserId, bookmarks);

  // Clear the form and show the updated bookmark list.
  bookmarkForm.reset();
  renderBookmarks(selectedUserId);
  statusMessage.textContent = `Saved "${title}" for User ${selectedUserId}.`;
});
