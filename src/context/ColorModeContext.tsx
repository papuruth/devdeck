"use client";

import { createContext, useContext } from "react";

interface ColorModeContextType {
    mode: "light" | "dark";
    toggleColorMode: () => void;
    setThemeMode?: (mode: "light" | "dark") => void;
}

const ColorModeContext = createContext<ColorModeContextType>({
    mode: "light",
    toggleColorMode: () => {},
    setThemeMode: () => {}
});

export const useColorMode = () => useContext(ColorModeContext);

export default ColorModeContext;
