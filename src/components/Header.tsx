import ThemeToggle from './ThemeToggle';

interface HeaderProps {
  onMenuClick: () => void;
  isSidebarOpen: boolean;
}

export default function Header({ onMenuClick, isSidebarOpen }: HeaderProps) {
  return (
    <header className="flex h-16 items-center justify-between border-b border-[var(--color-border)] bg-[var(--color-background)] px-6">
      <div className="flex items-center gap-4">
        <button
          onClick={onMenuClick}
          className="rounded p-2 text-[var(--color-foreground)] hover:bg-[var(--color-hover)]"
          aria-label={isSidebarOpen ? 'Close sidebar' : 'Open sidebar'}
        >
          <svg
            className="h-6 w-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
        <h1 className="text-xl font-bold text-[var(--color-foreground)]">
          CSWX
        </h1>
      </div>
      <ThemeToggle />
    </header>
  );
}
