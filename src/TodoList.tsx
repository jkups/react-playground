import { MouseEvent, FormEvent, useEffect, useRef } from "react";
import { UpdateRefType } from "./TodoTypes";
import SubmitButton from "./ui/SubmitButton";
import TodoItem from "./TodoItem";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "./store";
import {
  addTodo,
  deleteTodo,
  updateTodo,
  editTodo,
} from "./TodoActionCreators";

const TodoList = () => {
  const todoState = useSelector((state: RootState) => state.todo);
  const dispatch = useDispatch();

  const addInputRef = useRef<HTMLInputElement | null>(null);
  const updateInputRef = useRef<UpdateRefType>({} as UpdateRefType);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    dispatch(addTodo(addInputRef.current?.value));
  };

  const handleDelete = (event: MouseEvent) => {
    const id = event.currentTarget.id;
    dispatch(deleteTodo(id));
  };

  const handleEditUpdate = (event: MouseEvent, edit: boolean) => {
    const value = updateInputRef.current[event.currentTarget.id]?.value;
    const id = event.currentTarget.id;
    edit ? dispatch(updateTodo(id, value)) : dispatch(editTodo(id));
  };

  useEffect(() => {
    if (addInputRef.current) {
      addInputRef.current.value = "";
      addInputRef.current.focus();
    }
  }, [todoState.todos]);

  useEffect(() => {
    if (!!todoState.editTodo)
      updateInputRef.current[todoState.editTodo].focus();
  }, [todoState.editTodo]);

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
        {todoState.todos.map((todo) => (
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
};

export default TodoList;
