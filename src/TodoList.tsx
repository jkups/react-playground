import { useEffect, useRef, useContext } from "react";
import { TodoContext } from "./TodoContext";
import { UpdateRefType } from "./TodoTypes";
import SubmitButton from "./ui/SubmitButton";
import TodoItem from "./TodoItem";
import DeleteButton from "./ui/DeleteButton";
import EditButton from "./ui/EditButton";
import {
  addTodo,
  deleteTodo,
  updateTodo,
  editTodo,
  undoTodo,
  redoTodo,
} from "./TodoActionCreators";
import RedoUndoButton from "./ui/RedoUndoButton";

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

  const handleUndo = () => dispatch(undoTodo());
  const handleRedo = () => dispatch(redoTodo());

  useEffect(() => {
    if (addInputRef.current) {
      addInputRef.current.value = "";
      addInputRef.current.focus();
    }
  }, [state.present.todos]);

  useEffect(() => {
    if (!!state.present.editTodo)
      updateInputRef.current[state.present.editTodo].focus();
  }, [state.present.editTodo]);

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
        <RedoUndoButton
          title="Undo"
          disabled={!state.past.length}
          onRedoUndo={handleUndo}
        />
        <RedoUndoButton
          title="Redo"
          disabled={!state.future.length}
          onRedoUndo={handleRedo}
        />

        {state.present.todos.length ? (
          state.present.todos.map((todo) => (
            <TodoItem ref={updateInputRef} key={todo.id} todo={todo}>
              <DeleteButton id={todo.id} onDelete={handleDelete} />
              <EditButton
                id={todo.id}
                edit={todo.edit}
                onEdit={handleEditUpdate}
              />
            </TodoItem>
          ))
        ) : (
          <p className="mt-4">Loading....</p>
        )}
      </section>
    </div>
  );
}

export default TodoList;
