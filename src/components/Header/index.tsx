"use client";

import { GitHub } from "@mui/icons-material";
import SearchIcon from "@mui/icons-material/Search";
import { Box, IconButton, Tooltip, useMediaQuery, useTheme } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import DevDeckLogo from "components/DevDeckLogo";
import ThemeSwitcher from "components/ThemeSwitcher";
import localization from "localization";
import React, { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import colors from "styles/colors";
import { GLOBAL_CONSTANTS } from "utils/globalConstants";
import { isMac } from "utils/helperFunctions";
import { useAppDispatch } from "utils/hooks/redux";
import { useColorMode } from "context/ColorModeContext";
import { toggleCommandPaletteAction } from "./HeaderAction";
import { BlogNavLink, NavDivider, PaletteTrigger, StyledContainer, TriggerKbd, TriggerKbdGroup, TriggerPlaceholder } from "./styles";

export default function Header() {
    const { mode } = useColorMode();
    const dispatch = useAppDispatch();
    const [scrolled, setScrolled] = useState(false);
    const [macKbd, setMacKbd] = useState(false);
    const pathname = usePathname();
    const router = useRouter();
    const isBlogActive = pathname?.startsWith("/blog") ?? false;
    const theme = useTheme();
    const isCompact = useMediaQuery(theme.breakpoints.down("sm"));

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 10);
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    useEffect(() => {
        setMacKbd(isMac);
    }, []);

    return (
        <StyledContainer sx={{ flexGrow: 1, minWidth: 320 }}>
            <AppBar
                position="fixed"
                sx={{
                    transition: "box-shadow 0.25s ease, background 0.25s ease",
                    ...(scrolled && { boxShadow: mode === "dark" ? "0 4px 24px rgba(0,0,0,0.6)" : "0 4px 16px rgba(0,0,0,0.2)" })
                }}
            >
                <Toolbar
                    sx={{
                        padding: { xs: "0 10px", sm: "0 20px" },
                        minHeight: scrolled ? "52px !important" : "64px !important",
                        transition: "min-height 0.25s ease",
                        gap: 0
                    }}
                >
                    {/* Left: Logo + Blog nav */}
                    <Box sx={{ display: "flex", alignItems: "center", gap: { xs: "8px", sm: "16px" }, flexGrow: 1, minWidth: 0 }}>
                        <DevDeckLogo compact={isCompact} />
                        <BlogNavLink $active={isBlogActive} onClick={() => router.push("/blog")} aria-label="Blog and Guides">
                            <span style={{ fontSize: "0.9rem", lineHeight: 1 }}>📘</span>
                            Blog
                        </BlogNavLink>
                    </Box>

                    {/* Right: Search | Theme | GitHub */}
                    <Box sx={{ display: "flex", alignItems: "center", gap: { xs: "0px", sm: "4px" }, flexShrink: 0 }}>
                        {/* Full pill on sm+, icon-only on mobile */}
                        <Box sx={{ display: { xs: "none", sm: "flex" } }}>
                            <PaletteTrigger onClick={() => dispatch(toggleCommandPaletteAction())} aria-label="Open command palette" tabIndex={0}>
                                <SearchIcon sx={{ fontSize: "1rem", color: "rgba(255,255,255,0.45)", flexShrink: 0 }} />
                                <TriggerPlaceholder>{localization.commandPalette.placeholder}</TriggerPlaceholder>
                                <TriggerKbdGroup aria-hidden>
                                    <TriggerKbd>{macKbd ? "⌘" : "Ctrl"}</TriggerKbd>
                                    <TriggerKbd>K</TriggerKbd>
                                </TriggerKbdGroup>
                            </PaletteTrigger>
                        </Box>
                        <Tooltip title="Search tools">
                            <IconButton
                                sx={{ display: { xs: "flex", sm: "none" }, color: colors.white, "&:hover": { color: "#22cc99" } }}
                                onClick={() => dispatch(toggleCommandPaletteAction())}
                                aria-label="Open command palette"
                            >
                                <SearchIcon />
                            </IconButton>
                        </Tooltip>

                        <NavDivider aria-hidden />

                        <ThemeSwitcher />

                        <Tooltip title="View source on GitHub">
                            <IconButton
                                component="a"
                                href={GLOBAL_CONSTANTS.GIT_REPO_URL}
                                target="_blank"
                                rel="noopener noreferrer"
                                sx={{
                                    color: colors.white,
                                    transition: "transform 0.17s ease, opacity 0.17s ease",
                                    "&:hover": { transform: "scale(1.08)", color: "#22cc99" },
                                    "&:active": { transform: "scale(0.95)" }
                                }}
                                aria-label="View source on GitHub"
                            >
                                <GitHub />
                            </IconButton>
                        </Tooltip>
                    </Box>
                </Toolbar>
            </AppBar>
        </StyledContainer>
    );
}

