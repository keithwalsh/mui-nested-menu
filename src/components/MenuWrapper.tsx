/**
 * @fileoverview Reusable wrapper component for MUI Menu with consistent
 * styling and behavior across different menu types.
 */

import React from 'react';
import { Box, Menu, MenuProps } from '@mui/material';
import { COMMON_MENU_PROPS, MENU_CONSTANTS, MENU_SX_STYLES } from '../constants';

export interface MenuWrapperProps extends Omit<MenuProps, 'sx'> {
  children: React.ReactNode;
  variant?: 'topLevel' | 'submenu';
  sx?: MenuProps['sx'];
}

export const MenuWrapper: React.FC<MenuWrapperProps> = ({
  children,
  variant = 'topLevel',
  sx,
  ...menuProps
}) => {
  const containerSx = variant === 'topLevel' 
    ? MENU_SX_STYLES.menuContainer 
    : MENU_SX_STYLES.submenuContainer;

  const slotProps = variant === 'submenu' 
    ? {
        paper: {
          sx: {
            mt: MENU_CONSTANTS.MARGINS.SMALL,
          },
        },
      }
    : undefined;

  return (
    <Menu
      {...COMMON_MENU_PROPS}
      {...menuProps}
      sx={{
        ...containerSx,
        ...sx,
      }}
      slotProps={slotProps}
    >
      <Box style={{ pointerEvents: MENU_CONSTANTS.POINTER_EVENTS.AUTO }}>
        {children}
      </Box>
    </Menu>
  );
};