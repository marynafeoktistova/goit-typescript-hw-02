import ImageCard from '../ImageCard/ImageCard';
import css from './ImageGallery.module.css';

type ImageItem = {
  id: string;
  alt_description: string;
  likes: number;
  urls: {
    small: string;
  };
  user: {
    name: string;
    social: {
      portfolio_url: string;
    };
  };
};

type ImageGalleryProps = {
  imageList: ImageItem[];
  openModal: (image: ImageItem) => void;
};

const ImageGallery: React.FC<ImageGalleryProps> = ({ imageList, openModal }) => {
  const imageClick = (event: React.MouseEvent<HTMLUListElement>) => {
    const imgItem = (event.target as HTMLElement).closest('li');
    if (imgItem) {
      const imgID = imgItem.dataset.id;
      const clickedImageItem = imageList.find(image => image.id === imgID);
      if (clickedImageItem) {
        openModal(clickedImageItem);
      }
    }
  };

  return (
    <section className={css.containerGallery}>
      {imageList.length > 0 && (
        <ul className={css.gallery} onClick={imageClick}>
          {imageList.map(img => (
            <li className={css.galleryItem} key={img.id} data-id={img.id}>
              <ImageCard imageItem={img} />
            </li>
          ))}
        </ul>
      )}
    </section>
  );
};

export default ImageGallery;
