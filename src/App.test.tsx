import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, beforeEach } from "vitest";
import App from "./App";

describe("App", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("adds new task on Enter", async () => {
    render(<App />);
    const input = screen.getByTestId("new-task-input");

    await userEvent.type(input, "Первая задача{Enter}");

    expect(screen.getByText("Первая задача")).toBeInTheDocument();
    expect(input).toHaveValue("");
  });

  it("toggles task checked state", async () => {
    render(<App />);
    const input = screen.getByTestId("new-task-input");

    await userEvent.type(input, "Задача 1{Enter}");
    const checkbox = screen.getByRole("checkbox", { name: /задача 1/i });

    expect(checkbox).not.toBeChecked();

    fireEvent.click(checkbox);
    expect(checkbox).toBeChecked();

    fireEvent.click(checkbox);
    expect(checkbox).not.toBeChecked();
  });

  it("clears completed tasks when clicking clear button", async () => {
    render(<App />);
    const input = screen.getByTestId("new-task-input");

    await userEvent.type(input, "Task 1{Enter}");
    await userEvent.type(input, "Task 2{Enter}");

    const checkboxes = screen.getAllByRole("checkbox");
    //первую задачу выполненной
    fireEvent.click(checkboxes[0]);

    const clearButton = screen.getByTestId("clear-button");
    fireEvent.click(clearButton);

    expect(screen.queryByText("Task 1")).not.toBeInTheDocument();
    expect(screen.getByText("Task 2")).toBeInTheDocument();
  });

  it("filters tasks by All / Active / Completed", async () => {
    render(<App />);
    const input = screen.getByTestId("new-task-input");

    await userEvent.type(input, "Task 1{Enter}");
    await userEvent.type(input, "Task 2{Enter}");

    const checkboxes = screen.getAllByRole("checkbox");
    fireEvent.click(checkboxes[0]);

    //фильтр на Active (активные)
    const activeTab = screen.getByRole("tab", { name: /active/i });
    fireEvent.click(activeTab);
    expect(screen.queryByText("Task 1")).not.toBeInTheDocument();
    expect(screen.getByText("Task 2")).toBeInTheDocument();

    //фильтр на Completed (выполненные)
    const completedTab = screen.getByRole("tab", { name: /completed/i });
    fireEvent.click(completedTab);
    expect(screen.getByText("Task 1")).toBeInTheDocument();
    expect(screen.queryByText("Task 2")).not.toBeInTheDocument();

    //на All (все)
    const allTab = screen.getByRole("tab", { name: /all/i });
    fireEvent.click(allTab);
    expect(screen.getByText("Task 1")).toBeInTheDocument();
    expect(screen.getByText("Task 2")).toBeInTheDocument();
  });
});
