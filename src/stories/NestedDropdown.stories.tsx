/**
 * @fileoverview Storybook stories for the NestedDropdown component demonstrating
 * various configurations of dropdown menus with nested items.
 */

import type { Meta, StoryObj } from '@storybook/react';
import { NestedDropdown } from '../components/NestedDropdown';
import { MenuItemData } from '../definitions';
import { Box } from '@mui/material';
import { Home as HomeIcon, Settings as SettingsIcon, Person as PersonIcon, Delete as DeleteIcon, Edit as EditIcon, Folder as FolderIcon, FileCopy as FileCopyIcon } from '@mui/icons-material';

// Mock callback function for stories
const handleCallback = () => console.log('Menu item clicked');

const meta = {
    title: 'Components/NestedDropdown',
    component: NestedDropdown,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
        menuItemsData: {
            description: 'Data structure defining the menu items and their nesting',
        },
        onClick: {
            description: 'Callback fired when the button is clicked',
        },
    },
} satisfies Meta<typeof NestedDropdown>;

export default meta;
type Story = StoryObj<typeof meta>;

const basicMenuData: MenuItemData = {
    label: 'Actions',
    items: [
        {
            label: 'New',
            callback: handleCallback,
        },
        {
            label: 'Open',
            callback: handleCallback,
        },
        {
            label: 'Save',
            callback: handleCallback,
        },
        {
            label: 'Delete',
            callback: handleCallback,
        },
    ],
};

const nestedMenuData: MenuItemData = {
    label: 'File',
    items: [
        {
            label: 'New',
            items: [
                {
                    label: 'Document',
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
                        {
                            label: 'Test File',
                            callback: handleCallback,
                        },
                    ],
                },
            ],
        },
        {
            label: 'Open Recent',
            items: [
                {
                    label: 'project-1.tsx',
                    callback: handleCallback,
                },
                {
                    label: 'project-2.tsx',
                    callback: handleCallback,
                },
                {
                    label: 'project-3.tsx',
                    callback: handleCallback,
                },
            ],
        },
        {
            label: 'Save',
            callback: handleCallback,
        },
        {
            label: 'Save As...',
            callback: handleCallback,
        },
    ],
};

const menuWithIcons: MenuItemData = {
    label: 'Options',
    items: [
        {
            label: 'Home',
            leftIcon: <HomeIcon />,
            callback: handleCallback,
        },
        {
            label: 'Profile',
            leftIcon: <PersonIcon />,
            items: [
                {
                    label: 'Edit Profile',
                    leftIcon: <EditIcon />,
                    callback: handleCallback,
                },
                {
                    label: 'Settings',
                    leftIcon: <SettingsIcon />,
                    callback: handleCallback,
                },
                {
                    label: 'Delete Account',
                    leftIcon: <DeleteIcon />,
                    callback: handleCallback,
                },
            ],
        },
        {
            label: 'Files',
            leftIcon: <FolderIcon />,
            items: [
                {
                    label: 'Documents',
                    leftIcon: <FileCopyIcon />,
                    callback: handleCallback,
                },
                {
                    label: 'Downloads',
                    leftIcon: <FolderIcon />,
                    callback: handleCallback,
                },
            ],
        },
    ],
};

const menuWithDelay: MenuItemData = {
    label: 'Delayed Menu',
    items: [
        {
            label: 'Instant',
            callback: handleCallback,
        },
        {
            label: 'Delayed Submenu (300ms)',
            delay: 300,
            items: [
                {
                    label: 'Option 1',
                    callback: handleCallback,
                },
                {
                    label: 'Option 2',
                    callback: handleCallback,
                },
            ],
        },
    ],
};

const menuWithDisabled: MenuItemData = {
    label: 'Menu',
    items: [
        {
            label: 'Enabled Item',
            callback: handleCallback,
        },
        {
            label: 'Disabled Item',
            disabled: true,
            callback: handleCallback,
        },
        {
            label: 'Submenu',
            items: [
                {
                    label: 'Enabled Nested',
                    callback: handleCallback,
                },
                {
                    label: 'Disabled Nested',
                    disabled: true,
                    callback: handleCallback,
                },
            ],
        },
    ],
};

export const Basic: Story = {
    args: {
        menuItemsData: basicMenuData,
        onClick: handleCallback,
    },
};

export const Nested: Story = {
    args: {
        menuItemsData: nestedMenuData,
        onClick: handleCallback,
    },
};

export const WithIcons: Story = {
    args: {
        menuItemsData: menuWithIcons,
        onClick: handleCallback,
    },
};

export const WithDelay: Story = {
    args: {
        menuItemsData: menuWithDelay,
        onClick: handleCallback,
    },
    parameters: {
        docs: {
            description: {
                story: 'Hover delay can be configured for submenu items to prevent accidental opening.',
            },
        },
    },
};

export const WithDisabledItems: Story = {
    args: {
        menuItemsData: menuWithDisabled,
        onClick: handleCallback,
    },
};

export const CustomButton: Story = {
    args: {
        menuItemsData: basicMenuData,
    },
};

export const MultipleDropdowns: Story = {
    args: {},
    render: () => (
        <Box sx={{ display: 'flex', gap: 2 }}>
            <NestedDropdown
                menuItemsData={{
                    label: 'File',
                    items: [
                        { label: 'New', callback: handleCallback },
                        { label: 'Open', callback: handleCallback },
                        { label: 'Save', callback: handleCallback },
                    ],
                }}
            />
            <NestedDropdown
                menuItemsData={{
                    label: 'Edit',
                    items: [
                        { label: 'Cut', callback: handleCallback },
                        { label: 'Copy', callback: handleCallback },
                        { label: 'Paste', callback: handleCallback },
                    ],
                }}
            />
            <NestedDropdown
                menuItemsData={{
                    label: 'View',
                    items: [
                        { label: 'Zoom In', callback: handleCallback },
                        { label: 'Zoom Out', callback: handleCallback },
                        { label: 'Reset Zoom', callback: handleCallback },
                    ],
                }}
            />
        </Box>
    ),
};

