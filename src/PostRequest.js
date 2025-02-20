const axios = require("axios");

async function sendPostRequest(targetUrl, jsonData) {
  try {
    const response = await axios.post(targetUrl, jsonData, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error:", error);
    return null; // Return null in case of an error
  }
}

module.exports = sendPostRequest;
