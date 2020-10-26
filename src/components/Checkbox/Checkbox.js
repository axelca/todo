import styles from './Checkbox.module.css';

const Checkbox = (props) => {
  const { disabled, clicked } = props;

  return (
    <label className={styles.Checkbox}>
      <input type="checkbox" disabled={disabled} value={clicked} />
      <span></span>
    </label>
  );
};

export default Checkbox;
