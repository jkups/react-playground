import { StateType, TodoType, TodoActionType } from "./TodoTypes";

export const reducer = (state: StateType, action: TodoActionType) => {
  switch (action.type) {
    case "ADD_TODO": {
      let newTodos: TodoType[] = [];

      if (action.payload.title) {
        newTodos = [
          ...state.todos,
          { id: action.payload.id, title: action.payload.title, edit: false },
        ];
      }
      //handle empty title - throw an error
      if (!newTodos.length) return state;
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
        todo.edit = todo.id === action.payload.id ? true : false;
        return todo;
      });

      return { todos: newTodos, editTodo: action.payload.id };
    }

    case "UPDATE_TODO": {
      const newTodos = state.todos.map((todo) => {
        const inputValue = action.payload.value;
        if (todo.id === action.payload.id) todo.edit = false;
        if (todo.id === action.payload.id && !!inputValue)
          todo.title = inputValue;
        return todo;
      });

      return { ...state, todos: newTodos };
    }

    default:
      return state;
  }
};
