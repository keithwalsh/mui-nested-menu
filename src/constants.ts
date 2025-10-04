/**
 * @fileoverview Shared constants for menu components to maintain consistency
 * and reduce duplication across the codebase.
 */

import { SxProps, Theme } from '@mui/material';

// Menu styling constants
export const MENU_CONSTANTS = {
  MARGINS: {
    NONE: 0,
    SMALL: 0.5,
  },
  PADDING: {
    NONE: 0,
    SMALL: 0.5,
  },
  TRANSITION_DURATION: 0,
  POINTER_EVENTS: {
    NONE: 'none' as const,
    AUTO: 'auto' as const,
  },
} as const;

// Common menu anchor/transform origins
export const MENU_ORIGINS = {
  TOP_MENU: {
    anchorOrigin: {
      vertical: 'bottom' as const,
      horizontal: 'left' as const,
    },
    transformOrigin: {
      vertical: 'top' as const,
      horizontal: 'left' as const,
    },
  },
  SUBMENU: {
    anchorOrigin: {
      horizontal: 'right' as const,
      vertical: 'top' as const,
    },
    transformOrigin: {
      horizontal: 'left' as const,
      vertical: 'top' as const,
    },
  },
} as const;

// Common menu props that are reused
export const COMMON_MENU_PROPS = {
  keepMounted: true,
  transitionDuration: MENU_CONSTANTS.TRANSITION_DURATION,
  style: { pointerEvents: MENU_CONSTANTS.POINTER_EVENTS.NONE },
} as const;

// Common SX styles for menus
export const MENU_SX_STYLES = {
  menuContainer: {
    m: MENU_CONSTANTS.MARGINS.NONE,
    p: MENU_CONSTANTS.PADDING.NONE,
    '& .MuiList-root': {
      pt: MENU_CONSTANTS.PADDING.SMALL,
      pb: MENU_CONSTANTS.PADDING.SMALL,
      m: MENU_CONSTANTS.MARGINS.NONE,
    },
  } as SxProps<Theme>,
  submenuContainer: {
    m: MENU_CONSTANTS.MARGINS.NONE,
    p: MENU_CONSTANTS.PADDING.NONE,
    '& .MuiList-root': {
      p: MENU_CONSTANTS.PADDING.NONE,
      m: MENU_CONSTANTS.MARGINS.NONE,
    },
  } as SxProps<Theme>,
  menuItem: {
    m: MENU_CONSTANTS.MARGINS.SMALL,
    py: MENU_CONSTANTS.PADDING.NONE,
  } as SxProps<Theme>,
  submenuItem: {
    m: MENU_CONSTANTS.MARGINS.SMALL,
  } as SxProps<Theme>,
  submenuItemInner: {
    m: MENU_CONSTANTS.MARGINS.NONE,
  } as SxProps<Theme>,
} as const;

// Button styling constants
export const BUTTON_STYLES = {
  menuButton: {
    textTransform: 'none' as const,
    px: 1.25,
    py: 0.25,
    minWidth: 0,
    color: 'text.primary',
  },
} as const;