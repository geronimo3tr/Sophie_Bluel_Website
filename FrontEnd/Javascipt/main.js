addImage();
addButton();
changePageIfLoggedIn();
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
  ModalGallery(modal);
}

function ModalGallery(modal) {
  modal.innerHTML = `
  <span class="Modaltitle">Galerie photo</span><i class="fa-solid fa-xmark" onclick="closeEditionMode()"></i>
  <div class="modal-gallery"></div>
  <input type="submit" id="addphoto" value="Ajouter une photo" />
`;
  const Addphoto = modal.querySelector("#addphoto");
  Addphoto.addEventListener("click", () => {
    AddPhotoButton(modal);
  });
  addImage();
}

function AddPhotoButton(modal) {
  modal.innerHTML = `
    <i class="fa-solid fa-arrow-left" onclick="ReturnModalGallery(modal)" ></i><span class="Modaltitle">Ajout Photo</span><i class="fa-solid fa-xmark" onclick="closeEditionMode()"></i>
  <div class="addphotocontainer"><i class="fa-regular fa-image "></i>
  <button class=addphotobutton>+ Ajouter photo</button>
  <span>jpg, png : 4mo max</span>
  </div>
  <div class=placeholdercontainer>
  <article class="placeholder">
  <span>Titre</span>
  <input class="title" type="text id=title required"/>
  </article>
  <article class="placeholder">
  <span>Catégorie</span>
  <input class="title" type="text id=categorie required"/>
  </article>
  </div>
  <input type="submit" id="validatephoto" value="Valider" />
`;
  const arrowIcon = modal.querySelector(".fa-arrow-left");
  arrowIcon.addEventListener("click", () => {
    ReturnModalGallery(modal);
  });
}

function ReturnModalGallery(modal) {
  ModalGallery(modal);
}

function closeEditionMode() {
  // Remove the overlay, modal, and no-scroll class
  const overlay = document.querySelector(".overlay");
  const modal = document.querySelector(".modal");
  document.body.removeChild(overlay);
  document.body.removeChild(modal);
  window.location.href = "index.html";
}
