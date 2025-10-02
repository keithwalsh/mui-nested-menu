/**
 * @fileoverview Storybook stories for the NestedMenuItem component demonstrating
 * individual nested menu items with various configurations.
 */

import type { Meta, StoryObj } from '@storybook/react';
import { NestedMenuItem } from '../components/NestedMenuItem';
import { IconMenuItem } from '../components/IconMenuItem';
import { Button, Menu } from '@mui/material';
import { useState } from 'react';
import { Home as HomeIcon, Settings as SettingsIcon, Folder as FolderIcon, Star as StarIcon } from '@mui/icons-material';

// Mock callback function for stories
const handleCallback = () => console.log('Menu item clicked');

const meta = {
    title: 'Components/NestedMenuItem',
    component: NestedMenuItem,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
        label: {
            description: 'The text label for the menu item',
            control: 'text',
        },
        parentMenuOpen: {
            description: 'Whether the parent menu is open',
            control: 'boolean',
        },
        leftIcon: {
            description: 'Icon to display on the left side',
        },
        rightIcon: {
            description: 'Icon to display on the right side (defaults to chevron)',
        },
        disabled: {
            description: 'Whether the menu item is disabled',
            control: 'boolean',
        },
        delay: {
            description: 'Hover delay in milliseconds before submenu opens',
            control: 'number',
        },
    },
} satisfies Meta<typeof NestedMenuItem>;

export default meta;
type Story = StoryObj<typeof meta>;

const MenuWrapper = ({ children }: { children: React.ReactNode }) => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div>
            <Button variant="contained" onClick={handleClick}>
                Open Menu
            </Button>
            <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
                {children}
            </Menu>
        </div>
    );
};

export const Basic: Story = {
    args: {
        parentMenuOpen: true,
    },
    render: () => (
        <MenuWrapper>
            <IconMenuItem label="Regular Item" onClick={handleCallback} />
            <NestedMenuItem label="Nested Item" parentMenuOpen={true}>
                <IconMenuItem label="Submenu Item 1" onClick={handleCallback} />
                <IconMenuItem label="Submenu Item 2" onClick={handleCallback} />
                <IconMenuItem label="Submenu Item 3" onClick={handleCallback} />
            </NestedMenuItem>
            <IconMenuItem label="Another Item" onClick={handleCallback} />
        </MenuWrapper>
    ),
};

export const WithIcons: Story = {
    args: {
        parentMenuOpen: true,
    },
    render: () => (
        <MenuWrapper>
            <NestedMenuItem label="Home" leftIcon={<HomeIcon />} parentMenuOpen={true}>
                <IconMenuItem label="Dashboard" leftIcon={<StarIcon />} onClick={handleCallback} />
                <IconMenuItem label="Profile" onClick={handleCallback} />
            </NestedMenuItem>
            <NestedMenuItem label="Settings" leftIcon={<SettingsIcon />} parentMenuOpen={true}>
                <IconMenuItem label="General" onClick={handleCallback} />
                <IconMenuItem label="Privacy" onClick={handleCallback} />
                <IconMenuItem label="Security" onClick={handleCallback} />
            </NestedMenuItem>
        </MenuWrapper>
    ),
};

export const DeeplyNested: Story = {
    args: {
        parentMenuOpen: true,
    },
    render: () => (
        <MenuWrapper>
            <NestedMenuItem label="Level 1" parentMenuOpen={true}>
                <IconMenuItem label="Level 1 - Item 1" onClick={handleCallback} />
                <NestedMenuItem label="Level 2" parentMenuOpen={true}>
                    <IconMenuItem label="Level 2 - Item 1" onClick={handleCallback} />
                    <NestedMenuItem label="Level 3" parentMenuOpen={true}>
                        <IconMenuItem label="Level 3 - Item 1" onClick={handleCallback} />
                        <NestedMenuItem label="Level 4" parentMenuOpen={true}>
                            <IconMenuItem label="Level 4 - Item 1" onClick={handleCallback} />
                            <IconMenuItem label="Level 4 - Item 2" onClick={handleCallback} />
                        </NestedMenuItem>
                    </NestedMenuItem>
                </NestedMenuItem>
            </NestedMenuItem>
        </MenuWrapper>
    ),
};

export const WithDelay: Story = {
    args: {
        parentMenuOpen: true,
    },
    render: () => (
        <MenuWrapper>
            <IconMenuItem label="No Delay Item" onClick={handleCallback} />
            <NestedMenuItem label="Instant Submenu (0ms)" parentMenuOpen={true} delay={0}>
                <IconMenuItem label="Opens immediately" onClick={handleCallback} />
                <IconMenuItem label="on hover" onClick={handleCallback} />
            </NestedMenuItem>
            <NestedMenuItem label="Delayed Submenu (500ms)" parentMenuOpen={true} delay={500}>
                <IconMenuItem label="Opens after" onClick={handleCallback} />
                <IconMenuItem label="500ms hover" onClick={handleCallback} />
            </NestedMenuItem>
        </MenuWrapper>
    ),
    parameters: {
        docs: {
            description: {
                story: 'The delay prop controls how long to wait before opening the submenu on hover.',
            },
        },
    },
};

export const DisabledStates: Story = {
    args: {
        parentMenuOpen: true,
    },
    render: () => (
        <MenuWrapper>
            <IconMenuItem label="Enabled Item" onClick={handleCallback} />
            <NestedMenuItem label="Disabled Nested Item" parentMenuOpen={true} disabled={true}>
                <IconMenuItem label="This won't show" onClick={handleCallback} />
            </NestedMenuItem>
            <NestedMenuItem label="Enabled with Disabled Children" parentMenuOpen={true}>
                <IconMenuItem label="Enabled Child" onClick={handleCallback} />
                <IconMenuItem label="Disabled Child" onClick={handleCallback} disabled={true} />
            </NestedMenuItem>
        </MenuWrapper>
    ),
};

export const MixedContent: Story = {
    args: {
        parentMenuOpen: true,
    },
    render: () => (
        <MenuWrapper>
            <IconMenuItem label="New File" leftIcon={<FolderIcon />} onClick={handleCallback} />
            <NestedMenuItem label="Open Recent" leftIcon={<FolderIcon />} parentMenuOpen={true}>
                <IconMenuItem label="project-1.tsx" onClick={handleCallback} />
                <IconMenuItem label="project-2.tsx" onClick={handleCallback} />
                <IconMenuItem label="project-3.tsx" onClick={handleCallback} />
            </NestedMenuItem>
            <IconMenuItem label="Save" onClick={handleCallback} />
            <NestedMenuItem label="Export" parentMenuOpen={true}>
                <IconMenuItem label="PDF" onClick={handleCallback} />
                <IconMenuItem label="PNG" onClick={handleCallback} />
                <NestedMenuItem label="More Formats" parentMenuOpen={true}>
                    <IconMenuItem label="SVG" onClick={handleCallback} />
                    <IconMenuItem label="JPEG" onClick={handleCallback} />
                    <IconMenuItem label="WebP" onClick={handleCallback} />
                </NestedMenuItem>
            </NestedMenuItem>
        </MenuWrapper>
    ),
};

