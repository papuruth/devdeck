// @ts-nocheck

"use client";

import { Brush, Check, Clear, ContentCopy, Info } from "@mui/icons-material";
import { Box, Tooltip, Typography } from "@mui/material";
import React, { useCallback, useMemo, useState } from "react";
import styled from "styled-components";
import {
    ActionBar,
    ActionBtn,
    ActionBtnGroup,
    EmptyState,
    MetaText,
    Panel,
    PanelHeader,
    PanelLabel,
    ToolLayout
} from "components/Shared/ToolKit";
import { SmartEditor } from "components/Shared/SmartEditor";
import LocalBadge from "components/Shared/LocalBadge";
import { useDebounce } from "utils/hooks/useDebounce.hooks";
import { CSS_PROPERTY_MAP } from "./cssToTailwindMap";
import { parseCSS, generateUnmappedComment } from "./cssParser";

// ── Styled ────────────────────────────────────────────────────────────────

const StatsBadge = styled.span<{ $allMapped?: boolean }>`
    display: inline-flex;
    align-items: center;
    gap: 4px;
    padding: 3px 8px;
    border-radius: 4px;
    font-size: 10px;
    font-weight: 600;
    font-family: var(--font-mono);
    letter-spacing: 0.04em;
    background: ${(p) => (p.$allMapped ? "rgba(34,204,153,0.12)" : "rgba(34,204,153,0.07)")};
    color: #22cc99;
    border: 1px solid ${(p) => (p.$allMapped ? "rgba(34,204,153,0.3)" : "rgba(34,204,153,0.15)")};
    transition: all 0.2s ease;
`;

const OutputPre = styled.pre`
    width: 100%;
    min-height: 260px;
    max-height: 360px;
    background: var(--bg-input);
    color: var(--text-primary);
    border: none;
    padding: 16px;
    font-family: var(--font-mono);
    font-size: 12px;
    line-height: 1.75;
    letter-spacing: 0.02em;
    margin: 0;
    white-space: pre-wrap;
    word-break: break-all;
    overflow-x: hidden;
    overflow-y: auto;
    scrollbar-width: thin;
    scrollbar-color: var(--border-color) transparent;
    &::-webkit-scrollbar {
        width: 4px;
    }
    &::-webkit-scrollbar-track {
        background: transparent;
    }
    &::-webkit-scrollbar-thumb {
        background: var(--border-color);
        border-radius: 2px;
    }
`;

const SelectorComment = styled.span`
    display: block;
    color: var(--text-secondary);
    opacity: 0.45;
    margin-top: 14px;
    &:first-child {
        margin-top: 0;
    }
`;

const ClassLine = styled.span`
    display: block;
    color: var(--text-primary);
`;

const UnmappedSection = styled(Box)`
    border-top: 1px solid rgba(251, 191, 36, 0.18);
    background: rgba(251, 191, 36, 0.025);
`;

const UnmappedHeader = styled(Box)`
    display: flex;
    align-items: center;
    gap: 6px;
    padding: 8px 16px 6px;
`;

const UnmappedRow = styled.div`
    margin: 0 12px 3px;
    padding: 3px 10px;
    font-size: 11px;
    font-family: var(--font-mono);
    color: var(--text-secondary);
    opacity: 0.65;
    line-height: 1.6;
    border-left: 2px solid rgba(251, 191, 36, 0.3);
    border-radius: 0 2px 2px 0;
`;

// ── Types ─────────────────────────────────────────────────────────────────

interface SelectorGroup {
    selector: string;
    mappedClasses: string[];
    unmappedComments: string[];
}

interface ConversionResult {
    groups: SelectorGroup[];
    isMultiRule: boolean;
    allMapped: boolean;
    totalClasses: number;
    allUnmapped: string[];
    classesOnly: string;
    mappedCount: number;
    totalCount: number;
}

// ── Logic ─────────────────────────────────────────────────────────────────

