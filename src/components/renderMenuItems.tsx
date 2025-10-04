/**
 * @fileoverview Helper function to render menu items based on their kind,
 * supporting action, divider, and submenu types.
 */

import React from 'react';
import { Divider } from '@mui/material';
import { MenuItems } from '../definitions';
import { MenuItemAction } from './MenuItemAction';
import { MenuItemSubmenu } from './MenuItemSubmenu';
import { generateDividerKey, generateSubmenuKey, generateActionKey } from '../utils/keyUtils';

export interface RenderMenuItemOptions {
    item: MenuItems;
    handleClose: () => void;
    isOpen: boolean;
}

export function renderMenuItem({ item, handleClose, isOpen }: RenderMenuItemOptions): React.ReactNode {
    if (item.kind === "divider") {
        return (
            <Divider
              key={generateDividerKey(item)}
              component="li"
              sx={{
                my: '0 !important',
              }} 
            />
        );
    }

    if (item.kind === "submenu") {
        return (
            <MenuItemSubmenu
                key={generateSubmenuKey(item)}
                label={item.label}
                leftIcon={item.icon}
                parentMenuOpen={isOpen}
                disabled={item.disabled}
            >
                {item.items.map((subItem, index) => 
                    renderMenuItem({ 
                        item: subItem, 
                        handleClose, 
                        isOpen 
                    })
                )}
            </MenuItemSubmenu>
        );
    }

    if (item.kind === "action") {
        return (
            <MenuItemAction
                key={generateActionKey(item)}
                label={item.label}
                leftIcon={item.icon}
                shortcut={item.shortcut}
                disabled={item.disabled}
                selected={item.selected}
                onClick={(event: React.MouseEvent<HTMLElement>) => {
                    handleClose();
                    item.action();
                }}
            />
        );
    }

    return null;
}

