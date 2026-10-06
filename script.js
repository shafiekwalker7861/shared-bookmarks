// 1. Import the functions that read and save bookmark data.
import { getUserIds, getData, setData } from "./storage.js";

// 2. Find the HTML elements we need to work with.
const userSelect = document.querySelector("#user-select");
const bookmarkForm = document.querySelector("#bookmark-form");
const bookmarkList = document.querySelector("#bookmark-list");

const urlInput = document.querySelector("#bookmark-url");
const titleInput = document.querySelector("#bookmark-title");
const descriptionInput = document.querySelector("#bookmark-description");

// 3. Get the user IDs and create an option for each user.
const userIds = getUserIds();

for (const userId of userIds) {
  const option = document.createElement("option");

  option.value = userId;
  option.textContent = `User ${userId}`;

  userSelect.appendChild(option);
}

// 4. Display the bookmarks belonging to a particular user.
function renderBookmarks(userId) {
  // Clear the previous user's bookmarks from the page.
  bookmarkList.textContent = "";

  // If no user is selected, stop here.
  if (userId === "") {
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

  // Create a list item for each bookmark.
  for (const bookmark of bookmarks) {
    const listItem = document.createElement("li");

    // Create a clickable title.
    const title = document.createElement("a");
    title.href = bookmark.url;
    title.textContent = bookmark.title;
    title.target = "_blank";
    title.rel = "noopener noreferrer";

    // Create the description.
    const description = document.createElement("p");
    description.textContent = bookmark.description;

    // Put the title and description inside the list item.
    listItem.appendChild(title);
    listItem.appendChild(description);

    // Put the completed list item on the page.
    bookmarkList.appendChild(listItem);
  }
}

// 5. Display the correct bookmarks when the dropdown changes.
userSelect.addEventListener("change", function () {
  const selectedUserId = userSelect.value;

  renderBookmarks(selectedUserId);
});

// 6. Add a bookmark when the user submits the form.
bookmarkForm.addEventListener("submit", function (event) {
  // Stop the form from reloading the page.
  event.preventDefault();

  const selectedUserId = userSelect.value;

  // A bookmark must belong to a selected user.
  if (selectedUserId === "") {
    alert("Please select a user first.");
    return;
  }

  // Read the input values and remove spaces at the beginning and end.
  const url = urlInput.value.trim();
  const title = titleInput.value.trim();
  const description = descriptionInput.value.trim();

  // Prevent titles or descriptions containing only spaces.
  if (title === "" || description === "") {
    alert("Please enter a title and description.");
    return;
  }

  // Allow website links using HTTP or HTTPS.
  const websiteUrl = new URL(url);

  if (
    websiteUrl.protocol !== "http:" &&
    websiteUrl.protocol !== "https:"
  ) {
    alert("Please enter a website URL starting with http:// or https://.");
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
});