import PropTypes from 'prop-types';
import ReviewListItem from '../ReviewListItem/ReviewListItem';
import styles from './ReviewList.module.css';

export default function ReviewList({ reviews }) {
  return (
    <ul className={styles.ReviewList}>
      {reviews &&
        reviews.map(review => (
          <ReviewListItem key={review.id} review={review} />
        ))}
    </ul>
  );
}

ReviewList.propTypes = {
  reviews: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
    }),
  ),
};
