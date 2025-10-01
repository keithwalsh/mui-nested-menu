/**
 * @fileoverview Complete examples demonstrating various use cases for the
 * mui-nested-menu library, including real-world scenarios.
 */

import type { Meta, StoryObj } from '@storybook/react';
import { NestedDropdown } from '../components/NestedDropdown';
import { ContextMenu } from '../components/ContextMenu';
import { MenuItemData } from '../definitions';
import { Box, Paper, Typography, Card, CardContent, IconButton } from '@mui/material';
import { ContentCut as CutIcon, ContentCopy as CopyIcon, ContentPaste as PasteIcon, FileCopy as FileCopyIcon, Folder as FolderIcon, InsertDriveFile as FileIcon, Image as ImageIcon, Movie as MovieIcon, AudioFile as AudioIcon, MoreVert as MoreVertIcon } from '@mui/icons-material';

// Mock callback function for stories
const handleCallback = () => console.log('Menu item clicked');

const meta = {
    title: 'Examples',
    parameters: {
        layout: 'padded',
    },
    tags: ['autodocs'],
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

// Application Menu Bar Example
export const ApplicationMenuBar: Story = {
    render: () => {
        const fileMenu: MenuItemData = {
            label: 'File',
            items: [
                {
                    label: 'New',
                    items: [
                        { label: 'Project', callback: handleCallback },
                        { label: 'File', callback: handleCallback },
                        { label: 'Folder', callback: handleCallback },
                    ],
                },
                {
                    label: 'Open',
                    items: [
                        { label: 'File...', callback: handleCallback },
                        { label: 'Folder...', callback: handleCallback },
                        { label: 'Workspace...', callback: handleCallback },
                    ],
                },
                { label: 'Save', callback: handleCallback },
                { label: 'Save As...', callback: handleCallback },
                { label: 'Close', callback: handleCallback },
            ],
        };

        const editMenu: MenuItemData = {
            label: 'Edit',
            items: [
                { label: 'Undo', callback: handleCallback },
                { label: 'Redo', callback: handleCallback },
                { label: 'Cut', callback: handleCallback },
                { label: 'Copy', callback: handleCallback },
                { label: 'Paste', callback: handleCallback },
                {
                    label: 'Find',
                    items: [
                        { label: 'Find...', callback: handleCallback },
                        { label: 'Find in Files...', callback: handleCallback },
                        { label: 'Replace...', callback: handleCallback },
                    ],
                },
            ],
        };

        const viewMenu: MenuItemData = {
            label: 'View',
            items: [
                { label: 'Command Palette', callback: handleCallback },
                { label: 'Explorer', callback: handleCallback },
                { label: 'Search', callback: handleCallback },
                {
                    label: 'Appearance',
                    items: [
                        { label: 'Full Screen', callback: handleCallback },
                        { label: 'Zen Mode', callback: handleCallback },
                        {
                            label: 'Theme',
                            items: [
                                { label: 'Dark', callback: handleCallback },
                                { label: 'Light', callback: handleCallback },
                                { label: 'High Contrast', callback: handleCallback },
                            ],
                        },
                    ],
                },
            ],
        };

        return (
            <Paper sx={{ p: 2 }}>
                <Box sx={{ display: 'flex', gap: 1, mb: 2, borderBottom: 1, borderColor: 'divider', pb: 1 }}>
                    <NestedDropdown menuItemsData={fileMenu} ButtonProps={{ variant: 'text' }} />
                    <NestedDropdown menuItemsData={editMenu} ButtonProps={{ variant: 'text' }} />
                    <NestedDropdown menuItemsData={viewMenu} ButtonProps={{ variant: 'text' }} />
                </Box>
                <Box sx={{ p: 4, textAlign: 'center' }}>
                    <Typography variant="h6" color="text.secondary">
                        Application Menu Bar Example
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Click any menu to explore nested options
                    </Typography>
                </Box>
            </Paper>
        );
    },
};

// File Explorer Context Menu Example
export const FileExplorerContextMenu: Story = {
    render: () => {
        const contextMenuData: MenuItemData[] = [
            {
                label: 'New',
                leftIcon: <FolderIcon />,
                items: [
                    { label: 'File', leftIcon: <FileIcon />, callback: handleCallback },
                    { label: 'Folder', leftIcon: <FolderIcon />, callback: handleCallback },
                    {
                        label: 'From Template',
                        items: [
                            { label: 'React Component', callback: handleCallback },
                            { label: 'TypeScript File', callback: handleCallback },
                            { label: 'Test File', callback: handleCallback },
                        ],
                    },
                ],
            },
            { label: 'Cut', leftIcon: <CutIcon />, callback: handleCallback },
            { label: 'Copy', leftIcon: <CopyIcon />, callback: handleCallback },
            { label: 'Paste', leftIcon: <PasteIcon />, callback: handleCallback },
            { label: 'Duplicate', leftIcon: <FileCopyIcon />, callback: handleCallback },
            { label: 'Rename', callback: handleCallback },
            { label: 'Delete', callback: handleCallback },
        ];

        return (
            <ContextMenu menuItemsData={contextMenuData}>
                <Paper elevation={2} sx={{ width: 500, height: 400, p: 3 }}>
                    <Typography variant="h6" gutterBottom>
                        Project Files
                    </Typography>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, mt: 2 }}>
                        <Typography sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <FolderIcon /> src
                        </Typography>
                        <Typography sx={{ display: 'flex', alignItems: 'center', gap: 1, ml: 3 }}>
                            <FolderIcon /> components
                        </Typography>
                        <Typography sx={{ display: 'flex', alignItems: 'center', gap: 1, ml: 3 }}>
                            <FolderIcon /> utils
                        </Typography>
                        <Typography sx={{ display: 'flex', alignItems: 'center', gap: 1, ml: 3 }}>
                            <FileIcon /> index.tsx
                        </Typography>
                        <Typography sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <FileIcon /> package.json
                        </Typography>
                        <Typography sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <FileIcon /> README.md
                        </Typography>
                    </Box>
                    <Box sx={{ mt: 4, p: 2, bgcolor: 'action.hover', borderRadius: 1 }}>
                        <Typography variant="caption" color="text.secondary">
                            💡 Right-click anywhere to open the context menu
                        </Typography>
                    </Box>
                </Paper>
            </ContextMenu>
        );
    },
};

