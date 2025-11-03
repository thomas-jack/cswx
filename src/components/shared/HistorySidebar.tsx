import { useTranslation } from 'react-i18next';
import { HistoryEntry } from '../../utils/storage';

export interface HistorySidebarProps<T = unknown> {
  entries: HistoryEntry<T>[];
  onSelect: (entry: HistoryEntry<T>) => void;
  onClear: () => void;
  renderEntry?: (entry: HistoryEntry<T>) => string;
  className?: string;
  isOpen?: boolean;
  onClose?: () => void;
}

export default function HistorySidebar<T>({
  entries,
  onSelect,
  onClear,
  renderEntry,
  className = '',
  isOpen = true,
  onClose,
}: HistorySidebarProps<T>) {
  const { t } = useTranslation();

  const formatTimestamp = (timestamp: number) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diff = now.getTime() - date.getTime();

    if (diff < 60000) {
      return 'Just now';
    } else if (diff < 3600000) {
      return `${Math.floor(diff / 60000)}m ago`;
    } else if (diff < 86400000) {
      return `${Math.floor(diff / 3600000)}h ago`;
    } else {
      return date.toLocaleDateString();
    }
  };

  const defaultRenderEntry = (entry: HistoryEntry<T>) => {
    const data = entry.data as { input?: string };
    if (data && typeof data === 'object' && 'input' in data) {
      const preview = String(data.input).substring(0, 50);
      return preview.length < String(data.input).length
        ? preview + '...'
        : preview;
    }
    return JSON.stringify(entry.data).substring(0, 50);
  };

  if (!isOpen) {
    return null;
  }

  return (
    <aside
      className={`flex h-full w-64 flex-col border-l border-[var(--color-border)] bg-[var(--color-sidebar)] ${className}`}
      role="complementary"
      aria-label={t('common.history')}
    >
      <div className="flex items-center justify-between border-b border-[var(--color-border)] p-4">
        <h3 className="font-semibold text-[var(--color-foreground)]">
          {t('common.history')}
        </h3>
        <div className="flex gap-2">
          {entries.length > 0 && (
            <button
              onClick={() => {
                if (window.confirm(t('history.confirmClear'))) {
                  onClear();
                }
              }}
              className="text-xs text-red-600 hover:text-red-700 dark:text-red-400"
              aria-label={t('history.clearHistory')}
            >
              {t('common.clear')}
            </button>
          )}
          {onClose && (
            <button
              onClick={onClose}
              className="text-xs hover:text-[var(--color-foreground)]"
              aria-label={t('common.close')}
            >
              ✕
            </button>
          )}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        {entries.length === 0 ? (
          <div className="p-4 text-center text-sm text-gray-500">
            {t('history.noHistory')}
          </div>
        ) : (
          <ul className="divide-y divide-[var(--color-border)]">
            {entries.map((entry) => (
              <li key={entry.id}>
                <button
                  onClick={() => onSelect(entry)}
                  className="w-full p-4 text-left transition-colors hover:bg-[var(--color-hover)] focus:bg-[var(--color-hover)] focus:outline-none"
                >
                  <div className="mb-1 text-xs text-gray-500">
                    {formatTimestamp(entry.timestamp)}
                  </div>
                  <div className="truncate text-sm text-[var(--color-foreground)]">
                    {renderEntry
                      ? renderEntry(entry)
                      : defaultRenderEntry(entry)}
                  </div>
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </aside>
  );
}
