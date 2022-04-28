import { ForwardedRef, forwardRef } from "react";
import { TodoType, UpdateRefType } from "./TodoTypes";

interface TodoItemProp {
  todo: TodoType;
  children: React.ReactNode;
}

const TodoItem = forwardRef(
  (
    { todo, children }: TodoItemProp,
    updateRef: ForwardedRef<UpdateRefType>
  ) => {
    return (
      <div className="rounded border border-blue-400 p-4 my-5">
        {todo.edit ? (
          <input
            ref={(el) => updateRef && (updateRef.current[todo.id] = el)}
            className="mb-3 px-2 w-full"
            type="text"
            placeholder={todo.title}
          />
        ) : (
          <div className="mb-3">{todo.title}</div>
        )}
        <div className="flex gap-x-2">{children}</div>
      </div>
    );
  }
);

export default TodoItem;
