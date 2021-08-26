import PropTypes from 'prop-types';
import styles from './BackButton.module.css';

export default function BackButton({ onGoBack }) {
  return (
    <button type="button" className={styles.BackButton} onClick={onGoBack}>
      <span className={styles.BackButtonArrow}>&#8617;</span> Go back
    </button>
  );
}

BackButton.propTypes = {
  onGoBack: PropTypes.func.isRequired,
};