function convert(input: string): ConversionResult | null {
    const parsed = parseCSS(input);
    if (parsed.properties.length === 0) return null;

    let mappedCount = 0;
    const totalCount = parsed.properties.length;
    const selectorMap = new Map<string, SelectorGroup>();
    const seenKeys = new Set<string>();

    parsed.properties.forEach((cssProp) => {
        if (!selectorMap.has(cssProp.selector)) {
            selectorMap.set(cssProp.selector, { selector: cssProp.selector, mappedClasses: [], unmappedComments: [] });
        }
        const group = selectorMap.get(cssProp.selector)!;
        const mapper = CSS_PROPERTY_MAP[cssProp.property];

        if (mapper) {
            try {
                const result = mapper(cssProp.value);
                if (result) {
                    result.split(/\s+/).forEach((cls) => {
                        const key = `${cssProp.selector}|${cls}`;
                        if (cls.trim() && !seenKeys.has(key)) {
                            group.mappedClasses.push(cls.trim());
                            seenKeys.add(key);
                        }
                    });
                    mappedCount += 1;
                } else {
                    group.unmappedComments.push(generateUnmappedComment(cssProp.property, cssProp.value));
                }
            } catch {
                group.unmappedComments.push(generateUnmappedComment(cssProp.property, cssProp.value));
            }
        } else {
            group.unmappedComments.push(generateUnmappedComment(cssProp.property, cssProp.value));
        }
    });

    const groups = Array.from(selectorMap.values());
    const isMultiRule = groups.length > 1;
    return {
        groups,
        isMultiRule,
        allMapped: mappedCount === totalCount,
        totalClasses: groups.reduce((s, g) => s + g.mappedClasses.length, 0),
        allUnmapped: groups.flatMap((g) => g.unmappedComments),
        classesOnly: groups.flatMap((g) => g.mappedClasses).join(" "),
        mappedCount,
        totalCount
    };
}

// ── Output renderer ───────────────────────────────────────────────────────

function HighlightedOutput({ groups, isMultiRule }: { groups: SelectorGroup[]; isMultiRule: boolean }) {
    const nodes: React.ReactNode[] = [];
    groups.forEach((group, gi) => {
        if (isMultiRule) {
            nodes.push(<SelectorComment key={`s-${group.selector}`}>{`/* ${group.selector} */`}</SelectorComment>);
        }
        group.mappedClasses.forEach((cls) => {
            nodes.push(<ClassLine key={`${group.selector}-${cls}`}>{cls}</ClassLine>);
        });
        if (isMultiRule && gi < groups.length - 1) {
            nodes.push(<br key={`br-${group.selector}`} />);
        }
    });
    return <OutputPre>{nodes}</OutputPre>;
}

// ── Placeholder ───────────────────────────────────────────────────────────

const PLACEHOLDER = `.btn {
  display: flex;
  align-items: center;
  padding: 8px 16px;
  border-radius: 8px;
  font-weight: 700;
  color: #fff;
  background-color: #22cc99;
}`;

// ── Component ─────────────────────────────────────────────────────────────

