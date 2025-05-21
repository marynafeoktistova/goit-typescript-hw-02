import css from './LoadMoreBtn.module.css';

const LoadMoreBtn = ({ onClick, isVisible }) => {
  return (
    <div className={css.btnThumb}>
      {isVisible() && (
        <button className={css.btnLoad} onClick={onClick}>
          Load More
        </button>
      )}
    </div>
  );
};

export default LoadMoreBtn;
