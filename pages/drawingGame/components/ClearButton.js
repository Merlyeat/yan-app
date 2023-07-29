import styles from './ClearButton.module.css';

const ClearButton = ({ onClick }) => {
  return (
    <button className={`${styles.btn} ${styles.btn_red}`} onClick={onClick}>
      Clear
    </button>
  );
};

export default ClearButton;