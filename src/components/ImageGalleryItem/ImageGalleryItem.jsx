import css from './ImageGalleryItem.module.css';
// id, webformatURL, alt
export const ImageGalleryItem = ({ image, onClick }) => {
  return (
    <li key={image.id} className={css.ImageGalleryItem}>
      <img
        src={image.webformatURL}
        alt={image.alt}
        className={css.ImageGalleryItemImage}
        onClick={() => onClick(image)}
      />
    </li>
  );
};
