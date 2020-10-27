export const ACTIONS = {
  ADD_TODO: 'add-todo',
  DELETE_TODO: 'delete-todo',
  TOGGLE_COMPLETE: 'toggle-complete',
};

export const newTodo = (name) => ({ id: Date.now(), name, complete: false });

export const reducer = (todos, { type, payload }) => {
  switch (type) {
    case ACTIONS.ADD_TODO:
      return [...todos, newTodo(payload.name)];

    case ACTIONS.DELETE_TODO:
      return todos.filter(({ id }) => id !== payload.id);

    case ACTIONS.TOGGLE_COMPLETE:
      return todos.map((todo) => {
        if (todo.id === payload.id) {
          return { ...todo, complete: !todo.complete };
        }
        return { ...todo };
      });

    default:
      throw new Error();
  }
};
