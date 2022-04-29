const SubmitButton = ({ title }: { title: string }): JSX.Element => {
  return (
    <button
      className="px-2 text-white border border-green-500 bg-green-500"
      type="submit"
    >
      {title}
    </button>
  );
};

export default SubmitButton;
