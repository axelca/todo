import styles from './Empty.module.css';

const Empty = () => (
  <div className={styles.Empty}>
    <span className={styles.EmptyMessage}>No Todos :(</span>
  </div>
);

export default Empty;
