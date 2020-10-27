import { useReducer, useState, useRef } from 'react';
import Todo from './components/Todo';
import Empty from './components/Empty';
import TodoList from './components/TodoList';
import Checkbox from './components/Checkbox';
import { ACTIONS, reducer } from './reducer';
import styles from './App.module.css';
import addNewTodoIcon from './images/addNewTodoIcon.svg';

const App = () => {
  const [todos, dispatch] = useReducer(reducer, []);
  const [name, setName] = useState('');
  const [currentlyAdding, setCurrentlyAdding] = useState(false);
  const newTodo = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch({ type: ACTIONS.ADD_TODO, payload: { name } });
    setName('');
  };

  const addNewTodo = async () => {
    await setCurrentlyAdding((prevValue) => !prevValue);
    newTodo.current.focus();
  };

  return (
    <div className={styles.App}>
      <h1 className={styles.heading}>Todos</h1>
      <main className={styles.main}>
        <TodoList>
          {todos.length > 0 &&
            todos.map((todo) => (
              <Todo key={todo.id} dispatch={dispatch} todo={todo} />
            ))}
          <li className={!currentlyAdding ? styles.hidden : undefined}>
            <form onSubmit={handleSubmit} className={styles.NewTodo}>
              <Checkbox disabled />
              <label name="name">
                <input
                  onInput={(e) => setName(e.target.value)}
                  onBlur={() => setCurrentlyAdding((prevValue) => !prevValue)}
                  pattern="[A-Öa-ö0-9 ]+"
                  minLength={1}
                  maxLength={30}
                  value={name}
                  ref={newTodo}
                  required="required"
                  type="text"
                />
              </label>
            </form>
          </li>
        </TodoList>
        {todos.length < 1 && !currentlyAdding && <Empty />}
      </main>
      <aside className={styles.aside}>
        <button className={styles.AddNewTodo} onClick={addNewTodo}>
          <img src={addNewTodoIcon} alt="Add new todo" />
          Add new todo
        </button>
      </aside>
    </div>
  );
};

export default App;
