/**
 * @fileoverview Storybook stories for the IconMenuItem component demonstrating
 * menu items with left and right icons.
 */

import type { Meta, StoryObj } from '@storybook/react';
import { IconMenuItem } from '../components/IconMenuItem';
import { Button, Menu } from '@mui/material';
import { useState } from 'react';
import { Home as HomeIcon, Settings as SettingsIcon, Delete as DeleteIcon, Star as StarIcon, KeyboardArrowRight as ArrowIcon, Check as CheckIcon } from '@mui/icons-material';

// Mock callback function for stories
const handleCallback = () => console.log('Menu item clicked');

const meta = {
    title: 'Components/IconMenuItem',
    component: IconMenuItem,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
        label: {
            description: 'The text label for the menu item',
            control: 'text',
        },
        leftIcon: {
            description: 'Icon to display on the left side',
        },
        rightIcon: {
            description: 'Icon to display on the right side',
        },
        disabled: {
            description: 'Whether the menu item is disabled',
            control: 'boolean',
        },
        onClick: {
            description: 'Callback fired when the item is clicked',
        },
    },
} satisfies Meta<typeof IconMenuItem>;

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
    render: () => (
        <MenuWrapper>
            <IconMenuItem label="Simple Menu Item" onClick={handleCallback} />
            <IconMenuItem label="Another Item" onClick={handleCallback} />
            <IconMenuItem label="One More Item" onClick={handleCallback} />
        </MenuWrapper>
    ),
};

export const WithLeftIcon: Story = {
    render: () => (
        <MenuWrapper>
            <IconMenuItem label="Home" leftIcon={<HomeIcon />} onClick={handleCallback} />
            <IconMenuItem label="Settings" leftIcon={<SettingsIcon />} onClick={handleCallback} />
            <IconMenuItem label="Delete" leftIcon={<DeleteIcon />} onClick={handleCallback} />
            <IconMenuItem label="Favorites" leftIcon={<StarIcon />} onClick={handleCallback} />
        </MenuWrapper>
    ),
};

export const WithRightIcon: Story = {
    render: () => (
        <MenuWrapper>
            <IconMenuItem label="Submenu Indicator" rightIcon={<ArrowIcon />} onClick={handleCallback} />
            <IconMenuItem label="Selected Item" rightIcon={<CheckIcon />} onClick={handleCallback} />
            <IconMenuItem label="Another Selection" rightIcon={<CheckIcon />} onClick={handleCallback} />
        </MenuWrapper>
    ),
};

export const WithBothIcons: Story = {
    render: () => (
        <MenuWrapper>
            <IconMenuItem label="Home" leftIcon={<HomeIcon />} rightIcon={<CheckIcon />} onClick={handleCallback} />
            <IconMenuItem label="Settings" leftIcon={<SettingsIcon />} rightIcon={<ArrowIcon />} onClick={handleCallback} />
            <IconMenuItem label="Favorites" leftIcon={<StarIcon />} rightIcon={<CheckIcon />} onClick={handleCallback} />
        </MenuWrapper>
    ),
};

export const DisabledItems: Story = {
    render: () => (
        <MenuWrapper>
            <IconMenuItem label="Enabled Item" leftIcon={<HomeIcon />} onClick={handleCallback} />
            <IconMenuItem label="Disabled Item" leftIcon={<SettingsIcon />} onClick={handleCallback} disabled={true} />
            <IconMenuItem label="Another Enabled" leftIcon={<StarIcon />} onClick={handleCallback} />
            <IconMenuItem label="Another Disabled" leftIcon={<DeleteIcon />} onClick={handleCallback} disabled={true} />
        </MenuWrapper>
    ),
};

export const MixedStyles: Story = {
    render: () => (
        <MenuWrapper>
            <IconMenuItem label="With Left Icon Only" leftIcon={<HomeIcon />} onClick={handleCallback} />
            <IconMenuItem label="No Icons" onClick={handleCallback} />
            <IconMenuItem label="With Right Icon Only" rightIcon={<ArrowIcon />} onClick={handleCallback} />
            <IconMenuItem label="With Both Icons" leftIcon={<StarIcon />} rightIcon={<CheckIcon />} onClick={handleCallback} />
            <IconMenuItem label="Disabled with Icons" leftIcon={<DeleteIcon />} rightIcon={<CheckIcon />} onClick={handleCallback} disabled={true} />
        </MenuWrapper>
    ),
};

export const LongLabels: Story = {
    render: () => (
        <MenuWrapper>
            <IconMenuItem label="Short" leftIcon={<HomeIcon />} onClick={handleCallback} />
            <IconMenuItem label="This is a medium length label" leftIcon={<SettingsIcon />} onClick={handleCallback} />
            <IconMenuItem label="This is a very long menu item label that might wrap or truncate" leftIcon={<StarIcon />} onClick={handleCallback} />
        </MenuWrapper>
    ),
};

export const CustomRenderLabel: Story = {
    render: () => (
        <MenuWrapper>
            <IconMenuItem
                renderLabel={() => (
                    <span style={{ fontWeight: 'bold', color: 'blue' }}>Custom Styled Label</span>
                )}
                leftIcon={<HomeIcon />}
                onClick={handleCallback}
            />
            <IconMenuItem
                renderLabel={() => (
                    <div>
                        <div>Multi-line</div>
                        <div style={{ fontSize: '0.8em', color: 'gray' }}>Subtitle text</div>
                    </div>
                )}
                leftIcon={<SettingsIcon />}
                onClick={handleCallback}
            />
        </MenuWrapper>
    ),
    parameters: {
        docs: {
            description: {
                story: 'Use renderLabel for custom rendering of the label content instead of plain text.',
            },
        },
    },
};

