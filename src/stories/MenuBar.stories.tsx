/**
 * @fileoverview Storybook stories for the MenuBar component demonstrating
 * usage with MenuConfig structure compatible with menubar.
 */

import type { Meta, StoryObj } from '@storybook/react';
import { MenuBar } from '../components/MenuBar';
import { MenuConfig } from '../definitions';
import { FileOpen, NoteAdd, Redo, Save, Undo } from '@mui/icons-material';

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

export const WithNestedMenus: Story = {
    args: {
        menuConfig: nestedMenuConfig,
    },
};