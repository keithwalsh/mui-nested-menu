/**
 * @fileoverview Storybook stories for the MenuBar component demonstrating
 * usage with MenuConfig structure compatible with menubar.
 */

import type { Meta, StoryObj } from '@storybook/react';
import { MenuBar } from '../components/MenuBar';
import { MenuConfig } from '../definitions';
import { Box } from '@mui/material';
import { ContentCopy, ContentCut, ContentPasteGo, FileOpen, NoteAdd, Redo, Save, SaveAs, Undo } from '@mui/icons-material';

const meta = {
    title: 'Components/MenuBar',
    component: MenuBar,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
        menuConfig: {
            description: 'Array of MenuConfig objects defining the menu structure',
        },
    },
} satisfies Meta<typeof MenuBar>;

export default meta;
type Story = StoryObj<typeof meta>;

const handleAction = (action: string) => () => console.log(action);

const basicMenuConfig: MenuConfig[] = [
    {
        label: 'File',
        items: [
            { kind: 'action', label: 'New', action: handleAction('New'), icon: <NoteAdd />, shortcut: 'Ctrl+N' },
            { kind: 'action', label: 'Open', action: handleAction('Open'), icon: <FileOpen />, shortcut: 'Ctrl+O' },
            { kind: 'divider' },
            { kind: 'action', label: 'Save', action: handleAction('Save'), icon: <Save />, shortcut: 'Ctrl+S' },
            { kind: 'action', label: 'Save As...', action: handleAction('Save As'), icon: <SaveAs />, shortcut: 'Ctrl+Shift+S' },
        ],
    },
    {
        label: 'Edit',
        items: [
            { kind: 'action', label: 'Undo', action: handleAction('Undo'), icon: <Undo />, shortcut: 'Ctrl+Z' },
            { kind: 'action', label: 'Redo', action: handleAction('Redo'), icon: <Redo />, shortcut: 'Ctrl+Y' },
            { kind: 'divider' },
            { kind: 'action', label: 'Cut', action: handleAction('Cut'), icon: <ContentCut />, shortcut: 'Ctrl+X' },
            { kind: 'action', label: 'Copy', action: handleAction('Copy'), icon: <ContentCopy />, shortcut: 'Ctrl+C' },
            { kind: 'action', label: 'Paste', action: handleAction('Paste'), icon: <ContentPasteGo />, shortcut: 'Ctrl+V' },
        ],
    },
];

const nestedMenuConfig: MenuConfig[] = [
    {
        label: 'File',
        items: [
            { kind: 'action', label: 'Open', action: handleAction('Open'), icon: <FileOpen />, shortcut: 'Ctrl+O' },
            { kind: 'divider' },
            {
                kind: 'submenu',
                label: 'New',
                icon: <NoteAdd />,
                items: [
                    { kind: 'action', label: 'Document', action: handleAction('New Document') },
                    { kind: 'action', label: 'Folder', action: handleAction('New Folder') },
                    { kind: 'action', label: 'From Template', action: handleAction('From Template') },
                ],
            },
            { kind: 'action', label: 'Save', action: handleAction('Save'), icon: <Save />, shortcut: 'Ctrl+S' },
        ],
    },
    {
        label: 'Edit',
        items: [
            { kind: 'action', label: 'Undo', action: handleAction('Undo'), icon: <Undo />, shortcut: 'Ctrl+Z' },
            { kind: 'action', label: 'Redo', action: handleAction('Redo'), icon: <Redo />, shortcut: 'Ctrl+Y' },
        ],
    },
];

const withDisabledItems: MenuConfig[] = [
    {
        label: 'File',
        items: [
            { kind: 'action', label: 'New', action: handleAction('New'), icon: <NoteAdd /> },
            { kind: 'action', label: 'Save', action: handleAction('Save'), icon: <Save />, disabled: true },
            { kind: 'action', label: 'Save As...', action: handleAction('Save As'), icon: <SaveAs />, disabled: true },
        ],
    },
    {
        label: 'Edit',
        disabled: true,
        items: [
            { kind: 'action', label: 'Undo', action: handleAction('Undo'), icon: <Undo /> },
        ],
    },
];

const withSelectedItems: MenuConfig[] = [
    {
        label: 'View',
        items: [
            { kind: 'action', label: 'Show Toolbar', action: handleAction('Show Toolbar'), selected: true },
            { kind: 'action', label: 'Show Status Bar', action: handleAction('Show Status Bar'), selected: false },
            { kind: 'action', label: 'Show Sidebar', action: handleAction('Show Sidebar'), selected: true },
        ],
    },
];

export const Basic: Story = {
    args: {
        menuConfig: basicMenuConfig,
    },
};

export const WithNestedMenus: Story = {
    args: {
        menuConfig: nestedMenuConfig,
    },
};

export const WithDisabledItems: Story = {
    args: {
        menuConfig: withDisabledItems,
    },
};

export const WithSelectedItems: Story = {
    args: {
        menuConfig: withSelectedItems,
    },
};

export const InAppBar: Story = {
    args: {
        menuConfig: basicMenuConfig,
    },
    render: (args) => (
        <Box sx={{ width: '100%', bgcolor: 'background.paper', p: 1, borderBottom: 1, borderColor: 'divider' }}>
            <MenuBar menuConfig={args.menuConfig} />
        </Box>
    ),
};

export const CustomStyling: Story = {
    args: {
        menuConfig: basicMenuConfig,
    },
    render: (args) => (
        <MenuBar 
            menuConfig={args.menuConfig}
            sx={{
                bgcolor: 'primary.main',
                color: 'primary.contrastText',
                p: 1,
                borderRadius: 1,
            }}
        />
    ),
};

