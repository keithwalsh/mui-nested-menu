/**
 * @fileoverview Horizontal menu bar rendering menu buttons from MenuConfig,
 * supporting menu chaining and activation logic.
 */

import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Box, Button } from '@mui/material';
import { MenuConfig } from '../definitions';
import { renderMenuItem } from './renderMenuItems';
import { MenuWrapper } from './MenuWrapper';
import { BUTTON_STYLES, MENU_ORIGINS } from '../constants';

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
    onRegisterRef(menuId, buttonRef.current);
    return () => onRegisterRef(menuId, null);
  }, [menuId, onRegisterRef]);

  // Sync menu state with active menu id
  useEffect(() => {
    const shouldBeOpen = activeMenuId === menuId;
    if (shouldBeOpen && !isOpen) {
        setAnchorEl(buttonRef.current);
        setIsOpen(true);
    } else if (!shouldBeOpen && isOpen && (isActive || activeMenuId === null)) {
        setIsOpen(false);
    }
  }, [activeMenuId, menuId, isOpen, isActive]);

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

  const handleClick = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      setAnchorEl(event.currentTarget);
      onActivate(menuId);
      if (!isOpen) setIsOpen(true);
      else setIsOpen(false);
    },
    [menuId, isOpen, onActivate]
  );

  const handleMouseEnter = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      if (!isActive) return;
      setAnchorEl(event.currentTarget);
      onHoverNavigate(menuId);
    },
    [isActive, menuId, onHoverNavigate]
  );

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
          ...BUTTON_STYLES.menuButton,
          backgroundColor: isOpen ? "action.selected" : "transparent",
          "&:hover": {
            backgroundColor: isOpen ? "action.selected" : "action.hover",
          },
        }}
      >
        {menu.label}
      </Button>
      <MenuWrapper
        anchorEl={anchorEl}
        open={isOpen}
        onClose={handleClose}
        disableRestoreFocus
        disableEnforceFocus
        variant="topLevel"
        {...MENU_ORIGINS.TOP_MENU}
      >
        {menu.items.map((item) =>
          renderMenuItem({
            item,
            handleClose,
            isOpen,
          })
        )}
      </MenuWrapper>
    </React.Fragment>
  );
};

const MenuBar: React.FC<MenuBarProps> = ({ menuConfig, sx }) => {
    const [isActive, setIsActive] = useState(false);
    const [activeMenuId, setActiveMenuId] = useState<string | null>(null);
    const buttonRefs = useRef<Map<string, HTMLButtonElement>>(new Map());

    // Handle activation (first click on any menu button)
    const handleActivate = useCallback((menuId: string) => {
        setIsActive(true);
        setActiveMenuId(menuId);
    }, []);

    // Handle hover navigation (switch between menus when already active)
    const handleHoverNavigate = useCallback((menuId: string) => {
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

