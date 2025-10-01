# Storybook Stories

This directory contains Storybook stories for the MUI Nested Menu components.

## Stories Overview

### Introduction.mdx
Welcome page with library overview, installation instructions, and quick start guide.

### NestedDropdown.stories.tsx
Stories for the NestedDropdown component:
- **Basic** - Simple dropdown with flat menu items
- **Nested** - Multi-level nested menu structure
- **WithIcons** - Menu items with left icons
- **WithDelay** - Configurable hover delay before submenu opens
- **WithDisabledItems** - Disabled menu items and submenus
- **CustomButtonProps** - Custom button styling
- **MultipleDropdowns** - Multiple dropdown menus side by side

### ContextMenu.stories.tsx
Stories for the ContextMenu component:
- **Basic** - Simple right-click context menu
- **Nested** - Context menu with nested submenus
- **WithIcons** - Context menu items with icons
- **MultipleTargets** - Different context menus for different areas
- **FileExplorer** - Real-world file explorer example

### NestedMenuItem.stories.tsx
Stories for the NestedMenuItem component:
- **Basic** - Simple nested menu item in a menu
- **WithIcons** - Nested items with left icons
- **DeeplyNested** - Four levels of nesting
- **WithDelay** - Configurable hover delay
- **DisabledStates** - Disabled nested items
- **MixedContent** - Combination of regular and nested items

### IconMenuItem.stories.tsx
Stories for the IconMenuItem component:
- **Basic** - Simple menu items
- **WithLeftIcon** - Items with left icons
- **WithRightIcon** - Items with right icons (e.g., checkmarks)
- **WithBothIcons** - Items with both left and right icons
- **DisabledItems** - Disabled menu items
- **MixedStyles** - Combination of different icon configurations
- **LongLabels** - Testing with long text labels
- **CustomRenderLabel** - Custom label rendering

### Examples.stories.tsx
Complete real-world examples:
- **ApplicationMenuBar** - Full menu bar like File/Edit/View
- **FileExplorerContextMenu** - File system context menu
- **MediaLibrary** - Type-specific context menus for images/video/audio
- **CardActionsMenu** - Action menus for card components
- **ComplexNavigation** - Deep multi-level navigation menu

## Running Storybook

```bash
npm run storybook
```

Storybook will start on http://localhost:6006

## Building Storybook

```bash
npm run build-storybook
```

This creates a static build in the `storybook-static` directory.

## Testing

Stories are configured to work with Vitest through the `@storybook/addon-vitest` addon.

## Notes

- All stories use `@storybook/test` utilities for mock functions
- Stories are written in TypeScript with proper type safety
- Examples use Material-UI icons from `@mui/icons-material`
- Interactive controls are available in the Storybook UI for exploring props

