import PropTypes from 'prop-types';
import ControlsPanel from '../ControlsPanel/ControlsPanel';
import styles from './PageHeading.module.css';

export default function PageHeading({ text, children }) {
  return (
    <div>
      <h1 className={styles.title}>{text}</h1>
      <ControlsPanel>{children}</ControlsPanel>
    </div>
  );
}

PageHeading.defaultProps = {
  text: '',
};

PageHeading.propTypes = {
  text: PropTypes.string,
  children: PropTypes.node,
};
