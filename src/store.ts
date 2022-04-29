import { legacy_createStore as createStore } from "redux";
import rootReducer from "./reducers";

const store = createStore(
  rootReducer,
  typeof window === "object" &&
    typeof window.__REDUX_DEVTOOLS_EXTENSION__ !== "undefined"
    ? window.__REDUX_DEVTOOLS_EXTENSION__()
    : (f) => f
);

export default store;

export type RootState = ReturnType<typeof store.getState>;
