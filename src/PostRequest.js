const axios = require("axios");

async function sendPostRequest(targetUrl, jsonData, token) {
  try {
    const response = await axios.post(targetUrl, jsonData, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error:", error);
    return null; // Return null in case of an error
  }
}

module.exports = sendPostRequest;
