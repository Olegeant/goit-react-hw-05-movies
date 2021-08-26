import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import styles from './TrendingOption.module.css';

export default function TrendingOption({ onOptionChange }) {
  const location = useLocation();
  const [period, setPeriod] = useState('');

  useEffect(() => {
    let newPeriod = new URLSearchParams(location.search).get('trending');
    if (!['day', 'week'].includes(newPeriod)) newPeriod = 'day';

    setPeriod(newPeriod);
    onOptionChange(newPeriod);
  }, [location.search, onOptionChange]);

  const handleOptionChange = evt => {
    const newPeriod = evt.target.value;

    setPeriod(newPeriod);
    onOptionChange(newPeriod);
  };

  return (
    <label className={styles.OptionLable}>
      Select trending period{' '}
      <select
        className={styles.Options}
        name="trendingOption"
        onChange={handleOptionChange}
        value={period}
      >
        <option value="day">Dayly</option>
        <option value="week">Weekly</option>
      </select>
    </label>
  );
}

TrendingOption.propTypes = {
  onOptionChange: PropTypes.func.isRequired,
};
