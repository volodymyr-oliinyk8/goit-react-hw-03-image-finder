import React from 'react';
import PropTypes from 'prop-types';
import styles from './ImageGalleryItem.module.css';

const ImageGalleryItem = ({ image, onClickImage }) => {
  const largeImageUrl = () => onClickImage(image.largeImageURL, image.tags);
  return (
    <li className={styles.imageGalleryItem}>
      <img
        src={image.webformatURL}
        alt={image.tags}
        className={styles.imageGalleryItem_image}
        onClick={largeImageUrl}
      />
    </li>
  );
};

ImageGalleryItem.propTypes = {
  image: PropTypes.shape({
    largeImageURL: PropTypes.string.isRequired,
    webformatURL: PropTypes.string.isRequired,
    tags: PropTypes.string,
  }).isRequired,
  onClickImage: PropTypes.func.isRequired,
};

export default ImageGalleryItem;
