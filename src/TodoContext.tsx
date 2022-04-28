import { useReducer, createContext } from "react";
import { reducer } from "./TodoReducer";
import { StateType, TodoActionType } from "./TodoTypes";
import { data } from "./data";

interface TodoContextProviderProp {
  children: React.ReactNode;
}

const initialState: StateType = { todos: data, editTodo: "" };
const dispatch: React.Dispatch<TodoActionType> = () => null;

export const TodoContext = createContext({
  state: initialState,
  dispatch: dispatch,
});

const TodoContextProvider = ({ children }: TodoContextProviderProp) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <TodoContext.Provider value={{ state, dispatch }}>
      {children}
    </TodoContext.Provider>
  );
};

export default TodoContextProvider;
