import PropTypes from 'prop-types';
import { Link, useLocation } from 'react-router-dom';
import styles from './MovieListItem.module.css';

export default function MovieListItem({ movie: { id, title } }) {
  const location = useLocation();

  return (
    <li className={styles.MovieListItem}>
      <Link to={{ pathname: `/movies/${id}`, state: { from: location } }}>
        {title}
      </Link>
    </li>
  );
}

MovieListItem.propTypes = {
  movie: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
  }),
};
