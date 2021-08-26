import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { scroller } from 'react-scroll';
import PropTypes from 'prop-types';
import { fetchCreditsByID } from '../services/movies-api';
import ActorsList from '../components/ActorsList/ActorsList';
import PageHeading from '../components/PageHeading/PageHeading';
import ErrorNotification from '../components/ErrorNotification/ErrorNotification';

export default function Cast({ showLoader }) {
  const { movieId } = useParams();
  const [actors, setActors] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const hanldeCastData = data => {
      return data.cast;
    };

    showLoader(true);

    fetchCreditsByID(movieId)
      .then(hanldeCastData)
      .then(actors => {
        if (actors.length === 0) {
          setError('Sorry, no casts for this movie on TheMovieDB');
        }

        setActors(actors);
      })
      .then(() =>
        scroller.scrollTo('scroll-to-element', {
          duration: 800,
          delay: 0,
          smooth: 'easeInOutQuart',
        }),
      )
      .catch(error =>
        setError(`Sorry, something went wrong. Server responded with ${error}`),
      )
      .finally(() => showLoader(false));
  }, [movieId, showLoader]);

  return (
    <>
      <PageHeading text="Casting" />

      {error && <ErrorNotification errorMessage={error} />}

      {actors && <ActorsList actors={actors} />}
    </>
  );
}

Cast.propTypes = {
  showLoader: PropTypes.func.isRequired,
};
