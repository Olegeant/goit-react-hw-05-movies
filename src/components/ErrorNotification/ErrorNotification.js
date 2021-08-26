import PropTypes from 'prop-types';
import styles from './ErrorNotification.module.css';

export default function ErrorNotification({ errorMessage }) {
  return (
    <div role="alert" className={styles.Error}>
      <p className={styles.errorMessage}>{errorMessage}</p>
    </div>
  );
}

ErrorNotification.propTypes = {
  errorMessage: PropTypes.string.isRequired,
};
