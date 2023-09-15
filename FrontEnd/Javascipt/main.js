addImage();
addButton();
changePageIfLoggedIn();
categorieSelect();
/*
    Si le token est présent : 
    - logout à la place de login (à la fois le texte du bouton et son effet)
    - ajout d'un bouton "éditer" 
    */

function changePageIfLoggedIn() {
  if (UserLogged()) {
    changeLoginButton();
    toolbar();
  }
}

function UserLogged() {
  return localStorage.getItem("token") !== null;
}

function changeLoginButton() {
  const loginButton = document.querySelector(".login-button");
  loginButton.innerText = "logout";
  loginButton.href = "#";
  loginButton.addEventListener("click", () => {
    localStorage.removeItem("token");
    window.location.href = "index.html";
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
    showModalGallery();
  });
  icon.addEventListener("click", () => {
    showModalGallery();
  });
}

function showModalGallery() {
  const modalContainer = document.querySelector(".overlay");
  const modalAccesPhoto = document.querySelector(".modal-photo-acces");
  const figure = document.querySelector("figure");
  figure.removeAttribute("figcaption");
  modalContainer.classList.remove("hidden");
  modalAccesPhoto.addEventListener("click", () => {
    showPhotoGallery();
  });
}

function showPhotoGallery() {
  const modalGalleryContainer = document.querySelector(".modal-gallery-container");
  const modalPhoto = document.querySelector(".modal-photo-container");
  const returnToGallery = document.querySelector(".fa-arrow-left");
  modalGalleryContainer.classList.add("hidden");
  modalPhoto.classList.remove("hidden");
  returnToGallery.addEventListener("click", () => {
    modalPhoto.classList.add("hidden");
    modalGalleryContainer.classList.remove("hidden");
  });
}

async function categorieSelect() {
  const select = document.querySelector("select");
  const categorieData = await fetchCategorieAPI();
  categorieData.forEach((categoryInfo) => {
    const createNewSelect = document.createElement("option");
    createNewSelect.textContent = categoryInfo.name;
    createNewSelect.id = categoryInfo.id;
    select.appendChild(createNewSelect);
  });
}

function hideModal() {
  const modalContainer = document.querySelector(".overlay");
  const modalGalleryContainer = document.querySelector(".modal-gallery-container");
  const modalPhoto = document.querySelector(".modal-photo-container");
  modalContainer.classList.add("hidden");
  modalPhoto.classList.add("hidden");
  modalGalleryContainer.classList.remove("hidden");
}
