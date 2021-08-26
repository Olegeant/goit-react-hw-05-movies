import PropTypes from 'prop-types';
import noPoster from '../../images/No_poster.jpg';
import styles from './MovieDetails.module.css';

const BASE_IMG_URL = 'https://image.tmdb.org/t/p/w500/';

export default function MovieDetails({
  movieData: {
    poster_path,
    title,
    vote_average,
    overview,
    genres,
    release_date,
  },
}) {
  return (
    <div className={styles.MovieDetailsContainer}>
      <div className={styles.MoviePosterContainer}>
        <img
          src={poster_path ? `${BASE_IMG_URL}${poster_path}` : noPoster}
          alt={title}
        ></img>
      </div>

      <div className={styles.MovieInfoContainer}>
        <h2>
          {title}
          {release_date && <span> ({release_date.slice(0, 4)})</span>}
        </h2>
        <p>{`User Score: ${vote_average}`}</p>
        <h3>Overview</h3>
        <p>{overview || 'No overview available'}</p>
        <h3>Genres</h3>
        <p>{genres || 'No genres defined'}</p>
      </div>
    </div>
  );
}

MovieDetails.defaultProps = {
  movieData: {
    poster_path: noPoster,
    title: 'No movie title',
    vote_average: 0,
    overview: 'No overview available',
    genres: '',
    release_date: 'no release date',
  },
};

MovieDetails.propTypes = {
  movieData: PropTypes.shape({
    poster_path: PropTypes.string,
    title: PropTypes.string,
    vote_average: PropTypes.number,
    overview: PropTypes.string,
    genres: PropTypes.string,
    release_date: PropTypes.string,
  }),
};
