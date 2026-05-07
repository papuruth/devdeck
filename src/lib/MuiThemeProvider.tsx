"use client";

import React from "react";
import { CssBaseline, StyledEngineProvider, ThemeProvider, createTheme } from "@mui/material";
import { useColorMode } from "context/ColorModeContext";

function buildTheme(mode: "light" | "dark") {
    return createTheme({
        palette: {
            mode,
            primary: { main: "#22cc99" },
            secondary: { main: "#1f1e29" }
        },
        breakpoints: {
            values: { xs: 120, sm: 600, md: 900, lg: 1200, xl: 1536 }
        },
        components: {
            MuiIconButton: {
                styleOverrides: {
                    root: { minWidth: 44, minHeight: 44, touchAction: "manipulation" }
                }
            },
            MuiButtonBase: {
                styleOverrides: {
                    root: { touchAction: "manipulation" }
                }
            },
            MuiAppBar: {
                styleOverrides: {
                    root: {
                        background:
                            mode === "dark"
                                ? "rgba(15, 23, 42, 0.85)"
                                : "linear-gradient(90deg, #0d9a68 0%, #059669 100%)",
                        backdropFilter: mode === "dark" ? "blur(12px)" : "none",
                        WebkitBackdropFilter: mode === "dark" ? "blur(12px)" : "none",
                        boxShadow:
                            mode === "dark"
                                ? "0 2px 16px rgba(0,0,0,0.5), 0 1px 0 rgba(255,255,255,0.05)"
                                : "0 2px 10px rgba(0,0,0,0.15)",
                        borderBottom: mode === "dark" ? "1px solid rgba(255,255,255,0.07)" : "none"
                    }
                }
            }
        }
    });
}

export default function MuiThemeProvider({ children }: { children: React.ReactNode }) {
    const { mode } = useColorMode();
    const theme = buildTheme(mode);

    return (
        <StyledEngineProvider injectFirst>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                {children}
            </ThemeProvider>
        </StyledEngineProvider>
    );
}
