async function sendNewWorkAPI(e, categoryID) {
  e.preventDefault();
  const formData = new FormData();
  const newImageInput = document.querySelector("input[type=file]");
  const newImage = newImageInput.files[0]; // Retrieve the selected file

  const token = localStorage.getItem("token");

  formData.append("image", newImage);
  formData.append("title", document.querySelector("#previewImageTitle").value);
  formData.append("category", categoryID.toString());

  try {
    const response = await fetch("http://localhost:5678/api/works", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    if (response.ok) {
      const responseData = await response.json();
      const imageInfo = {
        id: responseData.id,
        title: document.querySelector("#previewImageTitle").value,
        URL: responseData.imageUrl,
        categoryId: categoryID,
      };

      // Create a new image element and add it to the gallery
      createImage(imageInfo, gallery);

      // Create the same image in the modal gallery
      const modalGallery = document.querySelector(".modal-gallery");
      createImage(imageInfo, modalGallery, false, true, modalGallery);
    } else {
      console.error("Failed to upload image.");
    }
  } catch (error) {
    console.error("Error uploading image:", error);
  }
}

async function fetchDeleteAPI(imageId) {
  const token = localStorage.getItem("token");

  /*delete work depending on id*/
  try {
    const response = await fetch(`http://localhost:5678/api/works/${imageId}`, {
      method: "DELETE",
      headers: {
        accept: "*/*",
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.ok) {
      // Remove the image from the modal gallery by its ID
      const modalGalleryImage = document.querySelector(`[id="${imageId}"]`);
      if (modalGalleryImage) {
        modalGalleryImage.parentNode.remove();
      }

      // Remove the image from the main gallery by its ID
      const mainGalleryImage = document.getElementById(imageId);
      if (mainGalleryImage) {
        mainGalleryImage.parentNode.remove();
      }
    } else {
      console.error("Failed to delete image");
    }
  } catch (error) {
    console.error("Error deleting image:", error);
  }
}
