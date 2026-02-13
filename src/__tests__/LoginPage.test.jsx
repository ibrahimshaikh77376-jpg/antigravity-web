import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useState } from 'react';

/**
 * LoginPage Component Tests
 * Tests for login functionality and form validation
 */

const LoginPage = ({ onLogin }) => {
  const [role, setRole] = useState('Admin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Validation
    if (!email || !password) {
      setError('Email and password are required');
      setLoading(false);
      return;
    }

    if (!email.includes('@')) {
      setError('Invalid email format');
      setLoading(false);
      return;
    }

    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      onLogin({ email, password, role });
    }, 500);
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="role">Role</label>
          <select 
            id="role"
            value={role} 
            onChange={(e) => setRole(e.target.value)}
          >
            <option>Admin</option>
            <option>Employee</option>
            <option>Client</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter email"
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
          />
        </div>

        {error && <div className="error-message">{error}</div>}
        {loading && <div className="loading">Loading...</div>}

        <button type="submit" disabled={loading}>
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>
    </div>
  );
};

describe('LoginPage Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render login form', () => {
    render(<LoginPage onLogin={vi.fn()} />);
    expect(screen.getByText('Login')).toBeInTheDocument();
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
    expect(screen.getByLabelText('Password')).toBeInTheDocument();
  });

  it('should render role selector', () => {
    render(<LoginPage onLogin={vi.fn()} />);
    const roleSelect = screen.getByLabelText('Role');
    expect(roleSelect).toBeInTheDocument();
    expect(screen.getByRole('option', { name: 'Admin' })).toBeInTheDocument();
    expect(screen.getByRole('option', { name: 'Employee' })).toBeInTheDocument();
    expect(screen.getByRole('option', { name: 'Client' })).toBeInTheDocument();
  });

  it('should render login button', () => {
    render(<LoginPage onLogin={vi.fn()} />);
    expect(screen.getByRole('button', { name: 'Login' })).toBeInTheDocument();
  });

  it('should show error when email is empty', async () => {
    const user = userEvent.setup();
    render(<LoginPage onLogin={vi.fn()} />);

    const loginButton = screen.getByRole('button', { name: 'Login' });
    await user.click(loginButton);

    expect(screen.getByText('Email and password are required')).toBeInTheDocument();
  });

  it('should show error for invalid email format', async () => {
    const user = userEvent.setup();
    render(<LoginPage onLogin={vi.fn()} />);

    const emailInput = screen.getByLabelText('Email');
    const passwordInput = screen.getByLabelText('Password');
    const loginButton = screen.getByRole('button', { name: 'Login' });

    await user.type(emailInput, 'invalidemail');
    await user.type(passwordInput, 'password123');
    await user.click(loginButton);

    expect(screen.getByText('Invalid email format')).toBeInTheDocument();
  });

  it('should call onLogin with correct credentials', async () => {
    const onLogin = vi.fn();
    const user = userEvent.setup();
    render(<LoginPage onLogin={onLogin} />);

    const emailInput = screen.getByLabelText('Email');
    const passwordInput = screen.getByLabelText('Password');
    const loginButton = screen.getByRole('button', { name: 'Login' });

    await user.type(emailInput, 'test@example.com');
    await user.type(passwordInput, 'password123');
    await user.click(loginButton);

    await waitFor(() => {
      expect(onLogin).toHaveBeenCalledWith(
        expect.objectContaining({
          email: 'test@example.com',
          password: 'password123',
          role: 'Admin'
        })
      );
    });
  });

  it('should disable submit button while loading', async () => {
    const user = userEvent.setup();
    render(<LoginPage onLogin={vi.fn()} />);

    const emailInput = screen.getByLabelText('Email');
    const passwordInput = screen.getByLabelText('Password');
    const loginButton = screen.getByRole('button', { name: 'Login' });

    await user.type(emailInput, 'test@example.com');
    await user.type(passwordInput, 'password123');
    await user.click(loginButton);

    expect(loginButton).toBeDisabled();
  });

  it('should change role when selected', async () => {
    const user = userEvent.setup();
    const onLogin = vi.fn();
    render(<LoginPage onLogin={onLogin} />);

    const roleSelect = screen.getByLabelText('Role');
    await user.selectOptions(roleSelect, 'Employee');

    const emailInput = screen.getByLabelText('Email');
    const passwordInput = screen.getByLabelText('Password');
    const loginButton = screen.getByRole('button', { name: 'Login' });

    await user.type(emailInput, 'test@example.com');
    await user.type(passwordInput, 'password123');
    await user.click(loginButton);

    await waitFor(() => {
      expect(onLogin).toHaveBeenCalledWith(
        expect.objectContaining({
          role: 'Employee'
        })
      );
    });
  });
});
