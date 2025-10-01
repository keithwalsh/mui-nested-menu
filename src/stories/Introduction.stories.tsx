/**
 * @fileoverview Introduction page for the MUI Nested Menu Storybook
 */

import type { Meta, StoryObj } from '@storybook/react';
import { Box, Typography, Paper, Link, Code } from '@mui/material';

const meta = {
    title: 'Introduction',
    parameters: {
        layout: 'padded',
    },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Welcome: Story = {
    render: () => (
        <Box sx={{ maxWidth: 800, mx: 'auto', p: 3 }}>
            <Typography variant="h3" component="h1" gutterBottom>
                MUI Nested Menu
            </Typography>
            <Typography variant="body1" paragraph>
                Welcome to the <strong>MUI Nested Menu</strong> component library documentation.
            </Typography>
            <Typography variant="body1" paragraph>
                This library provides infinitely nested menu components for Material-UI (MUI) v6, allowing you to create complex, multi-level menu structures with ease.
            </Typography>

            <Typography variant="h4" component="h2" gutterBottom sx={{ mt: 4 }}>
                Components
            </Typography>

            <Paper sx={{ p: 2, mb: 2 }}>
                <Typography variant="h6" gutterBottom>
                    NestedDropdown
                </Typography>
                <Typography variant="body2" paragraph>
                    A dropdown button that opens a menu with support for nested items. Perfect for application menus, navigation, and action menus.
                </Typography>
                <Typography variant="body2" component="div">
                    <strong>Key Features:</strong>
                    <ul>
                        <li>Button-triggered dropdown menu</li>
                        <li>Support for infinitely nested menu items</li>
                        <li>Configurable button styling via ButtonProps</li>
                        <li>Data-driven menu structure via MenuItemData</li>
                    </ul>
                </Typography>
            </Paper>

            <Paper sx={{ p: 2, mb: 2 }}>
                <Typography variant="h6" gutterBottom>
                    ContextMenu
                </Typography>
                <Typography variant="body2" paragraph>
                    A right-click context menu component that can be attached to any content area.
                </Typography>
                <Typography variant="body2" component="div">
                    <strong>Key Features:</strong>
                    <ul>
                        <li>Right-click activation</li>
                        <li>Support for nested menu items</li>
                        <li>Wraps any content to enable context menu</li>
                        <li>Data-driven or custom menu items</li>
                    </ul>
                </Typography>
            </Paper>

            <Paper sx={{ p: 2, mb: 2 }}>
                <Typography variant="h6" gutterBottom>
                    NestedMenuItem
                </Typography>
                <Typography variant="body2" paragraph>
                    A menu item that can contain nested submenus. Used as a building block for creating complex menu structures.
                </Typography>
                <Typography variant="body2" component="div">
                    <strong>Key Features:</strong>
                    <ul>
                        <li>Hover to open submenus</li>
                        <li>Configurable delay before submenu opens</li>
                        <li>Support for left and right icons</li>
                        <li>Keyboard navigation support</li>
                        <li>Infinitely nestable</li>
                    </ul>
                </Typography>
            </Paper>

            <Paper sx={{ p: 2, mb: 2 }}>
                <Typography variant="h6" gutterBottom>
                    IconMenuItem
                </Typography>
                <Typography variant="body2" paragraph>
                    A simple menu item with optional left and right icons.
                </Typography>
                <Typography variant="body2" component="div">
                    <strong>Key Features:</strong>
                    <ul>
                        <li>Optional left icon</li>
                        <li>Optional right icon</li>
                        <li>Custom label rendering</li>
                        <li>MUI theming support</li>
                    </ul>
                </Typography>
            </Paper>

            <Typography variant="h4" component="h2" gutterBottom sx={{ mt: 4 }}>
                Installation
            </Typography>
            <Paper sx={{ p: 2, mb: 2, bgcolor: 'grey.100' }}>
                <Typography variant="body2" component="pre" sx={{ fontFamily: 'monospace' }}>
                    npm install mui-nested-menu
                </Typography>
            </Paper>

            <Typography variant="h4" component="h2" gutterBottom sx={{ mt: 4 }}>
                Quick Start
            </Typography>
            <Paper sx={{ p: 2, mb: 2, bgcolor: 'grey.100' }}>
                <Typography variant="body2" component="pre" sx={{ fontFamily: 'monospace', whiteSpace: 'pre-wrap' }}>
{`import { NestedDropdown } from 'mui-nested-menu';

const menuData = {
  label: 'File',
  items: [
    {
      label: 'New',
      items: [
        { label: 'Document', callback: () => console.log('New Document') },
        { label: 'Folder', callback: () => console.log('New Folder') },
      ],
    },
    { label: 'Open', callback: () => console.log('Open') },
    { label: 'Save', callback: () => console.log('Save') },
  ],
};

function App() {
  return <NestedDropdown menuItemsData={menuData} />;
}`}
                </Typography>
            </Paper>

            <Typography variant="h4" component="h2" gutterBottom sx={{ mt: 4 }}>
                Browse the Stories
            </Typography>
            <Typography variant="body1" paragraph>
                Navigate through the component stories in the sidebar to see examples and interactive demonstrations of each component.
            </Typography>

            <Typography variant="h4" component="h2" gutterBottom sx={{ mt: 4 }}>
                Resources
            </Typography>
            <Box component="ul">
                <li>
                    <Link href="https://github.com/webzep/mui-nested-menu" target="_blank" rel="noopener">
                        GitHub Repository
                    </Link>
                </li>
                <li>
                    <Link href="https://www.npmjs.com/package/mui-nested-menu" target="_blank" rel="noopener">
                        NPM Package
                    </Link>
                </li>
                <li>
                    <Link href="https://mui-nested-menu.vercel.app/" target="_blank" rel="noopener">
                        Live Demo
                    </Link>
                </li>
            </Box>
        </Box>
    ),
};

