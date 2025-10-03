/**
 * @fileoverview Simplified horizontal menu bar component that renders multiple
 * menu buttons using MenuConfig structure with menu chaining support.
 */

import React, { useState, useCallback, useRef, useEffect } from 'react';
import { Box, Button, Menu } from '@mui/material';
import { MenuConfig } from '../definitions';
import { renderMenuItem } from './renderMenuItems';

export interface MenuBarProps {
    menuConfig: MenuConfig[];
    sx?: any;
}

interface MenuButtonProps {
    menu: MenuConfig;
    isActive: boolean;
    activeMenuId: string | null;
    onActivate: (menuId: string) => void;
    onHoverNavigate: (menuId: string) => void;
    onDeactivate: () => void;
    onRegisterRef: (menuId: string, ref: HTMLButtonElement | null) => void;
}

// Component for individual menu button - extracted outside to prevent recreation
const MenuButton: React.FC<MenuButtonProps> = ({ 
    menu, 
    isActive, 
    activeMenuId, 
    onActivate, 
    onHoverNavigate, 
    onDeactivate,
    onRegisterRef 
}) => {
    const menuId = menu.id ?? menu.label;
    const buttonRef = useRef<HTMLButtonElement | null>(null);
    const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
    const [isOpen, setIsOpen] = useState(false);

    // Register button ref
    useEffect(() => {
        if (buttonRef.current) {
            onRegisterRef(menuId, buttonRef.current);
        }
        return () => {
            onRegisterRef(menuId, null);
        };
    }, [menuId, onRegisterRef]);

    // Sync menu state with active menu id
    useEffect(() => {
        const isOpenByGroup = activeMenuId === menuId;
        console.log(`[${menuId}] Sync effect - activeMenuId: ${activeMenuId}, isOpen: ${isOpen}, isOpenByGroup: ${isOpenByGroup}`);
        if (isOpenByGroup && !isOpen) {
            console.log(`[${menuId}] Opening menu`);
            if (!anchorEl && buttonRef.current) {
                setAnchorEl(buttonRef.current);
            }
            setIsOpen(true);
        } else if (!isOpenByGroup && isOpen && (isActive || activeMenuId === null)) {
            console.log(`[${menuId}] Closing menu`);
            setIsOpen(false);
        }
    }, [activeMenuId, menuId, isOpen, isActive, anchorEl]);

    // Deactivate when menu closes
    const wasOpenRef = useRef<boolean>(false);
    useEffect(() => {
        const wasOpen = wasOpenRef.current;
        const isOpenByGroup = activeMenuId === menuId;
        if (wasOpen && !isOpen && isOpenByGroup) {
            onDeactivate();
        }
        wasOpenRef.current = isOpen;
    }, [isOpen, activeMenuId, menuId, onDeactivate]);

    const handleClick = useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
        onActivate(menuId);
        if (!isOpen) setIsOpen(true);
        else setIsOpen(false);
    }, [menuId, isOpen, onActivate]);

    const handleMouseEnter = useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
        console.log(`[${menuId}] Mouse enter - isActive:`, isActive);
        if (!isActive) return;
        console.log(`[${menuId}] Navigating to this menu`);
        setAnchorEl(event.currentTarget);
        onHoverNavigate(menuId);
    }, [isActive, menuId, onHoverNavigate]);

    const handleClose = useCallback(() => {
        setIsOpen(false);
    }, []);

    return (
        <React.Fragment key={menuId}>
            <Button
                ref={buttonRef}
                onClick={handleClick}
                onPointerEnter={handleMouseEnter as any}
                disabled={menu.disabled}
                sx={{
                    textTransform: 'none',
                    px: 1.25,
                    py: 0.25,
                    minWidth: 0,
                    color: 'text.primary',
                    backgroundColor: isOpen ? 'action.selected' : 'transparent',
                    '&:hover': {
                        backgroundColor: isOpen ? 'action.selected' : 'action.hover',
                    },
                }}
            >
                {menu.label}
            </Button>
            <Menu
                anchorEl={anchorEl}
                open={isOpen}
                onClose={handleClose}
                keepMounted
                disableRestoreFocus
                disableEnforceFocus
                transitionDuration={0}
                style={{ pointerEvents: 'none' }}
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
                <Box style={{ pointerEvents: 'auto' }}>
                    {menu.items.map((item) =>
                        renderMenuItem({ 
                            item, 
                            handleClose, 
                            isOpen 
                        })
                    )}
                </Box>
            </Menu>
        </React.Fragment>
    );
};

const MenuBar: React.FC<MenuBarProps> = ({ menuConfig, sx }) => {
    const [isActive, setIsActive] = useState(false);
    const [activeMenuId, setActiveMenuId] = useState<string | null>(null);
    const buttonRefs = useRef<Map<string, HTMLButtonElement>>(new Map());

    // Handle activation (first click on any menu button)
    const handleActivate = useCallback((menuId: string) => {
        console.log('Activating menu:', menuId);
        setIsActive(true);
        setActiveMenuId(menuId);
    }, []);

    // Handle hover navigation (switch between menus when already active)
    const handleHoverNavigate = useCallback((menuId: string) => {
        console.log('Hover navigate to:', menuId);
        setActiveMenuId(menuId);
    }, []);

    // Handle deactivation when a menu closes
    const handleDeactivate = useCallback(() => {
        setIsActive(false);
        setActiveMenuId(null);
    }, []);

    // Handle button ref registration
    const handleRegisterRef = useCallback((menuId: string, ref: HTMLButtonElement | null) => {
        if (ref) {
            buttonRefs.current.set(menuId, ref);
        } else {
            buttonRefs.current.delete(menuId);
        }
    }, []);

    // Close all menus on outside click
    useEffect(() => {
        const handleDocMouseDown = (event: MouseEvent) => {
            // If any button contains the target, ignore
            for (const [, btn] of buttonRefs.current) {
                if (btn && event.target instanceof Node && btn.contains(event.target)) {
                    return;
                }
            }
            // Otherwise, deactivate
            setIsActive(false);
            setActiveMenuId(null);
        };

        document.addEventListener('mousedown', handleDocMouseDown);
        return () => document.removeEventListener('mousedown', handleDocMouseDown);
    }, []);

    return (
        <Box sx={{ display: 'flex', ...sx }}>
            {menuConfig.map((menu) => (
                <MenuButton 
                    key={menu.id ?? menu.label} 
                    menu={menu}
                    isActive={isActive}
                    activeMenuId={activeMenuId}
                    onActivate={handleActivate}
                    onHoverNavigate={handleHoverNavigate}
                    onDeactivate={handleDeactivate}
                    onRegisterRef={handleRegisterRef}
                />
            ))}
        </Box>
    );
};

export { MenuBar };
export default MenuBar;

