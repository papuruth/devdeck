"use client";

import React, { useEffect, useRef, useState } from "react";
import { Tooltip } from "@mui/material";
import { DarkMode, LightMode, SettingsBrightness } from "@mui/icons-material";
import { useColorMode } from "context/ColorModeContext";
import { SwitcherContainer, ModeButton } from "./styles";

type ThemeMode = "auto" | "light" | "dark";

export default function ThemeSwitcher({ themeMode }: { themeMode: string }) {
    const { mode, setThemeMode } = useColorMode();
    const [systemMode, setSystemMode] = useState<"light" | "dark">("dark");
    const [currentMode, setCurrentMode] = useState<ThemeMode>((themeMode || "auto") as "auto" | "light" | "dark");
    const isMounted = useRef(false);

    useEffect(() => {
        const mediaQuery = window.matchMedia("(prefers-color-scheme: light)");
        setSystemMode(mediaQuery.matches ? "light" : "dark");
        const handler = (e: MediaQueryListEvent) => setSystemMode(e.matches ? "light" : "dark");
        mediaQuery.addEventListener("change", handler);
        isMounted.current = true;
        return () => mediaQuery.removeEventListener("change", handler);
    }, []);

    useEffect(() => {
        if (isMounted.current) return;
        if (themeMode === "light" || themeMode === "dark") {
            setCurrentMode(themeMode);
        } else {
            setCurrentMode("auto");
        }
    }, [mode, themeMode]);

    const modes: Array<{ value: ThemeMode; icon: React.ReactNode; label: string }> = [
        { value: "auto", icon: <SettingsBrightness sx={{ fontSize: "18px" }} />, label: "Auto" },
        { value: "light", icon: <LightMode sx={{ fontSize: "18px" }} />, label: "Light" },
        { value: "dark", icon: <DarkMode sx={{ fontSize: "18px" }} />, label: "Dark" }
    ];

    const handleModeChange = (newMode: ThemeMode) => {
        setCurrentMode(newMode);
        if (newMode === "auto") {
            document.cookie = "devdeck-theme=; path=/; max-age=0;";
        } else {
            document.cookie = `devdeck-theme=${newMode}; path=/; max-age=34560000; SameSite=Strict`;
        }
        setThemeMode?.(newMode === "auto" ? systemMode : newMode);
    };

    return (
        <SwitcherContainer>
            {modes.map(({ value, icon, label }) => (
                <Tooltip key={value} title={`${label} mode`} arrow>
                    <ModeButton
                        $active={currentMode === value}
                        onClick={() => handleModeChange(value)}
                        aria-label={`Switch to ${label} mode`}
                        aria-pressed={currentMode === value}
                    >
                        {icon}
                    </ModeButton>
                </Tooltip>
            ))}
        </SwitcherContainer>
    );
}
