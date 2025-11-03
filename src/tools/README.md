# Tools Directory

This directory contains individual tool implementations that use the framework.

## Creating a New Tool

1. **Create the tool component** in this directory (e.g., `MyTool.tsx`)
2. **Register it** in `App.tsx` using `toolRegistry.register()`
3. **Add a route** in the App's Routes section

## Example Tool Structure

```tsx
import { useState } from 'react';
import InputPane from '../components/shared/InputPane';
import OutputPane from '../components/shared/OutputPane';
import OptionsPanel from '../components/shared/OptionsPanel';
import { useHistory } from '../hooks/useHistory';

export default function MyTool() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');

  const history = useHistory({
    storageKey: 'my-tool-history',
    maxEntries: 20,
  });

  return (
    <div className="flex h-full gap-4">
      <div className="flex flex-1 flex-col gap-4">
        <InputPane value={input} onChange={setInput} />
        <OutputPane value={output} />
        <OptionsPanel>
          {/* Your options here */}
        </OptionsPanel>
      </div>
    </div>
  );
}
```

## Available Tools

- **DemoTool** - Demonstration of framework features including:
  - Text transformation operations
  - History management with undo/redo
  - Web Worker integration
  - Debounced input processing
  - Responsive layout with sidebar

## Best Practices

1. Use shared components for consistency
2. Implement history management for important operations
3. Use Web Workers for heavy processing
4. Add debouncing for real-time operations
5. Provide clear ARIA labels for accessibility
6. Add i18n translations
7. Write unit tests
