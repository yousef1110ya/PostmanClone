const axios = require("axios");
const fs = require("fs");
const FormData = require("form-data");

async function sendImagePostRequest(targetUrl, imagePath, token) {
  try {
    const image = fs.readFileSync(imagePath);
    const formData = new FormData();
    formData.append("image", image, imagePath);

    const response = await axios.post(targetUrl, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error:", error);
    return null; // Return null in case of an error
  }
}

module.exports = sendImagePostRequest;
