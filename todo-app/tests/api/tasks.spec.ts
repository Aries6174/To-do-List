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

test('API can create a task', async ({ request }) => {
    const response = await request.post('/api/tasks', {
        data: {
            title: 'API Test Task',
            description: 'Testing task creation through the API',
            category: 'Work',
            dueDate: '2026-09-25',
            priority: 'high',
            favorite: false,
        },
    });

    expect(response.ok()).toBeTruthy();

    const task = await response.json();

    expect(task.title).toBe('API Test Task');
    expect(task.category).toBe('Work');
    expect(task.priority).toBe('high');
    expect(task.completed).toBe(false);
});

test('API rejects an invalid priority', async ({ request }) => {
    const response = await request.post('/api/tasks', {
        data: {
            title: 'Invalid Priority Task',
            description: 'Testing invalid priority',
            category: 'Work',
            dueDate: '2026-09-25',
            priority: 'urgent',
            favorite: false,
        },
    });

    expect(response.status()).toBe(400);
});

test('API rejects an empty title', async ({ request }) => {
    const response = await request.post('/api/tasks', {
        data: {
            title: '',
            description: 'Testing empty title',
            category: 'Work',
            dueDate: '2026-09-25',
            priority: 'high',
            favorite: false,
        },
    });

    expect(response.status()).toBe(400);
});

test('API rejects a whitespace-only title', async ({ request }) => {
    const response = await request.post('/api/tasks', {
        data: {
            title: '   ',
            description: 'Testing whitespace title',
            category: 'Work',
            dueDate: '2026-09-25',
            priority: 'high',
            favorite: false,
        },
    });

    expect(response.status()).toBe(400);
});

test("cannot create a task without a title", async ({ request }) => {
    const response = await request.post("/api/tasks", {
        data: {
            description: "Missing title",
            category: "Work",
            dueDate: "2026-09-25",
            priority: "high",
            favorite: false,
        },
    });

    expect(response.status()).toBe(400);
});

test("cannot create a task with an invalid priority", async ({ request }) => {
    const response = await request.post("/api/tasks", {
        data: {
            title: "Invalid Priority Task",
            description: "Testing validation",
            category: "Work",
            dueDate: "2026-09-25",
            priority: "urgent",
            favorite: false,
        },
    });

    expect(response.status()).toBe(400);
});

test("rejects an invalid task ID", async ({ request }) => {
    const response = await request.patch("/api/tasks/abc", {
        data: {
            title: "Updated Task",
        },
    });

    expect(response.status()).toBe(400);
});

test("rejects a non-boolean completed value", async ({ request }) => {
    const createResponse = await request.post("/api/tasks", {
        data: {
            title: "Completed Validation Task",
            description: "Testing completed validation",
            category: "Work",
            dueDate: "2026-09-25",
            priority: "high",
            favorite: false,
        },
    });

    expect(createResponse.ok()).toBeTruthy();

    const task = await createResponse.json();

    const response = await request.patch(`/api/tasks/${task.id}`, {
        data: {
            completed: "yes",
        },
    });

    expect(response.status()).toBe(400);
});

test("rejects an empty task update", async ({ request }) => {
    const createResponse = await request.post("/api/tasks", {
        data: {
            title: "Empty Update Task",
            description: "Testing empty update",
            category: "Work",
            dueDate: "2026-09-25",
            priority: "high",
            favorite: false,
        },
    });

    expect(createResponse.ok()).toBeTruthy();

    const task = await createResponse.json();

    const response = await request.patch(`/api/tasks/${task.id}`, {
        data: {},
    });

    expect(response.status()).toBe(400);
});