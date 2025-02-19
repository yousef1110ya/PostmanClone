const fs = require("fs");
const path = require("path");
const handleRequests = require("../src/Handler"); // Adjust the path to your handler.js

async function execute(URL, imagePath, token, jsonData, contentType) {
  // Call the handler function
  const response = await handleRequests(
    URL,
    imagePath,
    token,
    jsonData,
    contentType
  );

  if (response) {
    // Define the output file path
    const outputPath = path.join(__dirname, "response.json");

    // Write the response data to a JSON file
    fs.writeFile(outputPath, JSON.stringify(response, null, 2), (err) => {
      if (err) {
        console.error("Error writing to file:", err);
      } else {
        console.log("Response data written to response.json");
      }
    });
  } else {
    console.log("No response data to write");
  }
}

module.exports = execute;
