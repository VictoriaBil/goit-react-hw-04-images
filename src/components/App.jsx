import { useState, useEffect } from 'react';
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
      alert('Please write something');
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
        setPictures([]);
        const data = await fetchPictures(query, page, totalImages);

        if (data.hits.length) {
          setPictures(prevPictures => [...prevPictures, ...data.hits]);
          setTotalImages(data.totalHits);
          setIsLoading(false);
        } else {
          setError(
            "Sorry we can't find anything for your request. Please enter another request"
          );
        }
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    }

    getImages();
  }, [query, page, totalImages]);

  const totalPage = pictures.length / totalImages;

  return (
    <div className={css.Container}>
      <div className={css.App}>
        <Searchbar onSubmit={searchResult} />
        {error && <p>Something went wrong. Please refresh the page</p>}
        {isLoading && <Loader />}
        {showModal && <Modal imgUrl={largeImageUrl} onClose={toggleModal} />}
        <ImageGallery pictures={pictures} onClick={getLargeImgUrl} />
        {totalPage < 1 && <Button onClick={handleLoadMore} />}
      </div>
    </div>
  );
}