// Media Library with Type-Specific Menus
export const MediaLibrary: Story = {
    render: () => {
        const imageContextMenu: MenuItemData[] = [
            { label: 'Open', leftIcon: <ImageIcon />, callback: handleCallback },
            { label: 'Copy', leftIcon: <CopyIcon />, callback: handleCallback },
            {
                label: 'Export As',
                items: [
                    { label: 'PNG', callback: handleCallback },
                    { label: 'JPEG', callback: handleCallback },
                    { label: 'WebP', callback: handleCallback },
                    { label: 'SVG', callback: handleCallback },
                ],
            },
            { label: 'Delete', callback: handleCallback },
        ];

        const videoContextMenu: MenuItemData[] = [
            { label: 'Play', leftIcon: <MovieIcon />, callback: handleCallback },
            { label: 'Copy', leftIcon: <CopyIcon />, callback: handleCallback },
            {
                label: 'Convert To',
                items: [
                    { label: 'MP4', callback: handleCallback },
                    { label: 'WebM', callback: handleCallback },
                    { label: 'AVI', callback: handleCallback },
                ],
            },
            { label: 'Delete', callback: handleCallback },
        ];

        const audioContextMenu: MenuItemData[] = [
            { label: 'Play', leftIcon: <AudioIcon />, callback: handleCallback },
            { label: 'Copy', leftIcon: <CopyIcon />, callback: handleCallback },
            {
                label: 'Convert To',
                items: [
                    { label: 'MP3', callback: handleCallback },
                    { label: 'WAV', callback: handleCallback },
                    { label: 'OGG', callback: handleCallback },
                ],
            },
            { label: 'Delete', callback: handleCallback },
        ];

        return (
            <Box sx={{ p: 3 }}>
                <Typography variant="h5" gutterBottom>
                    Media Library
                </Typography>
                <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 2, mt: 2 }}>
                    <ContextMenu menuItemsData={imageContextMenu}>
                        <Card>
                            <CardContent>
                                <ImageIcon sx={{ fontSize: 60, color: 'primary.main' }} />
                                <Typography variant="h6">image.png</Typography>
                                <Typography variant="caption" color="text.secondary">
                                    Right-click for options
                                </Typography>
                            </CardContent>
                        </Card>
                    </ContextMenu>

                    <ContextMenu menuItemsData={videoContextMenu}>
                        <Card>
                            <CardContent>
                                <MovieIcon sx={{ fontSize: 60, color: 'secondary.main' }} />
                                <Typography variant="h6">video.mp4</Typography>
                                <Typography variant="caption" color="text.secondary">
                                    Right-click for options
                                </Typography>
                            </CardContent>
                        </Card>
                    </ContextMenu>

                    <ContextMenu menuItemsData={audioContextMenu}>
                        <Card>
                            <CardContent>
                                <AudioIcon sx={{ fontSize: 60, color: 'success.main' }} />
                                <Typography variant="h6">audio.mp3</Typography>
                                <Typography variant="caption" color="text.secondary">
                                    Right-click for options
                                </Typography>
                            </CardContent>
                        </Card>
                    </ContextMenu>
                </Box>
            </Box>
        );
    },
};

