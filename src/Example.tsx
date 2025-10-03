/**
 * @fileoverview Example usage of SimpleMenuBar and NestedDropdown with MenuConfig.
 * This demonstrates how to use the simplified menu components from src/ with
 * the same MenuConfig structure as menubar/.
 */

import React from 'react';
import { Box, Paper, Typography } from '@mui/material';
import { SimpleMenuBar, NestedDropdown } from './components';
import { MenuConfig } from './definitions';
import { FileOpen, NoteAdd, Save, SaveAs, Undo, Redo, ContentCut, ContentCopy, ContentPasteGo, SelectAll } from '@mui/icons-material';

// Example menu configuration
const createExampleMenuConfig = (): MenuConfig[] => {
    return [
        {
            label: 'File',
            items: [
                { kind: 'action', label: 'New', shortcut: 'Ctrl+N', icon: <NoteAdd />, action: () => console.log('New') },
                { kind: 'action', label: 'Open...', shortcut: 'Ctrl+O', icon: <FileOpen />, action: () => console.log('Open') },
                { kind: 'divider' },
                { kind: 'action', label: 'Save', shortcut: 'Ctrl+S', icon: <Save />, action: () => console.log('Save') },
                { kind: 'action', label: 'Save As...', shortcut: 'Ctrl+Shift+S', icon: <SaveAs />, action: () => console.log('Save As') },
            ],
        },
        {
            label: 'Edit',
            items: [
                { kind: 'action', label: 'Undo', shortcut: 'Ctrl+Z', icon: <Undo />, action: () => console.log('Undo') },
                { kind: 'action', label: 'Redo', shortcut: 'Ctrl+Y', icon: <Redo />, action: () => console.log('Redo') },
                { kind: 'divider' },
                { kind: 'action', label: 'Cut', shortcut: 'Ctrl+X', icon: <ContentCut />, action: () => console.log('Cut') },
                { kind: 'action', label: 'Copy', shortcut: 'Ctrl+C', icon: <ContentCopy />, action: () => console.log('Copy') },
                { kind: 'action', label: 'Paste', shortcut: 'Ctrl+V', icon: <ContentPasteGo />, action: () => console.log('Paste') },
                { kind: 'divider' },
                { kind: 'action', label: 'Select All', shortcut: 'Ctrl+A', icon: <SelectAll />, action: () => console.log('Select All') },
            ],
        },
        {
            label: 'View',
            items: [
                {
                    kind: 'submenu',
                    label: 'Zoom',
                    items: [
                        { kind: 'action', label: 'Zoom In', shortcut: 'Ctrl+Plus', action: () => console.log('Zoom In') },
                        { kind: 'action', label: 'Zoom Out', shortcut: 'Ctrl+Minus', action: () => console.log('Zoom Out') },
                        { kind: 'action', label: 'Restore Default Zoom', shortcut: 'Ctrl+0', action: () => console.log('Restore Zoom') },
                    ],
                },
                { kind: 'divider' },
                { kind: 'action', label: 'Status Bar', action: () => console.log('Toggle Status Bar'), selected: true },
                { kind: 'action', label: 'Spellcheck', action: () => console.log('Toggle Spellcheck'), selected: false },
            ],
        },
    ];
};

export const Example: React.FC = () => {
    const menuConfig = createExampleMenuConfig();

    return (
        <Box sx={{ p: 4 }}>
            <Typography variant="h4" gutterBottom>
                Simplified Menu Examples
            </Typography>

            <Paper sx={{ p: 2, mb: 4 }}>
                <Typography variant="h6" gutterBottom>
                    1. SimpleMenuBar (Horizontal Menu)
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    Multiple menu buttons in a horizontal layout. No complex hover navigation.
                </Typography>
                <Box sx={{ border: 1, borderColor: 'divider', p: 1 }}>
                    <SimpleMenuBar menuConfig={menuConfig} />
                </Box>
            </Paper>

            <Paper sx={{ p: 2, mb: 4 }}>
                <Typography variant="h6" gutterBottom>
                    2. NestedDropdown (Single Dropdown)
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    Single dropdown button with nested menu items.
                </Typography>
                <Box sx={{ display: 'flex', gap: 2 }}>
                    <NestedDropdown menuConfig={menuConfig[0]} variant="text" />
                    <NestedDropdown menuConfig={menuConfig[1]} variant="outlined" />
                    <NestedDropdown menuConfig={menuConfig[2]} variant="contained" />
                </Box>
            </Paper>

            <Paper sx={{ p: 2 }}>
                <Typography variant="h6" gutterBottom>
                    Key Features
                </Typography>
                <Typography variant="body2" component="div">
                    <ul>
                        <li>✅ Compatible with menubar/ MenuConfig structure</li>
                        <li>✅ Supports action, divider, and submenu item kinds</li>
                        <li>✅ Icons and keyboard shortcuts display</li>
                        <li>✅ Selected state for toggle items</li>
                        <li>✅ Disabled state support</li>
                        <li>✅ Simple hover-based nested menus</li>
                        <li>✅ No complex state management needed</li>
                    </ul>
                </Typography>
            </Paper>
        </Box>
    );
};

export default Example;

