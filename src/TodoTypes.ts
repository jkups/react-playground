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

export interface TodosType {
  todos: TodoType[];
  editTodo: string;
}

export interface TodosStateType {
  past: TodosType[];
  present: TodosType;
  future: TodosType[];
}

export type TodoActionType =
  | BasicTodoAction
  | AddTodoAction
  | UpdateTodoAction
  | LoadTodoAction;
