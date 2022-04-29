import React from "react";
import ReactDOM from "react-dom/client";
import TodoList from "./TodoList";
import TodoContextProvider from "./TodoContext";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <TodoContextProvider>
      <TodoList />
    </TodoContextProvider>
  </React.StrictMode>
);
