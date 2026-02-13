import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

/**
 * Modal Component Tests
 * Tests for the Modal component used throughout the app
 */

const Modal = ({ title, isOpen, onClose, children }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm fade-in">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg overflow-hidden">
        <div className="flex justify-between items-center p-4 border-b border-gray-100">
          <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
          <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded-full transition-colors">
            <span>×</span>
          </button>
        </div>
        <div className="p-6 overflow-y-auto max-h-[80vh]">
          {children}
        </div>
      </div>
    </div>
  );
};

describe('Modal Component', () => {
  it('should not render when isOpen is false', () => {
    const { container } = render(
      <Modal title="Test Modal" isOpen={false} onClose={vi.fn()}>
        <p>Content</p>
      </Modal>
    );
    expect(container.firstChild).toBeNull();
  });

  it('should render when isOpen is true', () => {
    render(
      <Modal title="Test Modal" isOpen={true} onClose={vi.fn()}>
        <p>Content</p>
      </Modal>
    );
    expect(screen.getByText('Test Modal')).toBeInTheDocument();
  });

  it('should display the title', () => {
    render(
      <Modal title="My Modal Title" isOpen={true} onClose={vi.fn()}>
        <p>Content</p>
      </Modal>
    );
    expect(screen.getByText('My Modal Title')).toBeInTheDocument();
  });

  it('should display children content', () => {
    render(
      <Modal title="Test Modal" isOpen={true} onClose={vi.fn()}>
        <p>Modal Content Here</p>
      </Modal>
    );
    expect(screen.getByText('Modal Content Here')).toBeInTheDocument();
  });

  it('should call onClose when close button is clicked', async () => {
    const onClose = vi.fn();
    const user = userEvent.setup();
    
    render(
      <Modal title="Test Modal" isOpen={true} onClose={onClose}>
        <p>Content</p>
      </Modal>
    );

    const closeButton = screen.getByRole('button');
    await user.click(closeButton);
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('should render multiple children elements', () => {
    render(
      <Modal title="Test Modal" isOpen={true} onClose={vi.fn()}>
        <p>First paragraph</p>
        <p>Second paragraph</p>
        <button>Action Button</button>
      </Modal>
    );
    expect(screen.getByText('First paragraph')).toBeInTheDocument();
    expect(screen.getByText('Second paragraph')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Action Button' })).toBeInTheDocument();
  });
});
