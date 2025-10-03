/**
 * @fileoverview Utility functions for the MenuBar component. Includes a
 * keyboard shortcut hook using react-hotkeys-hook and type guards for
 * menu item types.
 */

import { useMemo } from "react";
import { useHotkeys } from "react-hotkeys-hook";
import { MenuConfig, MenuItemDivider, MenuItemAction, MenuItems } from "../types";

/**
 * Type guard to check if a MenuItem is an action item with both a shortcut and an action.
 * @param {MenuItem} item - The menu item to check.
 * @returns {boolean} True if the item is an action item with both a shortcut and an action, false otherwise.
 */
function hasShortcutAndAction(item: MenuItems): item is MenuItemAction & { shortcut: string } {
    return item.kind === "action" && "action" in item && typeof item.action === "function" && "shortcut" in item && typeof item.shortcut === "string";
}

/**
 * Custom hook to set up hotkeys for menu items with shortcuts.
 * Uses react-hotkeys-hook for simplified keyboard shortcut handling.
 * @see {@link https://react-hotkeys-hook.vercel.app/docs/api/use-hotkeys|useHotkeys API}
 * @param {MenuConfig[]} config - An array of menu configurations.
 * @returns {void}
 */
export const useMenuHotkeys = (config: MenuConfig[]) => {
    const shortcutToAction = useMemo(() => {
        const map = new Map<string, () => void>();

        const collectFromItems = (items: MenuItems[]) => {
            items.forEach((item) => {
                if (hasShortcutAndAction(item)) {
                    // Replace 'Plus' with '=' because react-hotkeys-hook expects '=' for the plus key (e.g., 'Ctrl+Plus' should be 'Ctrl+=')
                    map.set(item.shortcut.replace(/Plus/g, "="), item.action);
                } else if ((item as any).kind === "submenu" && Array.isArray((item as any).items)) {
                    collectFromItems((item as any).items as MenuItems[]);
                }
            });
        };

        config.forEach((menu) => {
            collectFromItems(menu.items);
        });
        return map;
    }, [config]);

    // Register each shortcut with useHotkeys
    shortcutToAction.forEach((action, shortcut) => {
        // Avoid registering global hotkeys for Undo/Redo since App also handles them.
        const normalized = shortcut.toLowerCase();
        if (normalized === 'ctrl+z' || normalized === 'cmd+z' || normalized === 'meta+z' || normalized === 'ctrl+y' || normalized === 'cmd+y' || normalized === 'meta+y' || normalized === 'ctrl+shift+z' || normalized === 'cmd+shift+z' || normalized === 'meta+shift+z') {
            return;
        }
        useHotkeys(shortcut, action, { preventDefault: true });
    });
};

/**
 * Type guard to check if a MenuItem is a divider.
 * @param {MenuItem} menuItem - The menu item to check.
 * @returns {boolean} True if the item is a divider, false otherwise.
 */
export const isDivider = (menuItem: MenuItems): menuItem is MenuItemDivider => {
    return menuItem.kind === "divider";
};
