# QA Bug Reports — Todo App

> The following are historical development bugs identified and resolved during testing. They are documented to demonstrate the defect reporting and troubleshooting process.

## BUG-001 — UI Tests Failed Because Browser Was Not Authenticated

**Severity:** High

**Priority:** High

**Status:** Resolved

### Description

UI tests that accessed protected task functionality failed because the authentication session created through the Playwright API request context was not available to the browser page.

### Steps to Reproduce

1. Log in using the Playwright `request` fixture.
2. Open the application using the Playwright `page` fixture.
3. Navigate to the task page.
4. Attempt to access protected task functionality.

### Expected Result

The browser should be authenticated and able to access the user's tasks.

### Actual Result

The browser was not authenticated, causing protected API requests to return `401 Unauthorized`.

### Root Cause

The API request context and browser page did not share the same authentication cookies.

### Resolution

The UI tests were updated to perform the login through the browser page before testing protected UI functionality.

---

## BUG-002 — Playwright Could Not Check Hidden Priority Radio Button

**Severity:** Medium

**Priority:** Medium

**Status:** Resolved

### Description

The Playwright test for task priority failed when attempting to use `.check()` on the priority radio input.

### Steps to Reproduce

1. Open the Add Task dialog.
2. Locate the priority radio input.
3. Attempt to select the priority using Playwright `.check()`.

### Expected Result

The selected priority should be changed successfully.

### Actual Result

Playwright reported that the input could not be checked because the radio input was hidden.

### Root Cause

The radio input used a hidden CSS class while the visible priority option was represented by its associated UI element.

### Resolution

The test was changed to click the visible priority label instead of directly checking the hidden input.