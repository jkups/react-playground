import React from "react";

interface RedoUndoButtonProp {
  title: string;
  disabled: boolean;
  onRedoUndo: () => void;
}

const RedoUndoButton = ({
  title,
  disabled,
  onRedoUndo,
}: RedoUndoButtonProp): JSX.Element => {
  return (
    <button
      className="border border-blue-500 px-2"
      disabled={disabled}
      onClick={onRedoUndo}
    >
      {title}
    </button>
  );
};

export default RedoUndoButton;
