# Tool Framework Documentation

## Overview

This is a modular tool framework that allows developers to easily create and register tools with shared UI components, internationalization, history management, and more.

## Quick Start

### Creating a New Tool

1. Create a new component in `src/tools/`:

```tsx
import { useState } from 'react';
import InputPane from '../components/shared/InputPane';
import OutputPane from '../components/shared/OutputPane';

export default function MyTool() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');

  // Your tool logic here

  return (
    <div className="flex h-full gap-4">
      <div className="flex-1">
        <InputPane value={input} onChange={setInput} />
      </div>
      <div className="flex-1">
        <OutputPane value={output} />
      </div>
    </div>
  );
}
```

2. Register the tool in `App.tsx`:

```tsx
import { toolRegistry } from './registry/ToolRegistry';
import MyTool from './tools/MyTool';

useEffect(() => {
  toolRegistry.register({
    id: 'my-tool',
    name: 'My Tool',
    description: 'A custom tool',
    path: '/my-tool',
    component: MyTool,
    category: 'utilities',
  });
}, []);
```

3. Add a route:

```tsx
<Route path="/my-tool" element={<MyTool />} />
```

## Core Components

### InputPane

A textarea component with built-in clipboard, file loading, and clear functionality.

**Props:**
- `value: string` - The input value
- `onChange: (value: string) => void` - Change handler
- `placeholder?: string` - Placeholder text
- `disabled?: boolean` - Disable the input
- `showWarning?: boolean` - Show size warnings for large inputs

### OutputPane

A read-only textarea with copy and download functionality.

**Props:**
- `value: string` - The output value
- `placeholder?: string` - Placeholder text
- `filename?: string` - Default filename for downloads

### OptionsPanel

A container for tool options with consistent styling.

**Props:**
- `children: ReactNode` - Panel content
- `title?: string` - Panel title

### HistorySidebar

A sidebar for displaying and managing tool history.

**Props:**
- `entries: HistoryEntry<T>[]` - History entries
- `onSelect: (entry: HistoryEntry<T>) => void` - Selection handler
- `onClear: () => void` - Clear history handler
- `renderEntry?: (entry: HistoryEntry<T>) => string` - Custom entry renderer

## Utilities

### History Management

Use the `useHistory` hook for automatic history persistence:

```tsx
import { useHistory } from '../hooks/useHistory';

const history = useHistory({
  storageKey: 'my-tool-history',
  maxEntries: 20,
  enableUndoRedo: true,
});

// Add to history
history.add({ input, output });

// Undo/Redo
history.undo();
history.redo();
```

### Clipboard

```tsx
import { copyToClipboard, readFromClipboard } from '../utils/clipboard';

await copyToClipboard('text to copy');
const text = await readFromClipboard();
```

### File Handling

```tsx
import { loadFile, downloadFile } from '../utils/file';

// Load file
const file = await loadFile();
if (file) {
  console.log(file.content);
}

// Download file
downloadFile('content', 'filename.txt', 'text/plain');
```

### Web Worker

Use Web Workers for heavy operations:

```tsx
import { getWorker } from '../utils/worker';

const worker = getWorker();
const result = await worker.postMessage('operation', { data });
```

### Debouncing

```tsx
import { debounce } from '../utils/debounce';

const debouncedFn = debounce((value) => {
  // Heavy operation
}, 300);
```

## Internationalization

Add translations in `src/i18n/locales/`:

**en.json:**
```json
{
  "myTool": {
    "title": "My Tool",
    "description": "Tool description"
  }
}
```

**zh.json:**
```json
{
  "myTool": {
    "title": "我的工具",
    "description": "工具描述"
  }
}
```

Use in components:

```tsx
import { useTranslation } from 'react-i18next';

const { t } = useTranslation();
return <h1>{t('myTool.title')}</h1>;
```

## Accessibility

The framework includes built-in accessibility features:

- ARIA labels on all interactive elements
- Keyboard navigation support
- Focus management
- High-contrast mode compatibility

Always ensure:
- Buttons have descriptive labels
- Form inputs have associated labels
- Interactive elements are keyboard accessible
- Focus states are visible

## Testing

Test your tools using Vitest and React Testing Library:

```tsx
import { render, screen } from '@testing-library/react';
import MyTool from './MyTool';

test('renders tool', () => {
  render(<MyTool />);
  expect(screen.getByLabelText(/input/i)).toBeInTheDocument();
});
```

## Best Practices

1. **Keep tools modular** - Each tool should be self-contained
2. **Use shared components** - Leverage InputPane, OutputPane, etc.
3. **Add to history** - Save important state for user convenience
4. **Handle large inputs** - Use debouncing and workers for performance
5. **Internationalize** - Add translations for all user-facing text
6. **Test accessibility** - Ensure keyboard navigation works
7. **Write tests** - Cover core functionality with unit tests

## Example: Complete Tool Implementation

See `src/tools/DemoTool.tsx` for a complete example showcasing:
- Input/Output panes
- History management with undo/redo
- Web Worker integration
- Debounced processing
- Options panel
- Internationalization
