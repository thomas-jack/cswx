import { Routes, Route } from 'react-router-dom';
import { Suspense, useEffect } from 'react';
import AppShell from './components/AppShell';
import HomePage from './pages/HomePage';
import DemoTool from './tools/DemoTool';
import { toolRegistry } from './registry/ToolRegistry';

function App() {
  useEffect(() => {
    toolRegistry.register({
      id: 'demo',
      name: 'Demo Tool',
      description: 'A demonstration tool showcasing the framework features',
      path: '/demo',
      component: DemoTool,
      category: 'utilities',
    });
  }, []);

  return (
    <AppShell>
      <Suspense
        fallback={
          <div className="flex h-full items-center justify-center">
            <div className="text-[var(--color-foreground)]">Loading...</div>
          </div>
        }
      >
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/demo" element={<DemoTool />} />
        </Routes>
      </Suspense>
    </AppShell>
  );
}

export default App;
