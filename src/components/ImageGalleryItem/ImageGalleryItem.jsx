export const ImageGalleryItem = ({ images, onImageClick }) => {
  return images.map(({ id, webformatURL, largeImageURL, tags }) => {
    return (
      <li key={id}>
        <img
          src={webformatURL}
          alt={tags}
          onClick={() => onImageClick(largeImageURL, tags)}
        />
      </li>
    );
  });
};
