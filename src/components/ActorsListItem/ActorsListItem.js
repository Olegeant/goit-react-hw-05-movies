import PropTypes from 'prop-types';
import NoPhotoMale from '../../images/No_portrait_(male).svg';
import NoPhotoFemale from '../../images/No_portrait_(female).svg';
import styles from './ActorsListItem.module.css';

const BASE_IMG_URL = 'https://image.tmdb.org/t/p/w500/';

export default function ActorsListItem({
  actor: { profile_path, name, character, gender },
}) {
  const NoPhoto = gender === 1 ? NoPhotoFemale : NoPhotoMale;
  const actorPhoto = profile_path ? `${BASE_IMG_URL}${profile_path}` : NoPhoto;

  return (
    <li className={styles.Actor}>
      {
        <div className={styles.ActorImgContainer}>
          <img src={actorPhoto} alt={name} />
        </div>
      }
      <h3 className={styles.ActorName}>{name}</h3>
      {character && <p className={styles.ActorInfo}>as {character}</p>}
    </li>
  );
}

ActorsListItem.propTypes = {
  actor: PropTypes.shape({
    profile_path: PropTypes.string,
    name: PropTypes.string.isRequired,
    character: PropTypes.string.isRequired,
    gender: PropTypes.number,
  }),
};
