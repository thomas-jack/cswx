import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import InputPane from './InputPane';

describe('InputPane', () => {
  it('should render with initial value', () => {
    render(<InputPane value="test input" onChange={vi.fn()} />);

    const textarea = screen.getByRole('textbox');
    expect(textarea).toHaveValue('test input');
  });

  it('should call onChange when text is entered', async () => {
    const handleChange = vi.fn();
    render(<InputPane value="" onChange={handleChange} />);

    const textarea = screen.getByRole('textbox');
    await userEvent.type(textarea, 'new text');

    expect(handleChange).toHaveBeenCalled();
  });

  it('should display clear button', () => {
    render(<InputPane value="test" onChange={vi.fn()} />);

    const clearButton = screen.getByRole('button', { name: /clear/i });
    expect(clearButton).toBeInTheDocument();
  });

  it('should clear input when clear button is clicked', async () => {
    const handleChange = vi.fn();
    render(<InputPane value="test" onChange={handleChange} />);

    const clearButton = screen.getByRole('button', { name: /clear/i });
    await userEvent.click(clearButton);

    expect(handleChange).toHaveBeenCalledWith('');
  });

  it('should be disabled when disabled prop is true', () => {
    render(<InputPane value="" onChange={vi.fn()} disabled />);

    const textarea = screen.getByRole('textbox');
    expect(textarea).toBeDisabled();
  });
});
