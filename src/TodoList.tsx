import { MouseEvent, FormEvent, useState, useEffect, useRef } from "react";
import { v4 as uuid } from "uuid";
import { data } from "./data";

interface ITodo {
  id: string;
  title: string;
  edit: boolean;
}

type UpdateRefType = {
  [key: string]: HTMLInputElement;
};

function TodoList() {
  const [todos, setTodos] = useState<ITodo[]>([]);
  const [editTodo, setEditTodo] = useState("");

  const addInputRef = useRef<HTMLInputElement | null>(null);
  const updateInputRef = useRef({} as UpdateRefType);

  const handleRemove = (event: MouseEvent) => {
    const target = event.target as HTMLButtonElement;
    setTodos(todos.filter((todo) => todo.id !== target.id));
  };

  const handleEdit = (event: MouseEvent) => {
    const target = event.target as HTMLButtonElement;
    const updatedTodos = todos.map((todo) => {
      todo.edit = todo.id === target.id ? true : false;
      return todo;
    });

    setEditTodo(target.id);
    setTodos(updatedTodos);
  };

  const handleUpdate = (event: MouseEvent) => {
    const target = event.target as HTMLButtonElement;
    const updatedTodos = todos.map((todo) => {
      const inputValue = updateInputRef.current[target.id].value;
      if (todo.id === target.id) todo.edit = false;
      if (todo.id === target.id && !!inputValue) todo.title = inputValue;

      return todo;
    });

    setTodos(updatedTodos);
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    const target = event.target as HTMLFormElement;
    setTodos([...todos, { id: uuid(), title: target.todo.value, edit: false }]);
  };

  useEffect(() => setTodos(data), []);

  useEffect(() => {
    if (addInputRef.current) {
      addInputRef.current.value = "";
      addInputRef.current.focus();
    }
  }, [todos]);

  useEffect(() => {
    if (!!editTodo) updateInputRef.current[editTodo].focus();
  }, [editTodo]);

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
        <button
          className="px-2 text-white border border-green-500 bg-green-500"
          type="submit"
        >
          add
        </button>
      </form>
      <section>
        {todos.map((todo) => (
          <div
            key={todo.id}
            className="rounded border border-blue-400 p-4 my-5"
          >
            {todo.edit ? (
              <input
                ref={(el: HTMLInputElement) =>
                  (updateInputRef.current[todo.id] = el)
                }
                className="mb-3 px-2 w-full"
                type="text"
                placeholder={todo.title}
              />
            ) : (
              <div className="mb-3">{todo.title}</div>
            )}
            <div className="flex gap-x-2">
              <button
                className="text-white bg-red-400 px-2 py-0.5 rounded"
                id={todo.id}
                onClick={handleRemove}
              >
                delete
              </button>
              <button
                className="text-white bg-red-400 px-2 py-0.5 rounded"
                id={todo.id}
                onClick={todo.edit ? handleUpdate : handleEdit}
              >
                {todo.edit ? "update" : "edit"}
              </button>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}

export default TodoList;
