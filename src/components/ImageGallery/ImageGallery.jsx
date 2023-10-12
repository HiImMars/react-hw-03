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
          <ImageGalleryItem
            key={img.id}
            image={img}
            // id={img.id}
            // webformatURL={img.webformatURL}
            // alt={img.tags}
            onClick={onImageClick}
          />
        );
        // return (
        //   <li key={img.id}>
        //     <img src={img.webformatURL} alt={img.tags} />
        //   </li>
        // );
      })}
    </ul>
  );
};
