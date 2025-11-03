import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import OutputPane from './OutputPane';

describe('OutputPane', () => {
  it('should render with value', () => {
    render(<OutputPane value="test output" />);

    const textarea = screen.getByRole('textbox');
    expect(textarea).toHaveValue('test output');
  });

  it('should be read-only', () => {
    render(<OutputPane value="test output" />);

    const textarea = screen.getByRole('textbox');
    expect(textarea).toHaveAttribute('readonly');
  });

  it('should display copy button', () => {
    render(<OutputPane value="test" />);

    const copyButton = screen.getByRole('button', { name: /copy/i });
    expect(copyButton).toBeInTheDocument();
  });

  it('should display download button', () => {
    render(<OutputPane value="test" />);

    const downloadButton = screen.getByRole('button', { name: /download/i });
    expect(downloadButton).toBeInTheDocument();
  });

  it('should disable buttons when value is empty', () => {
    render(<OutputPane value="" />);

    const copyButton = screen.getByRole('button', { name: /copy/i });
    const downloadButton = screen.getByRole('button', { name: /download/i });

    expect(copyButton).toBeDisabled();
    expect(downloadButton).toBeDisabled();
  });
});
