/**
 * @fileoverview Simplified horizontal menu bar component that renders multiple
 * menu buttons using MenuConfig structure. No complex hover navigation.
 */

import React, { useState } from 'react';
import { Box, Button, Menu } from '@mui/material';
import { MenuConfig } from '../definitions';
import { renderMenuItem } from './renderMenuItems';

export interface MenuBarProps {
    menuConfig: MenuConfig[];
    sx?: any;
}

const MenuBar: React.FC<MenuBarProps> = ({ menuConfig, sx }) => {
    const [anchorEls, setAnchorEls] = useState<{ [key: string]: HTMLElement | null }>({});

    const handleClick = (menuId: string, event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEls(prev => ({ ...prev, [menuId]: event.currentTarget }));
    };

    const handleClose = (menuId: string) => {
        setAnchorEls(prev => ({ ...prev, [menuId]: null }));
    };

    return (
        <Box sx={{ display: 'flex', ...sx }}>
            {menuConfig.map((menu) => {
                const menuId = menu.id ?? menu.label;
                const anchorEl = anchorEls[menuId] || null;
                const open = Boolean(anchorEl);

                return (
                    <React.Fragment key={menuId}>
                        <Button
                            onClick={(e) => handleClick(menuId, e)}
                            disabled={menu.disabled}
                            sx={{
                                textTransform: 'none',
                                px: 1.25,
                                py: 0.25,
                                minWidth: 0,
                                color: 'text.primary',
                                '&:hover': {
                                    backgroundColor: 'action.hover',
                                },
                            }}
                        >
                            {menu.label}
                        </Button>
                        <Menu
                            anchorEl={anchorEl}
                            open={open}
                            onClose={() => handleClose(menuId)}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            sx={{
                                m: 0,
                                p: 0,
                                '& .MuiList-root': {
                                    p: 0,
                                    m: 0,
                                },
                            }}
                        >
                            {menu.items.map((item) =>
                                renderMenuItem({ 
                                    item, 
                                    handleClose: () => handleClose(menuId), 
                                    isOpen: open 
                                })
                            )}
                        </Menu>
                    </React.Fragment>
                );
            })}
        </Box>
    );
};

export { MenuBar };
export default MenuBar;

