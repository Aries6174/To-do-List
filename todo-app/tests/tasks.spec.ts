import { test , expect } from '@playwright/test';

test.beforeEach(async ({ request }) => {
    const response = await request.get('/api/tasks');
    const tasks = await response.json();

    for (const task of tasks) {
        await request.delete(`/api/tasks/${task.id}`);
    }
})

test('user can create a task', async({ page }) => {
    await page.goto('/');

    await expect(page.getByText(/Good Afternoon/)).toBeVisible();

    await page.getByRole('button', { name: /add task/i }).click();

    await expect(page.getByRole('dialog')).toBeVisible();

    await page.getByPlaceholder('Enter task name').fill('Playwright Test Task');
    
    await page.getByPlaceholder('Enter description').fill('Testing task creation');

    await page.getByRole('combobox').selectOption('work');

    await page.locator('input[type="date"]').fill('2026-09-25');

    await page.getByRole('dialog').getByText('High', { exact: true }).click();

    await page.getByRole('dialog').getByRole('button', { name: 'Add Task'}).click();

    await expect(page.getByText('Playwright Test Task').first()).toBeVisible();
});

test('user can edit a task', async({ page }) => {
    await page.goto('/');

    await expect(page.getByText(/Good Afternoon/)).toBeVisible();
    
    await page.getByRole('button', { name: /add task/i }).click();

    await expect(page.getByRole('dialog')).toBeVisible();

    await page.getByPlaceholder('Enter task name').fill('Edit Test Task');
    
    await page.getByPlaceholder('Enter description').fill('Original description');

    await page.getByRole('combobox').selectOption('work');

    await page.locator('input[type="date"]').fill('2026-09-25');

    await page.getByRole('dialog').getByText('High', { exact: true }).click();

    await page.getByRole('dialog').getByRole('button', { name: 'Add Task'}).click();

    await expect(page.getByRole('dialog')).not.toBeVisible();

    await expect(page.getByText('Edit Test Task').first()).toBeVisible();
    
    await page.getByRole('button', { name: 'Task menu' }).last().click();

    await page.getByRole('button', { name: 'Edit' }).click();

    await page.getByPlaceholder('Enter task name').fill('Edited Playwright Task');

    await page.getByRole('dialog').getByRole('button', { name: 'Save Changes' }).click();

    await expect(page.getByText('Edited Playwright Task').first()).toBeVisible();
});

test('user can complete a task', async({ page }) => {
    await page.goto('/');

    await expect(page.getByText(/Good Afternoon/)).toBeVisible();

    await page.getByRole('button', { name: /add task/i }).click();

    await expect(page.getByRole('dialog')).toBeVisible();

    await page.getByPlaceholder('Enter task name').fill('Complete Test Task');

    await page.getByPlaceholder('Enter description').fill('Testing task completion');

    await page.getByRole('combobox').selectOption('work');

    await page.locator('input[type="date"]').fill('2026-09-25');

    await page.getByRole('dialog').getByText('High', { exact: true }).click();

    await page.getByRole('dialog').getByRole('button', { name: 'Add Task' }).click();

    await expect(page.getByRole('dialog')).not.toBeVisible();

    await expect(page.getByText('Complete Test Task').first()).toBeVisible();

    await page.getByRole('heading', { name: 'Complete Test Task' }).getByRole('checkbox', { checked: false }).first().click();
});

test('user can favorite a task', async({ page }) => {
    await page.goto('/');

    await expect(page.getByText(/Good Afternoon/)).toBeVisible();

    await page.getByRole('button', { name: /add task/i }).click();

    await expect(page.getByRole('dialog')).toBeVisible();

    await page.getByPlaceholder('Enter task name').fill('Favorite Test Task');

    await page.getByPlaceholder('Enter description').fill('Testing task favorite');

    await page.getByRole('combobox').selectOption('work');

    await page.locator('input[type="date"]').fill('2026-09-25');

    await page.getByRole('dialog').getByText('High', { exact: true }).click();

    await page.getByRole('dialog').getByRole('button', { name: 'Add Task' }).click();

    await expect(page.getByRole('dialog')).not.toBeVisible();

    await expect(page.getByText('Favorite Test Task').first()).toBeVisible();

    await page.getByRole('button', { name: 'Favorite task' }).last().click();
});

