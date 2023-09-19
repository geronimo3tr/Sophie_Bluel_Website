async function fetchNewWorkAPI(e) {
  // Fetch data from the API
  e.preventDefault();
  const token = localStorage.getItem("token");
  const newImage = document.querySelector("input[type=file]").files[0];
  const response = await fetch("http://localhost:5678/api/works", {
    method: "POST",
    headers: {
      "Content-Type": "multipart/form-data, application/json;charset=utf-8",
      Authorization: `Bearer ${token}`,
    },
  });
  if (response.ok) {
    const gallery = document.querySelector(".gallery");
    const figure = document.createElement("figure");
    gallery.appendChild(figure);
    figure.appendChild(newImage);
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
