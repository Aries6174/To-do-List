# QA Test Cases — Todo App

## 1. Authentication

| ID       | Test Case                                  | Expected Result                 |
| -------- | ------------------------------------------ | ------------------------------- |
| AUTH-001 | Register a new user with valid information | User is successfully registered |
| AUTH-002 | Access tasks without logging in            | API returns `401 Unauthorized`  |
| AUTH-003 | Create a task without logging in           | API returns `401 Unauthorized`  |
| AUTH-004 | Update a task without logging in           | API returns `401 Unauthorized`  |
| AUTH-005 | Delete a task without logging in           | API returns `401 Unauthorized`  |

## 2. Task Creation

| ID       | Test Case                                   | Expected Result              |
| -------- | ------------------------------------------- | ---------------------------- |
| TASK-001 | Create a task with valid information        | Task is created successfully |
| TASK-002 | Create a task without a title               | Validation error is returned |
| TASK-003 | Create a task with a whitespace-only title  | Validation error is returned |
| TASK-004 | Create a task without a category            | Validation error is returned |
| TASK-005 | Create a task without a due date            | Validation error is returned |
| TASK-006 | Create a task with an invalid priority      | Validation error is returned |
| TASK-007 | Create a task containing special characters | Task is created successfully |

## 3. Task Management

| ID       | Test Case                 | Expected Result              |
| -------- | ------------------------- | ---------------------------- |
| TASK-008 | Edit an existing task     | Task information is updated  |
| TASK-009 | Mark a task as completed  | Task is marked as completed  |
| TASK-010 | Delete an existing task   | Task is removed              |
| TASK-011 | Mark a task as a favorite | Task is marked as a favorite |

## 4. Task Priority

| ID      | Test Case                     | Expected Result                      |
| ------- | ----------------------------- | ------------------------------------ |
| PRI-001 | Create a low-priority task    | Task is created with low priority    |
| PRI-002 | Create a medium-priority task | Task is created with medium priority |
| PRI-003 | Create a high-priority task   | Task is created with high priority   |

## 5. Search and Filtering

| ID         | Test Case                             | Expected Result                    |
| ---------- | ------------------------------------- | ---------------------------------- |
| FILTER-001 | Search for an existing task           | Matching task is displayed         |
| FILTER-002 | Search for a task that does not exist | No matching results are displayed  |
| FILTER-003 | Filter by favorite tasks              | Only favorite tasks are displayed  |
| FILTER-004 | Filter by completed tasks             | Only completed tasks are displayed |
| FILTER-005 | Filter by active tasks                | Only active tasks are displayed    |

## 6. Authorization

| ID      | Test Case                                   | Expected Result     |
| ------- | ------------------------------------------- | ------------------- |
| SEC-001 | User attempts to update another user's task | Request is rejected |
| SEC-002 | User attempts to delete another user's task | Request is rejected |
| SEC-003 | User attempts to view another user's tasks  | Request is rejected |

## 7. UI Validation and Edge Cases

| ID     | Test Case                                   | Expected Result                 |
| ------ | ------------------------------------------- | ------------------------------- |
| UI-001 | Submit task form without a title            | Validation message is displayed |
| UI-002 | Submit task form without a category         | Validation message is displayed |
| UI-003 | Submit task form without a due date         | Validation message is displayed |
| UI-004 | Submit task form with whitespace-only title | Validation message is displayed |
| UI-005 | Create task with special characters         | Task is handled correctly       |

## 8. Test Execution

The automated test suite is implemented using Playwright.

Tests are organized into:

```text
tests/
├── api/
│   ├── auth.spec.ts
│   └── tasks.spec.ts
├── security/
│   └── authorization.spec.ts
└── ui/
    └── tasks.spec.ts
```

### Current Result

**Total automated tests:** 37

**Result:** 37 passed

**Status:** PASS
