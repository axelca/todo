import styles from './TodoList.module.css';

const TodoList = ({ children }) => (
  <ul className={styles.TodoList}>{children}</ul>
);

export default TodoList;
