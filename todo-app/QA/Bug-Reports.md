# TaskFlow Bug Reports

## BUG-001 — Whitespace-only task titles were accepted

### Description

The task creation form allowed users to create a task with a title containing only whitespace characters.

### Steps to Reproduce

1. Open the TaskFlow application.
2. Click **Add Task**.
3. Enter only spaces in the task title field.
4. Fill in the remaining required fields.
5. Click **Add Task**.

### Expected Result

The task should not be created because the title does not contain meaningful text.

### Actual Result

The task was initially accepted because whitespace characters were treated as a valid string.

### Severity

Medium

### Status

Fixed

### Root Cause

The validation schema checked that the title contained at least one character, but did not remove leading and trailing whitespace before validation.

### Fix

Updated the title validation from:

```ts
z.string().min(1, "Title is required")