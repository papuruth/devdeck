// @ts-nocheck
import { Box, Typography } from "@mui/material";
import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import styled, { keyframes } from "styled-components";
import { useRouter } from "next/navigation";
import { useToolChain } from "context/ToolChainContext";
import { useDebounce } from "utils/hooks/useDebounce.hooks";
import { detectInputType } from "utils/inputDetector";
import { GLOBAL_CONSTANTS } from "utils/globalConstants";
import LocalBadge from "components/Shared/LocalBadge";
import localization from "localization";

const { commandPlayground: L } = localization;

const fadeUp = keyframes`
    from { opacity: 0; transform: translateY(8px); }
    to   { opacity: 1; transform: translateY(0); }
`;

const fadeIn = keyframes`
    from { opacity: 0; }
    to   { opacity: 1; }
`;

// ── Outer wrapper ────────────────────────────────────────────────────────────
const PageWrap = styled(Box)`
    max-width: 800px;
    margin: 32px auto 64px;
    padding: 0 20px;
`;

// ── Header row ───────────────────────────────────────────────────────────────
const HeaderRow = styled(Box)`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    margin-bottom: 28px;
    animation: ${fadeUp} 0.35s ease;
`;

const Headline = styled(Typography)`
    font-size: 26px !important;
    font-weight: 700 !important;
    font-family: "Inter", sans-serif !important;
    color: var(--text-primary) !important;
    letter-spacing: -0.3px;
`;

// ── Input card ───────────────────────────────────────────────────────────────
const InputCard = styled(Box)`
    background: var(--bg-surface);
    border: 1px solid var(--border-color);
    border-radius: 14px;
    padding: 20px;
    animation: ${fadeUp} 0.35s ease 0.05s both;
`;

const StyledTextarea = styled.textarea`
    width: 100%;
    min-height: 148px;
    background: var(--bg-input);
    border: 1.5px solid var(--border-color);
    border-radius: 8px;
    color: var(--text-primary);
    font-family: "JetBrains Mono", "Fira Code", monospace;
    font-size: 13px;
    line-height: 1.6;
    padding: 12px 14px;
    resize: vertical;
    outline: none;
    box-sizing: border-box;
    transition: border-color 0.18s ease, box-shadow 0.18s ease;

    &::placeholder {
        color: var(--text-secondary);
        opacity: 0.6;
    }

    &:focus {
        border-color: #22cc99;
        box-shadow: 0 0 0 3px rgba(34, 204, 153, 0.12);
    }
`;

// ── Example chips ────────────────────────────────────────────────────────────
const ExampleRow = styled(Box)`
    display: flex;
    align-items: center;
    gap: 8px;
    margin-top: 12px;
    flex-wrap: wrap;
`;

const ExampleLabel = styled(Typography)`
    font-size: 11px !important;
    font-weight: 600 !important;
    font-family: "Inter", sans-serif !important;
    color: var(--text-secondary) !important;
    text-transform: uppercase;
    letter-spacing: 0.07em;
    flex-shrink: 0;
`;

const ExampleChip = styled.button`
    background: var(--bg-card, var(--bg-input));
    border: 1px solid var(--border-color);
    color: var(--text-secondary);
    border-radius: 20px;
    padding: 4px 12px;
    font-size: 11px;
    font-family: "Inter", sans-serif;
    font-weight: 500;
    cursor: pointer;
    transition: color 0.15s ease, border-color 0.15s ease, background 0.15s ease;
    white-space: nowrap;

    &:hover {
        color: #22cc99;
        border-color: rgba(34, 204, 153, 0.45);
        background: rgba(34, 204, 153, 0.06);
    }
`;

// ── Divider ──────────────────────────────────────────────────────────────────
const Divider = styled(Box)`
    height: 1px;
    background: var(--border-color);
    margin: 20px 0;
    opacity: 0.6;
`;

// ── Section label ────────────────────────────────────────────────────────────
const SectionLabel = styled(Typography)`
    font-size: 10px !important;
    font-weight: 600 !important;
    font-family: "Inter", sans-serif !important;
    color: var(--text-secondary) !important;
    text-transform: uppercase;
    letter-spacing: 0.09em;
    margin-bottom: 10px !important;
`;

