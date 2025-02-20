const fs = require("fs");
const express = require("express");
const app = express();
const path = require("path");
const sendGetRequest = require("./src/GetRequest");
const bodyParser = require("body-parser");
const querystring = require("querystring");
const formidable = require("formidable");

// Define the server port
const port = 3000;

// Import the routes
const routes = require("./src/Handler");
app.use(bodyParser.urlencoded({ extended: true }));

// Use the routes
app.use("/", routes);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
