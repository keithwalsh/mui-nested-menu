import React, { forwardRef, RefObject } from 'react';
import { MenuItem, Typography } from '@mui/material';

interface IconMenuItemProps {
    className?: string;
    disabled?: boolean;
    label?: string;
    renderLabel?: () => React.ReactNode;
    leftIcon?: React.ReactNode;
    onClick?: (event: React.MouseEvent<HTMLElement>) => void;
    ref?: RefObject<HTMLLIElement>;
    rightIcon?: React.ReactNode;
}

export const IconMenuItem = forwardRef<HTMLLIElement, IconMenuItemProps>(function IconMenuItem(
    { className, label, leftIcon, renderLabel, rightIcon, ...props },
    ref
) {
    return (
        <MenuItem
          ref={ref}
          className={className}
          {...props}>
          {leftIcon}
          {renderLabel ? renderLabel() : <Typography>{label}</Typography>}
          {rightIcon}
        </MenuItem>
    );
});
