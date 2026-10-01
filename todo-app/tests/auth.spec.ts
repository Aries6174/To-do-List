import { test, expect } from "@playwright/test";

test("cannot access tasks without logging in", async ({ request }) => {
    const response = await request.get("/api/tasks");

    expect(response.status()).toBe(401);

});

test("cannot create a task without logging in", async ({ request }) => {
    const response = await request.post("/api/tasks", {
        data: {
            title: "Unauthorized Task",
            description: "This should not be created",
            category: "Personal",
            dueDate: "2026-10-10T12:00:00.000Z",
            priority: "mid",
            favorite: false,
        },
    });

    expect(response.status()).toBe(401);
});

test("cannot update a task without logging in", async ({ request }) => {
    const response = await request.patch("/api/tasks/1", {
        data: {
            title: "Unauthorized Update",
        },
    });

    expect(response.status()).toBe(401);
});

test("cannot delete a task without logging in", async ({ request }) => {
    const response = await request.delete("/api/tasks/1");

    expect(response.status()).toBe(401);
});