/**
 * @fileoverview Storybook stories for the MenuBar component demonstrating
 * usage with MenuConfig structure compatible with menubar.
 */

import type { Meta, StoryObj } from '@storybook/react';
import { action } from "storybook/actions";
import { MenuBar } from '../components/MenuBar';
import { MenuConfig } from '../definitions';
import { ContentCopy, ContentPaste, ExitToApp, FileCopy, FileOpen, FolderOpen, NoteAdd, Redo, Save, Undo, Visibility, ZoomIn, ZoomOut } from '@mui/icons-material';

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

const nestedMenuConfig: MenuConfig[] = [
    {
        label: "File",
        items: [
            { kind: "action", label: "Hello", action: action("New file"), icon: <FileCopy /> },
            { kind: "action", label: "Open", action: action("Open file action triggered"), icon: <FolderOpen />, shortcut: "Ctrl+O", disabled: true },
            { kind: "divider" },
            { kind: "action", label: "Save", action: action("Save file"), icon: <Save />,  shortcut: "Ctrl+S" },
            { kind: "action", label: "Exit", action: action("Exit application"), icon: <ExitToApp /> },
        ],
    },
    {
        label: "Edit",
        items: [
            { kind: "action", label: "Undo", action: action("Undo"), icon: <Undo />, shortcut: "Ctrl+Z" },
            { kind: "action", label: "Redo", action: action("Redo"), icon: <Redo />, shortcut: "Ctrl+Y" },
            { kind: "divider" },
            {
                kind: "submenu",
                label: "Other",
                items: [
                    { kind: "action", label: "Copy", action: action("Copy"), icon: <ContentCopy /> },
                    { kind: "divider" },
                    { kind: "action", label: "Paste", action: action("Paste"), icon: <ContentPaste /> },
                ],
            },
        ],
    },
    {
        label: "View",
        items: [
            { kind: "action", label: "Show/Hide Sidebar", action: action("Toggle Sidebar"), icon: <Visibility />, selected: true },
            { kind: "divider" },
            { kind: "action", label: "Zoom In", action: action("Zoom In"), icon: <ZoomIn />, shortcut: "Ctrl+Plus" },
            { kind: "action", label: "Zoom Out", action: action("Zoom Out"), icon: <ZoomOut />, shortcut: "Ctrl+Minus" },
        ],
    },
];

export const ComponentPreview: Story = {
    args: {
        menuConfig: nestedMenuConfig,
    },
};