// Collapsible Menu
const toggleButton = document.getElementById("toggleMenu");
const menuList = document.getElementById("menuList");

toggleButton.addEventListener("click", () => {
  if (menuList.style.display === "none" || menuList.style.display === "") {
    menuList.style.display = "flex";
    document.querySelector(".container").style.gridTemplateColumns =
      "20rem 40rem 20rem";
  } else {
    menuList.style.display = "none";
    document.querySelector(".container").style.gridTemplateColumns =
      "5rem 40rem 20rem";
  }
});

// Page Resizing Based on Screen Width
function adjustPageWidth() {
  const width = window.innerWidth;
  const body = document.body;
  if (width >= 992 && width <= 1600) {
    body.style.transform = "scale(0.9)";
  } else if (width >= 700 && width <= 767) {
    body.style.transform = "scale(0.8)";
  } else if (width >= 600 && width < 700) {
    body.style.transform = "scale(0.75)";
  } else if (width <= 600) {
    body.style.transform = "scale(0.5)";
  } else {
    body.style.transform = "scale(1)";
  }
}

window.addEventListener("resize", adjustPageWidth);
adjustPageWidth();

function showAddNumbers() {
  document.getElementById("options").style.display = "none";
  document.getElementById("result").style.display = "block";
  document.getElementById("result-content").innerHTML = `
      <h3>Add Two Numbers</h3>
      <form id="add-numbers-form">
          <label for="num1">Number 1:</label>
          <input type="number" id="num1" name="num1"><br><br>
          <label for="num2">Number 2:</label>
          <input type="number" id="num2" name="num2"><br><br>
          <button type="submit">Add</button>
      </form>
      <div id="add-numbers-result"></div>
  `;

  document.getElementById("add-numbers-form").onsubmit = async function (e) {
    e.preventDefault();
    const num1 = document.getElementById("num1").value;
    const num2 = document.getElementById("num2").value;
    const response = await fetch("/add/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": "{{ csrf_token }}",
      },
      body: JSON.stringify({ num1: num1, num2: num2 }),
    });
    const result = await response.json();
    document.getElementById(
      "add-numbers-result"
    ).innerHTML = `<h4>Result: ${result.result}</h4>`;
  };
}

function showUploadDocument() {
  document.getElementById("options").style.display = "none";
  document.getElementById("result").style.display = "block";
  document.getElementById("result-content").innerHTML = `
      <h3>Upload Document</h3>
      <form id="upload-document-form" enctype="multipart/form-data">
          <label for="document">Select Document:</label>
          <input type="file" id="document" name="document"><br><br>
          <button type="submit">Upload</button>
      </form>
      <div id="upload-document-result"></div>
  `;

  document.getElementById("upload-document-form").onsubmit = async function (
    e
  ) {
    e.preventDefault();
    const document = document.getElementById("document").files[0];
    const formData = new FormData();
    formData.append("document", document);
    const response = await fetch("/store/", {
      method: "POST",
      body: formData,
      headers: {
        "X-CSRFToken": "{{ csrf_token }}",
      },
    });
    const result = await response.json();
    document.getElementById(
      "upload-document-result"
    ).innerHTML = `<h4>${result}</h4>`;
  };
}

function goBack() {
  document.getElementById("options").style.display = "block";
  document.getElementById("result").style.display = "none";
}
