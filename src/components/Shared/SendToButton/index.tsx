"use client";

import { CallSplit } from "@mui/icons-material";
import { Button, ListItemIcon, ListItemText, MenuItem, MenuList, Paper, Popover, Typography } from "@mui/material";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useToolChain } from "context/ToolChainContext";

/**
 * M5 — SendToButton
 * Shows a "Send to..." popover listing compatible target tools.
 * @param {string} value  The value to send
 * @param {Array<{label: string, route: string, icon?: ReactNode}>} targets  Compatible tools
 */

export interface SendToTarget {
    label: string;
    route: string;
    icon?: React.ReactNode;
}

interface SendToButtonProps {
    value: string;
    targets?: SendToTarget[];
}

export default function SendToButton({ value, targets = [] }: SendToButtonProps) {
    const router = useRouter();
    const { sendTo } = useToolChain();
    const [anchor, setAnchor] = useState<HTMLButtonElement | null>(null);

    if (!targets.length || !value) return null;

    const handleOpen = (e: React.MouseEvent<HTMLButtonElement>) => setAnchor(e.currentTarget);
    const handleClose = () => setAnchor(null);

    const handleSend = (route: string) => {
        sendTo(value, route);
        router.push(route);
        handleClose();
    };

    return (
        <>
            <Button
                size="small"
                variant="outlined"
                startIcon={<CallSplit style={{ fontSize: 11 }} />}
                onClick={handleOpen}
                sx={{
                    borderColor: "rgba(34,204,153,0.35)",
                    color: "#22cc99",
                    fontSize: "11px",
                    fontWeight: 500,
                    letterSpacing: "0.04em",
                    padding: "8px 14px",
                    minHeight: "36px",
                    lineHeight: 1.5,
                    textTransform: "none",
                    borderRadius: "var(--radius-btn, 6px)",
                    fontFamily: "Inter, sans-serif",
                    "& .MuiButton-startIcon": { marginRight: "5px" },
                    "&:hover": { borderColor: "#22cc99", background: "rgba(34,204,153,0.08)" }
                }}
            >
                Send to…
            </Button>

            <Popover
                open={Boolean(anchor)}
                anchorEl={anchor}
                onClose={handleClose}
                anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
                transformOrigin={{ vertical: "top", horizontal: "left" }}
                slotProps={{
                    paper: {
                        sx: {
                            mt: 0.5,
                            minWidth: 220,
                            background: "var(--bg-card)",
                            border: "1px solid var(--border-color)",
                            borderRadius: "10px",
                            boxShadow: "0 8px 30px rgba(0,0,0,0.35)"
                        }
                    }
                }}
            >
                <Paper elevation={0} sx={{ background: "transparent" }}>
                    <Typography variant="caption" sx={{ px: 2, pt: 1.5, pb: 0.5, display: "block", fontWeight: 700, color: "text.secondary" }}>
                        SEND OUTPUT TO
                    </Typography>
                    <MenuList dense>
                        {targets.map((t) => (
                            <MenuItem key={t.route} onClick={() => handleSend(t.route)} sx={{ "&:hover": { background: "rgba(34,204,153,0.08)" } }}>
                                {t.icon && <ListItemIcon sx={{ color: "#22cc99", minWidth: 32 }}>{t.icon}</ListItemIcon>}
                                <ListItemText primary={t.label} slotProps={{ primary: { sx: { fontSize: "0.85rem" } } }} />
                            </MenuItem>
                        ))}
                    </MenuList>
                </Paper>
            </Popover>
        </>
    );
}
