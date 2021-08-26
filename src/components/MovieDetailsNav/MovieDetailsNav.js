import { NavLink, useRouteMatch, useLocation } from 'react-router-dom';
import styles from './MovieDetailsNav.module.css';

export default function MovieDetailsNav() {
  const { url } = useRouteMatch();
  const location = useLocation();

  return (
    <>
      <ul className={styles.MovieDetailsNavList}>
        <li className={styles.MovieDetailsNavListItem}>
          <NavLink
            to={{
              pathname: `${url}/cast`,
              state: {
                from: location.state?.from ?? '/',
              },
            }}
            className={styles.link}
            activeClassName={styles.activeLink}
          >
            Cast
          </NavLink>
        </li>
        <li className={styles.MovieDetailsNavListItem}>
          <NavLink
            to={{
              pathname: `${url}/reviews`,
              state: {
                from: location.state?.from ?? '/',
              },
            }}
            className={styles.link}
            activeClassName={styles.activeLink}
          >
            Reviews
          </NavLink>
        </li>
      </ul>
    </>
  );
}
