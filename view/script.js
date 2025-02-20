document.addEventListener("DOMContentLoaded", function () {
  const dataTypeRadios = document.querySelectorAll('input[name="dataType"]');
  const requestTypeRadios = document.querySelectorAll(
    'input[name="requestType"]'
  );
  const jsonDataDiv = document.getElementById("jsonDataDiv");
  const formDataDiv = document.getElementById("formDataDiv");

  dataTypeRadios.forEach((radio) => {
    radio.addEventListener("change", function () {
      if (this.value === "json") {
        jsonDataDiv.style.display = "block";
        formDataDiv.style.display = "none";
      } else if (this.value === "null") {
        jsonDataDiv.style.display = "none";
        formDataDiv.style.display = "none";
      } else {
        jsonDataDiv.style.display = "none";
        formDataDiv.style.display = "block";
      }
    });
  });

  document
    .getElementById("uploadForm")
    .addEventListener("submit", function (event) {
      event.preventDefault();

      const formData = new FormData();
      const urlPath = document.getElementById("urlPath").value;
      const selectedDataType = document.querySelector(
        'input[name="dataType"]:checked'
      ).value;

      formData.append("urlPath", urlPath);

      if (selectedDataType === "json") {
        const jsonData = document.getElementById("jsonData").value;
        formData.append("jsonData", jsonData);
      } else if (selectedDataType === "null") {
        formData.append("null", null);
      } else {
        const imageFile = document.getElementById("image").files[0];
        formData.append("image", imageFile);
      }

      fetch("/test", {
        method: "POST",
        body: formData,
      })
        .then((response) => response.json())
        .then((data) => {
          alert("Form submitted successfully!");
          console.log(data);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    });
});
