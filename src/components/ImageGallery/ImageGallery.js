import React from 'react';
import PropTypes from 'prop-types';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';
import styles from './ImageGallery.module.css';

const ImageGallery = ({ images, onClickImage }) => (
  <ul className={styles.imageGallery}>
    {images.map(image => (
      <ImageGalleryItem
        key={image.id}
        image={image}
        onClickImage={onClickImage}
      />
    ))}
  </ul>
);

ImageGallery.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
    }),
  ).isRequired,
  onClickImage: PropTypes.func.isRequired,
};

export default ImageGallery;
