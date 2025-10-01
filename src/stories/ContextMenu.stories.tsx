/**
 * @fileoverview Storybook stories for the ContextMenu component demonstrating
 * right-click context menus with nested items.
 */

import type { Meta, StoryObj } from '@storybook/react';
import { ContextMenu } from '../components/ContextMenu';
import { MenuItemData } from '../definitions';
import { Box, Paper, Typography } from '@mui/material';
import { ContentCut as CutIcon, ContentCopy as CopyIcon, ContentPaste as PasteIcon, Delete as DeleteIcon, Edit as EditIcon, Folder as FolderIcon } from '@mui/icons-material';

// Mock callback function for stories
const handleCallback = () => console.log('Menu item clicked');

const meta = {
    title: 'Components/ContextMenu',
    component: ContextMenu,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
        menuItemsData: {
            description: 'Data structure defining the context menu items',
        },
    },
} satisfies Meta<typeof ContextMenu>;

export default meta;
type Story = StoryObj<typeof meta>;

const basicContextMenuData: MenuItemData[] = [
    {
        label: 'Cut',
        callback: handleCallback,
    },
    {
        label: 'Copy',
        callback: handleCallback,
    },
    {
        label: 'Paste',
        callback: handleCallback,
    },
    {
        label: 'Delete',
        callback: handleCallback,
    },
];

const nestedContextMenuData: MenuItemData[] = [
    {
        label: 'New',
        items: [
            {
                label: 'File',
                callback: handleCallback,
            },
            {
                label: 'Folder',
                callback: handleCallback,
            },
            {
                label: 'From Template',
                items: [
                    {
                        label: 'React Component',
                        callback: handleCallback,
                    },
                    {
                        label: 'TypeScript File',
                        callback: handleCallback,
                    },
                ],
            },
        ],
    },
    {
        label: 'Cut',
        callback: handleCallback,
    },
    {
        label: 'Copy',
        callback: handleCallback,
    },
    {
        label: 'Paste',
        callback: handleCallback,
    },
];

const contextMenuWithIcons: MenuItemData[] = [
    {
        label: 'Cut',
        leftIcon: <CutIcon />,
        callback: handleCallback,
    },
    {
        label: 'Copy',
        leftIcon: <CopyIcon />,
        callback: handleCallback,
    },
    {
        label: 'Paste',
        leftIcon: <PasteIcon />,
        callback: handleCallback,
    },
    {
        label: 'Edit',
        leftIcon: <EditIcon />,
        items: [
            {
                label: 'Rename',
                callback: handleCallback,
            },
            {
                label: 'Duplicate',
                callback: handleCallback,
            },
        ],
    },
    {
        label: 'Delete',
        leftIcon: <DeleteIcon />,
        callback: handleCallback,
    },
];

const ContentArea = ({ children }: { children: React.ReactNode }) => (
    <Paper
        elevation={3}
        sx={{
            width: 400,
            height: 300,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'background.default',
        }}
    >
        {children}
    </Paper>
);

export const Basic: Story = {
    args: {
        menuItemsData: basicContextMenuData,
        children: (
            <ContentArea>
                <Typography>Right-click anywhere in this area</Typography>
            </ContentArea>
        ),
    },
};

export const Nested: Story = {
    args: {
        menuItemsData: nestedContextMenuData,
        children: (
            <ContentArea>
                <Typography>Right-click for nested context menu</Typography>
            </ContentArea>
        ),
    },
};

export const WithIcons: Story = {
    args: {
        menuItemsData: contextMenuWithIcons,
        children: (
            <ContentArea>
                <Typography>Right-click for context menu with icons</Typography>
            </ContentArea>
        ),
    },
};

export const MultipleTargets: Story = {
    render: () => (
        <Box sx={{ display: 'flex', gap: 2, flexDirection: 'column' }}>
            <ContextMenu
                menuItemsData={[
                    { label: 'Edit Text', callback: fn() },
                    { label: 'Delete Text', callback: fn() },
                ]}
            >
                <Paper sx={{ p: 2, width: 300 }}>
                    <Typography>Text area - right-click here</Typography>
                </Paper>
            </ContextMenu>
            <ContextMenu
                menuItemsData={[
                    { label: 'Open Image', callback: fn() },
                    { label: 'Save Image', callback: fn() },
                    { label: 'Copy Image', callback: fn() },
                ]}
            >
                <Paper sx={{ p: 2, width: 300 }}>
                    <Typography>Image area - right-click here</Typography>
                </Paper>
            </ContextMenu>
        </Box>
    ),
};

export const FileExplorer: Story = {
    render: () => (
        <ContextMenu
            menuItemsData={[
                {
                    label: 'New',
                    leftIcon: <FolderIcon />,
                    items: [
                        { label: 'File', callback: fn() },
                        { label: 'Folder', callback: fn() },
                    ],
                },
                {
                    label: 'Cut',
                    leftIcon: <CutIcon />,
                    callback: handleCallback,
                },
                {
                    label: 'Copy',
                    leftIcon: <CopyIcon />,
                    callback: handleCallback,
                },
                {
                    label: 'Paste',
                    leftIcon: <PasteIcon />,
                    callback: handleCallback,
                },
                {
                    label: 'Rename',
                    leftIcon: <EditIcon />,
                    callback: handleCallback,
                },
                {
                    label: 'Delete',
                    leftIcon: <DeleteIcon />,
                    callback: handleCallback,
                },
            ]}
        >
            <Paper elevation={3} sx={{ width: 400, height: 300, p: 2 }}>
                <Typography variant="h6" gutterBottom>
                    File Explorer
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                    <Typography>📁 Documents</Typography>
                    <Typography>📁 Images</Typography>
                    <Typography>📄 readme.txt</Typography>
                    <Typography>📄 data.json</Typography>
                </Box>
                <Box sx={{ mt: 2 }}>
                    <Typography variant="caption" color="text.secondary">
                        Right-click to see context menu
                    </Typography>
                </Box>
            </Paper>
        </ContextMenu>
    ),
};

