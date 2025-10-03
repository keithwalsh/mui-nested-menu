# Simplified Menu Components

This directory contains a simplified version of the menubar system that uses the same `MenuConfig` structure but with a simpler implementation.

## Overview

The simplified menu components provide an easy way to create dropdown menus and menu bars without the complexity of the full menubar system. They're perfect for applications that need:

- Single dropdown menus
- Simple menu bars without hover navigation between menus
- Basic nested menus
- MenuConfig compatibility

## Components

### 1. SimpleMenuBar

A horizontal menu bar with multiple menu buttons. Each button opens its own menu independently.

**Features:**
- Multiple menu buttons in a row
- No complex hover navigation
- Independent menu state management
- Support for all MenuConfig item types

**Usage:**
```tsx
import { SimpleMenuBar } from './components';
import { MenuConfig } from './definitions';

const menuConfig: MenuConfig[] = [
  {
    label: 'File',
    items: [
      { kind: 'action', label: 'New', action: () => {}, icon: <Icon />, shortcut: 'Ctrl+N' },
      { kind: 'divider' },
      { kind: 'action', label: 'Open', action: () => {} },
    ],
  },
  {
    label: 'Edit',
    items: [
      { kind: 'action', label: 'Undo', action: () => {} },
    ],
  },
];

<SimpleMenuBar menuConfig={menuConfig} />
```

### 2. NestedDropdown

A single dropdown button with nested menu support.

**Features:**
- Single dropdown button
- Nested submenus
- Button variants (text, outlined, contained)
- MenuConfig compatible

**Usage:**
```tsx
import { NestedDropdown } from './components';
import { MenuConfig } from './definitions';

const menuConfig: MenuConfig = {
  label: 'File',
  items: [
    { kind: 'action', label: 'New', action: () => {} },
    {
      kind: 'submenu',
      label: 'Recent',
      items: [
        { kind: 'action', label: 'File 1', action: () => {} },
        { kind: 'action', label: 'File 2', action: () => {} },
      ],
    },
  ],
};

<NestedDropdown menuConfig={menuConfig} variant="contained" />
```

### 3. IconMenuItem

Enhanced menu item with icon, label, shortcut, and selected state support.

**Features:**
- Left icon support
- Keyboard shortcut display
- Selected state highlighting
- Disabled state

**Usage:**
```tsx
import { IconMenuItem } from './components';

<IconMenuItem
  label="Save"
  leftIcon={<SaveIcon />}
  shortcut="Ctrl+S"
  selected={false}
  onClick={() => {}}
/>
```

### 4. NestedMenuItem

Menu item that can contain nested submenus.

**Features:**
- Hover-based submenu opening
- Keyboard navigation support
- Configurable delay
- Icon support

## MenuConfig Structure

The components use the same MenuConfig structure as the menubar system:

```typescript
interface MenuConfig {
  id?: string;
  label: string;
  disabled?: boolean;
  items: MenuItems[];
}

type MenuItems = MenuItemAction | MenuItemDivider | MenuItemSubmenu;

interface MenuItemAction {
  kind: "action";
  label: string;
  action: () => void;
  icon?: React.ReactNode;
  shortcut?: string;
  disabled?: boolean;
  selected?: boolean;
}

interface MenuItemDivider {
  kind: "divider";
}

interface MenuItemSubmenu {
  kind: "submenu";
  label: string;
  items: MenuItems[];
  icon?: React.ReactNode;
  disabled?: boolean;
}
```

## Comparison with menubar/

| Feature | src/ (Simplified) | menubar/ (Full) |
|---------|------------------|-----------------|
| MenuConfig compatibility | ✅ | ✅ |
| Nested menus | ✅ | ✅ |
| Icons & shortcuts | ✅ | ✅ |
| Selected state | ✅ | ✅ |
| Disabled state | ✅ | ✅ |
| Hover navigation between menus | ❌ | ✅ |
| Complex popup state management | ❌ | ✅ |
| Custom item types | ❌ | ✅ |
| Cascading context | ❌ | ✅ |
| Dependencies | Standard MUI only | material-ui-popup-state |

## When to Use Which?

### Use src/ (Simplified) when:
- You need simple dropdown menus or a basic menu bar
- You don't need hover navigation between menus
- You want minimal dependencies
- You prefer simpler state management
- You're building a simple application or prototype

### Use menubar/ (Full) when:
- You need a full-featured menu bar with hover navigation
- You want native app-like menu behavior
- You need advanced features like custom menu items
- You're building a complex desktop-like application

## Examples

See the following files for examples:
- `src/Example.tsx` - Complete working example
- `src/stories/SimpleMenuBar.stories.tsx` - SimpleMenuBar examples
- `src/stories/NestedDropdownUpdated.stories.tsx` - NestedDropdown examples

## Migration from menubar/

The MenuConfig structure is fully compatible, so you can:

1. Copy your menuConfig from menubar
2. Use it with SimpleMenuBar or NestedDropdown
3. Everything should work with minor adjustments

The main difference is that SimpleMenuBar doesn't have hover navigation between menus - each menu operates independently.

