import { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';

export interface OptionsPanelProps {
  children: ReactNode;
  className?: string;
  title?: string;
}

export default function OptionsPanel({
  children,
  className = '',
  title,
}: OptionsPanelProps) {
  const { t } = useTranslation();

  return (
    <div
      className={`rounded-lg border border-[var(--color-border)] bg-[var(--color-sidebar)] p-4 ${className}`}
      role="region"
      aria-label={title || t('common.options')}
    >
      {title && (
        <h3 className="mb-3 text-sm font-semibold text-[var(--color-foreground)]">
          {title}
        </h3>
      )}
      <div className="space-y-3">{children}</div>
    </div>
  );
}

export function OptionGroup({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  return (
    <div className="space-y-2">
      <label className="block text-xs font-medium text-[var(--color-foreground)]">
        {label}
      </label>
      {children}
    </div>
  );
}

export function OptionButton({
  onClick,
  children,
  disabled = false,
  variant = 'default',
}: {
  onClick: () => void;
  children: ReactNode;
  disabled?: boolean;
  variant?: 'default' | 'primary' | 'danger';
}) {
  const baseClasses =
    'w-full rounded px-3 py-2 text-sm font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed';
  const variantClasses = {
    default:
      'bg-[var(--color-background)] hover:bg-[var(--color-hover)] text-[var(--color-foreground)]',
    primary: 'bg-blue-600 hover:bg-blue-700 text-white',
    danger: 'bg-red-600 hover:bg-red-700 text-white',
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${variantClasses[variant]}`}
    >
      {children}
    </button>
  );
}
