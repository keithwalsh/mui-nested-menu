/**
 * @fileoverview Type definitions for menu configuration supporting actions,
 * dividers, and nested submenus with Material-UI integration.
 */

// Types for menubar MenuConfig
export type MenuItemKind = "action" | "divider" | "submenu";

interface MenuItemBase {
    kind: MenuItemKind;
    label?: string;
    id?: string;
    disabled?: boolean;
    selected?: boolean;
}

export interface MenuItemAction extends MenuItemBase {
    kind: "action";
    label: string;
    action: () => void;
    icon?: React.ReactNode;
    shortcut?: string;
}

export interface MenuItemDivider extends MenuItemBase {
    kind: "divider";
}

export interface MenuItemSubmenu extends MenuItemBase {
    kind: "submenu";
    label: string;
    items: MenuItems[];
    icon?: React.ReactNode;
}

export type MenuItems = MenuItemAction | MenuItemDivider | MenuItemSubmenu;

export interface MenuConfig {
    id?: string;
    label: string;
    disabled?: boolean;
    items: MenuItems[];
}
