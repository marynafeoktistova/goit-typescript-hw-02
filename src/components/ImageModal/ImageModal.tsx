import Modal from 'react-modal';
import { RiCloseLine } from 'react-icons/ri';
import { format } from 'date-fns';
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';
import css from './ImageModal.module.css';
import { useEffect } from 'react';

type ImageModal = {
  isOpen: boolean;
  onCloseModal: () => void;
  image: {
    alt_description?: string | null;
    urls?: {
      regular?: string;
    };
    user: {
      name: string;
      social?: {
        portfolio_url?: string;
      };
      location?: string;
    };
    likes: number;
    description?: string;
    tags?: { title: string }[];
    created_at: string;
  } | null;
};

const formatDate = (dateString: string): string => {
  return format(new Date(dateString), 'MMMM dd yyyy');
};

const ImageModal: React.FC<ImageModal> = ({ isOpen, onCloseModal, image }) => {
  useEffect(() => {
    if (isOpen) {
      disableBodyScroll(document.body);
    } else {
      enableBodyScroll(document.body);
    }
  }, [isOpen]);

  return (
    <Modal overlayClassName={css.backdrop} className={css.modal} isOpen={isOpen} onRequestClose={onCloseModal}>
      <button className={css.closeButton} onClick={onCloseModal}>
        <RiCloseLine size='40' />
      </button>
      {image && (
        <div className={css.containerModal}>
          <div className={css.imgContainer}>
            {image.urls?.regular && <img className={css.image} src={image.urls.regular} alt={image.alt_description || 'Image'} />}
          </div>
          <div className={css.moreInform}>
            <p className={css.author}>
              Author:{' '}
              {image.user.social?.portfolio_url ? (
                <a className={css.linkAuthor} href={image.user.social.portfolio_url} target='_blank' rel='noopener noreferrer'>
                  {image.user.name}
                </a>
              ) : (
                'Unknown'
              )}
            </p>
            <p className={css.likes}>
              Likes: <span className={css.likesSpan}>{image.likes}</span>
            </p>
            {image.description && <p className={css.description}>{image.description}</p>}
            {image.tags && image.tags.length > 0 && (
              <ul className={css.tagsList}>
                {image.tags.map((tag, index) => (
                  <li className={css.tagItem} key={index}>
                    &#35;{tag.title}
                  </li>
                ))}
              </ul>
            )}
            <p className={css.created}>Created on: {formatDate(image.created_at)}</p>
            {image.user.location && <p className={css.location}>Location: {image.user.location}</p>}
          </div>
        </div>
      )}
    </Modal>
  );
};

export default ImageModal;