test('user can delete a task', async({ page }) => {
    await page.goto('/');
    await expect(page.getByText(/Good Afternoon/)).toBeVisible();

    await page.getByRole('button', { name: /add task/i }).click();
    await expect(page.getByRole('dialog')).toBeVisible();

    await page.getByPlaceholder('Enter task name').fill('Delete Test Task');
    await page.getByPlaceholder('Enter description').fill('Testing task deletion');
    await page.getByRole('combobox').selectOption('work');
    await page.locator('input[type="date"]').fill('2026-09-25');

    await page.getByRole('dialog').getByText('High', { exact: true }).click();

    await page.getByRole('dialog').getByRole('button', { name: 'Add Task' }).click();

    await expect(page.getByRole('dialog')).not.toBeVisible();
    await expect(page.getByText('Delete Test Task').first()).toBeVisible();

    const taskCard = page.getByTestId(/task-card-/).filter({
        hasText: 'Delete Test Task'
    }).last();

    await taskCard.getByRole('button', { name: 'Task menu' }).click();

    const deleteResponse = page.waitForResponse(response =>
        response.url().includes('/api/tasks/') &&
        response.request().method() === 'DELETE'
    );

    await taskCard.getByRole('button', { name: 'Delete' }).click();

    const response = await deleteResponse;

    expect(response.ok()).toBeTruthy();
});

test('user cannot create a task without a title', async ({ page }) => {
    await page.goto('/');

    await expect(page.getByText(/Good Afternoon/)).toBeVisible();

    await page.getByRole('button', { name: /add task/i }).click();

    await expect(page.getByRole('dialog')).toBeVisible();

    // Leave the title empty
    await page.getByPlaceholder('Enter description').fill('Testing empty title');

    await page.getByRole('combobox').selectOption('work');

    await page.locator('input[type="date"]').fill('2026-09-25');

    await page.getByRole('dialog')
        .getByText('High', { exact: true })
        .click();

    await page.getByRole('dialog')
        .getByRole('button', { name: 'Add Task' })
        .click();

    // The dialog should remain open because the task is invalid
    await expect(page.getByRole('dialog')).toBeVisible();
});

test('user cannot create a task without a category', async ({ page }) => {
    await page.goto('/');

    await expect(page.getByText(/Good Afternoon/)).toBeVisible();

    await page.getByRole('button', { name: /add task/i }).click();

    await expect(page.getByRole('dialog')).toBeVisible();

    await page.getByPlaceholder('Enter task name').fill('No Category Task');
    await page.getByPlaceholder('Enter description').fill('Testing empty category');

    // Leave category unselected
    await page.locator('input[type="date"]').fill('2026-09-25');

    await page.getByRole('dialog')
        .getByText('High', { exact: true })
        .click();

    await page.getByRole('dialog')
        .getByRole('button', { name: 'Add Task' })
        .click();

    await expect(page.getByRole('dialog')).toBeVisible();
});

test('user cannot create a task without a due date', async ({ page }) => {
    await page.goto('/');

    await expect(page.getByText(/Good Afternoon/)).toBeVisible();

    await page.getByRole('button', { name: /add task/i }).click();

    await expect(page.getByRole('dialog')).toBeVisible();

    await page.getByPlaceholder('Enter task name').fill('No Due Date Task');
    await page.getByPlaceholder('Enter description').fill('Testing empty due date');

    await page.getByRole('combobox').selectOption('work');

    // Leave due date empty

    await page.getByRole('dialog')
        .getByText('High', { exact: true })
        .click();

    await page.getByRole('dialog')
        .getByRole('button', { name: 'Add Task' })
        .click();

    await expect(page.getByRole('dialog')).toBeVisible();
});

