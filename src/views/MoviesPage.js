import { useState, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { animateScroll as scroll } from 'react-scroll';
import PropTypes from 'prop-types';
import { fetchMovieByKeyword } from '../services/movies-api';
import PageHeading from '../components/PageHeading/PageHeading';
import SearchBar from '../components/SearchBar/SearchBar';
import MovieList from '../components/MovieList/MovieList';
import LoadMoreButton from '../components/LoadMoreButton/LoadMoreButton';
import ErrorNotification from '../components/ErrorNotification/ErrorNotification';

export default function MoviesPage({ isLoading, showLoader }) {
  const history = useHistory();
  const location = useLocation();
  const [moviesFound, setMoviesFound] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [pagesDisplayed, setPagesDisplayed] = useState(1);
  const [error, setError] = useState(null);

  useEffect(() => {
    const handleMoviesData = data =>
      data.results.map(({ id, title }) => ({ id, title }));

    const newQuery = new URLSearchParams(location.search).get('query');
    setSearchQuery(newQuery);

    if (!newQuery) return;

    showLoader(true);

    fetchMovieByKeyword(newQuery, pagesDisplayed)
      .then(handleMoviesData)
      .then(newMoviesFound => {
        setMoviesFound(moviesFound => {
          if (newMoviesFound.length === 0 && !moviesFound) {
            setError(
              `No movies on your request "${newQuery}". Try another query`,
            );
            return null;
          }

          if (newMoviesFound.length === 0) {
            setError(`No more movies on your request "${newQuery}"`);
            return moviesFound;
          }

          return [...(moviesFound || []), ...newMoviesFound];
        });
      })
      .catch(error =>
        setError(`Sorry, something went wrong. Server responded with ${error}`),
      )
      .finally(() => {
        showLoader(false);
        scroll.scrollToBottom();
      });
  }, [pagesDisplayed, location.search, showLoader]);

  const onMovieSearch = newQuery => {
    resetStates();
    history.push({ ...location, search: `query=${newQuery}` });
  };

  const resetStates = () => {
    setPagesDisplayed(1);
    setMoviesFound(null);
    setError(null);
  };

  const addPage = () => {
    setPagesDisplayed(pagesDisplayed => pagesDisplayed + 1);
  };

  return (
    <>
      <PageHeading
        text={
          searchQuery
            ? `Search results for "${searchQuery}"`
            : 'Type to find movie'
        }
      >
        <SearchBar onSearch={onMovieSearch} onError={setError} />
      </PageHeading>

      {moviesFound?.length > 0 && <MovieList movies={moviesFound} />}

      {error && <ErrorNotification errorMessage={error} />}

      {moviesFound?.length > 0 && (
        <LoadMoreButton onClick={addPage} loading={isLoading}>
          Load more...
        </LoadMoreButton>
      )}
    </>
  );
}

MoviesPage.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  showLoader: PropTypes.func.isRequired,
};
