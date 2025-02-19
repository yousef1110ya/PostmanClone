const axios = require("axios");

async function sendGetRequest(targetUrl, contentType, token) {
  try {
    const response = await axios.get(targetUrl, {
      headers: {
        "Content-Type": contentType,
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error:", error);
    return null; // Return null in case of an error
  }
}

module.exports = sendGetRequest;
