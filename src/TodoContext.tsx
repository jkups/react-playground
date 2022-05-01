import { createContext } from "react";
import { reducer } from "./TodoReducer";
import { TodosStateType } from "./TodoTypes";
import {
  useRedoUndoReducer,
  RedoUndoActionType,
} from "./hooks/useRedoUndoReducer";
import fetchTodos from "./common/fetchTodos";
import useThunkReducer from "./hooks/useThunkReducer";

interface TodoContextProviderProp {
  children: React.ReactNode;
}

const initialState: TodosStateType = {
  past: [],
  present: { todos: [], editTodo: "" },
  future: [],
};

const dispatch: React.Dispatch<RedoUndoActionType> = () => null;

export const TodoContext = createContext({
  state: initialState,
  dispatch: dispatch,
});

const TodoContextProvider = ({ children }: TodoContextProviderProp) => {
  const [state, dispatch] = useRedoUndoReducer(
    reducer,
    initialState,
    useThunkReducer,
    fetchTodos
  );

  return (
    <TodoContext.Provider value={{ state, dispatch }}>
      {children}
    </TodoContext.Provider>
  );
};

export default TodoContextProvider;
