import { useEffect } from 'react';
import PropTypes from 'prop-types';
import css from './Modal.module.css';

export function Modal({ onClose, imgUrl }) {
  useEffect(() => {
    const handleKeyDown = e => {
      if (e.code === 'Escape') {
        onClose();
      }
    };
    if (imgUrl) {
      window.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [imgUrl, onClose]);

  function handleBackdropClick(e) {
    if (e.currentTarget === e.target) {
      onClose();
    }
  }

  return (
    <div className={css.overlay} onClick={handleBackdropClick}>
      <div className={css.modal}>
        <img src={imgUrl} alt="" />
      </div>
    </div>
  );
}

Modal.proptTypes = {
  onClose: PropTypes.func.isRequired,
  imgUrl: PropTypes.string.isRequired,
};
