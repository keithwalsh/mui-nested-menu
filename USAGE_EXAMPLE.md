# Using Simplified Menu Components with menuConfig.tsx

This document shows how to use the simplified menu components from `src/` with the same `MenuConfig` structure as `menubar/`.

## Quick Start

### 1. Using SimpleMenuBar (Horizontal Menu Bar)

```tsx
import { SimpleMenuBar } from './src/components';
import { createMenuConfig } from './menuConfig';

function MyApp() {
  const [text, setText] = useState('');
  const [filePath, setFilePath] = useState<string | null>(null);
  // ... other state

  const menuConfig = createMenuConfig({
    text,
    filePath,
    setText,
    setFilePath,
    // ... other props
  });

  return (
    <Box>
      <SimpleMenuBar menuConfig={menuConfig} />
      {/* Your app content */}
    </Box>
  );
}
```

### 2. Using NestedDropdown (Single Dropdown)

```tsx
import { NestedDropdown } from './src/components';
import { createMenuConfig } from './menuConfig';

function MyApp() {
  const menuConfig = createMenuConfig({ /* ... */ });

  return (
    <Box>
      {/* Show just the File menu as a dropdown */}
      <NestedDropdown menuConfig={menuConfig[0]} variant="contained" />
      
      {/* Or show multiple dropdowns side by side */}
      <Box sx={{ display: 'flex', gap: 2 }}>
        <NestedDropdown menuConfig={menuConfig[0]} />
        <NestedDropdown menuConfig={menuConfig[1]} />
        <NestedDropdown menuConfig={menuConfig[2]} />
      </Box>
    </Box>
  );
}
```

## MenuConfig Structure

The `menuConfig.tsx` file already exports a `MenuConfig` structure that works perfectly with these components:

```tsx
// From menuConfig.tsx
export function createMenuConfig(params: CreateMenuConfigParams): MenuConfig[] {
  return [
    {
      label: 'File',
      items: [
        { kind: 'action', label: 'New', shortcut: 'Ctrl+N', icon: <NoteAdd />, action: () => {...} },
        { kind: 'action', label: 'Open...', shortcut: 'Ctrl+O', icon: <FileOpen />, action: async () => {...} },
        { kind: 'divider' },
        { kind: 'action', label: 'Save', shortcut: 'Ctrl+S', icon: <Save />, action: async () => {...} },
        // ...
      ]
    },
    {
      label: 'Edit',
      items: [
        { kind: 'action', label: 'Undo', shortcut: 'Ctrl+Z', icon: <Undo />, action: () => {...} },
        // ...
      ]
    },
    // ...
  ];
}
```

## Key Features

Both `SimpleMenuBar` and `NestedDropdown` support:

✅ **Actions** - Menu items that execute functions
```tsx
{ kind: 'action', label: 'Save', action: () => save(), icon: <Save />, shortcut: 'Ctrl+S' }
```

✅ **Dividers** - Visual separators
```tsx
{ kind: 'divider' }
```

✅ **Submenus** - Nested menu items
```tsx
{
  kind: 'submenu',
  label: 'Zoom',
  icon: <ZoomIn />,
  items: [
    { kind: 'action', label: 'Zoom In', action: () => {...} },
    { kind: 'action', label: 'Zoom Out', action: () => {...} },
  ]
}
```

✅ **Icons** - Display icons next to labels
✅ **Shortcuts** - Show keyboard shortcuts
✅ **Disabled state** - Disable individual items or entire menus
✅ **Selected state** - Show selected/active items

## Differences from menubar/

The simplified components (`src/`) provide the same MenuConfig structure but with simpler behavior:

| Feature | SimpleMenuBar (src/) | MenuBar (menubar/) |
|---------|---------------------|-------------------|
| Menu structure | Same MenuConfig | Same MenuConfig |
| Hover between menus | ❌ No | ✅ Yes |
| Each menu independent | ✅ Yes | ❌ No (coordinated) |
| Complexity | Low | High |
| Dependencies | MUI only | MUI + popup-state |

**When to use SimpleMenuBar:**
- You want a simple menu bar
- You don't need hover navigation between menus
- You prefer simpler code

**When to use MenuBar (from menubar/):**
- You need native app-like menu behavior
- You want hover navigation between menus
- You're building a desktop-like app

## Complete Example

```tsx
import React, { useState } from 'react';
import { Box, Paper } from '@mui/material';
import { SimpleMenuBar, NestedDropdown } from './src/components';
import { createMenuConfig } from './menuConfig';

export function App() {
  const [text, setText] = useState('');
  const [filePath, setFilePath] = useState<string | null>(null);
  const [devToolsOpen, setDevToolsOpen] = useState(false);
  const [spellCheckEnabled, setSpellCheckEnabled] = useState(false);
  const [statusBarVisible, setStatusBarVisible] = useState(true);

  const undo = () => {/* ... */};
  const redo = () => {/* ... */};

  const menuConfig = createMenuConfig({
    text,
    filePath,
    devToolsOpen,
    spellCheckEnabled,
    statusBarVisible,
    setText,
    setFilePath,
    setSpellCheckEnabled,
    setStatusBarVisible,
    undo,
    redo,
    canUndo: false,
    canRedo: false,
  });

  return (
    <Box>
      {/* Option 1: Horizontal menu bar */}
      <Paper sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <SimpleMenuBar menuConfig={menuConfig} />
      </Paper>

      {/* Option 2: Individual dropdowns */}
      <Box sx={{ p: 2, display: 'flex', gap: 2 }}>
        <NestedDropdown menuConfig={menuConfig[0]} variant="outlined" />
        <NestedDropdown menuConfig={menuConfig[1]} variant="outlined" />
        <NestedDropdown menuConfig={menuConfig[2]} variant="outlined" />
      </Box>

      {/* Your app content */}
      <Box sx={{ p: 2 }}>
        <textarea value={text} onChange={(e) => setText(e.target.value)} />
      </Box>
    </Box>
  );
}
```

## See Also

- `src/README.md` - Full documentation of simplified components
- `src/Example.tsx` - Working example with all features
- `src/stories/SimpleMenuBar.stories.tsx` - Storybook examples
- `menubar/` - Full-featured menu bar implementation

