interface BasicTodoAction {
  type: "EDIT_TODO" | "DELETE_TODO";
  payload: { id: string };
}

interface AddTodoAction {
  type: "ADD_TODO";
  payload: { id: string; title: string | undefined };
}

interface UpdateTodoAction {
  type: "UPDATE_TODO";
  payload: { id: string; value: string };
}

interface LoadTodoAction {
  type: "LOAD_TODOS";
  payload: { todos: TodoType[] };
}

export type UpdateRefType = {
  [key: string]: HTMLInputElement;
};

export interface TodoType {
  id: string;
  title: string;
  edit: boolean;
}

export interface TodoStateType {
  todos: TodoType[];
  editTodo: string;
}

export type TodoActionType =
  | BasicTodoAction
  | AddTodoAction
  | UpdateTodoAction
  | LoadTodoAction;
