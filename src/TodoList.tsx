import { useEffect, useRef, useContext } from "react";
import { TodoContext } from "./TodoContext";
import { UpdateRefType } from "./TodoTypes";
import SubmitButton from "./ui/SubmitButton";
import TodoItem from "./TodoItem";
import {
  addTodo,
  deleteTodo,
  updateTodo,
  editTodo,
} from "./TodoActionCreators";

function TodoList() {
  const { state, dispatch } = useContext(TodoContext);
  const addInputRef = useRef<HTMLInputElement | null>(null);
  const updateInputRef = useRef<UpdateRefType>({} as UpdateRefType);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    dispatch(addTodo(addInputRef.current?.value));
  };

  const handleDelete = (event: React.MouseEvent) => {
    const id = event.currentTarget.id;
    dispatch(deleteTodo(id));
  };

  const handleEditUpdate = (event: React.MouseEvent, edit: boolean) => {
    const value = updateInputRef.current[event.currentTarget.id]?.value;
    const id = event.currentTarget.id;
    edit ? dispatch(updateTodo(id, value)) : dispatch(editTodo(id));
  };

  useEffect(() => {
    if (addInputRef.current) {
      addInputRef.current.value = "";
      addInputRef.current.focus();
    }
  }, [state.todos]);

  useEffect(() => {
    if (!!state.editTodo) updateInputRef.current[state.editTodo].focus();
  }, [state.editTodo]);

  return (
    <div className="max-w-screen-md mx-auto p-4">
      <h2>Todo List</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="item">
          <input
            ref={addInputRef}
            className="border border-blue-500 px-2"
            id="item"
            name="todo"
            type="text"
          />
        </label>
        <SubmitButton title="add" />
      </form>
      <section>
        {state.todos.map((todo) => (
          <TodoItem
            ref={updateInputRef}
            key={todo.id}
            todo={todo}
            onDelete={handleDelete}
            onEdit={handleEditUpdate}
          />
        ))}
      </section>
    </div>
  );
}

export default TodoList;
