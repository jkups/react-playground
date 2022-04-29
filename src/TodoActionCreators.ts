import { v4 as uuid } from "uuid";
import { TodoActionType, TodoType } from "./TodoTypes";

export const addTodo = (title: string | undefined): TodoActionType => {
  return {
    type: "ADD_TODO",
    payload: { id: uuid(), title: title },
  };
};

export const deleteTodo = (id: string): TodoActionType => {
  return { type: "DELETE_TODO", payload: { id: id } };
};

export const updateTodo = (id: string, value: string): TodoActionType => {
  return { type: "UPDATE_TODO", payload: { id: id, value: value } };
};

export const editTodo = (id: string): TodoActionType => {
  return { type: "EDIT_TODO", payload: { id: id } };
};

export const loadTodos = (todos: TodoType[]): TodoActionType => {
  return { type: "LOAD_TODOS", payload: { todos: todos } };
};

export const fetchingTodos = (): TodoActionType => {
  return { type: "FETCH_TODOS" };
};
