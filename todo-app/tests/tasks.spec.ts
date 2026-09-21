import { test , expect } from '@playwright/test';

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
    
    await page.getByRole('heading', { name: 'Edit Test Task'}).first().locator('..').locator('..').getByRole('button').last().click();
});