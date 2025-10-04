/**
 * @fileoverview Utility functions for generating consistent keys across
 * menu components.
 */

import { MenuItems } from '../definitions';

/**
 * Generates a unique key for a menu item, preferring id, then label, then random
 */
export function generateMenuItemKey(item: MenuItems, prefix?: string): string {
  const baseKey = item.id ?? item.label ?? Math.random().toString(36);
  return prefix ? `${prefix}-${baseKey}` : baseKey;
}

/**
 * Generates a key specifically for divider items
 */
export function generateDividerKey(item: MenuItems): string {
  return generateMenuItemKey(item, 'divider');
}

/**
 * Generates a key specifically for submenu items
 */
export function generateSubmenuKey(item: MenuItems): string {
  return generateMenuItemKey(item, 'submenu');
}

/**
 * Generates a key specifically for action items
 */
export function generateActionKey(item: MenuItems): string {
  return generateMenuItemKey(item, 'action');
}