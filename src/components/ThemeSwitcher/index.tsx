"use client";

import React, { useEffect, useState } from "react";
import { Tooltip } from "@mui/material";
import { DarkMode, LightMode, SettingsBrightness } from "@mui/icons-material";
import { useColorMode } from "context/ColorModeContext";
import { SwitcherContainer, ModeButton } from "./styles";

type ThemeMode = "auto" | "light" | "dark";

export default function ThemeSwitcher() {
    const { mode, setThemeMode } = useColorMode();
    const [systemMode, setSystemMode] = useState<"light" | "dark">("dark");
    const [currentMode, setCurrentMode] = useState<ThemeMode>(localStorage.getItem("devdeck-theme") as "auto" | "light" | "dark");
    console.log("🚀 ~ ThemeSwitcher ~ currentMode:", currentMode);

    useEffect(() => {
        const mediaQuery = window.matchMedia("(prefers-color-scheme: light)");
        setSystemMode(mediaQuery.matches ? "light" : "dark");
        const handler = (e: MediaQueryListEvent) => setSystemMode(e.matches ? "light" : "dark");
        mediaQuery.addEventListener("change", handler);
        return () => mediaQuery.removeEventListener("change", handler);
    }, []);

    useEffect(() => {
        const saved = localStorage.getItem("devdeck-theme");
        if (saved === "light" || saved === "dark") {
            setCurrentMode(saved);
        } else {
            setCurrentMode("auto");
        }
    }, [mode]);

    const modes: Array<{ value: ThemeMode; icon: React.ReactNode; label: string }> = [
        { value: "auto", icon: <SettingsBrightness sx={{ fontSize: "18px" }} />, label: "Auto" },
        { value: "light", icon: <LightMode sx={{ fontSize: "18px" }} />, label: "Light" },
        { value: "dark", icon: <DarkMode sx={{ fontSize: "18px" }} />, label: "Dark" }
    ];

    const handleModeChange = (newMode: ThemeMode) => {
        setCurrentMode(newMode);
        if (newMode === "auto") {
            localStorage.removeItem("devdeck-theme");
        } else {
            localStorage.setItem("devdeck-theme", newMode);
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
