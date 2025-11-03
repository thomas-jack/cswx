import { Link } from 'react-router-dom';
import { toolRegistry } from '../registry/ToolRegistry';

export default function HomePage() {
  const tools = toolRegistry.getAll();

  return (
    <div className="text-[var(--color-foreground)]">
      <h2 className="mb-4 text-3xl font-bold">Welcome to CSWX</h2>
      <p className="mb-4 text-lg">
        A modular tool framework with extensible components and i18n support.
      </p>

      {tools.length > 0 && (
        <div className="mb-8">
          <h3 className="mb-4 text-2xl font-semibold">Available Tools</h3>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {tools.map((tool) => (
              <Link
                key={tool.id}
                to={tool.path}
                className="rounded-lg border border-[var(--color-border)] bg-[var(--color-sidebar)] p-6 transition-all hover:border-blue-500 hover:shadow-lg"
              >
                <h4 className="mb-2 text-xl font-semibold">{tool.name}</h4>
                <p className="text-sm text-gray-500">{tool.description}</p>
                {tool.category && (
                  <span className="mt-3 inline-block rounded bg-blue-100 px-2 py-1 text-xs font-medium text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                    {tool.category}
                  </span>
                )}
              </Link>
            ))}
          </div>
        </div>
      )}

      <div className="mt-8 rounded-lg bg-blue-50 p-6 dark:bg-blue-900/20">
        <h3 className="mb-3 text-xl font-semibold">Framework Features</h3>
        <ul className="space-y-2 text-sm">
          <li>✓ Modular tool registration system</li>
          <li>✓ Shared UI components (Input/Output panes, History sidebar)</li>
          <li>✓ Internationalization (English & Chinese)</li>
          <li>✓ Clipboard integration</li>
          <li>✓ File import/export</li>
          <li>✓ Web Worker support for heavy operations</li>
          <li>✓ LocalStorage-based history management</li>
          <li>✓ Accessibility features (keyboard navigation, ARIA labels)</li>
          <li>✓ Dark/Light theme support</li>
        </ul>
      </div>
    </div>
  );
}
