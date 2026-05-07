"use client";

import { useEffect } from "react";
import { useColorMode } from "context/ColorModeContext";

export default function ThemeAttributeSetter(): null {
    const { mode } = useColorMode();
    useEffect(() => {
        document.documentElement.setAttribute("data-theme", mode);
    }, [mode]);
    return null;
}
