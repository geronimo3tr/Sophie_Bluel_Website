async function fetchCategorieAPI() {
  try {
    const responseCategorie = await fetch("http://localhost:5678/api/categories"); //Call the Api and wait for the response
    const dataCategorie = await responseCategorie.json(); //Extra the json file of the API and wait for the response

    return dataCategorie.map((item) => ({ id: item.id, name: item.name }));
  } catch (error) {
    console.error("Error fetching Categorie data:", error);
    return [];
  }
}

const filter = document.querySelector(".filter");

function createButton(buttonInfo) {
  const button = document.createElement("button");
  button.textContent = buttonInfo.name; // Set the button label
  button.id = buttonInfo.id;
  filter.appendChild(button); // Append the button to the filter

  button.addEventListener("click", () => {
    filterbutton(buttonInfo.id);
  });
}

function filterbutton(categoryId) {
  selectedCategoryId = categoryId;

  const images = document.querySelectorAll(".gallery figure");
  images.forEach((image) => {
    const imageCategory = image.querySelector("img").dataset.category;
    if (selectedCategoryId == "0" || selectedCategoryId == imageCategory) {
      image.style.display = "block"; // Show images matching the selected category
    } else {
      image.style.display = "none"; // Hide images not matching the selected category
    }
  });
}

async function addButton() {
  const buttonData = await fetchCategorieAPI();
  buttonData.unshift({ id: "0", name: "Tous" }); // Add a extra button in the beginning
  for (const buttonInfo of buttonData) {
    createButton(buttonInfo);
  }
}

addButton();

async function fetchWorkAPI() {
  try {
    const response = await fetch("http://localhost:5678/api/works");
    const data = await response.json();

    return data.map((item) => ({
      id: item.id,
      title: item.title,
      URL: item.imageUrl,
      categoryId: item.categoryId,
      user: item.userId,
      category: item.category,
    }));
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
}

const gallery = document.querySelector(".gallery");

function createImage(imageInfo) {
  const figure = document.createElement("figure");
  const image = document.createElement("img");
  const figcaption = document.createElement("figcaption");
  image.src = imageInfo.URL;
  image.alt = imageInfo.title;
  image.id = imageInfo.id;
  image.dataset.category = imageInfo.categoryId;
  figcaption.textContent = imageInfo.title;
  gallery.appendChild(figure);
  figure.appendChild(image);
  figure.appendChild(figcaption);
}

async function addImage() {
  const imageData = await fetchWorkAPI();
  for (const imageInfo of imageData) {
    createImage(imageInfo);
  }
}
addImage();
