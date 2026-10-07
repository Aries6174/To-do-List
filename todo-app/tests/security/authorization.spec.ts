import { test, expect } from '@playwright/test';

async function login(request: any) {
    const response = await request.post("/api/auth/login", {
        data: {
            email: "test@example.com",
            password: "TestPassword123",
        },
    });

    expect(response.ok()).toBeTruthy();
}

test.beforeEach(async ({ request }) => {
    await login(request);
});

function uniqueEmail(prefix: string) {
    return `${prefix}-${Date.now()}@example.com`;
}

test("user cannot update another user's task", async ({ request }) => {
    // User A creates a task
    const createResponse = await request.post("/api/tasks", {
        data: {
            title: "User A Task",
            description: "Owned by User A",
            category: "Work",
            dueDate: "2026-09-25",
            priority: "high",
            favorite: false,
        },
    });

    expect(createResponse.ok()).toBeTruthy();

    const task = await createResponse.json();

    // User B logs in
    const userBEmail = uniqueEmail("userb");
    const userBPassword = "TestPassword123";

    await request.post("/api/auth/register", {
        data: {
            name: "User B",
            email: userBEmail,
            password: userBPassword,
        },
    });

    const loginResponse = await request.post("/api/auth/login", {
        data: {
            email: userBEmail,
            password: userBPassword,
        },
    });

    expect(loginResponse.ok()).toBeTruthy();

    // User B tries to update User A's task
    const updateResponse = await request.patch(
        `/api/tasks/${task.id}`,
        {
            data: {
                title: "Hacked Task",
            },
        }
    );

    expect(updateResponse.status()).toBe(404);
});

test("user cannot delete another user's task", async ({ request }) => {
    // User A creates a task
    const createResponse = await request.post("/api/tasks", {
        data: {
            title: "User A Delete Task",
            description: "Owned by User A",
            category: "Work",
            dueDate: "2026-09-25",
            priority: "high",
            favorite: false,
        },
    });

    expect(createResponse.ok()).toBeTruthy();

    const task = await createResponse.json();

    // User B logs in
    const userBEmail = uniqueEmail("userb-delete");
    const userBPassword = "TestPassword123";

    await request.post("/api/auth/register", {
        data: {
            name: "User B Delete",
            email: userBEmail,
            password: userBPassword,
        },
    });

    const loginResponse = await request.post("/api/auth/login", {
        data: {
            email: userBEmail,
            password: userBPassword,
        },
    });

    expect(loginResponse.ok()).toBeTruthy();

    // User B tries to delete User A's task
    const deleteResponse = await request.delete(
        `/api/tasks/${task.id}`
    );

    expect(deleteResponse.status()).toBe(404);
});

test("user cannot see another user's tasks", async ({ request }) => {
    // User A creates a task
    const createResponse = await request.post("/api/tasks", {
        data: {
            title: "Private User A Task",
            description: "This should only belong to User A",
            category: "Work",
            dueDate: "2026-09-25",
            priority: "high",
            favorite: false,
        },
    });

    expect(createResponse.ok()).toBeTruthy();

    // User B logs in
    const userBEmail = uniqueEmail("userb-view");
    const userBPassword = "TestPassword123";

    await request.post("/api/auth/register", {
        data: {
            name: "User B View",
            email: userBEmail,
            password: userBPassword,
        },
    });

    const loginResponse = await request.post("/api/auth/login", {
        data: {
            email: userBEmail,
            password: userBPassword,
        },
    });

    expect(loginResponse.ok()).toBeTruthy();

    // User B gets their tasks
    const tasksResponse = await request.get("/api/tasks");

    expect(tasksResponse.ok()).toBeTruthy();

    const tasks = await tasksResponse.json();

    // User A's task should not appear
    expect(
        tasks.some((task: { title: string }) =>
            task.title === "Private User A Task"
        )
    ).toBe(false);
});