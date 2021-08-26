import { useState } from 'react';
import PropTypes from 'prop-types';

import styles from './SearchBar.module.css';

export default function Searchbar({ onSearch, onError }) {
  const [searchQuery, setSearchQuery] = useState('');

  const handleQueryChange = evt => {
    setSearchQuery(evt.target.value.toLowerCase());
  };

  const handleSubmit = evt => {
    evt.preventDefault();

    onError(null);

    const newQuery = searchQuery.trim();

    if (!newQuery) {
      onSearch('');
      onError('Empty field. Enter the search query to search for movies.');
      return;
    }

    onSearch(newQuery);
    setSearchQuery('');
  };

  return (
    <form className={styles.SearchForm} onSubmit={handleSubmit}>
      <input
        className={styles['SearchForm-input']}
        type="text"
        autoComplete="off"
        autoFocus
        placeholder="Search movies"
        value={searchQuery}
        onChange={handleQueryChange}
      />
      <button type="submit" className={styles['SearchForm-button']}>
        <span className={styles['SearchForm-button-label']}>Search</span>
      </button>
    </form>
  );
}

Searchbar.propTypes = {
  onSearch: PropTypes.func.isRequired,
  onError: PropTypes.func.isRequired,
};
