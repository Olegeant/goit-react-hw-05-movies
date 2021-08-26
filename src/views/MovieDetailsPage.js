import { useState, useEffect, lazy, Suspense } from 'react';
import {
  Route,
  useParams,
  useRouteMatch,
  useHistory,
  useLocation,
} from 'react-router-dom';
import { Element } from 'react-scroll';
import PropTypes from 'prop-types';
import { fetchMovieByID } from '../services/movies-api';
import PageHeading from '../components/PageHeading/PageHeading';
import MovieDetails from '../components/MovieDetails/MovieDetails';
import BackButton from '../components/BackButton/BackButton';
import MovieDetailsNav from '../components/MovieDetailsNav/MovieDetailsNav';
import Loader from '../components/Loader/Loader';
import ErrorNotification from '../components/ErrorNotification/ErrorNotification';

const Cast = lazy(() => import('./Cast.js' /* webpackChunkName: "cast" */));
const Reviews = lazy(() =>
  import('./Reviews.js' /* webpackChunkName: "reviews" */),
);

export default function MovieDetailsPage({ showLoader }) {
  const { movieId } = useParams();
  const { path } = useRouteMatch();
  const history = useHistory();
  const location = useLocation();
  const [movieData, setMovieData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const handleMovieData = data => {
      data.genres = data.genres.map(({ name }) => name).join(' | ');

      return data;
    };

    showLoader(true);

    fetchMovieByID(movieId)
      .then(handleMovieData)
      .then(setMovieData)
      .catch(error =>
        setError(`Sorry, something went wrong. Server responded with ${error}`),
      )
      .finally(() => showLoader(false));
  }, [movieId, showLoader]);

  const handleGoBack = () => {
    history.push(location.state?.from ?? '/');
  };

  return (
    <>
      <PageHeading
        text={
          movieData ? `Movie details - ${movieData.title}` : 'Movie details'
        }
      >
        <BackButton onGoBack={handleGoBack} />
      </PageHeading>

      {error && <ErrorNotification errorMessage={error} />}

      {movieData && <MovieDetails movieData={movieData} />}

      <hr />

      <Element name="scroll-to-element" />

      <h3>Additional information</h3>

      <MovieDetailsNav />

      <hr />

      <Suspense fallback={<Loader />}>
        <Route path={`${path}/cast`}>
          <Cast showLoader={showLoader} />
        </Route>

        <Route path={`${path}/reviews`}>
          <Reviews showLoader={showLoader} />
        </Route>
      </Suspense>
    </>
  );
}

MovieDetailsPage.propTypes = {
  showLoader: PropTypes.func.isRequired,
};
