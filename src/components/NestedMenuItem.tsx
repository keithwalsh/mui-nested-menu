import { ElementType, FocusEvent, forwardRef, HTMLAttributes, KeyboardEvent, MouseEvent, ReactNode, RefAttributes, useImperativeHandle, useRef, useState } from 'react';
import { Box,Menu } from '@mui/material';
import { ChevronRight } from '@mui/icons-material';
import { IconMenuItem } from './IconMenuItem';

export interface NestedMenuItemProps extends HTMLAttributes<HTMLElement> {
    parentMenuOpen: boolean;
    component?: ElementType;
    label?: string;
    renderLabel?: () => ReactNode;
    rightIcon?: ReactNode;
    leftIcon?: ReactNode;
    children?: ReactNode;
    className?: string;
    tabIndex?: number;
    disabled?: boolean;
    ContainerProps?: HTMLAttributes<HTMLElement> & RefAttributes<HTMLElement | null>;
    delay?: number;
}

const NestedMenuItem = forwardRef<HTMLLIElement | null, NestedMenuItemProps>(function NestedMenuItem(
    props,
    ref
) {
    const {
        parentMenuOpen,
        label,
        renderLabel,
        rightIcon = <ChevronRight />,
        leftIcon = null,
        children,
        className,
        tabIndex: tabIndexProp,
        ContainerProps: ContainerPropsProp = {},
        delay = 0,
    } = props;

    const { ref: containerRefProp, ...ContainerProps } = ContainerPropsProp;
    const menuItemRef = useRef<HTMLLIElement | null>(null);
    useImperativeHandle(ref, () => menuItemRef.current!); // eslint-disable-line @typescript-eslint/no-non-null-assertion
    const containerRef = useRef<HTMLDivElement | null>(null);
    useImperativeHandle(containerRefProp, () => containerRef.current as HTMLElement); // eslint-disable-line @typescript-eslint/no-non-null-assertion
    const menuContainerRef = useRef<HTMLDivElement | null>(null);
    const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const [isSubMenuOpen, setIsSubMenuOpen] = useState(false);

    const handleMouseEnter = (e: MouseEvent<HTMLElement>) => {
        timeoutRef.current = setTimeout(() => {
            if (!props.disabled) {
                setIsSubMenuOpen(true);
            }
            if (ContainerProps.onMouseEnter) {
                ContainerProps.onMouseEnter(e);
            }
        }, delay);
    };
    
    const handleMouseLeave = (e: MouseEvent<HTMLElement>) => {
        timeoutRef.current && clearTimeout(timeoutRef.current);
        setIsSubMenuOpen(false);
        if (ContainerProps.onMouseLeave) {
            ContainerProps.onMouseLeave(e);
        }
    };

    // Check if any immediate children are active
    const isSubmenuFocused = () => {
        const active = containerRef.current?.ownerDocument.activeElement ?? null;
        if(menuContainerRef.current == null) {
            return false;
        }
        for (const child of menuContainerRef.current.children) {
            if (child === active) {
                return true;
            }
        }
        return false;
    };

    const handleFocus = (e: FocusEvent<HTMLElement>) => {
        if (e.target === containerRef.current && !props.disabled) {
            setIsSubMenuOpen(true);
        }
        if (ContainerProps.onFocus) {
            ContainerProps.onFocus(e);
        }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
            return;
        }
        if (isSubmenuFocused()) {
            e.stopPropagation();
        }
        const active = containerRef.current?.ownerDocument.activeElement;
        if (e.key === 'ArrowLeft' && isSubmenuFocused()) {
            containerRef.current?.focus();
        }
        if (e.key === 'ArrowRight' && e.target === containerRef.current && e.target === active) {
            const firstChild = menuContainerRef.current?.children[0] as HTMLDivElement;
            firstChild?.focus();
        }
    };

    const open = isSubMenuOpen && parentMenuOpen;

    // Root element must have a `tabIndex` attribute for keyboard navigation
    let tabIndex;
    if (!props.disabled) {
        tabIndex = tabIndexProp !== undefined ? tabIndexProp : -1;
    }

    return (
        <Box
            {...ContainerProps}
            ref={containerRef}
            onFocus={handleFocus}
            tabIndex={tabIndex}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onKeyDown={handleKeyDown}
        >
            <IconMenuItem
                className={className}
                ref={menuItemRef}
                leftIcon={leftIcon}
                rightIcon={rightIcon}
                label={label}
                renderLabel={renderLabel}
            />

            <Menu
                // Set pointer events to 'none' to prevent the invisible Popover div
                // from capturing events for clicks and hovers
                style={{ pointerEvents: 'none' }}
                anchorEl={menuItemRef.current}
                anchorOrigin={{
                    horizontal: 'right',
                    vertical: 'top',
                }}
                transformOrigin={{
                    horizontal: 'left',
                    vertical: 'top',
                }}
                open={open}
                autoFocus={false}
                disableAutoFocus
                disableEnforceFocus
                onClose={() => {
                    setIsSubMenuOpen(false);
                }}
            >
                <Box ref={menuContainerRef} style={{ pointerEvents: 'auto' }}>
                    {children}
                </Box>
            </Menu>
        </Box>
    );
});

NestedMenuItem.displayName = 'NestedMenuItem';
export { NestedMenuItem };
