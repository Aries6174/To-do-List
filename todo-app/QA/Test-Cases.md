# TaskFlow Test Cases

## 1. Task Creation

| ID | Test Case | Expected Result | Status |
|---|---|---|---|
| TC-001 | Create a task with valid information | Task is created and displayed in the task list | Pass |
| TC-002 | Create a task without a title | Task is not created and validation is shown | Pass |
| TC-003 | Create a task without a category | Task is not created and validation is shown | Pass |
| TC-004 | Create a task without a due date | Task is not created and validation is shown | Pass |
| TC-005 | Create a low-priority task | Task is created with low priority | Pass |
| TC-006 | Create a mid-priority task | Task is created with mid priority | Pass |
| TC-007 | Create a high-priority task | Task is created with high priority | Pass |
| TC-008 | Create a task with whitespace-only title | Task is not created | Pass |
| TC-009 | Create a task with special characters | Task is created successfully | Pass |

## 2. Task Management

| ID | Test Case | Expected Result | Status |
|---|---|---|---|
| TC-010 | Edit an existing task | Task information is updated | Pass |
| TC-011 | Complete a task | Task is marked as completed | Pass |
| TC-012 | Favorite a task | Task is marked as favorite | Pass |
| TC-013 | Delete a task | Task is removed from the task list | Pass |

## 3. Search

| ID | Test Case | Expected Result | Status |
|---|---|---|---|
| TC-014 | Search for an existing task | Matching task is displayed | Pass |
| TC-015 | Search for a nonexistent task | "No tasks found." is displayed | Pass |

## 4. Filtering

| ID | Test Case | Expected Result | Status |
|---|---|---|---|
| TC-016 | Filter active tasks | Only active tasks are displayed | Pass |
| TC-017 | Filter completed tasks | Only completed tasks are displayed | Pass |
| TC-018 | Filter favorite tasks | Only favorite tasks are displayed | Pass |

## 5. API Testing

| ID | Test Case | Expected Result | Status |
|---|---|---|---|
| TC-019 | Create a task through the API | API creates and returns the task | Pass |
| TC-020 | Send an invalid priority | API rejects the request | Pass |
| TC-021 | Send an empty title | API rejects the request | Pass |
| TC-022 | Send a whitespace-only title | API rejects the request | Pass |