import { TodoActionType, TodosStateType } from "./TodoTypes";

export const reducer = (state: TodosStateType, action: TodoActionType) => {
  switch (action.type) {
    case "LOAD_TODOS": {
      const newPresent = { ...state.present, todos: action.payload.todos };

      return {
        past: state.past,
        present: newPresent,
        future: state.future,
      };
    }

    case "ADD_TODO": {
      //handle empty title - throw an error
      if (!action.payload.title) return state;

      const newTodos = [
        ...state.present.todos,
        { id: action.payload.id, title: action.payload.title, edit: false },
      ];

      const newPresent = { ...state.present, todos: newTodos };

      return {
        past: [state.present, ...state.past],
        present: newPresent,
        future: state.future,
      };
    }

    case "DELETE_TODO": {
      const newTodos = state.present.todos.filter(
        (todo) => todo.id !== action.payload.id
      );

      const newPresent = { ...state.present, todos: newTodos };

      return {
        past: [state.present, ...state.past],
        present: newPresent,
        future: state.future,
      };
    }

    case "EDIT_TODO": {
      const newTodos = state.present.todos.map((todo) => {
        const newTodo = { ...todo };
        newTodo.edit = todo.id === action.payload.id ? true : false;
        return newTodo;
      });

      const newPresent = { todos: newTodos, editTodo: action.payload.id };

      return {
        past: [state.present, ...state.past],
        present: newPresent,
        future: state.future,
      };
    }

    case "UPDATE_TODO": {
      const newTodos = state.present.todos.map((todo) => {
        const inputValue = action.payload.value;
        const newTodo = { ...todo };

        if (todo.id === action.payload.id) newTodo.edit = false;
        if (todo.id === action.payload.id && !!inputValue)
          newTodo.title = inputValue;
        return newTodo;
      });

      const newPresent = { ...state.present, todos: newTodos };

      return {
        past: [state.present, ...state.past],
        present: newPresent,
        future: state.future,
      };
    }

    case "UNDO_TODO": {
      const [newPresent, ...newPast] = state.past;

      return {
        past: newPast,
        present: newPresent,
        future: [state.present, ...state.future],
      };
    }

    case "REDO_TODO": {
      const [newPresent, ...newFuture] = state.future;

      return {
        past: [state.present, ...state.past],
        present: newPresent,
        future: newFuture,
      };
    }

    default:
      return state;
  }
};
