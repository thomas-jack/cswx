import { ChangeEvent, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { loadFile } from '../../utils/file';
import { checkInputSize } from '../../utils/debounce';

export interface InputPaneProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  maxLength?: number;
  showWarning?: boolean;
  className?: string;
  ariaLabel?: string;
}

export default function InputPane({
  value,
  onChange,
  placeholder,
  disabled = false,
  maxLength,
  showWarning = true,
  className = '',
  ariaLabel = 'Input area',
}: InputPaneProps) {
  const { t } = useTranslation();
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const sizeCheck = checkInputSize(value);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  }, []);

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    onChange(e.target.value);
  };

  const handlePaste = async () => {
    if (navigator.clipboard && navigator.clipboard.readText) {
      try {
        const text = await navigator.clipboard.readText();
        onChange(text);
      } catch (error) {
        console.error('Failed to paste:', error);
      }
    }
  };

  const handleLoadFile = async () => {
    const file = await loadFile();
    if (file && typeof file.content === 'string') {
      onChange(file.content);
    }
  };

  const handleClear = () => {
    onChange('');
    textareaRef.current?.focus();
  };

  return (
    <div className={`flex h-full flex-col ${className}`}>
      <div className="mb-2 flex items-center justify-between">
        <label
          htmlFor="input-textarea"
          className="text-sm font-semibold text-[var(--color-foreground)]"
        >
          {t('common.input')}
        </label>
        <div className="flex gap-2">
          <button
            onClick={handlePaste}
            disabled={disabled}
            className="rounded px-2 py-1 text-xs hover:bg-[var(--color-hover)] disabled:opacity-50"
            aria-label={t('common.paste')}
          >
            {t('common.paste')}
          </button>
          <button
            onClick={handleLoadFile}
            disabled={disabled}
            className="rounded px-2 py-1 text-xs hover:bg-[var(--color-hover)] disabled:opacity-50"
            aria-label={t('common.loadFile')}
          >
            {t('common.loadFile')}
          </button>
          <button
            onClick={handleClear}
            disabled={disabled || !value}
            className="rounded px-2 py-1 text-xs hover:bg-[var(--color-hover)] disabled:opacity-50"
            aria-label={t('common.clear')}
          >
            {t('common.clear')}
          </button>
        </div>
      </div>

      {showWarning && sizeCheck.isWarning && (
        <div
          className="mb-2 rounded bg-yellow-100 p-2 text-sm text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
          role="alert"
        >
          {t('warnings.largeInput', { size: sizeCheck.formattedSize })}
        </div>
      )}

      <textarea
        ref={textareaRef}
        id="input-textarea"
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        disabled={disabled}
        maxLength={maxLength}
        className="flex-1 resize-none rounded border border-[var(--color-border)] bg-[var(--color-background)] p-3 font-mono text-sm text-[var(--color-foreground)] focus:ring-2 focus:ring-blue-500 focus:outline-none"
        aria-label={ariaLabel}
      />
    </div>
  );
}
