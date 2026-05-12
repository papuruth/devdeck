"use client";

import React, { useEffect, useMemo, useState } from "react";
import ColorModeContext from "context/ColorModeContext";

export default function ColorModeProvider({ children }: { children: React.ReactNode }) {
    const [mode, setMode] = useState<"light" | "dark">(() => {
        if (typeof window === "undefined") return "dark";
        const saved = localStorage.getItem("devdeck-theme");
        if (saved === "light" || saved === "dark") return saved;
        return window.matchMedia?.("(prefers-color-scheme: light)").matches ? "light" : "dark";
    });

    useEffect(() => {
        const mediaQuery = window.matchMedia("(prefers-color-scheme: light)");
        const handleChange = (e: MediaQueryListEvent) => {
            const saved = localStorage.getItem("devdeck-theme");
            if (saved !== "light" && saved !== "dark") {
                setMode(e.matches ? "light" : "dark");
            }
        };
        mediaQuery.addEventListener("change", handleChange);
        return () => mediaQuery.removeEventListener("change", handleChange);
    }, []);

    const colorMode = useMemo(
        () => ({
            mode,
            toggleColorMode: () => setMode((prev) => (prev === "light" ? "dark" : "light")),
            setThemeMode: (newMode: "light" | "dark") => setMode(newMode)
        }),
        [mode]
    );

    return <ColorModeContext.Provider value={colorMode}>{children}</ColorModeContext.Provider>;
}
