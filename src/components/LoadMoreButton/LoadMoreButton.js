import PropTypes from 'prop-types';
import styles from './LoadMoreButton.module.css';

export default function LoadMoreButton({ onClick, loading, children }) {
  const handleClick = () => {
    if (loading) return;

    onClick();
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className={loading ? styles.ButtonLoading : styles.Button}
    >
      <span className={styles.ButtonText}>{children}</span>
    </button>
  );
}

LoadMoreButton.defaultProps = {
  loading: false,
};

LoadMoreButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  loading: PropTypes.bool,
  children: PropTypes.node.isRequired,
};
