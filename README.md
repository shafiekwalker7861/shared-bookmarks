# Shared Bookmarks

Save website links for five users, view the newest bookmarks first, copy URLs,
and add likes. Bookmarks are saved in the current browser using localStorage.

## Run locally

Open the project folder in VS Code. In the terminal, run:

```sh
npm start
```

Open <http://127.0.0.1:8000> in your browser. No package installation is needed.
Keep the terminal running while using the app.

The JavaScript uses module imports, so opening index.html as a local file will
block the script and prevent the user dropdown from loading.

## Tests

```sh
npm test
```

## Deployment

The included workflow runs tests and deploys the website when changes reach
main. In the repository's Settings → Pages, select GitHub Actions as the
publishing source.
