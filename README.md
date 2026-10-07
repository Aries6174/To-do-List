# TaskFlow

A full-stack task management web application built with Next.js, TypeScript, PostgreSQL, and Prisma.

The project focuses on task management, user authentication, API security, automated testing, and continuous integration.

## Features

- Create and edit tasks
- Delete tasks
- Mark tasks as completed
- Favorite tasks
- Search tasks
- Filter tasks by status and favorites
- Set task categories
- Set task priorities
- Set task due dates
- Form validation
- User registration and login
- Session-based authentication
- User-specific task access
- REST API for task management

## Tech Stack

### Application

- Next.js
- React
- TypeScript
- Tailwind CSS
- PostgreSQL
- Prisma
- Zod
- jose
- bcryptjs

### Testing

- Jest
- React Testing Library
- Playwright
- Chromium

### CI/CD

- GitHub Actions

## QA & Test Automation

The project includes automated testing for both application components and the full application flow.

### Jest

Jest and React Testing Library are used for unit, component, and API route testing.

Current coverage includes:

- Task API requests
- Task creation
- Task updates
- Task deletion
- Input validation
- Invalid priorities
- Invalid task IDs
- Invalid completion values
- Empty task updates
- TaskCard component behavior
- TaskForm component behavior

Current results:

- **19 tests passing**
- **81.48% statement coverage**
- **72.65% branch coverage**
- **80% function coverage**
- **85.27% line coverage**

### Playwright

Playwright is used for end-to-end testing and API testing.

Current coverage includes:

- User registration
- User login
- Authentication
- Task creation
- Task editing
- Task deletion
- Task completion
- Task favoriting
- Search
- Filtering
- Required-field validation
- Priority selection
- Whitespace input validation
- Special-character input
- API task creation
- API validation
- Authorization testing

Current results:

- **42 tests passing**

### Authorization Testing

The application includes tests to verify that users cannot access or modify another user's tasks.

Tests cover:

- Preventing users from updating another user's task
- Preventing users from deleting another user's task
- Preventing users from viewing another user's tasks

### Continuous Integration

GitHub Actions automatically runs the automated test suites when changes are pushed to the repository or submitted through a pull request.

The CI environment uses:

- Node.js
- PostgreSQL
- Prisma
- Jest
- Playwright
- Chromium

## Test Documentation

QA documentation is available in the `docs` directory:

- [Test Plan](./docs/test-plan.md)
- [Test Cases](./docs/test-cases.md)
- [Bug Reports](./docs/bug-reports.md)

## Test Results

| Test Suite | Tests | Result |
|---|---:|---|
| Jest | 19 | Passing |
| Playwright | 42 | Passing |
| **Total** | **61** | **Passing** |

## Test Coverage

The current Jest coverage is:

| Metric | Coverage |
|---|---:|
| Statements | 81.48% |
| Branches | 72.65% |
| Functions | 80% |
| Lines | 85.27% |

The project does not aim for 100% coverage. The focus is on testing important application behavior, API validation, authentication, authorization, and user workflows.

## Running Tests

Install dependencies:

```bash
npm install