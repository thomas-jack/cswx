import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import HistorySidebar from './HistorySidebar';
import { HistoryEntry } from '../../utils/storage';

describe('HistorySidebar', () => {
  const mockEntries: HistoryEntry<{ input: string }>[] = [
    {
      id: '1',
      timestamp: Date.now(),
      data: { input: 'test 1' },
    },
    {
      id: '2',
      timestamp: Date.now() - 60000,
      data: { input: 'test 2' },
    },
  ];

  it('should render entries', () => {
    render(
      <HistorySidebar
        entries={mockEntries}
        onSelect={vi.fn()}
        onClear={vi.fn()}
      />
    );

    expect(screen.getByText(/test 1/)).toBeInTheDocument();
    expect(screen.getByText(/test 2/)).toBeInTheDocument();
  });

  it('should show "no history" message when empty', () => {
    render(
      <HistorySidebar entries={[]} onSelect={vi.fn()} onClear={vi.fn()} />
    );

    expect(screen.getByText('history.noHistory')).toBeInTheDocument();
  });

  it('should call onSelect when entry is clicked', async () => {
    const handleSelect = vi.fn();
    render(
      <HistorySidebar
        entries={mockEntries}
        onSelect={handleSelect}
        onClear={vi.fn()}
      />
    );

    const entry = screen.getByText(/test 1/);
    await userEvent.click(entry);

    expect(handleSelect).toHaveBeenCalledWith(mockEntries[0]);
  });

  it('should not render when isOpen is false', () => {
    const { container } = render(
      <HistorySidebar
        entries={mockEntries}
        onSelect={vi.fn()}
        onClear={vi.fn()}
        isOpen={false}
      />
    );

    expect(container.firstChild).toBeNull();
  });
});
