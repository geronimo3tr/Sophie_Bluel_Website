"http://localhost:5678/api/works"; /*send new work*/
/*delete work depending on id*/
async function FetchDeleteAPI(imageId) {
  const token = localStorage.getItem("token");

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
