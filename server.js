import { createServer } from "node:http";
import { readFile } from "node:fs/promises";

const files = {
  "/": ["index.html", "text/html"],
  "/index.html": ["index.html", "text/html"],
  "/style.css": ["style.css", "text/css"],
  "/script.js": ["script.js", "text/javascript"],
  "/storage.js": ["storage.js", "text/javascript"],
  "/utils.js": ["utils.js", "text/javascript"]
};

createServer(async (request, response) => {
  const path = new URL(request.url, "http://localhost").pathname;
  const file = files[path];

  if (!file) {
    response.writeHead(404).end("Not found");
    return;
  }

  try {
    const content = await readFile(new URL(file[0], import.meta.url));
    response.writeHead(200, { "Content-Type": file[1] });
    response.end(content);
  } catch {
    response.writeHead(500).end("Could not load this file.");
  }
}).listen(8000, "127.0.0.1", () => {
  console.log("Open http://127.0.0.1:8000 in your browser. Press Ctrl+C to stop.");
});
