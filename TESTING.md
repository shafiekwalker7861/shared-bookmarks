# Testing — Shared Bookmarks

## Automated tests

Run:

npm i
npm test

Unit tests in `example.test.js`:

- Check that five user IDs are returned.
- Check that bookmarks are sorted newest first.
- Check that sorting does not change the original array.
- Check that sorting handles empty collections and numeric timestamps.

The tests import the actual functions from `storage.js` and `utils.js`.

## Rubric checks

| Requirement | How to test | Result |
|---|---|---|
| Dropdown lists five users | Open the dropdown and count the users, excluding the placeholder. Unit tests in `example.test.js` also check the user count. | Complete |
| Selecting a user displays their bookmarks | Select each user and check their collection appears. |  Complete |
| Empty collections show a message | Select a user with no bookmarks and check the explanation appears. |  Complete |
| Bookmarks appear newest first | Unit tests in `example.test.js`. Also add two bookmarks and check the newest appears first. | Automated tests passed; manual check Complete |
| Title, description and timestamp appear | Check these three details on each displayed bookmark. | Complete |
| Titles link to the correct URL | Open a bookmark title and compare the destination with its saved URL. | Complete |
| Copy button copies the URL | Click Copy URL, paste into a text editor and compare with the bookmark URL. | Complete |
| Likes work independently and persist | Like one bookmark. Check other counts stay unchanged. Close and reopen the browser, select the same user and check the count remains. | Complete |
| Form has URL, title, description and submit button | Inspect the form and submit it using only the keyboard. | Complete |
| New bookmarks belong only to the selected user | Add a bookmark for one user, then switch users and check it was not added to their collections. | Complete |
| List updates after submission | Add a bookmark and check it appears immediately in the current user's list. | Complete |
| All views pass accessibility checks | Run Lighthouse in Snapshot mode with Desktop selected, for the initial view and each of the five users, including empty and populated collections. Confirm 100% in every view. | Complete |
| At least one non-trivial function is unit tested | Unit tests in `example.test.js` test `sortBookmarks`, imported from `utils.js`. | Passed |
| No dead JavaScript or CSS | Review all JavaScript and CSS. Remove unused functions, variables, imports, rules and leftover example code. | Complete |

## Deployment

The GitHub Actions test and deployment jobs passed after merging into `main`.
The deployed website loaded successfully.

Live website:
https://shafiekwalker7861.github.io/shared-bookmarks/
