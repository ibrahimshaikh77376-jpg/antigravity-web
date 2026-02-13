import { describe, it, expect, beforeEach, vi } from 'vitest';

/**
 * API Service Helper Tests
 * Tests for API calls to Google Apps Script
 */

// Mock API Service
const apiService = async (action, payload = {}) => {
  try {
    const response = await fetch('https://script.google.com/macros/s/test/exec', {
      method: 'POST',
      headers: {
        'Content-Type': 'text/plain;charset=utf-8',
      },
      body: JSON.stringify({ action, payload })
    });

    if (!response.ok) {
      throw new Error(`HTTP Error: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("API Error Details:", error);
    return {
      success: false,
      message: `Connection Failed: ${error.message}`
    };
  }
};

// Validation functions
const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const validatePassword = (password) => {
  return password && password.length >= 6;
};

describe('API Service Helper', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    global.fetch = vi.fn();
  });

  it('should make a successful API call', async () => {
    const mockResponse = {
      success: true,
      message: 'Login successful',
      user: { id: 1, email: 'test@example.com' }
    };

    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse,
    });

    const result = await apiService('LOGIN', {
      email: 'test@example.com',
      password: 'password123'
    });

    expect(result.success).toBe(true);
    expect(result.user.email).toBe('test@example.com');
  });

  it('should handle API errors gracefully', async () => {
    global.fetch.mockRejectedValueOnce(new Error('Network error'));

    const result = await apiService('LOGIN', {
      email: 'test@example.com',
      password: 'password123'
    });

    expect(result.success).toBe(false);
    expect(result.message).toContain('Connection Failed');
  });

  it('should handle HTTP errors', async () => {
    global.fetch.mockResolvedValueOnce({
      ok: false,
      status: 500,
    });

    const result = await apiService('LOGIN', {
      email: 'test@example.com',
      password: 'password123'
    });

    expect(result.success).toBe(false);
    expect(result.message).toContain('Connection Failed');
  });

  it('should pass correct payload to API', async () => {
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ success: true }),
    });

    const payload = { email: 'test@example.com', password: 'pass123' };
    await apiService('LOGIN', payload);

    expect(global.fetch).toHaveBeenCalledWith(
      expect.any(String),
      expect.objectContaining({
        method: 'POST',
        body: expect.stringContaining('test@example.com')
      })
    );
  });
});

describe('Data Validation', () => {
  describe('Email Validation', () => {
    it('should validate correct email format', () => {
      expect(validateEmail('user@example.com')).toBe(true);
      expect(validateEmail('test.user@domain.co.uk')).toBe(true);
    });

    it('should reject invalid email format', () => {
      expect(validateEmail('notanemail')).toBe(false);
      expect(validateEmail('user@')).toBe(false);
      expect(validateEmail('@example.com')).toBe(false);
    });

    it('should reject empty email', () => {
      expect(validateEmail('')).toBe(false);
    });
  });

  describe('Password Validation', () => {
    it('should accept valid passwords', () => {
      expect(validatePassword('password123')).toBe(true);
      expect(validatePassword('securePass@2024')).toBe(true);
    });

    it('should reject passwords shorter than 6 characters', () => {
      expect(validatePassword('pass')).toBe(false);
      expect(validatePassword('12345')).toBe(false);
    });

    it('should reject empty password', () => {
      expect(validatePassword('')).toBe(false);
      expect(validatePassword(null)).toBe(false);
    });
  });
});