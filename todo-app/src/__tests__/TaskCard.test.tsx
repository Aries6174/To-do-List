import { render, screen } from "@testing-library/react";
import TaskCard from "@/Components/TaskCard";
import userEvent from "@testing-library/user-event";

describe("TaskCard", () => {
    it("displays the task title", () => {
        const task = {
            id:1,
            title: "Finish portfolio",
            description: "Complete my Portfolio Project",
            category: "Work",
            dueDate: "2026-09-20",
            priority: "high" as const,
            favorite: false,
            completed: false,
        };

        render(
            <TaskCard
                task={task}
                onTaskUpdate={() => {}}
                onTaskDelete={() => {}}
            />
        );

        expect(screen.getByText("Finish portfolio")).toBeInTheDocument();
    });

    it("calls onTaskUpdate when the task is completed", async () => {
        const user = userEvent.setup();

                const task = {
            id: 1,
            title: "Finish portfolio",
            description: "Complete my Portfolio Project",
            category: "Work",
            dueDate: "2026-09-20",
            priority: "high" as const,
            favorite: false,
            completed: false,
        };
        
        const onTaskUpdate = jest.fn();

        global.fetch = jest.fn().mockResolvedValue({
            ok: true,
            json: async () => ({
                ...task,
                completed: true,
            }),
        });

        render(
            <TaskCard
                task={task}
                onTaskUpdate={onTaskUpdate}
                onTaskDelete={() =>{}}
            />
        );

        const checkbox = screen.getByRole("checkbox");

        await user.click(checkbox);

        expect(onTaskUpdate).toHaveBeenCalled();
    });

    it("calls onTaskUpdate when the task is favorited", async () =>{
        const user = userEvent.setup();

        const task = {
            id: 1,
            title: "Finish portfolio",
            description: "Complete my Portfolio Project",
            category: "Work",
            dueDate: "2026-09-20",
            priority: "high" as const,
            favorite: false,
            completed: false,
        };

        const onTaskUpdate = jest.fn();

        global.fetch = jest.fn().mockResolvedValue({
            ok:true,
            json: async () => ({
                ...task,
                favorite: true,
            }),
        });

        render(
            <TaskCard
                task={task}
                onTaskUpdate={onTaskUpdate}
                onTaskDelete={() => {}}
            />
        );

        const favoriteButton = screen.getByRole("button", {
            name: "Favorite task",
        });
        await user.click(favoriteButton);
        expect(onTaskUpdate).toHaveBeenCalled();
    });

    it("calls onTaskDelete when the task is deleted", async () => {
        const user = userEvent.setup();

        const task = {
            id: 1,
            title: "Finish portfolio",
            description: "Complete my Portfolio Project",
            category: "Work",
            dueDate: "2026-09-20",
            priority: "high" as const,
            favorite: false,
            completed: false,
        };

        const onTaskDelete = jest.fn();

        global.fetch = jest.fn().mockResolvedValue({
            ok: true,
        });

        render(
            <TaskCard
                task={task}
                onTaskUpdate={() => {}}
                onTaskDelete={onTaskDelete}
            />
        );

        const buttons = screen.getAllByRole("button");

        await user.click(buttons[1]);

        const deleteButton = screen.getByText("Delete");

        await user.click(deleteButton);

        expect(onTaskDelete).toHaveBeenCalledWith(1);
    });

    it("opens the edit form when Edit is clicked", async () => {
        const user = userEvent.setup();

        const task = {
            id: 1,
            title: "Finish portfolio",
            description: "Complete my Portfolio Project",
            category: "Work",
            dueDate: "2026-09-20",
            priority: "high" as const,
            favorite: false,
            completed: false,
        };

        render(
            <TaskCard
                task={task}
                onTaskUpdate={() => {}}
                onTaskDelete={() => {}}
            />
        );

        const buttons = screen.getAllByRole("button");

        await user.click(buttons[1]);

        const editButton = screen.getByText("Edit");

        await user.click(editButton);

        expect(screen.getByText("Edit Task")).toBeInTheDocument();
    });

})