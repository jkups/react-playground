import React from "react";

interface DeleteButtonProp {
  id: string;
  onDelete: (event: React.MouseEvent) => void;
}

const DeleteButton = ({ id, onDelete }: DeleteButtonProp): JSX.Element => {
  return (
    <button
      className="text-white bg-red-400 px-2 py-0.5 rounded"
      id={id}
      onClick={onDelete}
    >
      delete
    </button>
  );
};

export default DeleteButton;
