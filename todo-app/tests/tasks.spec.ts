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