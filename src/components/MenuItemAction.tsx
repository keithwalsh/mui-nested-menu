/**
 * @fileoverview Enhanced menu item component with icon, label, shortcut, and
 * selected state support. Compatible with MenuConfig structure.
 */

import React, { forwardRef, RefObject } from 'react';
import { MenuItem, Typography, ListItemIcon, ListItemText, alpha } from '@mui/material';

interface MenuItemActionProps {
    className?: string;
    disabled?: boolean;
    label?: string;
    renderLabel?: () => React.ReactNode;
    leftIcon?: React.ReactNode;
    onClick?: (event: React.MouseEvent<HTMLElement>) => void;
    ref?: RefObject<HTMLLIElement>;
    rightIcon?: React.ReactNode;
    shortcut?: string;
    selected?: boolean;
}

export const MenuItemAction = forwardRef<HTMLLIElement, MenuItemActionProps>(function MenuItemAction(
    { className, label, leftIcon, renderLabel, rightIcon, shortcut, selected, ...props },
    ref
) {
    return (
        <MenuItem
          dense
          ref={ref}
          sx={{
            m: 0.5,
            py: 0
          }}
          className={className}
          selected={selected}
          {...props}>
          {leftIcon && (
              <ListItemIcon
                sx={{
                  color: (theme) => alpha(theme.palette.text.primary, 0.7),
	              ml: -0.5,
	              "& .MuiSvgIcon-root": {
                    fontSize: "small"
                  }
                }}
              >
                  {leftIcon}
              </ListItemIcon>
          )}
          {renderLabel ? renderLabel() : (
              <ListItemText>
                  <Typography
                    variant="body2"
                    sx={{
                      color: (theme: any) => alpha(theme.palette.text.secondary, 0.9)
                    }}
                  >
                    {label}
                  </Typography>
              </ListItemText>
          )}
          {shortcut && (
              <Typography
                variant="body2"
                sx={{
                  ml: 'auto', 
                  pl: 4, 
                  color: (theme: any) => alpha(theme.palette.text.secondary, 0.6), 
                  fontSize: '0.86rem'
                }}
              >
                  {shortcut}
              </Typography>
          )}
          {rightIcon && !shortcut && rightIcon}
        </MenuItem>
    );
});
