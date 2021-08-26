import PropTypes from 'prop-types';
import styles from './ControlsPanel.module.css';

export default function ControlsPanel({ children }) {
  return children ? (
    <div className={styles.ControlsPanel}>{children}</div>
  ) : null;
}

ControlsPanel.propTypes = {
  children: PropTypes.node,
};
