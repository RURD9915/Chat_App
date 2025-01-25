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

// WebSocket Connection
let ws_scheme = window.location.protocol === "https:" ? "wss://" : "ws://";
let ws_path =
  ws_scheme +
  window.location.host +
  window.location.pathname.replace("/chat/", "/ws/chat/");
let chatSocket = new WebSocket(ws_path);

chatSocket.onmessage = function (e) {
  let data = JSON.parse(e.data);
  console.log(data);
};

chatSocket.onclose = function (e) {
  console.error("Chat socket closed unexpectedly");
};
