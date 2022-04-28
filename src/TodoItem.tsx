import { ForwardedRef, forwardRef, MouseEvent } from "react";
import { TodoType, UpdateRefType } from "./TodoTypes";
import DeleteButton from "./ui/DeleteButton";
import EditButton from "./ui/EditButton";

interface TodoItemProp {
  todo: TodoType;
  onDelete: (event: MouseEvent) => void;
  onEdit: (event: MouseEvent, edit: boolean) => void;
}

const TodoItem = forwardRef(
  (
    { todo, onDelete, onEdit }: TodoItemProp,
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
        <div className="flex gap-x-2">
          <DeleteButton id={todo.id} onDelete={onDelete} />
          <EditButton id={todo.id} edit={todo.edit} onEdit={onEdit} />
        </div>
      </div>
    );
  }
);

export default TodoItem;
