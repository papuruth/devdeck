import type { ComponentType } from "react";

export interface ToolRoute {
    path: string;
    name: string;
    component: ComponentType;
    category: string;
    key: string;
    exact?: boolean;
}

export interface PaletteItem {
    route: string;
    label: string;
    description?: string;
    icon?: React.ReactNode;
    category?: string;
    badge?: string;
    keywords?: string[];
}
