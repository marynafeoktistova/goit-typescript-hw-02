import { getImagesUnplash } from '../../images-api';
import { useEffect, useState } from 'react';
import Modal from 'react-modal';
import toast, { Toaster } from 'react-hot-toast';
import SearchBar from '../SearchBar/SearchBar';
import ImageGallery from '../ImageGallery/ImageGallery';
import LoadMoreBtn from '../LoadMoreBtn/LoadMoreBtn';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import ImageModal from '../ImageModal/ImageModal';
import css from './App.module.css';
import Loader from '../Loader/Loader';

function App() {
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState('');
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  useEffect(() => {
    Modal.setAppElement('#root');
  }, []);

  const handleSearch = async searchQuery => {
    try {
      setLoading(true);
      setIsSearching(true);
      setImages([]);
      setPage(1);
      setSearch(searchQuery);

      const dataImg = await getImagesUnplash(searchQuery, 1);
      if (!dataImg.total) {
        toast('Sorry, we have not found the photos for your request.', {
          duration: 5000,
        });
        setError(true);
      } else {
        toast.success(`Wow! We found ${dataImg.total} pictures`);
        setTotalPages(dataImg.total_pages);
        setImages(dataImg.results);
        setError(false);
      }
    } catch (error) {
      console.error('Search error:', error);
      setError(true);
    } finally {
      setLoading(false);
      setIsSearching(false);
    }
  };

  const handleLoadMore = async () => {
    try {
      setLoadingMore(true);
      const nextPage = page + 1;
      const dataImages = await getImagesUnplash(search, nextPage);
      setImages(prevImages => {
        return [...prevImages, ...dataImages.results];
      });
      setPage(nextPage);
    } catch {
      setError(true);
    } finally {
      setLoadingMore(false);
    }
  };

  const isVisible = () => {
    return totalPages !== 0 && totalPages !== page && !loadingMore;
  };

  const openModal = image => {
    setSelectedImage(image);
    setModalIsOpen(true);
  };
  const closeModal = () => setModalIsOpen(false);

  return (
    <>
      <SearchBar onSubmit={handleSearch} />
      <Toaster
        position='top-right'
        reverseOrder={false}
        toastOptions={{
          className: css.toastTextCenter,
        }}
      />
      {loading && <Loader />}
      {error && <ErrorMessage />}
      <ImageGallery imageList={images} openModal={openModal} />
      {!loadingMore && !isSearching && <LoadMoreBtn onClick={handleLoadMore} isVisible={isVisible} />}
      {loadingMore && <Loader />}
      <ImageModal isOpen={modalIsOpen} image={selectedImage} onCloseModal={closeModal} />
    </>
  );
}

export default App;
