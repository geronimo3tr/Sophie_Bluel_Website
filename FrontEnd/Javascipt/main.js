const loginButton = document.querySelector(".login-button");
const buttonAccessUpload = document.querySelector(".button-acces-upload");
const returnToGallery = document.querySelector(".fa-arrow-left");
const closeButton = document.querySelector(".close-button");
const upload = document.getElementById("upload");

addImage();
addButton();
changePageIfLoggedIn();
userSelectCategory();

function changePageIfLoggedIn() {
  if (UserLogged()) {
    changeLoginButton();
    toolbar();
    modifier();
  }
}

function UserLogged() {
  return localStorage.getItem("token") !== null;
}

function changeLoginButton() {
  loginButton.innerText = "logout";
  loginButton.href = "#";
}

loginButton.addEventListener("click", () => {
  localStorage.removeItem("token");
  window.location.href = "index.html";
});

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

function modifier() {
  const div = document.createElement("div");
  const icon = document.createElement("i");
  const texte = document.createElement("span");
  const modifierContainer = document.querySelector(".log-project-tittle");
  div.classList.add("button-modifier");
  icon.classList.add("fa", "fa-regular", "fa-pen-to-square");
  texte.textContent = "Modifier";
  div.appendChild(icon);
  div.appendChild(texte);
  modifierContainer.appendChild(div);
  texte.addEventListener("click", () => {
    showModalGallery();
  });
  icon.addEventListener("click", () => {
    showModalGallery();
  });
}

function showModalGallery() {
  const modalGallery = document.getElementById("gallery-modal");
  modalGallery.show();
}

buttonAccessUpload.addEventListener("click", () => {
  const modalGallery = document.getElementById("gallery-modal");
  modalGallery.close();
  showUploadModal();
});

function showUploadModal() {
  const uploadModal = document.getElementById("upload-modal");
  uploadModal.show();
}

returnToGallery.addEventListener("click", () => {
  const uploadModal = document.getElementById("upload-modal");
  uploadModal.close();
  showModalGallery();
});

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

document.querySelectorAll(".close-button").forEach((closeButton) => {
  closeButton.addEventListener("click", () => {
    closeModal();
  });
});

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
        const form = document.querySelector(".preview-image-container");
        form.appendChild(newImage);
      } else {
        // If the preview image exists, update its src attribute
        preview.src = e.target.result;
      }
    };

    reader.readAsDataURL(fileInput.files[0]);
  }
}

upload.addEventListener("click", async (e) => {
  const selectedCategory = document.querySelector("select").value;
  const categoryInfo = await fetchCategorieAPI();
  const category = categoryInfo.find((info) => info.name === selectedCategory);

  if (category) {
    const categoryID = category.id;
    await sendNewWorkAPI(e, categoryID);
    removePreviewImage();
    const uploadForm = document.querySelector(".uploadForm");
    uploadForm.reset();
  } else {
    const categorie = document.querySelector(".placeholdercontainer");
    const errorText = document.createElement("p");
    categorie.appendChild(errorText);
    errorText.innerText = "veuillez selectionner une catégorie";
  }
});

function removePreviewImage() {
  const previewImage = document.querySelector(".imagePreview");
  if (previewImage) {
    previewImage.remove();
  }
}
