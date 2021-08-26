import { useState, useEffect, useCallback } from 'react';
import { animateScroll as scroll } from 'react-scroll';
import { useHistory, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import { FetchTrendingMovies } from '../services/movies-api';
import PageHeading from '../components/PageHeading/PageHeading';
import MovieList from '../components/MovieList/MovieList';
import TrendingOption from '../components/TrendingOption/TrendingOption';
import LoadMoreButton from '../components/LoadMoreButton/LoadMoreButton';
import ErrorNotification from '../components/ErrorNotification/ErrorNotification';

export default function HomePage({ isLoading, showLoader }) {
  const [trendingMovies, setTrendingMovies] = useState(null);
  const [pagesDisplayed, setPagesDisplayed] = useState(1);
  const [trendingPeriod, SetTrendingPeriod] = useState(null);
  const [error, setError] = useState(null);
  const history = useHistory();
  const location = useLocation();

  useEffect(() => {
    const handleMoviesData = data =>
      data.results.map(({ id, title }) => ({ id, title }));

    if (!trendingPeriod) return;

    setError(null);
    showLoader(true);

    FetchTrendingMovies(pagesDisplayed, trendingPeriod)
      .then(handleMoviesData)
      .then(newMovieList => {
        if (newMovieList.length === 0) {
          setError(`No more trending movies provided`);
          return;
        }
        setTrendingMovies(movieList => [...(movieList || []), ...newMovieList]);
      })
      .catch(error =>
        setError(`Sorry, something went wrong. Server responded with ${error}`),
      )
      .finally(() => {
        showLoader(false);
        scroll.scrollToBottom();
      });
  }, [pagesDisplayed, trendingPeriod, showLoader]);

  useEffect(() => {
    let newPeriod = new URLSearchParams(location.search).get('trending');
    if (!['day', 'week'].includes(newPeriod)) newPeriod = 'day';

    resetStates();

    SetTrendingPeriod(newPeriod);
  }, [location.search]);

  const onOptionChange = useCallback(
    newOption => {
      history.push(`/?trending=${newOption}`);
    },
    [history],
  );

  const addPage = () => {
    setPagesDisplayed(pagesDisplayed => pagesDisplayed + 1);
  };

  const resetStates = () => {
    setTrendingMovies(null);
    setPagesDisplayed(1);
    setError(null);
  };

  return (
    <>
      <PageHeading
        text={`Trending ${trendingPeriod === 'day' ? 'today' : 'this week'}`}
      >
        {<TrendingOption onOptionChange={onOptionChange} />}
      </PageHeading>

      {trendingMovies?.length > 0 && <MovieList movies={trendingMovies} />}

      {error && <ErrorNotification errorMessage={error} />}

      {trendingMovies?.length > 0 && (
        <LoadMoreButton onClick={addPage} loading={isLoading}>
          Load more...
        </LoadMoreButton>
      )}
    </>
  );
}

HomePage.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  showLoader: PropTypes.func.isRequired,
};
