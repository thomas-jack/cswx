import { Link, useLocation } from 'react-router-dom';
import { ReactNode } from 'react';

interface SidebarProps {
  isOpen: boolean;
}

interface NavItem {
  path: string;
  label: string;
  icon: ReactNode;
}

const navItems: NavItem[] = [
  {
    path: '/',
    label: 'Home',
    icon: (
      <svg
        className="h-5 w-5"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
        />
      </svg>
    ),
  },
];

export default function Sidebar({ isOpen }: SidebarProps) {
  const location = useLocation();

  if (!isOpen) return null;

  return (
    <aside className="w-64 border-r border-[var(--color-border)] bg-[var(--color-sidebar)]">
      <nav className="p-4">
        <ul className="space-y-2">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={`flex items-center gap-3 rounded-lg px-4 py-2 transition-colors ${
                    isActive
                      ? 'bg-[var(--color-primary)] text-white'
                      : 'text-[var(--color-foreground)] hover:bg-[var(--color-hover)]'
                  }`}
                >
                  {item.icon}
                  <span className="font-medium">{item.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
        <div className="mt-6 border-t border-[var(--color-border)] pt-4">
          <p className="px-4 text-sm text-gray-500">
            Tool placeholders will appear here
          </p>
        </div>
      </nav>
    </aside>
  );
}
