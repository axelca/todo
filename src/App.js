import { useReducer, useState, useRef } from 'react';
import Todo from './components/Todo';
import Empty from './components/Empty';
import TodoList from './components/TodoList';
import styles from './App.module.css';

export const ACTIONS = {
  ADD_TODO: 'add-todo',
  DELETE_TODO: 'delete-todo',
  TOGGLE_COMPLETE: 'toggle-complete',
};

const reducer = (todos, { type, payload }) => {
  switch (type) {
    case ACTIONS.ADD_TODO:
      return [...todos, newTodo(payload.name)];

    case ACTIONS.DELETE_TODO:
      return todos.filter(({ id }) => id !== payload.id);

    case ACTIONS.TOGGLE_COMPLETE:
      return todos.map((todo) => {
        console.log(payload);
        if (todo.id === payload.id) {
          return { ...todo, complete: !todo.complete };
        }
        return { ...todo };
      });

    default:
      throw new Error();
  }
};

const newTodo = (name) => ({ id: Date.now(), name, complete: false });

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
    await setCurrentlyAdding((prevCurrentlyAdding) => !prevCurrentlyAdding);
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
          <li className={currentlyAdding ? styles.hidden : undefined}>
            <form onSubmit={handleSubmit} className={styles.NewTodo}>
              <label name="name">
                <input type="checkbox" disabled />
                <input
                  onInput={(e) => setName(e.target.value)}
                  onBlur={() => setCurrentlyAdding((prevValue) => !prevValue)}
                  pattern="[A-Öa-ö0-9 ]+"
                  minLength={1}
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
        <button onClick={addNewTodo}>Add new todo</button>
      </aside>
    </div>
  );
};

export default App;
