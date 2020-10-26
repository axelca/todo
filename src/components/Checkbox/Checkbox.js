import styles from './Checkbox.module.css';

const Checkbox = (props) => {
  const { disabled, clicked, toggleRadio, id } = props;
  return (
    <label className={styles.Checkbox}>
      <input
        type="checkbox"
        disabled={disabled}
        value={clicked}
        onChange={() => toggleRadio(id)}
      />
      <span></span>
    </label>
  );
};

export default Checkbox;
