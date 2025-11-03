import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import DemoTool from './DemoTool';

vi.mock('../utils/worker', () => ({
  getWorker: () => ({
    postMessage: vi.fn().mockResolvedValue('processed'),
  }),
}));

describe('DemoTool', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('should render input and output panes', () => {
    render(<DemoTool />);

    expect(screen.getByLabelText(/input/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/output/i)).toBeInTheDocument();
  });

  it('should render operation buttons', () => {
    render(<DemoTool />);

    expect(
      screen.getByRole('button', { name: /demo.reverseText/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /demo.uppercase/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /demo.lowercase/i })
    ).toBeInTheDocument();
  });

  it('should have undo/redo buttons', () => {
    render(<DemoTool />);

    expect(
      screen.getByRole('button', { name: /common.undo/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /common.redo/i })
    ).toBeInTheDocument();
  });

  it('should have history sidebar visible by default', () => {
    render(<DemoTool />);

    expect(screen.queryByRole('complementary')).toBeInTheDocument();
  });
});
