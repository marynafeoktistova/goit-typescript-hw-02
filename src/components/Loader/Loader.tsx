import { FC } from 'react';
import { ClipLoader } from 'react-spinners';
import css from './Loader.module.css';

const Loader: FC = () => {
  return (
    <div className={css.container}>
      <ClipLoader color='#5c6297' loading={true} size={80} />
    </div>
  );
};

export default Loader;