// ── Suggestion rows ──────────────────────────────────────────────────────────
const SuggestionsWrap = styled(Box)`
    animation: ${fadeIn} 0.25s ease;
`;

const SuggestionRow = styled(Box)<{ $rank: number }>`
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 11px 14px;
    border-radius: 8px;
    background: var(--bg-card, var(--bg-input));
    border: 1px solid var(--border-color);
    margin-bottom: 6px;
    border-left: 3px solid ${(p) => {
        if (p.$rank === 0) return "#22cc99";
        if (p.$rank === 1) return "#2299ff";
        return "rgba(255,255,255,0.12)";
    }};
    transition: border-color 0.15s ease, box-shadow 0.15s ease;

    &:hover {
        box-shadow: 0 2px 12px rgba(0, 0, 0, 0.12);
        border-color: ${(p) => (p.$rank === 0 ? "rgba(34,204,153,0.5)" : "rgba(34,153,255,0.4)")};
    }
`;

const ToolName = styled(Typography)`
    font-size: 13px !important;
    font-weight: 600 !important;
    font-family: "Inter", sans-serif !important;
    color: var(--text-primary) !important;
    flex: 1;
    min-width: 0;
`;

const BestMatchBadge = styled.span`
    font-size: 10px;
    font-family: "Inter", sans-serif;
    font-weight: 500;
    padding: 2px 7px;
    border-radius: 20px;
    background: rgba(34, 204, 153, 0.1);
    color: #22cc99;
    border: 1px solid rgba(34, 204, 153, 0.25);
    flex-shrink: 0;
`;

const OpenBtn = styled.button`
    background: transparent;
    border: 1px solid rgba(34, 204, 153, 0.35);
    color: #22cc99;
    border-radius: 6px;
    padding: 5px 12px;
    font-size: 11px;
    font-family: "Inter", sans-serif;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.15s ease;
    flex-shrink: 0;
    letter-spacing: 0.01em;

    &:hover {
        background: rgba(34, 204, 153, 0.12);
        border-color: #22cc99;
        box-shadow: 0 0 0 2px rgba(34, 204, 153, 0.12);
    }
`;

// ── Recently used chips ──────────────────────────────────────────────────────
const RecentChipsRow = styled(Box)`
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
`;

const RecentChip = styled.button`
    background: var(--bg-input);
    border: 1px solid var(--border-color);
    color: var(--text-secondary);
    border-radius: 6px;
    padding: 4px 10px;
    font-size: 11px;
    font-family: "Inter", sans-serif;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.15s ease;

    &:hover {
        color: var(--text-primary);
        border-color: rgba(34, 204, 153, 0.4);
        background: rgba(34, 204, 153, 0.05);
    }
`;

// ── Empty state (no suggestions, has input) ──────────────────────────────────
const NoMatchText = styled(Typography)`
    font-size: 12px !important;
    color: var(--text-secondary) !important;
    font-family: "Inter", sans-serif !important;
    text-align: center;
    padding: 16px 0 8px;
    animation: ${fadeIn} 0.2s ease;
`;

