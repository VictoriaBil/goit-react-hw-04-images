import { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Searchbar } from './Searchbar/Searchbar';
import { fetchPictures } from '../API/Api';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import { Loader } from './Loader/Loader';
import { Modal } from './Modal/Modal';
import css from './App.module.css';

export function App() {
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [pictures, setPictures] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [totalImages, setTotalImages] = useState(0);
  const [largeImageUrl, setLargeImageUrl] = useState('');
  const [error, setError] = useState('');
  const [showModal, setShowModal] = useState(false);

  const getLargeImgUrl = imgUrl => {
    setLargeImageUrl(imgUrl);
    toggleModal();
  };

  const handleLoadMore = () => {
    setPage(prevState => prevState + 1);
  };

  const toggleModal = () => {
    setShowModal(prevState => !prevState);
  };

  const searchResult = value => {
    if (value === '') {
      toast.warning('Please write something', {
        position: 'top-center',
        autoClose: 2000,
      });
    } else {
      setPage(1);
      setQuery(value);
      setPictures([]);
    }
  };

  useEffect(() => {
    async function getImages() {
      if (query === '') {
        return;
      }

      setIsLoading(true);

      try {
        const data = await fetchPictures(query, page);

        if (data.hits.length) {
          setPictures(prevPictures => [...prevPictures, ...data.hits]);
          setTotalImages(data.totalHits);
          setIsLoading(false);
        } else {
          setError(
            toast.error(
              "Sorry we can't find anything for your request. Please enter another request",
              { position: 'top-center', autoClose: 2000 }
            )
          );
        }
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    }

    getImages();
  }, [query, page]);

  const totalPage = pictures.length / totalImages;

  return (
    <div className={css.Container}>
      <div className={css.App}>
        <Searchbar onSubmit={searchResult} />
        {isLoading && <Loader />}
        {showModal && <Modal imgUrl={largeImageUrl} onClose={toggleModal} />}
        <ImageGallery pictures={pictures} onClick={getLargeImgUrl} />
        {totalPage < 1 && !isLoading && <Button onClick={handleLoadMore} />}
        <ToastContainer />
      </div>
    </div>
  );
}
