import css from './ImageCard.module.css';
import { ImageType } from '../App/App.types';

interface Props {
  imageItem: ImageType;
}

const ImageCard: React.FC<Props> = ({ imageItem }) => {
  const {
    alt_description,
    likes,
    urls: { small },
    user: {
      name,
      social: { portfolio_url },
    },
  } = imageItem;

  return (
    <div className={css.galleryThumb}>
      <img className={css.galleryImage} src={small} alt={alt_description || 'Image'} width='360' />
      <div className={css.thumbBlock}>
        <p className={css.textPhoto}>
          ✍️ <strong>Author</strong>
          <br />
          <a href={portfolio_url} target='_blank' rel='noopener noreferrer'>
            {name}
          </a>
        </p>
        <p className={css.textPhoto}>
          ❤️ <strong>Likes: </strong>
          {likes}
        </p>
      </div>
    </div>
  );
};

export default ImageCard;
