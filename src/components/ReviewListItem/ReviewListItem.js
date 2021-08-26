import PropTypes from 'prop-types';

export default function ReviewListItem({ review }) {
  return (
    <li>
      <h3>{review.author}</h3>
      <p>{review.content}</p>
    </li>
  );
}

ReviewListItem.propTypes = {
  review: PropTypes.shape({
    author: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
  }),
};
