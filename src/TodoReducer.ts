import { TodoActionType, TodosType } from "./TodoTypes";

export const reducer = (state: TodosType, action: TodoActionType) => {
  switch (action.type) {
    case "LOAD_TODOS": {
      return { ...state, todos: action.payload.todos };
    }

    case "ADD_TODO": {
      //handle empty title - throw an error
      if (!action.payload.title) return state;

      const newTodos = [
        ...state.todos,
        { id: action.payload.id, title: action.payload.title, edit: false },
      ];

      return { ...state, todos: newTodos };
    }

    case "DELETE_TODO": {
      const newTodos = state.todos.filter(
        (todo) => todo.id !== action.payload.id
      );

      return { ...state, todos: newTodos };
    }

    case "EDIT_TODO": {
      const newTodos = state.todos.map((todo) => {
        const newTodo = { ...todo };
        newTodo.edit = todo.id === action.payload.id ? true : false;
        return newTodo;
      });

      return { todos: newTodos, editTodo: action.payload.id };
    }

    case "UPDATE_TODO": {
      const newTodos = state.todos.map((todo) => {
        const inputValue = action.payload.value;
        const newTodo = { ...todo };

        if (todo.id === action.payload.id) newTodo.edit = false;
        if (todo.id === action.payload.id && !!inputValue)
          newTodo.title = inputValue;
        return newTodo;
      });

      return { ...state, todos: newTodos };
    }

    default:
      return state;
  }
};
