import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { scroller } from 'react-scroll';
import PropTypes from 'prop-types';
import { fetchReviewsByID } from '../services/movies-api';
import ReviewList from '../components/ReviewList/ReviewList';
import PageHeading from '../components/PageHeading/PageHeading';
import ErrorNotification from '../components/ErrorNotification/ErrorNotification';

export default function Reviews({ showLoader }) {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const hanldeReviewData = data => {
      return data.results;
    };

    showLoader(true);

    fetchReviewsByID(movieId)
      .then(hanldeReviewData)
      .then(reviews => {
        if (reviews.length === 0) {
          setError(
            'Sorry, no reviews for this movie on TheMovieDB. You may be the first to write your review!',
          );
        }

        setReviews(reviews);
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
      <PageHeading text="Reviews" />

      {error && <ErrorNotification errorMessage={error} />}

      {reviews && <ReviewList reviews={reviews} />}
    </>
  );
}

Reviews.propTypes = {
  showLoader: PropTypes.func.isRequired,
};
