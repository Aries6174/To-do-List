# TaskFlow QA Test Plan

## 1. Project Overview

TaskFlow is a full-stack task management web application built with Next.js, TypeScript, PostgreSQL, and Prisma.

The application allows users to:

- Create tasks
- Edit tasks
- Delete tasks
- Complete tasks
- Favorite tasks
- Search tasks
- Filter tasks
- Set task priorities
- Set categories and due dates

## 2. Testing Objectives

The goal of testing is to verify that:

- Core task functionality works correctly.
- User input is validated correctly.
- API endpoints handle valid and invalid data.
- UI interactions produce the expected results.
- Search and filtering work correctly.
- Edge cases are handled properly.
- Changes do not break existing functionality.

## 3. Testing Scope

### In Scope

- Task creation
- Task editing
- Task deletion
- Task completion
- Task favorites
- Task filtering
- Task searching
- Form validation
- Task priorities
- API requests
- API responses
- Edge cases

### Out of Scope

- Production deployment testing
- Load testing
- Security penetration testing
- Cross-browser testing beyond Chromium
- Mobile device testing

## 4. Testing Tools

| Tool | Purpose |
|---|---|
| Jest | Unit and API testing |
| React Testing Library | Component testing |
| Playwright | End-to-end and API testing |
| PostgreSQL | Application database |
| Prisma | Database access |
| GitHub | Source control |
| GitHub Actions | CI testing |

## 5. Test Types

### Unit Testing

Used to test individual functions and components.

### API Testing

Used to verify API endpoints accept valid data and reject invalid data.

### End-to-End Testing

Used to simulate real user interactions with the application.

### Validation Testing

Used to verify that invalid or incomplete input is rejected.

### Edge-Case Testing

Used to test unusual or boundary inputs such as:

- Empty values
- Whitespace-only values
- Special characters
- Invalid priorities

## 6. Test Environment

### Local Environment

- Operating System: Windows
- Browser: Google Chrome
- Database: PostgreSQL
- Runtime: Node.js
- Framework: Next.js

### Automated Tests

Playwright is configured to use Chromium for automated browser testing.

## 7. Test Execution

Jest tests are executed using:

```bash
npm test
```

Playwright tests are executed using:

```bash
npx playwright test tests/tasks.spec.ts --workers=1
```

## 8. Current Test Coverage

### Jest

- API GET requests
- API POST requests
- API PATCH requests
- API DELETE requests
- Invalid priorities
- Invalid titles
- React component behavior

### Playwright

- Task creation
- Task editing
- Task completion
- Task favoriting
- Task deletion
- Required-field validation
- Search
- Search with no results
- Priority selection
- Favorites filtering
- Completed filtering
- Active filtering
- Whitespace validation
- Special-character input
- API task creation

## 9. Expected Result

All automated tests should pass before changes are considered ready.

Current test status:

- Jest: 16 passing
- Playwright: 19 passing