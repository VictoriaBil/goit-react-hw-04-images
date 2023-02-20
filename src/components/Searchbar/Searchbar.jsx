import { useState } from 'react';
import PropTypes from 'prop-types';
import { AiOutlineSearch } from 'react-icons/ai';
import css from './Searchbar.module.css';

export function Searchbar({ onSubmit }) {
  const [search, setSearch] = useState('');

  function searchResult(event) {
    setSearch(event.currentTarget.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    onSubmit(search.trim());
    setSearch('');
  }

  return (
    <header className={css.searchbar}>
      <form className={css.searchForm} onSubmit={handleSubmit}>
        <button type="submit" className={css.searchFormButton}>
          <AiOutlineSearch size="35px" />
          <span className={css.searchFormButtonLabel}>Search</span>
        </button>

        <input
          className={css.searchFormInput}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          onChange={searchResult}
        />
      </form>
    </header>
  );
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
