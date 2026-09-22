jest.mock("@/prisma/db", () => ({
    db: {
        orm: {
            public: {
                Task: {
                    all: jest.fn(),
                    create: jest.fn(),
                    where: jest.fn(),
                },
            },
        },
    },
}));


import { GET, POST } from "@/app/api/tasks/route";
import { PATCH, DELETE } from "@/app/api/tasks/[id]/route";
import { db } from "@/prisma/db";

describe("GET /api/tasks", () => {
    it("return the tasks", async () => {
        (db.orm.public.Task.all as jest.Mock).mockResolvedValue([
            {
                id: 1,
                title: "Finish portfolio",
                description: "Complete my Portfolio Project",
                category: "Work",
                dueDate: "2026-09-20",
                priority: "high",
                favorite: false,
                completed: false,
            },
        ]);

        const response = await GET();

        expect(response.status).toBe(200);

        const tasks = await response.json();
        
        expect(tasks).toHaveLength(1);
        expect(tasks[0].title).toBe("Finish portfolio");
    });

    it("creates a new task", async () => {
        const newTask = {
            id: 2,
            title: "Study Jest",
            description: "Learn API testing",
            category: "Work",
            dueDate: "2026-09-25",
            priority: "mid",
            favorite: false,
            completed: false,
        };

        (db.orm.public.Task.create as jest.Mock).mockResolvedValue(newTask);

        const request = new Request("http://localhost/api/tasks", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body:JSON.stringify({
                title: "Study Jest",
                description: "Learn API testing",
                category: "Work",
                dueDate: "2026-09-25",
                priority: "mid",
                favorite: false,
            }),
        });

        const response = await POST(request);
        
        expect(response.status).toBe(200);

        const task = await response.json();

        expect(task.title).toBe("Study Jest")
        expect(task.category).toBe("Work");
        expect(db.orm.public.Task.create).toHaveBeenCalled();
    });

});

describe("PATCH /api/tasks/[id]", () => {
    it("updates a task", async () => {
        const update = jest.fn().mockResolvedValue(undefined);
        const first = jest.fn().mockResolvedValue({
            id: 1,
            title: "Finish portfolio",
            description: "Complete my Portfolio Project",
            category: "Work",
            dueDate: "2026-09-20",
            priority: "high",
            favorite: false,
            completed: true,
        });

        (db.orm.public.Task.where as jest.Mock).mockReturnValue({
            update,
            first,
        });

        const request = new Request("http://localhost/api/tasks/1", {
            method: "PATCH",
            headers: {
                "Content-Type" : "application/json",
            },
            body: JSON.stringify({
                completed:true,
            }),
        });

        const response = await PATCH(request, {
            params: Promise.resolve({ id: "1" }),
        });

        expect(response.status).toBe(200);
        expect(update).toHaveBeenCalledWith({
            completed: true,
        });

        const task = await response.json();

        expect(task.completed).toBe(true);
    });

    const invalidPriorities = ["urgent", "medium", "", "critical"];

    for (const priority of invalidPriorities){
        it(`rejects an invalid priority: ${priority || "empty"}`, async () => {
            const request = new Request("http://localhost/api/tasks/1", {
                method: "PATCH",
                headers:{
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    priority,
                }),
            });

            const response = await PATCH(request, {
                params: Promise.resolve({ id: "1" }),
            });
            
            expect(response.status).toBe(400);
        });
    }

    const invalidTitles = ["", " ", "   "];

    for (const title of invalidTitles){
        it(`rejects an empty title: ${title || "empty"}`, async () => {
            const request = new Request("http://localhost/api/tasks/1", {
                method: "PATCH",
                headers: {
                    "Content-Type" : "application/json",
                },
                body:JSON.stringify({
                    title,
                }),
            });

            const response = await PATCH(request, {
                params: Promise.resolve({ id: "1" }),
            });

            expect(response.status).toBe(400);
        });
    }
});


describe("DELETE /api/tasks/[id]", () => {
    it("deletes a task", async () => {
        const deleteTask = jest.fn().mockResolvedValue(undefined);

        (db.orm.public.Task.where as jest.Mock).mockReturnValue({
            delete:deleteTask,
        });

        const request = new Request("http://localhost/api/tasks/1", {
            method: "DELETE",
        });
           
        const response = await DELETE(request, {
            params: Promise.resolve({ id: "1" }),
        });

        expect(response.status).toBe(200);
        expect(deleteTask).toHaveBeenCalled();
    });
});