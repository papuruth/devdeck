"use client";

import React, { useMemo, useState } from "react";
import ColorModeContext from "context/ColorModeContext";

export default function ColorModeProvider({ children }: { children: React.ReactNode }) {
    const [mode, setMode] = useState<"light" | "dark">(() => {
        if (typeof window === "undefined") return "dark";
        const saved = localStorage.getItem("devdeck-theme");
        if (saved === "light" || saved === "dark") return saved;
        return window.matchMedia?.("(prefers-color-scheme: light)").matches ? "light" : "dark";
    });

    const colorMode = useMemo(
        () => ({
            mode,
            toggleColorMode: () => setMode((prev) => (prev === "light" ? "dark" : "light"))
        }),
        [mode]
    );

    return <ColorModeContext.Provider value={colorMode}>{children}</ColorModeContext.Provider>;
}
