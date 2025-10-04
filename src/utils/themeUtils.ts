/**
 * @fileoverview Theme utility functions for consistent color calculations
 * and style applications across menu components.
 */

import { alpha, Theme } from '@mui/material';

// Alpha values for consistent text opacity
export const ALPHA_VALUES = {
  ICON: 0.7,
  PRIMARY_TEXT: 0.9,
  SECONDARY_TEXT: 0.6,
} as const;

/**
 * Creates alpha-adjusted primary text color
 */
export const getAlphaPrimaryTextColor = (theme: Theme) => 
  alpha(theme.palette.text.primary, ALPHA_VALUES.ICON);

/**
 * Creates alpha-adjusted secondary text color for primary content
 */
export const getAlphaSecondaryTextColor = (theme: Theme) => 
  alpha(theme.palette.text.secondary, ALPHA_VALUES.PRIMARY_TEXT);

/**
 * Creates alpha-adjusted secondary text color for shortcuts/hints
 */
export const getAlphaHintTextColor = (theme: Theme) => 
  alpha(theme.palette.text.secondary, ALPHA_VALUES.SECONDARY_TEXT);

/**
 * Common icon styles with consistent color
 */
export const getIconStyles = (theme: Theme) => ({
  color: getAlphaPrimaryTextColor(theme),
  ml: -0.5,
  '& .MuiSvgIcon-root': {
    fontSize: 'small',
  },
});

/**
 * Common text styles for menu labels
 */
export const getLabelTextStyles = (theme: Theme) => ({
  color: getAlphaSecondaryTextColor(theme),
});

/**
 * Common text styles for shortcuts
 */
export const getShortcutTextStyles = (theme: Theme) => ({
  ml: 'auto',
  pl: 4,
  color: getAlphaHintTextColor(theme),
  fontSize: '0.86rem',
});