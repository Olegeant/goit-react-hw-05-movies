import styles from './TMDBLogo.module.css';

export default function TMDBLogo() {
  return (
    <a
      href="https://www.themoviedb.org/"
      className={styles.Logo}
      target="_blank"
      rel="noreferrer noopener"
    >
      <span className="visually-hidden">link to TheMovieDB homepage</span>
    </a>
  );
}