test('user can search for a task', async ({ page }) => {
    await page.goto('/');

    await expect(page.getByText(/Good Afternoon/)).toBeVisible();

    await page.getByRole('button', { name: /add task/i }).click();

    await expect(page.getByRole('dialog')).toBeVisible();

    await page.getByPlaceholder('Enter task name').fill('Search Test Task');
    await page.getByPlaceholder('Enter description').fill('Testing search');

    await page.getByRole('combobox').selectOption('work');
    await page.locator('input[type="date"]').fill('2026-09-25');

    await page.getByRole('dialog')
        .getByText('High', { exact: true })
        .click();

    await page.getByRole('dialog')
        .getByRole('button', { name: 'Add Task' })
        .click();

    await expect(page.getByText('Search Test Task').first()).toBeVisible();

    await page.getByPlaceholder(/search/i).fill('Search Test Task');

    await expect(page.getByText('Search Test Task').first()).toBeVisible();
});

test('search shows no results for a nonexistent task', async ({ page }) => {
    await page.goto('/');

    await expect(page.getByText(/Good Afternoon/)).toBeVisible();

    await page.getByPlaceholder(/search/i).fill('This Task Does Not Exist');

    await expect(page.getByText('No tasks found.')).toBeVisible();
});

const priorities = ['low', 'mid', 'high'] as const;

for (const priority of priorities) {
    test(`user can create a ${priority} priority task`, async ({ page }) => {
        await page.goto('/');

        await expect(page.getByText(/Good Afternoon/)).toBeVisible();

        await page.getByRole('button', { name: /add task/i }).click();

        await expect(page.getByRole('dialog')).toBeVisible();

        await page.getByPlaceholder('Enter task name')
            .fill(`${priority} Priority Task`);

        await page.getByPlaceholder('Enter description')
            .fill(`Testing ${priority} priority`);

        await page.getByRole('combobox').selectOption('work');

        await page.locator('input[type="date"]').fill('2026-09-25');

        await page.getByRole('dialog')
            .getByText(
                priority === 'low'
                    ? 'Low'
                    : priority === 'mid'
                        ? 'Mid'
                        : 'High',
                { exact: true }
            )
            .click();

        await page.getByRole('dialog')
            .getByRole('button', { name: 'Add Task' })
            .click();

        await expect(page.getByRole('dialog')).not.toBeVisible();

        await expect(
            page.getByText(`${priority} Priority Task`).first()
        ).toBeVisible();
    });
}

test('user can filter favorite tasks', async ({ page }) => {
    await page.goto('/');

    await expect(page.getByText(/Good Afternoon/)).toBeVisible();

    // Create first task
    await page.getByRole('button', { name: /add task/i }).click();

    await page.getByPlaceholder('Enter task name').fill('Favorite Task');
    await page.getByPlaceholder('Enter description').fill('Testing favorites');
    await page.getByRole('combobox').selectOption('work');
    await page.locator('input[type="date"]').fill('2026-09-25');

    await page.getByRole('dialog').getByText('High', { exact: true }).click();

    await page.getByRole('dialog')
        .getByRole('button', { name: 'Add Task' })
        .click();

    await expect(page.getByText('Favorite Task').first()).toBeVisible();

    // Favorite the task
    const taskCard = page.getByTestId(/task-card-/).filter({
        hasText: 'Favorite Task'
    }).last();

    await taskCard.getByRole('button', { name: /favorite/i }).click();

    // Open filter menu
    await page.getByRole('button', { name: /filter/i }).click();

    // Apply Favorites filter
    await page.getByRole('button', { name: 'Favorites', exact: true }).click();
    
    // Verify the task appears
    await expect(page.getByText('Favorite Task').first()).toBeVisible();
});

