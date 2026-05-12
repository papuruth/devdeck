// @ts-nocheck
import { ContentCopy, Clear, Info } from "@mui/icons-material";
import { Box, Typography } from "@mui/material";
import React, { useCallback, useMemo, useState } from "react";
import styled from "styled-components";
import { ActionBtn, ActionBtnGroup, CodeArea, EmptyState, Panel, PanelHeader, PanelLabel, ToolLayout } from "components/Shared/ToolKit";
import { useDebounce } from "utils/hooks/useDebounce.hooks";
import { CSS_PROPERTY_MAP } from "./cssToTailwindMap";
import { parseCSS, formatTailwindOutput, generateUnmappedComment } from "./cssParser";

const StatsBadge = styled.span`
    display: inline-flex;
    align-items: center;
    gap: 4px;
    padding: 2px 8px;
    border-radius: 4px;
    font-size: 10px;
    font-weight: 600;
    font-family: var(--font-mono);
    background: rgba(34, 204, 153, 0.1);
    color: #22cc99;
`;

const UnmappedComment = styled.div`
    padding: 2px 16px 6px;
    font-size: 10px;
    font-family: var(--font-mono);
    color: var(--text-secondary);
    opacity: 0.5;
    line-height: 1.6;
`;

const cssInputPlaceholder = `
  .btn {
    display: flex;
    align-items: center;
    padding: 8px 16px;
    border-radius: 8px;
    font-weight: 700;
    color: #fff;
    background-color: #22cc99;
  }
`;

