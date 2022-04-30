import { useReducer, useEffect } from "react";
import { TodosStateType, TodosType, TodoActionType } from "../TodoTypes";

type Reducer = (state: TodosType, action: TodoActionType) => TodosType;
export interface RedoUndoActionType {
  type: "UNDO_TODO" | "REDO_TODO";
}

export const useRedoUndoReducer = (
  reducer: Reducer,
  initialState: TodosStateType,
  useThunk?: (reducer: Reducer, initialState: TodosType) => any[],
  middleware?: (dispatch: React.Dispatch<TodoActionType>) => void
) => {
  if (useThunk) {
    const [state, dispatch] = useThunk(reducer, initialState.present);
    useEffect(() => dispatch(middleware), []);

    initialState.present = state;
  }

  const redoUndoReducer = (state, action: RedoUndoActionType) => {
    const newPresent = reducer(state.present, action);

    switch (action.type) {
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

      default: {
        return {
          past: [state.present, ...state.past],
          present: newPresent,
          future: state.future,
        };
      }
    }
  };

  return useReducer(redoUndoReducer, initialState);
};
