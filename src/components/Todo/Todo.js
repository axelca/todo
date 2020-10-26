import { useState } from 'react';
import { ACTIONS } from '../../App';
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
      <input value={clicked} type="checkbox" onChange={() => toggleRadio(id)} />
      {name}
      <button
        onClick={() =>
          dispatch({
            type: ACTIONS.DELETE_TODO,
            payload: { id },
          })
        }
      >
        X
      </button>
    </li>
  );
};

export default Todo;
