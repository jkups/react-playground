import { useReducer } from "react";

export default function useThunkReducer<T, U>(reducer: T, initialState: U) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const enhancedDispatch = (action) => {
    typeof action === "function" ? action(dispatch) : dispatch(action);
  };

  return [state, enhancedDispatch];
}
