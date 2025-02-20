const fs = require("fs");
const express = require("express");
const path = require("path");
const sendGetRequest = require("./src/GetRequest");
const querystring = require("querystring");
const formidable = require("formidable");

// Define the server port
const port = 3000;

// Create the server
const app = express();

// Define a route for the root URL
app.get("/", (req, res) => {
  // Serve the HTML form
  fs.readFile(path.join(__dirname, "/view/index.html"), (err, data) => {
    if (err) {
      res.writeHead(500, { "Content-Type": "text/plain" });
      res.end("Error loading form");
    } else {
      res.writeHead(200, { "Content-Type": "text/html" });
      res.end(data);
    }
  });
});

app.get("/GET", (req, res) => {
  // Serve the HTML form
  fs.readFile(path.join(__dirname, "/view/get/index.html"), (err, data) => {
    if (err) {
      res.writeHead(500, { "Content-Type": "text/plain" });
      res.end("Error loading form");
    } else {
      res.writeHead(200, { "Content-Type": "text/html" });
      res.end(data);
    }
  });
});

async function publicGET(url) {
  // sending a get request with the wanted data
  const getData = await sendGetRequest(url);
  console.log("GET Response Data:", getData);
  return getData;
}

app.post("/GET", (req, res) => {
  const form = new formidable.IncomingForm();
  form.parse(req, async (err, fields, files) => {
    if (err) {
      res.writeHead(500, { "Content-Type": "text/plain" });
      res.end("Error parsing form");
    } else {
      const url = fields.url;
      const fake = await publicGET(url);
      res.writeHead(200, { "Content-Type": "text/plain" });
      res.end(fake);
    }
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
