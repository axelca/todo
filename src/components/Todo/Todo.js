import { useState } from 'react';
import { ACTIONS } from '../../App';
import Checkbox from '../Checkbox';
import cross from '../../images/cross.svg';
import styles from './Todo.module.css';

const Todo = ({ todo, dispatch }) => {
  const [clicked, setClicked] = useState(false);
  const { name, id, complete } = todo;

  const toggleRadio = (id) => {
    setClicked((prevClicked) => !prevClicked);
    dispatch({ type: ACTIONS.TOGGLE_COMPLETE, payload: { id } });
  };

  return (
    <li className={`${styles.Todo} ${complete ? styles.complete : undefined}`}>
      <Checkbox clicked={clicked} onChange={() => toggleRadio(id)} />
      <span className={styles.TodoName}>{name}</span>
      <button
        className={styles.deleteTodo}
        onClick={() =>
          dispatch({
            type: ACTIONS.DELETE_TODO,
            payload: { id },
          })
        }
      >
        <img src={cross} alt="Delete Todo" />
      </button>
    </li>
  );
};

export default Todo;
