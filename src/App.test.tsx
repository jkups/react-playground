import { render, screen } from "@testing-library/react";
import Todo from "./TodoList";

test("renders todo text", () => {
  render(<Todo />);
  const todoElement = screen.getByText(/Todo/i);
  expect(todoElement).toBeInTheDocument();
});
