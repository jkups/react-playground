import React from "react";

interface EditButtonProp {
  id: string;
  edit: boolean;
  onEdit: (event: React.MouseEvent, edit: boolean) => void;
}

const EditButton = ({ id, edit, onEdit }: EditButtonProp): JSX.Element => {
  return (
    <button
      className="text-white bg-red-400 px-2 py-0.5 rounded"
      id={id}
      onClick={(e) => onEdit(e, edit)}
    >
      {edit ? "update" : "edit"}
    </button>
  );
};

export default EditButton;
