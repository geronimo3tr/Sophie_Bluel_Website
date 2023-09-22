addImage();
addButton();
changePageIfLoggedIn();
userSelectCategory();
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
  const modalGallery = document.getElementById("gallery-modal");
  const AccesUploadModal = document.querySelector(".button-acces-upload");
  modalGallery.show();
  AccesUploadModal.addEventListener("click", () => {
    modalGallery.close();
    showUploadModal();
  });
}

function showUploadModal() {
  const uploadModal = document.getElementById("upload-modal");
  uploadModal.show();
  const returnToGallery = document.querySelector(".fa-arrow-left");
  returnToGallery.addEventListener("click", () => {
    uploadModal.close();
    showModalGallery();
  });
}

async function userSelectCategory() {
  const select = document.querySelector("select");
  const categorieData = await fetchCategorieAPI();
  categorieData.forEach((categoryInfo) => {
    const createNewCategorie = document.createElement("option");
    createNewCategorie.textContent = categoryInfo.name;
    createNewCategorie.id = categoryInfo.id;
    select.appendChild(createNewCategorie);
  });
}

function closeModal() {
  const dialogs = document.querySelectorAll("dialog");
  dialogs.forEach((dialog) => {
    dialog.close();
  });
}

function previewImage() {
  const fileInput = document.getElementById("newImage");
  const preview = document.getElementById("preview");

  if (fileInput.files && fileInput.files[0]) {
    const reader = new FileReader();

    reader.onload = function (e) {
      // Check if the preview image already exists
      if (!preview) {
        // If not, create a new img element
        const newImage = document.createElement("img");
        newImage.src = e.target.result;
        newImage.alt = "preview";
        newImage.classList.add("imagePreview");
        // Get the form element and append the new image
        const form = document.querySelector(".uploadFormContainer");
        form.appendChild(newImage);
      } else {
        // If the preview image exists, update its src attribute
        preview.src = e.target.result;
      }
    };

    reader.readAsDataURL(fileInput.files[0]);
  }
}

const upload = document.getElementById("upload");
upload.addEventListener("click", async (e) => {
  const selectedCategory = document.querySelector("select").value;
  const categoryInfo = await fetchCategorieAPI();
  const category = categoryInfo.find((info) => info.name === selectedCategory);

  if (category) {
    const categoryID = category.id;
    await sendNewWorkAPI(e, categoryID);
    removePreviewImage();
  } else {
    console.error("Selected category not found");
  }
});

function removePreviewImage() {
  const previewImage = document.querySelector(".imagePreview");
  if (previewImage) {
    previewImage.remove();
  }
}
