const axios = require("axios");

async function sendGetRequest(API) {
  try {
    const response = await axios.get(API);
    return response.data;
  } catch (error) {
    console.error("Error:", error.message); // Log the error message
    if (error.response) {
      console.error("Response data:", error.response.data); // Log the response data
    }
    return null; // Return null in case of an error
  }
}

module.exports = sendGetRequest;
