export default function HomePage() {
  return (
    <div className="text-[var(--color-foreground)]">
      <h2 className="mb-4 text-3xl font-bold">Welcome to CSWX</h2>
      <p className="mb-4 text-lg">
        This is a modular application shell ready for tools and features.
      </p>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <div className="rounded-lg border border-[var(--color-border)] bg-[var(--color-sidebar)] p-6">
          <h3 className="mb-2 text-xl font-semibold">Placeholder Tool 1</h3>
          <p className="text-sm text-gray-500">
            Future tool functionality will be added here
          </p>
        </div>
        <div className="rounded-lg border border-[var(--color-border)] bg-[var(--color-sidebar)] p-6">
          <h3 className="mb-2 text-xl font-semibold">Placeholder Tool 2</h3>
          <p className="text-sm text-gray-500">
            Future tool functionality will be added here
          </p>
        </div>
        <div className="rounded-lg border border-[var(--color-border)] bg-[var(--color-sidebar)] p-6">
          <h3 className="mb-2 text-xl font-semibold">Placeholder Tool 3</h3>
          <p className="text-sm text-gray-500">
            Future tool functionality will be added here
          </p>
        </div>
      </div>
    </div>
  );
}
