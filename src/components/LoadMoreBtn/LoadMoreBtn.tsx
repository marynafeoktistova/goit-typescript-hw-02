import React from 'react';
import css from './LoadMoreBtn.module.css';

interface LoadMoreBtnProps {
  onClick: () => void;
  isVisible: () => boolean;
}

const LoadMoreBtn: React.FC<LoadMoreBtnProps> = ({ onClick, isVisible }) => {
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
