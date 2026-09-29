# TaskFlow

A full-stack task management web application built with Next.js, TypeScript, PostgreSQL, and Prisma.

The project focuses on building and testing the core task-management functionality, with user accounts and authentication planned as a future feature.

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
- REST API for task management

## Tech Stack

### Application

- Next.js
- React
- TypeScript
- Tailwind CSS
- PostgreSQL
- Prisma

### Testing

- Jest
- React Testing Library
- Playwright
- Chromium

## QA & Test Automation

The project includes automated testing for both the application UI and API.

### Jest

Jest is used for API and component testing.

Current coverage includes:

- GET task requests
- POST task requests
- PATCH task requests
- DELETE task requests
- Input validation
- Invalid priorities
- Invalid titles
- TaskCard component behavior

**16 Jest tests passing**

### Playwright

Playwright is used for end-to-end and API testing.

Current coverage includes:

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

**19 Playwright tests passing**

### Test Documentation

QA documentation is available in the [`QA`](./QA) directory:

- [Test Plan](./QA/Test-Plan.md)
- [Test Cases](./QA/Test-Cases.md)
- [Bug Reports](./QA/Bug-Reports.md)

## Test Results

| Test Suite | Tests | Result |
|---|---:|---|
| Jest | 16 | Passing |
| Playwright | 19 | Passing |
| **Total** | **35** | **Passing |

## Running Tests

Run Jest tests:

```bash
npm test