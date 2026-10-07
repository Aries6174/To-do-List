import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import TaskForm from "@/Components/TaskForm";
import { Task } from "@/types/task";

describe("TaskForm", () => {
    const onAddTask = jest.fn();
    const onClose = jest.fn();

    beforeEach(() => {
        jest.clearAllMocks();
        global.fetch = jest.fn();
    });

    test("renders the Add Task form", () => {
        render(
            <TaskForm
                onAddTask={onAddTask}
                onClose={onClose}
            />
        );

        expect(screen.getByRole("heading", { name: "Add Task" })).toBeInTheDocument();
        expect(screen.getByPlaceholderText("Enter task name")).toBeInTheDocument();
        expect(screen.getByPlaceholderText("Enter description")).toBeInTheDocument();
        expect(screen.getByText("Select a Category")).toBeInTheDocument();
        expect(screen.getByText("Low")).toBeInTheDocument();
        expect(screen.getByText("Mid")).toBeInTheDocument();
        expect(screen.getByText("High")).toBeInTheDocument();
        expect(screen.getByText("Add to Favorites")).toBeInTheDocument();
    });

    test("allows the user to enter task information", () => {
        render(
            <TaskForm
                onAddTask={onAddTask}
                onClose={onClose}
            />
        );

        const titleInput = screen.getByPlaceholderText("Enter task name");
        const descriptionInput = screen.getByPlaceholderText("Enter description");
        const categorySelect = screen.getByRole("combobox");
        const dateInput = document.querySelector('input[type="date"]') as HTMLInputElement;

        fireEvent.change(titleInput, {
            target: { value: "Test Task" },
        });

        fireEvent.change(descriptionInput, {
            target: { value: "Test description" },
        });

        fireEvent.change(categorySelect, {
            target: { value: "work" },
        });

        fireEvent.change(dateInput, {
            target: { value: "2026-10-10" },
        });

        fireEvent.click(screen.getByText("High"));

        fireEvent.click(screen.getByText("Add to Favorites"));

        expect(titleInput).toHaveValue("Test Task");
        expect(descriptionInput).toHaveValue("Test description");
        expect(categorySelect).toHaveValue("work");
        expect(dateInput).toHaveValue("2026-10-10");
    });

    test("submits a new task successfully", async () => {
        const savedTask: Task = {
            id: 100,
            title: "Test Task",
            description: "Test description",
            category: "work",
            dueDate: "2026-10-10",
            priority: "high",
            favorite: true,
            completed: false,
        };

        (global.fetch as jest.Mock).mockResolvedValue({
            ok: true,
            json: async () => savedTask,
        });

        render(
            <TaskForm
                onAddTask={onAddTask}
                onClose={onClose}
            />
        );

        fireEvent.change(screen.getByPlaceholderText("Enter task name"), {
            target: { value: "Test Task" },
        });

        fireEvent.change(screen.getByPlaceholderText("Enter description"), {
            target: { value: "Test description" },
        });

        fireEvent.change(screen.getByRole("combobox"), {
            target: { value: "work" },
        });

        fireEvent.change(screen.getByDisplayValue(""), {
            target: { value: "2026-10-10" },
        });

        fireEvent.click(screen.getByText("High"));
        fireEvent.click(screen.getByText("Add to Favorites"));

        fireEvent.click(screen.getByRole("button", { name: "Add Task" }));

        await waitFor(() => {
            expect(global.fetch).toHaveBeenCalledWith(
                "/api/tasks",
                expect.objectContaining({
                    method: "POST",
                })
            );
        });

        expect(onAddTask).toHaveBeenCalledWith(savedTask);
        expect(onClose).toHaveBeenCalled();
    });
});