const http = require("http");
const fs = require("fs");
const path = require("path");
const querystring = require("querystring");
const formidable = require("formidable");

// Define the server port
const port = 3000;

// Create the server
const server = http.createServer((req, res) => {
  if (req.method === "GET" && req.url === "/") {
    // Serve the HTML form
    fs.readFile(path.join(__dirname, "index.html"), (err, data) => {
      if (err) {
        res.writeHead(500, { "Content-Type": "text/plain" });
        res.end("Error loading form");
      } else {
        res.writeHead(200, { "Content-Type": "text/html" });
        res.end(data);
      }
    });
  } else if (req.method === "POST" && req.url === "/submit") {
    // Handle form submission
    const form = new formidable.IncomingForm();
    form.parse(req, (err, fields, files) => {
      if (err) {
        res.writeHead(500, { "Content-Type": "text/plain" });
        res.end("Error processing form");
        return;
      }

      const { url, token, jsonData, contentType, requestType } = fields;
      const imagePath = files.imagePath ? files.imagePath.path : null;

      const responseData = {
        type: requestType,
        api: url,
        sentData: jsonData,
        image: imagePath,
        token: token,
        response: "Response from the server goes here",
      };

      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(responseData));

      console.log("Form data received:", responseData);
    });
  } else {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("Not Found");
  }
});

// Start the server
server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
