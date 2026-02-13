# Testing Guide for AI-ID Management

This guide explains how to set up, run, and write tests for the AI-ID Management application using Vitest and React Testing Library.

## 📋 Table of Contents

- [Installation](#installation)
- [Running Tests](#running-tests)
- [Test Structure](#test-structure)
- [Writing Tests](#writing-tests)
- [Coverage Reports](#coverage-reports)
- [Best Practices](#best-practices)
- [Common Issues](#common-issues)
- [Resources](#resources)

## 🚀 Installation

### Step 1: Install Dependencies

After cloning the repository, install all dependencies:

```bash
cd WORK
npm install
```

This will install:
- **vitest** - Fast unit test framework
- **@testing-library/react** - React component testing utilities
- **@testing-library/jest-dom** - Custom Jest matchers
- **@vitest/ui** - Visual test dashboard
- **@vitest/coverage-v8** - Code coverage analysis
- **jsdom** - Browser environment simulation

### Step 2: Verify Installation

Run the test suite to verify everything is installed correctly:

```bash
npm test
```

You should see output showing the tests running.

## 🧪 Running Tests

### Watch Mode (Development)

Automatically re-run tests when files change:

```bash
npm test
```

**Features:**
- 🔄 Auto re-run on file changes
- 👀 Watch for new test files
- ⌨️ Press 'q' to quit
- ⌨️ Press 'p' to filter by filename
- ⌨️ Press 't' to filter by test name

### Single Run

Run tests once and exit:

```bash
npm run test:run
```

Useful for:
- CI/CD pipelines
- Pre-commit hooks
- Build verification

### Interactive UI Dashboard

Visual test runner with results:

```bash
npm run test:ui
```

This opens a browser dashboard at `http://localhost:51204/__vitest__/` showing:
- ✅ Test results with pass/fail status
- 📊 Test execution times
- 🔍 File structure
- 📈 Coverage information

### Coverage Report

Generate detailed coverage statistics:

```bash
npm run test:coverage
```

This creates an HTML report in `coverage/index.html` showing:
- Line coverage percentage
- Branch coverage percentage
- Function coverage percentage
- Statement coverage percentage

Open in browser to see detailed coverage analysis.

## 📁 Test Structure

### Directory Layout

```
WORK/
├── src/
│   ├── __tests__/              # Test files
│   │   ├── utils.test.js       # Utility/API tests
│   │   ├── Modal.test.jsx      # Component tests
│   │   └── LoginPage.test.jsx  # Component tests
│   ├── main.jsx                # Main entry point
│   └── setupTests.js           # Test configuration
├── vitest.config.js            # Vitest configuration
└── package.json
```

### File Naming Convention

- **Test files**: `ComponentName.test.jsx` or `module.test.js`
- **Location**: `src/__tests__/` directory
- **Pattern**: One test file per component/module

## ✍️ Writing Tests

### Test File Template

```javascript
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { YourComponent } from '../YourComponent';

describe('YourComponent', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render without crashing', () => {
    render(<YourComponent />);
    expect(screen.getByText('Expected Text')).toBeInTheDocument();
  });

  it('should handle user interactions', async () => {
    render(<YourComponent />);
    const button = screen.getByRole('button');
    await userEvent.click(button);
    expect(screen.getByText('New Text')).toBeInTheDocument();
  });
});
```

### Testing Components

#### Basic Render Test

```javascript
it('should render the component', () => {
  render(<LoginPage />);
  expect(screen.getByText('Login')).toBeInTheDocument();
});
```

#### Testing User Input

```javascript
import userEvent from '@testing-library/user-event';

it('should update input value', async () => {
  render(<LoginPage />);
  const input = screen.getByLabelText('Email');
  
  await userEvent.type(input, 'test@example.com');
  
  expect(input.value).toBe('test@example.com');
});
```

#### Testing Callbacks

```javascript
it('should call onLogin when form is submitted', async () => {
  const onLogin = vi.fn();
  render(<LoginPage onLogin={onLogin} />);
  
  const button = screen.getByRole('button', { name: 'Login' });
  await userEvent.click(button);
  
  expect(onLogin).toHaveBeenCalled();
});
```

#### Testing Async Operations

```javascript
import { waitFor } from '@testing-library/react';

it('should handle async API calls', async () => {
  global.fetch = vi.fn(() =>
    Promise.resolve({
      ok: true,
      json: () => Promise.resolve({ success: true })
    })
  );

  render(<LoginPage />);
  const button = screen.getByRole('button');
  
  await userEvent.click(button);
  
  await waitFor(() => {
    expect(screen.getByText('Login successful')).toBeInTheDocument();
  });
});
```

### Testing API Calls

#### Mocking Fetch

```javascript
import { vi } from 'vitest';

beforeEach(() => {
  vi.clearAllMocks();
  global.fetch = vi.fn();
});

it('should make API call on login', async () => {
  global.fetch.mockResolvedValueOnce({
    ok: true,
    json: async () => ({ success: true })
  });

  // Your test code
  
  expect(global.fetch).toHaveBeenCalledWith(
    expect.stringContaining('api/auth'),
    expect.objectContaining({ method: 'POST' })
  );
});
```

#### Testing Error Handling

```javascript
it('should handle API errors', async () => {
  global.fetch.mockRejectedValueOnce(new Error('Network error'));
  
  render(<LoginPage />);
  const button = screen.getByRole('button');
  await userEvent.click(button);
  
  await waitFor(() => {
    expect(screen.getByText(/error/i)).toBeInTheDocument();
  });
});
```

## 📊 Coverage Reports

### Viewing Coverage

After running coverage:

```bash
npm run test:coverage
```

Open `coverage/index.html` in your browser to see:

- **Coverage Summary**: Overall coverage percentages
- **File Details**: Line-by-line coverage for each file
- **Uncovered Lines**: Highlighted in red
- **Branch Coverage**: Conditional statement coverage

### Coverage Thresholds

Set minimum coverage requirements in `vitest.config.js`:

```javascript
test: {
  coverage: {
    lines: 80,
    functions: 80,
    branches: 75,
    statements: 80
  }
}
```

Tests will fail if coverage falls below these thresholds.

## ✅ Best Practices

### 1. Test Naming

```javascript
// ❌ BAD
it('works', () => { /* ... */ });

// ✅ GOOD
it('should render login form when user navigates to login page', () => { /* ... */ });
```

### 2. Arrange-Act-Assert Pattern

```javascript
it('should update email on input change', async () => {
  // Arrange
  render(<LoginPage />);
  const emailInput = screen.getByLabelText('Email');
  
  // Act
  await userEvent.type(emailInput, 'test@example.com');
  
  // Assert
  expect(emailInput.value).toBe('test@example.com');
});
```

### 3. Test User Behavior

```javascript
// ❌ BAD - Testing implementation
expect(wrapper.state('email')).toBe('test@example.com');

// ✅ GOOD - Testing user behavior
expect(screen.getByLabelText('Email').value).toBe('test@example.com');
```

### 4. Use Data Test IDs for Complex Queries

```javascript
// In component
<button data-testid="login-button">Login</button>

// In test
const button = screen.getByTestId('login-button');
```

### 5. Clean Up After Tests

```javascript
beforeEach(() => {
  vi.clearAllMocks();
  localStorage.clear();
});

afterEach(() => {
  cleanup();
});
```

## 🐛 Common Issues

### Issue: "Cannot find module" Error

**Problem:** Imports are not resolving correctly

**Solution:** Ensure path alias is set in `vitest.config.js`:

```javascript
resolve: {
  alias: {
    '@': path.resolve(__dirname, './src'),
  },
}
```

### Issue: Tests Timeout

**Problem:** Async operations take too long

**Solution:** Increase timeout:

```javascript
it('should handle slow API', async () => {
  // test code
}, 10000); // 10 second timeout
```

### Issue: "fetch is not defined"

**Problem:** Global fetch not available in test environment

**Solution:** It's already mocked in `setupTests.js`, but ensure it's imported:

```javascript
import { vi } from 'vitest';
global.fetch = vi.fn();
```

### Issue: React State Not Updating in Tests

**Problem:** State changes not reflected in test

**Solution:** Use `waitFor` for state updates:

```javascript
await waitFor(() => {
  expect(screen.getByText('Updated Text')).toBeInTheDocument();
});
```

## 📚 Resources

### Vitest Documentation
- [Vitest Official Docs](https://vitest.dev/)
- [Vitest Configuration](https://vitest.dev/config/)

### React Testing Library
- [React Testing Library Docs](https://testing-library.com/react)
- [Common Queries](https://testing-library.com/queries/about)
- [User Interactions](https://testing-library.com/user-interaction)

### Testing Best Practices
- [Testing Library Guiding Principles](https://testing-library.com/guiding-principles)
- [JavaScript Testing Best Practices](https://github.com/goldbergyoni/javascript-testing-best-practices)

### Example Tests in This Project
- `src/__tests__/utils.test.js` - API and validation tests
- `src/__tests__/Modal.test.jsx` - Component structure tests
- `src/__tests__/LoginPage.test.jsx` - Form and interaction tests

## 🎯 Next Steps

1. **Run the existing tests**:
   ```bash
   npm test
   ```

2. **View the test UI**:
   ```bash
   npm run test:ui
   ```

3. **Add more tests** for your components following the patterns in existing test files

4. **Generate coverage reports**:
   ```bash
   npm run test:coverage
   ```

5. **Integrate into CI/CD** using GitHub Actions (see example workflow below)

## 🔄 CI/CD Integration (GitHub Actions)

Create `.github/workflows/test.yml`:

```yaml
name: Tests

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: cd WORK && npm install
      - run: cd WORK && npm run test:run
      - run: cd WORK && npm run test:coverage
```

---

**Happy Testing! 🚀**

For questions or issues, refer to the resources above or create a GitHub issue.