export default function CSSToTailwind() {
    const [cssInput, setCssInput] = useState("");
    const [copiedClasses, setCopiedClasses] = useState(false);
    const [copiedAll, setCopiedAll] = useState(false);

    const debouncedInput = useDebounce(cssInput, 300);

    const result = useMemo(() => {
        if (!debouncedInput.trim()) return null;
        return convert(debouncedInput);
    }, [debouncedInput]);

    const hasOutput = result?.groups.some((g) => g.mappedClasses.length > 0);
    const hasUnmapped = (result?.allUnmapped.length ?? 0) > 0;

    const handleCopyClasses = useCallback(async () => {
        if (!result?.classesOnly) return;
        await navigator.clipboard.writeText(result.classesOnly);
        setCopiedClasses(true);
        setTimeout(() => setCopiedClasses(false), 2000);
    }, [result]);

    const handleCopyAll = useCallback(async () => {
        if (!result) return;
        const lines: string[] = [];
        result.groups.forEach((group) => {
            if (result.isMultiRule) lines.push(`/* ${group.selector} */`);
            if (group.mappedClasses.length) lines.push(group.mappedClasses.join(" "));
            if (group.unmappedComments.length) lines.push(...group.unmappedComments);
        });
        await navigator.clipboard.writeText(lines.join("\n"));
        setCopiedAll(true);
        setTimeout(() => setCopiedAll(false), 2000);
    }, [result]);

    const handlePaste = useCallback(async () => {
        try {
            const text = await navigator.clipboard.readText();
            if (text) setCssInput(text);
        } catch {
            // Browser may block clipboard access without user gesture
        }
    }, []);

    const handleClear = useCallback(() => setCssInput(""), []);

    return (
        <ToolLayout>
            {/* ── CSS Input ──────────────────────────────────────────── */}
            <Panel>
                <PanelHeader>
                    <PanelLabel>CSS Input</PanelLabel>
                    <ActionBtnGroup>
                        <LocalBadge />
                        <ActionBtn onClick={handlePaste}>Paste</ActionBtn>
                        <ActionBtn onClick={handleClear} disabled={!cssInput} $danger={!!cssInput}>
                            <Clear fontSize="small" />
                            Clear
                        </ActionBtn>
                    </ActionBtnGroup>
                </PanelHeader>
                <SmartEditor
                    value={cssInput}
                    onChange={setCssInput}
                    placeholder={PLACEHOLDER}
                    language="css"
                />
            </Panel>

            {/* ── Tailwind Output ────────────────────────────────────── */}
            <Panel>
                <PanelHeader>
                    <PanelLabel>Tailwind Classes</PanelLabel>
                    {result && (
                        <StatsBadge $allMapped={result.allMapped}>
                            {result.allMapped ? (
                                <>
                                    <Check sx={{ fontSize: 10 }} />
                                    All mapped
                                </>
                            ) : (
                                `${result.mappedCount} / ${result.totalCount} mapped`
                            )}
                        </StatsBadge>
                    )}
                </PanelHeader>

                {/* Empty state */}
                {!cssInput.trim() && (
                    <EmptyState>
                        <Brush sx={{ fontSize: 30, opacity: 0.3, mb: 0.5 }} />
                        <Typography variant="body2">Paste CSS above to convert</Typography>
                        <Typography variant="caption" sx={{ opacity: 0.55, fontSize: "11px", fontFamily: "Inter, sans-serif" }}>
                            Supports multi-rule, shorthand, hex colors, !important
                        </Typography>
                    </EmptyState>
                )}

                {/* No mappings found */}
                {cssInput.trim() && (!result || !hasOutput) && (
                    <EmptyState>
                        <Typography variant="body2">No Tailwind classes found</Typography>
                        <Typography variant="caption" sx={{ opacity: 0.55, fontSize: "11px" }}>
                            Check that your CSS contains valid property declarations
                        </Typography>
                    </EmptyState>
                )}

                {/* Output */}
                {hasOutput && (
                    <>
                        <HighlightedOutput groups={result.groups} isMultiRule={result.isMultiRule} />

                        {/* Unmapped section */}
                        {hasUnmapped && (
                            <UnmappedSection>
                                <UnmappedHeader>
                                    <Info sx={{ fontSize: 13, color: "rgba(251,191,36,0.65)" }} />
                                    <Typography
                                        variant="caption"
                                        sx={{ fontSize: "11px", color: "var(--text-secondary)", opacity: 0.65, fontFamily: "Inter, sans-serif" }}
                                    >
                                        {result.allUnmapped.length} propert{result.allUnmapped.length === 1 ? "y" : "ies"} couldn&apos;t be mapped
                                    </Typography>
                                </UnmappedHeader>
                                {result.allUnmapped.map((comment, i) => (
                                    // eslint-disable-next-line react/no-array-index-key
                                    <UnmappedRow key={i}>{comment}</UnmappedRow>
                                ))}
                                <Box sx={{ pb: 1 }} />
                            </UnmappedSection>
                        )}

                        {/* Action bar */}
                        <ActionBar>
                            <MetaText>
                                {result.totalClasses} class{result.totalClasses !== 1 ? "es" : ""}
                            </MetaText>
                            <ActionBtnGroup>
                                <ActionBtn
                                    onClick={handleCopyClasses}
                                    disabled={!result.classesOnly}
                                    $success={copiedClasses}
                                >
                                    {copiedClasses ? <Check fontSize="small" /> : <ContentCopy fontSize="small" />}
                                    {copiedClasses ? "Copied!" : "Copy className"}
                                </ActionBtn>
                                {hasUnmapped && (
                                    <Tooltip title="Copies classes + unmapped notes" placement="top" arrow>
                                        <ActionBtn onClick={handleCopyAll} $success={copiedAll}>
                                            {copiedAll ? <Check fontSize="small" /> : <ContentCopy fontSize="small" />}
                                            {copiedAll ? "Copied!" : "With notes"}
                                        </ActionBtn>
                                    </Tooltip>
                                )}
                            </ActionBtnGroup>
                        </ActionBar>
                    </>
                )}
            </Panel>
        </ToolLayout>
    );
}
