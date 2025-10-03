/**
 * @fileoverview Renders the root menu items for the MenuBar component. Wraps
 * children in MenuButtonGroup so that MenuButton props are minimised.
 */

import React from "react";
import { Box } from "@mui/material";
import { MenuConfig, MenuBarRendererProps } from "../types";
import MenuBarButton from "./MenuBarButton";
import { MenuBarButtonGroup } from "./MenuBarButtonGroup";

const TOOLBAR_BOX_SX = { display: 'flex', WebkitAppRegion: 'no-drag' };

const MenuBarRendererComponent: React.FC<MenuBarRendererProps> = ({ menuConfig }) => {
    return (
        <MenuBarButtonGroup>
            <Box 
                data-testid="menu-toolbar"
                sx={TOOLBAR_BOX_SX}
            >
                {menuConfig.map((menu: MenuConfig) => {
                    const key = menu.id ?? menu.label;
                    return (
                        <MenuBarButton
                            key={key}
                            menu={menu}
                        />
                    );
                })}
            </Box>  
        </MenuBarButtonGroup>
    );
};

export const MenuBar = React.memo(MenuBarRendererComponent);