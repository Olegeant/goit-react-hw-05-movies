import PropTypes from 'prop-types';
import ActorsListItem from '../ActorsListItem/ActorsListItem';
import styles from './ActorsList.module.css';

export default function ActorsList({ actors }) {
  return (
    <ul className={styles.ActorsList}>
      {actors &&
        actors.map(actor => (
          <ActorsListItem key={actor.credit_id} actor={actor} />
        ))}
    </ul>
  );
}

ActorsList.propTypes = {
  actors: PropTypes.arrayOf(
    PropTypes.shape({
      credit_id: PropTypes.string.isRequired,
    }),
  ),
};
