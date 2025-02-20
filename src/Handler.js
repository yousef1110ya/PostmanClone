const sendGetRequest = require("./GetRequest");
const saveGet = require("../output/saveGet");
const savePost = require("../output/savePost");
const sendPostRequest = require("./PostRequest");
const sendImagePostRequest = require("./FormPostRequest");

const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");

// defin the get requests
router.get("/", (req, res) => {
  fs.readFile(path.join(__dirname, "../view/index.html"), (err, data) => {
    if (err) {
      res.writeHead(500, { "Content-Type": "text/plain" });
      res.end("Error loading form");
    } else {
      res.writeHead(200, { "Content-Type": "text/html" });
      res.end(data);
    }
  });
});

// defin the post request to handle all the
router.post("/get", async (req, res) => {
  const apiURL = req.body.API;
  const name = req.body.NAME;
  const des = req.body.DES;
  console.log(apiURL);
  console.log(name);
  console.log(des);
  try {
    console.log("getting the data from the api");
    const data = await sendGetRequest(apiURL);
    console.log("saving the data to the file ");
    const textResponse = JSON.stringify(data, null, 2);
    console.log("Converted JSON response to text: ", textResponse);
    const savedData = await saveGet(apiURL, name, des, textResponse);
    res.send(
      `Data from ${apiURL}: ${JSON.stringify(
        data
      )} and the saved data are : ${savedData}`
    );
  } catch (error) {
    res.status(500).send("Error fetching data");
  }
});

router.post("/post", async (req, res) => {
  const apiURL = req.body.API;
  const name = req.body.NAME;
  const des = req.body.DES;
  const body = JSON.parse(req.body.JSON);
  console.log(apiURL);
  console.log(name);
  console.log(des);
  console.log(body);
  try {
    console.log("getting the data from the api");
    const data = await sendPostRequest(apiURL, body);
    console.log("saving the data to the file ");
    const textResponse = JSON.stringify(data, null, 2);
    console.log("Converted JSON response to text: ", textResponse);
    const savedData = await savePost(apiURL, name, des, textResponse);
    res.send(
      `Data from ${apiURL}: ${JSON.stringify(
        data
      )} and the saved data are : ${savedData}`
    );
  } catch (error) {
    res.status(500).send("Error fetching data");
  }
});

// Export the router
module.exports = router;
