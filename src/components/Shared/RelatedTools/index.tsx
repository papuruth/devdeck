"use client";

import React, { cloneElement } from "react";
import NextLink from "next/link";
import { Box, Typography } from "@mui/material";
import styled from "styled-components";
import { getRelatedToolEntries } from "components/CommandPalette/paletteData";
import { TOOL_CATEGORIES } from "utils/globalConstants";

const Card = styled(NextLink)<{ $color?: string }>`
    text-decoration: none;
    color: var(--text-primary);
    display: flex;
    align-items: flex-start;
    gap: 14px;
    padding: 16px;
    flex: 1 1 180px;
    max-width: 260px;
    background-color: var(--bg-card);
    border-radius: 10px;
    border-left: 4px solid ${(p) => p.$color};
    box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.08);
    transition: transform 200ms ease, box-shadow 200ms ease;
    position: relative;
    overflow: hidden;

    &::after {
        content: "";
        position: absolute;
        inset: 0;
        border-radius: 10px;
        background: radial-gradient(circle at 30% 50%, ${(p) => p.$color}0a, transparent 70%);
        opacity: 0;
        transition: opacity 300ms ease;
        pointer-events: none;
    }

    &:hover {
        transform: translateY(-3px);
        box-shadow: 0px 8px 24px rgba(0, 0, 0, 0.2), 0 0 0 1px ${(p) => p.$color}44;
    }

    &:hover::after {
        opacity: 1;
    }
`;

const IconWrap = styled.div<{ $color?: string }>`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    border-radius: 8px;
    background-color: ${(p) => p.$color}22;
    color: ${(p) => p.$color};
    flex-shrink: 0;

    & svg {
        font-size: 1.4rem !important;
        width: 1.4rem !important;
        height: 1.4rem !important;
    }
`;

function getCategoryColor(categoryId: string) {
    const cat = TOOL_CATEGORIES.find((c: any) => c.id === categoryId);
    return cat?.color || "#22c55e";
}

interface RelatedToolsProps {
    currentRoute: string;
}

export default function RelatedTools({ currentRoute }: RelatedToolsProps) {
    const tools = getRelatedToolEntries(currentRoute);
    if (!tools.length) return null;

    return (
        <Box sx={{ mt: 4, px: 1, pb: 4 }}>
            <Typography variant="subtitle2" sx={{ mb: 1.5, color: "var(--text-primary)", fontWeight: 700 }}>
                Related Tools
            </Typography>
            <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
                {tools.map((tool: any) => {
                    const color = getCategoryColor(tool.category);
                    return (
                        <Card key={tool.route} href={tool.route} $color={color}>
                            <IconWrap $color={color}>
                                {tool.icon && cloneElement(tool.icon, { sx: { fontSize: "1.4rem" }, fontSize: undefined })}
                            </IconWrap>
                            <Box sx={{ overflow: "hidden", flex: 1 }}>
                                <Typography variant="body2" sx={{ color: "var(--text-primary)", lineHeight: 1.3, fontWeight: 600 }}>
                                    {tool.label}
                                </Typography>
                                {tool.description && (
                                    <Typography variant="caption" sx={{ mt: 0.25, lineHeight: 1.4, color: "var(--text-secondary)", display: "block" }}>
                                        {tool.description}
                                    </Typography>
                                )}
                            </Box>
                        </Card>
                    );
                })}
            </Box>
        </Box>
    );
}