// ── Example data ─────────────────────────────────────────────────────────────
const EXAMPLES = [
    { label: "JSON",      value: `{"name":"Alice","role":"admin","active":true}` },
    { label: "JWT",       value: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4ifQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c" },
    { label: "URL",       value: "https://api.example.com/v2/users?page=1&limit=10" },
    { label: "UUID",      value: "550e8400-e29b-41d4-a716-446655440000" },
    { label: "Base64",    value: "SGVsbG8sIFdvcmxkISBUaGlzIGlzIEJhc2U2NC4=" },
    { label: "Timestamp", value: "1717891200" }
];

export default function CommandPlayground() {
    const router = useRouter();
    const { sendTo } = useToolChain();
    const [input, setInput] = useState("");
    const [recent, setRecent] = useState<string[]>([]);
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    const debouncedInput = useDebounce(input, 300);

    useEffect(() => {
        const stored = localStorage.getItem("devdeck_recent_tools");
        if (stored) {
            try { setRecent(JSON.parse(stored).slice(0, 5)); }
            catch { setRecent([]); }
        }
    }, []);

    const suggestions = useMemo(() => {
        if (!debouncedInput.trim()) return [];

        const primaryMatch = detectInputType(debouncedInput);
        const matches: Array<{ label: string; route: string; confidence: number }> = [];

        if (primaryMatch) {
            matches.push({ ...primaryMatch, confidence: 90 });
        }

        const inputLower = debouncedInput.toLowerCase();
        GLOBAL_CONSTANTS.OPERATIONS_ITEMS.forEach((tool) => {
            if (matches.some((m) => m.route === tool.route)) return;
            const description = (tool.description || "").toLowerCase();
            const label = (tool.label || "").toLowerCase();
            if (description.includes(inputLower) || label.includes(inputLower)) {
                const keywords = [...description.split(/\s+/), ...label.split(/\s+/)];
                const inputKeywords = inputLower.split(/\s+/);
                const matchCount = inputKeywords.filter((k) => keywords.some((kw) => kw.includes(k))).length;
                matches.push({ label: tool.label, route: tool.route, confidence: Math.min(75, 40 + matchCount * 10) });
            }
        });

        return matches.sort((a, b) => b.confidence - a.confidence).slice(0, 4);
    }, [debouncedInput]);

    const handleOpen = useCallback((route: string) => {
        sendTo(input, route);
        const stored = localStorage.getItem("devdeck_recent_tools");
        const recentTools = stored ? JSON.parse(stored) : [];
        const updated = [route, ...recentTools.filter((r: string) => r !== route)].slice(0, 5);
        localStorage.setItem("devdeck_recent_tools", JSON.stringify(updated));
        router.push(route);
    }, [input, sendTo, router]);

    const handleExampleClick = useCallback((value: string) => {
        setInput(value);
        textareaRef.current?.focus();
    }, []);

    const hasInput = debouncedInput.trim().length > 0;

    return (
        <PageWrap>
            <HeaderRow>
                <Headline>{L.headline}</Headline>
                <LocalBadge />
            </HeaderRow>

            <InputCard>
                <StyledTextarea
                    ref={textareaRef}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder={L.inputPlaceholder}
                    spellCheck={false}
                    autoFocus
                />

                <ExampleRow>
                    <ExampleLabel>Try:</ExampleLabel>
                    {EXAMPLES.map((ex) => (
                        <ExampleChip key={ex.label} onClick={() => handleExampleClick(ex.value)}>
                            {ex.label}
                        </ExampleChip>
                    ))}
                </ExampleRow>

                {/* Recently used — shown inside the card when no input */}
                {!hasInput && recent.length > 0 && (
                    <>
                        <Divider />
                        <SectionLabel>{L.recentlyUsedLabel}</SectionLabel>
                        <RecentChipsRow>
                            {recent.map((route) => {
                                const tool = GLOBAL_CONSTANTS.OPERATIONS_ITEMS.find((t) => t.route === route);
                                return tool ? (
                                    <RecentChip key={route} onClick={() => router.push(route)}>
                                        {tool.label}
                                    </RecentChip>
                                ) : null;
                            })}
                        </RecentChipsRow>
                    </>
                )}
            </InputCard>

            {/* Suggestions — shown outside the card once user types */}
            {hasInput && (
                <SuggestionsWrap sx={{ marginTop: "20px" }}>
                    {suggestions.length > 0 ? (
                        <>
                            <SectionLabel>{L.suggestionsLabel}</SectionLabel>
                            {suggestions.map((s, i) => (
                                <SuggestionRow key={s.route} $rank={i}>
                                    <ToolName>{s.label}</ToolName>
                                    {i === 0 && <BestMatchBadge>Best match</BestMatchBadge>}
                                    <OpenBtn onClick={() => handleOpen(s.route)}>Open →</OpenBtn>
                                </SuggestionRow>
                            ))}
                        </>
                    ) : (
                        <NoMatchText>{L.noSuggestionsMessage}</NoMatchText>
                    )}
                </SuggestionsWrap>
            )}
        </PageWrap>
    );
}
