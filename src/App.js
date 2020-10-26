import { useReducer, useState } from 'react';
import Todo from './components/Todo';
import TodoList from './components/TodoList';

import './App.css';

const ACTIONS = {
  ADD_TODO: 'add-todo',
};

const reducer = (todos, { type, payload }) => {
  switch (type) {
    case ACTIONS.ADD_TODO:
      return [...todos, newTodo(payload.name)];
    default:
      throw new Error();
  }
};

const newTodo = (name) => ({ id: Date.now(), name, complete: false });

const App = () => {
  const [todos, dispatch] = useReducer(reducer, []);
  const [name, setName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch({ type: ACTIONS.ADD_TODO, payload: { name } });
    setName('');
  };

  return (
    <div className="App">
      <TodoList>
        {todos.length > 0 &&
          todos.map((todo) => <Todo key={todo.id} todo={todo} />)}
        <li>
          <form onSubmit={handleSubmit}>
            <label name="name">
              <input
                onChange={({ target }) => setName(target.value)}
                value={name}
                type="text"
              />
            </label>
          </form>
        </li>
      </TodoList>
    </div>
  );
};

export default App;
