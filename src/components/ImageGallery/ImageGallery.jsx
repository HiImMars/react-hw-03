import { ImageGalleryItem } from '../ImageGalleryItem/ImageGalleryItem';
import css from './ImageGallery.module.css';

export const ImageGallery = ({ images, onImageClick }) => {
  if (images.length === 0) {
    return;
  }

  return (
    <ul className={css.ImageGallery}>
      {images.map(img => {
        return (
          <ImageGalleryItem key={img.id} image={img} onClick={onImageClick} />
        );
      })}
    </ul>
  );
};