// Card Actions Menu
export const CardActionsMenu: Story = {
    render: () => {
        const cardMenuData: MenuItemData = {
            label: 'Actions',
            items: [
                { label: 'Share', callback: handleCallback },
                { label: 'Download', callback: handleCallback },
                {
                    label: 'Export',
                    items: [
                        { label: 'PDF', callback: handleCallback },
                        { label: 'CSV', callback: handleCallback },
                        { label: 'JSON', callback: handleCallback },
                    ],
                },
                {
                    label: 'More',
                    items: [
                        { label: 'Archive', callback: handleCallback },
                        { label: 'Duplicate', callback: handleCallback },
                        { label: 'Move to...', callback: handleCallback },
                    ],
                },
            ],
        };

        return (
            <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                {[1, 2, 3].map((i) => (
                    <Card key={i} sx={{ width: 300 }}>
                        <CardContent>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                                <Box>
                                    <Typography variant="h6">Card Title {i}</Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        This is a sample card with nested menu actions available via the button.
                                    </Typography>
                                </Box>
                                <NestedDropdown
                                    menuItemsData={cardMenuData}
                                    ButtonProps={{
                                        size: 'small',
                                        sx: { minWidth: 'auto', p: 0.5 },
                                    }}
                                />
                            </Box>
                        </CardContent>
                    </Card>
                ))}
            </Box>
        );
    },
};

// Complex Multi-Level Navigation
export const ComplexNavigation: Story = {
    render: () => {
        const navigationData: MenuItemData = {
            label: 'Navigation',
            items: [
                {
                    label: 'Products',
                    items: [
                        {
                            label: 'Electronics',
                            items: [
                                {
                                    label: 'Computers',
                                    items: [
                                        { label: 'Laptops', callback: handleCallback },
                                        { label: 'Desktops', callback: handleCallback },
                                        { label: 'Tablets', callback: handleCallback },
                                    ],
                                },
                                {
                                    label: 'Mobile',
                                    items: [
                                        { label: 'Smartphones', callback: handleCallback },
                                        { label: 'Accessories', callback: handleCallback },
                                    ],
                                },
                            ],
                        },
                        {
                            label: 'Clothing',
                            items: [
                                { label: 'Men', callback: handleCallback },
                                { label: 'Women', callback: handleCallback },
                                { label: 'Kids', callback: handleCallback },
                            ],
                        },
                    ],
                },
                {
                    label: 'Services',
                    items: [
                        { label: 'Consulting', callback: handleCallback },
                        { label: 'Support', callback: handleCallback },
                        { label: 'Training', callback: handleCallback },
                    ],
                },
                { label: 'About Us', callback: handleCallback },
                { label: 'Contact', callback: handleCallback },
            ],
        };

        return (
            <Box sx={{ p: 3 }}>
                <Paper sx={{ p: 2, mb: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography variant="h6">Company Logo</Typography>
                    <NestedDropdown menuItemsData={navigationData} ButtonProps={{ variant: 'contained' }} />
                </Paper>
                <Box sx={{ p: 4, textAlign: 'center' }}>
                    <Typography variant="h4" gutterBottom>
                        Welcome to Our Store
                    </Typography>
                    <Typography color="text.secondary">
                        Click the navigation menu above to explore our deeply nested product catalog
                    </Typography>
                </Box>
            </Box>
        );
    },
};

