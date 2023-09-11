"http://localhost:5678/api/works"; /*send new work*/
/*delete work depending on id*/
async function FetchDeleteAPI(imageInfo) {
  const token = localStorage.getItem("token");
  const response = await fetch("http://localhost:5678/api/works/1", {
    method: "DELETE",
    headers: {
      accept: "*/*",
      Authorization: `Bearer ${token}`,
    },
  });
  if (response.ok) {
    const imageElement = document.getElementById(imageInfo);
    if (imageElement) {
      imageElement.parentNode.remove();
    }
  }
}

function removeImage(imageElement) {
  const imageId = imageElement.id;

  // Remove the image from the main gallery
  const mainGalleryImage = document.getElementById(imageId);
  if (mainGalleryImage) {
    mainGalleryImage.parentNode.remove();
  }

  // Remove the image from the modal gallery
  const modalGalleryImage = document.querySelector(`.modal-gallery [data-image-id="${imageId}"]`);
  if (modalGalleryImage) {
    modalGalleryImage.parentNode.remove();
  }

  // Remove the image from the shared array
  const index = sharedImages.findIndex((image) => image.id === imageId);
  if (index !== -1) {
    sharedImages.splice(index, 1);
  }
}
