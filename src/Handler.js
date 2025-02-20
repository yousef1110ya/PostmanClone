const sendGetRequest = require("./sendGetRequest");
const sendPostRequest = require("./sendPostRequest");
const sendImagePostRequest = require("./sendImagePostRequest");

async function handleRequests(
  RequstType,
  URL,
  imagePath,
  token,
  jsonData,
  contentType
) {
  try {
    switch (RequstType) {
      case "GET":
        const getData = await sendGetRequest(URL);
        console.log("GET Response Data:", getData);
        return { getData };
      case "POST":
        const postData = await sendPostRequest(URL, jsonData, token);
        console.log("POST Response Data:", postData);
        return { postData };
      case "IMAGE_POST":
        const imagePostData = await sendImagePostRequest(URL, imagePath, token);
        console.log("Image POST Response Data:", imagePostData);
        return { imagePostData };
      default:
        console.error("Invalid Request Type");
        return null;
    }
  } catch (error) {
    console.error("Error:", error);
    return null;
  }
}

module.exports = handleRequests;
