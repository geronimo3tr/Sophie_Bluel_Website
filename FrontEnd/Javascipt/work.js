async function fetchSendWorkAPI() {
  try {
    const responseCategorie = await fetch("http://localhost:5678/api/works"); //Call the Api and wait for the response send new work*/
    const dataCategorie = await responseCategorie.json(); //Extra the json file of the API and wait for the response

    return dataCategorie.map((item) => ({ id: item.id, title: item.title, category: item.categoryId }));
  } catch (error) {
    console.error("Error fetching Categorie data:", error);
    return [];
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
