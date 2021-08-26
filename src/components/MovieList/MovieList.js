import PropTypes from 'prop-types';
import MovieListItem from '../MovieListItem/MovieListItem';
import styles from './MovieList.module.css';

export default function MovieList({ movies }) {
  return (
    <ul className={styles.MovieList}>
      {movies &&
        movies.map(movie => <MovieListItem key={movie.id} movie={movie} />)}
    </ul>
  );
}

MovieList.propTypes = {
  movies: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
    }),
  ),
};
