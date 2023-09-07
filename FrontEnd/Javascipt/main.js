addImage();
addButton();

changePageIfLoggedIn();
/*
    Si le token est présent : 
    - logout à la place de login (à la fois le texte du bouton et son effet)
    - ajout d'un bouton "éditer" 
    */

function changePageIfLoggedIn() {
  if (isUserLogged()) {
    changeLoginButton();
    toolbar();
  }
}

function isUserLogged() {
  return localStorage.getItem("token") !== null;
}

function changeLoginButton() {
  const loginButton = document.querySelector(".login-button");
  loginButton.innerText = "logout";
  loginButton.href = "#";
  loginButton.addEventListener("click", () => {
    localStorage.removeItem("token");
    window.location.href = "index.html";
    e.preventDefault();
  });
}

function toolbar() {
  const section = document.createElement("section");
  const icon = document.createElement("i");
  const texte = document.createElement("span");
  const body = document.querySelector("body");
  body.insertBefore(section, body.firstChild);
  section.classList.add("toolbar");
  section.appendChild(icon);
  icon.classList.add("fa", "fa-regular", "fa-pen-to-square");
  section.appendChild(texte);
  texte.innerText = "Mode édition";
  texte.addEventListener("click", () => {
    EditionMode();
  });
  icon.addEventListener("click", () => {
    EditionMode();
  });
}

function EditionMode() {
  console.log("Gallery function called");
  const body = document.querySelector("body");
  const div = document.createElement("div");
  body.appendChild(div);
  div.classList.add("overlay");
  const modal = document.createElement("modal");
  body.appendChild(modal);
  modal.classList.add("modal");
  modal.innerHTML = `
  <span class="Modaltitle">Galerie photo</span>
  <script></script>
  <i class="fa-solid fa-xmark" onclick="closeEditionMode()"></i>
`;
}

function closeEditionMode() {
  // Remove the overlay, modal, and no-scroll class
  const overlay = document.querySelector(".overlay");
  const modal = document.querySelector(".modal");
  document.body.removeChild(overlay);
  document.body.removeChild(modal);
}