export default function CSSToTailwind() {
    const [cssInput, setCssInput] = useState("");
    const [copied, setCopied] = useState(false);
    const [copiedAll, setCopiedAll] = useState(false);

    // Debounce input for performance
    const debouncedInput = useDebounce(cssInput, 300);

    // Convert CSS to Tailwind
    const conversionResult = useMemo(() => {
        if (!debouncedInput.trim()) {
            return null;
        }

        const parsed = parseCSS(debouncedInput);
        if (parsed.properties.length === 0) {
            return null;
        }

        const mappedClasses: string[] = [];
        const unmappedComments: string[] = [];
        let mappedCount = 0;
        const totalCount = parsed.properties.length;

        // Track unique properties to avoid duplicates
        const seenProperties = new Set<string>();

        parsed.properties.forEach((cssProp) => {
            const mapper = CSS_PROPERTY_MAP[cssProp.property];
            if (mapper) {
                try {
                    const result = mapper(cssProp.value);
                    if (result) {
                        // Split multiple classes (e.g., "border border-solid border-gray-500")
                        const classes = result.split(/\s+/);
                        classes.forEach((cls) => {
                            if (cls.trim() && !seenProperties.has(cssProp.property + cls)) {
                                mappedClasses.push(cls.trim());
                                seenProperties.add(cssProp.property + cls);
                            }
                        });
                        mappedCount += 1;
                    } else {
                        unmappedComments.push(generateUnmappedComment(cssProp.property, cssProp.value));
                    }
                } catch (e) {
                    unmappedComments.push(generateUnmappedComment(cssProp.property, cssProp.value));
                }
            } else {
                unmappedComments.push(generateUnmappedComment(cssProp.property, cssProp.value));
            }
        });

        return {
            mappedClasses,
            unmappedComments,
            mappedCount,
            totalCount,
            output: formatTailwindOutput(mappedClasses),
            fullOutput: formatTailwindOutput(mappedClasses) + (unmappedComments.length > 0 ? `\n${unmappedComments.join("\n")}` : "")
        };
    }, [debouncedInput]);

    // Copy classes only (for direct use in className)
    const handleCopy = useCallback(async () => {
        if (!conversionResult) return;
        try {
            await navigator.clipboard.writeText(conversionResult.mappedClasses.join(" "));
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error("Failed to copy:", err);
        }
    }, [conversionResult]);

    // Copy all output (including comments)
    const handleCopyAll = useCallback(async () => {
        if (!conversionResult) return;
        try {
            await navigator.clipboard.writeText(conversionResult.fullOutput);
            setCopiedAll(true);
            setTimeout(() => setCopiedAll(false), 2000);
        } catch (err) {
            console.error("Failed to copy:", err);
        }
    }, [conversionResult]);

    // Clear input
    const handleClear = useCallback(() => {
        setCssInput("");
    }, []);

    const renderOutputPanel = () => {
        if (!cssInput.trim()) {
            return (
                <EmptyState>
                    <Typography variant="body2">Paste CSS above to convert to Tailwind</Typography>
                </EmptyState>
            );
        }
        if (!conversionResult) {
            return (
                <EmptyState>
                    <Typography variant="body2">Parsing CSS...</Typography>
                </EmptyState>
            );
        }
        if (conversionResult.mappedClasses.length === 0) {
            return (
                <EmptyState>
                    <Typography variant="body2">No Tailwind mappings found for the provided CSS</Typography>
                    {conversionResult.unmappedComments.length > 0 && (
                        <Box sx={{ mt: 2, width: "100%" }}>
                            {conversionResult.unmappedComments.map((comment, i) => (
                                // eslint-disable-next-line react/no-array-index-key
                                <UnmappedComment key={i}>{comment}</UnmappedComment>
                            ))}
                        </Box>
                    )}
                </EmptyState>
            );
        }
        return (
            <>
                <CodeArea
                    value={conversionResult.output}
                    readOnly
                    spellCheck={false}
                    style={{
                        cursor: "default",
                        minHeight: "200px"
                    }}
                />
                {conversionResult.unmappedComments.length > 0 && (
                    <Box sx={{ px: 2, pb: 1 }}>
                        <Box sx={{ display: "flex", alignItems: "center", gap: 0.5, mb: 1 }}>
                            <Info fontSize="small" sx={{ fontSize: 14, color: "var(--text-secondary)", opacity: 0.5 }} />
                            <Typography variant="caption" sx={{ color: "var(--text-secondary)", opacity: 0.5 }}>
                                Unmapped properties:
                            </Typography>
                        </Box>
                        {conversionResult.unmappedComments.map((comment, i) => (
                            // eslint-disable-next-line react/no-array-index-key
                            <UnmappedComment key={i}>{comment}</UnmappedComment>
                        ))}
                    </Box>
                )}
            </>
        );
    };

    return (
        <ToolLayout>
            {/* Input Panel */}
            <Panel>
                <PanelHeader>
                    <PanelLabel>CSS Input</PanelLabel>
                    <ActionBtnGroup>
                        <ActionBtn onClick={handleClear} disabled={!cssInput}>
                            <Clear fontSize="small" />
                            Clear
                        </ActionBtn>
                    </ActionBtnGroup>
                </PanelHeader>
                <CodeArea value={cssInput} onChange={(e) => setCssInput(e.target.value)} placeholder={cssInputPlaceholder} spellCheck={false} />
            </Panel>

            {/* Output Panel */}
            <Panel>
                <PanelHeader>
                    <PanelLabel>Tailwind Classes</PanelLabel>
                    <ActionBtnGroup>
                        {conversionResult && (
                            <StatsBadge>
                                {conversionResult.mappedCount} / {conversionResult.totalCount} mapped
                            </StatsBadge>
                        )}
                        <ActionBtn onClick={handleCopy} disabled={!conversionResult || !conversionResult.mappedClasses.length}>
                            <ContentCopy fontSize="small" />
                            {copied ? "Copied!" : "Copy Classes"}
                        </ActionBtn>
                        <ActionBtn onClick={handleCopyAll} disabled={!conversionResult}>
                            <ContentCopy fontSize="small" />
                            {copiedAll ? "Copied!" : "Copy All"}
                        </ActionBtn>
                    </ActionBtnGroup>
                </PanelHeader>
                {renderOutputPanel()}
            </Panel>
        </ToolLayout>
    );
}