test('user can filter completed tasks', async ({ page }) => {
    await page.goto('/');

    await expect(page.getByText(/Good Afternoon/)).toBeVisible();

    // Create task
    await page.getByRole('button', { name: /add task/i }).click();

    await page.getByPlaceholder('Enter task name').fill('Completed Filter Task');
    await page.getByPlaceholder('Enter description').fill('Testing completed filter');
    await page.getByRole('combobox').selectOption('work');
    await page.locator('input[type="date"]').fill('2026-09-25');

    await page.getByRole('dialog').getByText('High', { exact: true }).click();

    await page.getByRole('dialog')
        .getByRole('button', { name: 'Add Task' })
        .click();

    await expect(
        page.getByText('Completed Filter Task').first()
    ).toBeVisible();

    // Mark task as completed
    const taskCard = page.getByTestId(/task-card-/).filter({
        hasText: 'Completed Filter Task'
    }).last();

    await taskCard.locator('input[type="checkbox"]').click();

    await expect(
        taskCard.locator('input[type="checkbox"]')
    ).toBeChecked();

    // Open filter menu
    await page.getByRole('button', { name: /filter/i }).click();

    // Select Completed
    await page.getByRole('button', {
        name: 'Completed',
        exact: true
    }).click();

    // Verify task appears
    await expect(
        page.getByText('Completed Filter Task').first()
    ).toBeVisible();
});

test('user can filter active tasks', async ({ page }) => {
    await page.goto('/');

    await expect(page.getByText(/Good Afternoon/)).toBeVisible();

    // Create task
    await page.getByRole('button', { name: /add task/i }).click();

    await page.getByPlaceholder('Enter task name').fill('Active Filter Task');
    await page.getByPlaceholder('Enter description').fill('Testing active filter');
    await page.getByRole('combobox').selectOption('work');
    await page.locator('input[type="date"]').fill('2026-09-25');

    await page.getByRole('dialog').getByText('High', { exact: true }).click();

    await page.getByRole('dialog')
        .getByRole('button', { name: 'Add Task' })
        .click();

    await expect(
        page.getByText('Active Filter Task').first()
    ).toBeVisible();

    // Open filter menu
    await page.getByRole('button', { name: /filter/i }).click();

    // Select Active
    await page.getByRole('button', {
        name: 'Active',
        exact: true
    }).click();

    // Verify task appears
    await expect(
        page.getByText('Active Filter Task').first()
    ).toBeVisible();
});

test('user cannot create a task with only whitespace in the title', async ({ page }) => {
    await page.goto('/');

    await expect(page.getByText(/Good Afternoon/)).toBeVisible();

    await page.getByRole('button', { name: /add task/i }).click();

    await expect(page.getByRole('dialog')).toBeVisible();

    await page.getByPlaceholder('Enter task name').fill('   ');
    await page.getByPlaceholder('Enter description').fill('Testing whitespace title');
    await page.getByRole('combobox').selectOption('work');
    await page.locator('input[type="date"]').fill('2026-09-25');

    await page.getByRole('dialog').getByText('High', { exact: true }).click();

    await page.getByRole('dialog')
        .getByRole('button', { name: 'Add Task' })
        .click();

    await expect(page.getByRole('dialog')).toBeVisible();
});

test('user can create a task with special characters', async ({ page }) => {
    await page.goto('/');

    await expect(page.getByText(/Good Afternoon/)).toBeVisible();

    await page.getByRole('button', { name: /add task/i }).click();

    await expect(page.getByRole('dialog')).toBeVisible();

    const title = `QA Test & Review (100%)`;

    await page.getByPlaceholder('Enter task name').fill(title);
    await page.getByPlaceholder('Enter description').fill('Testing special characters');
    await page.getByRole('combobox').selectOption('work');
    await page.locator('input[type="date"]').fill('2026-09-25');

    await page.getByRole('dialog').getByText('High', { exact: true }).click();

    await page.getByRole('dialog')
        .getByRole('button', { name: 'Add Task' })
        .click();

    await expect(page.getByRole('dialog')).not.toBeVisible();

    await expect(page.getByText(title, { exact: true }).first()).toBeVisible();
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