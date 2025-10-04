/**
 * @fileoverview Enhanced menu item component with icon, label, shortcut, and
 * selected state support. Compatible with MenuConfig structure.
 */

import React, { forwardRef, RefObject } from 'react';
import { MenuItem, Typography, ListItemIcon, ListItemText, SxProps, Theme } from '@mui/material';
import { getIconStyles, getLabelTextStyles, getShortcutTextStyles } from '../utils/themeUtils';
import { MENU_SX_STYLES } from '../constants';

interface MenuItemActionProps {
    disabled?: boolean;
    label?: string;
    renderLabel?: () => React.ReactNode;
    leftIcon?: React.ReactNode;
    onClick?: (event: React.MouseEvent<HTMLElement>) => void;
    ref?: RefObject<HTMLLIElement>;
    rightIcon?: React.ReactNode; // for submenu chevron
    shortcut?: string;
    selected?: boolean;
    sx?: SxProps<Theme>;
}

export const MenuItemAction = forwardRef<HTMLLIElement, MenuItemActionProps>(function MenuItemAction(
    { label, leftIcon, renderLabel, rightIcon, shortcut, selected, sx, ...props },
    ref
) {
    return (
        <MenuItem
          dense
          ref={ref}
          sx={{
            ...MENU_SX_STYLES.menuItem,
            ...sx
          }}
          selected={selected}
          {...props}>
          {leftIcon && (
              <ListItemIcon sx={getIconStyles}>
                  {leftIcon}
              </ListItemIcon>
          )}
          {renderLabel ? renderLabel() : (
              <ListItemText>
                  <Typography
                    variant="body2"
                    sx={getLabelTextStyles}
                  >
                    {label}
                  </Typography>
              </ListItemText>
          )}
          {shortcut && (
              <Typography
                variant="body2"
                sx={getShortcutTextStyles}
              >
                  {shortcut}
              </Typography>
          )}
          {rightIcon && !shortcut && rightIcon}
        </MenuItem>
    );
});
