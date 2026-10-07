# QA Test Plan — Todo App

## 1. Overview

This document describes the testing approach for the Todo App. The goal is to verify that the application's main features work correctly, that the API handles valid and invalid requests properly, and that users cannot access or modify data that belongs to other users.

## 2. Testing Objectives

The main objectives are to:

* Verify that users can register and log in successfully.
* Verify that users can create, edit, complete, favorite, search, filter, and delete tasks.
* Verify that the API accepts valid requests and rejects invalid data.
* Verify authentication and authorization controls.
* Verify that users cannot access or modify another user's tasks.
* Detect regressions when new changes are introduced.

## 3. Scope

### In Scope

* User registration
* User login and logout
* Task creation
* Task editing
* Task completion
* Task deletion
* Task favorites
* Task search
* Task filtering
* Task priority
* Input validation
* Task API endpoints
* Authentication
* Authorization
* Cross-user access protection

### Out of Scope

* Performance/load testing
* Mobile application testing
* Production infrastructure testing
* Third-party service testing

## 4. Testing Types

### UI Testing

Playwright is used to verify functionality through the application's user interface.

Examples:

* Creating a task
* Editing a task
* Completing a task
* Searching for tasks
* Filtering tasks
* Validating form inputs

### API Testing

Playwright API requests are used to test backend endpoints directly.

Examples:

* Creating tasks through the API
* Validating task input
* Testing invalid priority values
* Testing empty and whitespace-only titles

### Security Testing

Authorization tests verify that authenticated users cannot access another user's tasks.

Examples:

* Preventing unauthorized task updates
* Preventing unauthorized task deletion
* Preventing users from viewing another user's tasks

## 5. Test Environment

**Application:** Todo App

**Frontend:** Next.js, React, TypeScript, Tailwind CSS

**Database:** PostgreSQL

**API:** Next.js API Routes

**Testing Framework:** Playwright

**Test Browser:** Chromium

**Test Database:** PostgreSQL test database

## 6. Test Organization

Automated tests are organized by testing purpose:

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

## 7. Entry Criteria

Testing can begin when:

* The application starts successfully.
* The test database is available.
* Required environment variables are configured.
* The test user is available.
* Playwright dependencies are installed.

## 8. Exit Criteria

Testing is considered successful when:

* All planned automated tests pass.
* No critical authentication or authorization issues remain.
* Major task functionality works as expected.
* Validation errors are handled correctly.

## 9. Current Test Coverage

The current Playwright test suite contains **37 automated tests** covering UI, API, authentication, validation, and authorization scenarios.

The full test suite currently passes successfully.
