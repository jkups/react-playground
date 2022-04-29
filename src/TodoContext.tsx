import { useEffect, useReducer, createContext } from "react";
import { reducer } from "./TodoReducer";
import { TodoStateType, TodoActionType } from "./TodoTypes";
import fetchTodos from "./common/fetchTodos";
import useThunkReducer from "./hooks/useThunkReducer";

interface TodoContextProviderProp {
  children: React.ReactNode;
}

const initialState: TodoStateType = { todos: [], editTodo: "" };
const dispatch: React.Dispatch<TodoActionType> = () => null;

export const TodoContext = createContext({
  state: initialState,
  dispatch: dispatch,
});

const TodoContextProvider = ({ children }: TodoContextProviderProp) => {
  const [state, dispatch] = useThunkReducer(reducer, initialState);

  useEffect(() => dispatch(fetchTodos), []);

  return (
    <TodoContext.Provider value={{ state, dispatch }}>
      {children}
    </TodoContext.Provider>
  );
};

export default TodoContextProvider;
