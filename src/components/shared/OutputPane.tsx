import { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { copyToClipboard } from '../../utils/clipboard';
import { downloadFile } from '../../utils/file';

export interface OutputPaneProps {
  value: string;
  placeholder?: string;
  className?: string;
  ariaLabel?: string;
  filename?: string;
}

export default function OutputPane({
  value,
  placeholder,
  className = '',
  ariaLabel = 'Output area',
  filename = 'output.txt',
}: OutputPaneProps) {
  const { t } = useTranslation();
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleCopy = async () => {
    const success = await copyToClipboard(value);
    if (success) {
      const button = document.activeElement as HTMLButtonElement;
      const originalText = button?.textContent;
      if (button) {
        button.textContent = '✓';
        setTimeout(() => {
          button.textContent = originalText;
        }, 1000);
      }
    }
  };

  const handleDownload = () => {
    downloadFile(value, filename);
  };

  return (
    <div className={`flex h-full flex-col ${className}`}>
      <div className="mb-2 flex items-center justify-between">
        <label
          htmlFor="output-textarea"
          className="text-sm font-semibold text-[var(--color-foreground)]"
        >
          {t('common.output')}
        </label>
        <div className="flex gap-2">
          <button
            onClick={handleCopy}
            disabled={!value}
            className="rounded px-2 py-1 text-xs hover:bg-[var(--color-hover)] disabled:opacity-50"
            aria-label={t('common.copy')}
          >
            {t('common.copy')}
          </button>
          <button
            onClick={handleDownload}
            disabled={!value}
            className="rounded px-2 py-1 text-xs hover:bg-[var(--color-hover)] disabled:opacity-50"
            aria-label={t('common.download')}
          >
            {t('common.download')}
          </button>
        </div>
      </div>

      <textarea
        ref={textareaRef}
        id="output-textarea"
        value={value}
        readOnly
        placeholder={placeholder}
        className="flex-1 resize-none rounded border border-[var(--color-border)] bg-[var(--color-sidebar)] p-3 font-mono text-sm text-[var(--color-foreground)] focus:ring-2 focus:ring-blue-500 focus:outline-none"
        aria-label={ariaLabel}
      />
    </div>
  );
}
