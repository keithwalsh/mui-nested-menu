import { forwardRef, useState } from 'react';
import { Box, Button, Menu } from '@mui/material';
import { ExpandMore } from '@mui/icons-material';
import { MenuItemData } from '../definitions';
import { nestedMenuItemsFromObject } from './nestedMenuItemsFromObject';

export interface NestedDropdownProps {
    children?: React.ReactNode;
    menuItemsData?: MenuItemData;
    onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export const NestedDropdown = forwardRef<HTMLDivElement | null, NestedDropdownProps>(function NestedDropdown(
    props,
    ref
) {
    const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
    const open = Boolean(anchorEl);

    const { menuItemsData: data, onClick, ...rest } = props;

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(e.currentTarget);
        onClick && onClick(e);
    };
    const handleClose = () => setAnchorEl(null);

    const menuItems = nestedMenuItemsFromObject({
        handleClose,
        isOpen: open,
        menuItemsData: data?.items ?? [],
    });

    return (
        <Box ref={ref} {...rest}>
            <Button onClick={handleClick} endIcon={<ExpandMore />}>
                {data?.label ?? 'Menu'}
            </Button>
            <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
                {menuItems}
            </Menu>
        </Box>
    );
});
