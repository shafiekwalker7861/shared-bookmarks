// Import the functions that get user IDs and stored bookmark data.
import { getUserIds, getData } from "./storage.js";

// Find the user dropdown in the HTML.
const userSelect = document.querySelector("#user-select");

// Get the collection of user IDs from storage.js.
const userIds = getUserIds();

// Go through each user ID and create its dropdown option.
for (const userId of userIds) {
    // Create a new <option> element.
    const option = document.createElement("option");

    // Set the value we will read when this option is selected.
    option.value = userId;

    // Set the visible text, such as "User 1".
    option.textContent = `User ${userId}`;

    // Add the option to the user dropdown.
    userSelect.appendChild(option);
}

function renderBookmarks(userId) {
    const bookmarks = getData(userId) ?? [];
    bookmarkList.textContent = "";

    if (bookmarks.length === 0) {
        const message = document.createElement("li");
        message.textContent = "This user has no bookmarks yet."
        bookmarkList.appendChild(message);
        return;
    }
}

// Run this function whenever the user changes the dropdown selection.
userSelect.addEventListener("change", function() {
    // Read the selected user's ID from the dropdown.
    const selectedUserId = userSelect.value;
     renderBookmarks(selectedUserId);

    // Get that user's bookmarks. Use an empty array if no data is returned.
    const bookmarks = getData(selectedUserId) ?? [];

    // Show the bookmarks in the Console to check the retrieved data.
    console.log(bookmarks);
});

const bookmarkList = document.querySelector("#bookmark-list");