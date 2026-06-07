// @ts-nocheck
import { IosShare } from "@mui/icons-material";
import localization from "localization";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import toast from "utils/toast";
import styled, { keyframes } from "styled-components";
import {
    ActionBar,
    ActionBtn,
    ActionBtnGroup,
    EmptyState,
    MetaText,
    Panel,
    PanelHeader,
    PanelLabel,
    TabBtn,
    TabStrip,
    ToolLayout
} from "components/Shared/ToolKit";
import { SmartEditor } from "components/Shared/SmartEditor";
import { useToolChain } from "context/ToolChainContext";
import { useShareableURL } from "utils/hooks/useShareableURL.hooks";

const { regexTester: L, common: C } = localization;

const FLAGS_LIST = ["g", "i", "m", "s"];

const PATTERN_LIBRARY = [
    {
        keys: ["email", "email address", "e-mail"],
        pattern: "^[a-zA-Z0-9._%+\\-]+@[a-zA-Z0-9.\\-]+\\.[a-zA-Z]{2,}$",
        flags: "g",
        explanation: [
            { segment: "^", description: "Start of string" },
            { segment: "[a-zA-Z0-9._%+\\-]+", description: "One or more valid email characters (letters, digits, dots, underscores, percent, plus, hyphen)" },
            { segment: "@", description: "Literal @ symbol" },
            { segment: "[a-zA-Z0-9.\\-]+", description: "Domain name (letters, digits, dots, hyphens)" },
            { segment: "\\.[a-zA-Z]{2,}", description: "Top-level domain (dot followed by 2+ letters)" },
            { segment: "$", description: "End of string" }
        ]
    },
    {
        keys: ["phone", "phone number", "us phone", "telephone", "mobile number"],
        pattern: "^\\+?1?[\\s.\\-]?\\(?\\d{3}\\)?[\\s.\\-]?\\d{3}[\\s.\\-]?\\d{4}$",
        flags: "g",
        explanation: [
            { segment: "\\+?1?", description: "Optional country code (+1)" },
            { segment: "[\\s.\\-]?", description: "Optional separator (space, dot, or hyphen)" },
            { segment: "\\(?\\d{3}\\)?", description: "Area code — optionally in parentheses" },
            { segment: "\\d{3}", description: "Exchange code (3 digits)" },
            { segment: "\\d{4}", description: "Subscriber number (4 digits)" }
        ]
    },
    {
        keys: ["url", "link", "website", "http", "https", "web address"],
        pattern: "https?:\\/\\/(www\\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\\.[a-zA-Z0-9()]{1,6}\\b[-a-zA-Z0-9()@:%_+.~#?&/=]*",
        flags: "g",
        explanation: [
            { segment: "https?", description: "http or https protocol" },
            { segment: ":\\/\\/", description: "Protocol separator ://" },
            { segment: "(www\\.)?", description: "Optional www. prefix" },
            { segment: "[-a-zA-Z0-9@:%._+~#=]{1,256}", description: "Domain characters" },
            { segment: "\\.[a-zA-Z0-9()]{1,6}", description: "Top-level domain" },
            { segment: "\\b[-a-zA-Z0-9()@:%_+.~#?&/=]*", description: "Optional path, query string, and fragment" }
        ]
    },
    {
        keys: ["ip", "ip address", "ipv4", "ip4"],
        pattern: "\\b(?:(?:25[0-5]|2[0-4]\\d|[01]?\\d\\d?)\\.){3}(?:25[0-5]|2[0-4]\\d|[01]?\\d\\d?)\\b",
        flags: "g",
        explanation: [
            { segment: "(?:25[0-5]|2[0-4]\\d|[01]?\\d\\d?)", description: "Single octet (0–255)" },
            { segment: "\\.", description: "Dot separator" },
            { segment: "{3}", description: "Repeated 3 times (first three octets)" },
            { segment: "(?:25[0-5]|2[0-4]\\d|[01]?\\d\\d?)", description: "Final octet (0–255)" }
        ]
    },
    {
        keys: ["date", "iso date", "yyyy-mm-dd", "date format"],
        pattern: "\\b\\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\\d|3[01])\\b",
        flags: "g",
        explanation: [
            { segment: "\\d{4}", description: "4-digit year" },
            { segment: "-", description: "Hyphen separator" },
            { segment: "(0[1-9]|1[0-2])", description: "Month (01–12)" },
            { segment: "-", description: "Hyphen separator" },
            { segment: "(0[1-9]|[12]\\d|3[01])", description: "Day (01–31)" }
        ]
    },
    {
        keys: ["uuid", "guid", "unique id", "identifier"],
        pattern: "[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}",
        flags: "gi",
        explanation: [
            { segment: "[0-9a-f]{8}", description: "8 hex characters (time_low)" },
            { segment: "-[0-9a-f]{4}", description: "4 hex characters (time_mid)" },
            { segment: "-[0-9a-f]{4}", description: "4 hex characters (version + time_hi)" },
            { segment: "-[0-9a-f]{4}", description: "4 hex characters (variant + clock_seq)" },
            { segment: "-[0-9a-f]{12}", description: "12 hex characters (node)" }
        ]
    },
    {
        keys: ["hex color", "color", "hex", "css color", "colour"],
        pattern: "#([0-9a-fA-F]{3,4}|[0-9a-fA-F]{6}|[0-9a-fA-F]{8})\\b",
        flags: "g",
        explanation: [
            { segment: "#", description: "Hash prefix" },
            { segment: "[0-9a-fA-F]{3,4}", description: "3 or 4 hex digits (shorthand RGB or RGBA)" },
            { segment: "|[0-9a-fA-F]{6}", description: "or 6 hex digits (full RGB)" },
            { segment: "|[0-9a-fA-F]{8}", description: "or 8 hex digits (RGBA)" }
        ]
    },
    {
        keys: ["credit card", "card number", "visa", "mastercard", "payment card"],
        pattern: "\\b(?:4\\d{3}|5[1-5]\\d{2}|6011|3[47]\\d{2})[\\s\\-]?\\d{4}[\\s\\-]?\\d{4}[\\s\\-]?\\d{4,7}\\b",
        flags: "g",
        explanation: [
            { segment: "(?:4\\d{3}|5[1-5]\\d{2}|6011|3[47]\\d{2})", description: "Card prefix — Visa (4xxx), Mastercard (5[1-5]xx), Discover (6011), Amex (3[47]xx)" },
            { segment: "[\\s\\-]?\\d{4}", description: "4-digit group (optional separator)" },
            { segment: "[\\s\\-]?\\d{4}", description: "4-digit group (optional separator)" },
            { segment: "[\\s\\-]?\\d{4,7}", description: "Final group (4–7 digits for Amex/others)" }
        ]
    },
    {
        keys: ["slug", "url slug", "kebab case", "url-friendly"],
        pattern: "\\b[a-z0-9]+(?:-[a-z0-9]+)*\\b",
        flags: "g",
        explanation: [
            { segment: "[a-z0-9]+", description: "One or more lowercase letters or digits" },
            { segment: "(?:-[a-z0-9]+)*", description: "Zero or more hyphen-separated groups" }
        ]
    },
    {
        keys: ["semver", "semantic version", "version number", "npm version"],
        pattern: "\\bv?\\d+\\.\\d+\\.\\d+(?:-[\\w.]+)?(?:\\+[\\w.]+)?\\b",
        flags: "g",
        explanation: [
            { segment: "v?", description: "Optional v prefix" },
            { segment: "\\d+\\.\\d+\\.\\d+", description: "Major.Minor.Patch version numbers" },
            { segment: "(?:-[\\w.]+)?", description: "Optional pre-release identifier (e.g. -alpha.1)" },
            { segment: "(?:\\+[\\w.]+)?", description: "Optional build metadata (e.g. +build.123)" }
        ]
    },
    {
        keys: ["hashtag", "twitter hashtag", "social media tag"],
        pattern: "#[a-zA-Z]\\w+",
        flags: "g",
        explanation: [
            { segment: "#", description: "Hash prefix" },
            { segment: "[a-zA-Z]", description: "Must start with a letter (not a digit)" },
            { segment: "\\w+", description: "One or more word characters (letters, digits, underscores)" }
        ]
    },
    {
        keys: ["mac address", "mac", "hardware address", "ethernet address"],
        pattern: "\\b([0-9A-Fa-f]{2}[:\\-]){5}[0-9A-Fa-f]{2}\\b",
        flags: "g",
        explanation: [
            { segment: "[0-9A-Fa-f]{2}", description: "2 hex digits" },
            { segment: "[:\\-]", description: "Colon or hyphen separator" },
            { segment: "{5}", description: "Repeated 5 times (first 5 groups)" },
            { segment: "[0-9A-Fa-f]{2}", description: "Final 2 hex digits" }
        ]
    },
    {
        keys: ["zip", "zip code", "postal code", "us zip", "postcode"],
        pattern: "\\b\\d{5}(?:-\\d{4})?\\b",
        flags: "g",
        explanation: [
            { segment: "\\d{5}", description: "5-digit ZIP code" },
            { segment: "(?:-\\d{4})?", description: "Optional 4-digit ZIP+4 extension" }
        ]
    },
    {
        keys: ["git sha", "git commit", "commit hash", "sha1"],
        pattern: "\\b[0-9a-f]{7,40}\\b",
        flags: "g",
        explanation: [
            { segment: "[0-9a-f]{7,40}", description: "7 to 40 lowercase hex characters (short or full SHA)" }
        ]
    }
];

function matchPattern(query: string) {
    const q = query.toLowerCase().trim();
    if (!q) return null;
    const exactMatch = PATTERN_LIBRARY.find((entry) => entry.keys.some((k) => k === q));
    if (exactMatch) return exactMatch;
    const partialMatch = PATTERN_LIBRARY.find((entry) => entry.keys.some((k) => k.includes(q) || q.includes(k)));
    if (partialMatch) return partialMatch;
    return null;
}

const PRESETS = [
    { label: "Email", pattern: "[a-zA-Z0-9._%+\\-]+@[a-zA-Z0-9.\\-]+\\.[a-zA-Z]{2,}" },
    { label: "URL", pattern: "https?:\\/\\/(www\\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\\.[a-zA-Z0-9()]{1,6}\\b[-a-zA-Z0-9()@:%_+.~#?&/=]*" },
    { label: "IPv4", pattern: "\\b(?:(?:25[0-5]|2[0-4]\\d|[01]?\\d\\d?)\\.){3}(?:25[0-5]|2[0-4]\\d|[01]?\\d\\d?)\\b" },
    { label: "IPv6", pattern: "([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}" },
    { label: "Date YYYY-MM-DD", pattern: "\\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\\d|3[01])" },
    { label: "Time HH:MM", pattern: "\\b([01]?\\d|2[0-3]):[0-5]\\d(:[0-5]\\d)?\\b" },
    { label: "Hex Color", pattern: "#([0-9a-fA-F]{3,4}|[0-9a-fA-F]{6}|[0-9a-fA-F]{8})\\b" },
    { label: "UUID", pattern: "[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}" },
    { label: "JWT", pattern: "eyJ[A-Za-z0-9_-]+\\.eyJ[A-Za-z0-9_-]+\\.[A-Za-z0-9_-]+" },
    { label: "HTML Tag", pattern: "<\\/?[a-zA-Z][^>]*>" },
    { label: "Number", pattern: "-?\\b\\d+(?:\\.\\d+)?\\b" },
    { label: "Phone (US)", pattern: "\\+?1?[\\s.-]?\\(?\\d{3}\\)?[\\s.-]?\\d{3}[\\s.-]?\\d{4}" },
    { label: "Credit Card", pattern: "\\b(?:4\\d{3}|5[1-5]\\d{2}|6011|3[47]\\d{2})[\\s-]?\\d{4}[\\s-]?\\d{4}[\\s-]?\\d{4,7}\\b" },
    { label: "Postal Code (US)", pattern: "\\b\\d{5}(?:-\\d{4})?\\b" },
    { label: "Slug", pattern: "\\b[a-z0-9]+(?:-[a-z0-9]+)*\\b" },
    { label: "Semver", pattern: "\\bv?\\d+\\.\\d+\\.\\d+(?:-[\\w.]+)?(?:\\+[\\w.]+)?\\b" },
    { label: "Base64", pattern: "(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?" },
    { label: "SQL SELECT", pattern: "(?i)\\bSELECT\\b[\\s\\S]+?\\bFROM\\b" },
    { label: "Markdown Heading", pattern: "^#{1,6}\\s.+" }
];

function buildSegments(text: string, matches: RegExpMatchArray[]) {
    if (!matches.length) return [{ text, highlight: false }];
    const segments: Array<{ text: string; highlight: boolean }> = [];
    let cursor = 0;
    matches.forEach((m: RegExpMatchArray) => {
        if (m.index! > cursor) segments.push({ text: text.slice(cursor, m.index), highlight: false });
        segments.push({ text: m[0], highlight: true });
        cursor = m.index! + m[0].length;
    });
    if (cursor < text.length) segments.push({ text: text.slice(cursor), highlight: false });
    return segments;
}

const PatternWrap = styled.div`
    display: flex;
    align-items: center;
    padding: 0 16px;
    border-bottom: 1px solid var(--border-color);
    background: var(--bg-input);
    gap: 4px;
`;

const Slash = styled.span`
    font-size: 14px;
    font-family: var(--font-mono);
    color: var(--text-secondary);
    opacity: 0.5;
    flex-shrink: 0;
`;

const PatternInput = styled.input<{ $error?: boolean }>`
    flex: 1;
    background: transparent;
    border: none;
    outline: none;
    padding: 12px 4px;
    font-size: 13px;
    font-family: var(--font-mono);
    color: ${(p) => (p.$error ? "#ef4444" : "var(--text-primary)")};
    &::placeholder {
        color: var(--text-secondary);
        opacity: 0.4;
    }
`;

const FlagStrip = styled.div`
    display: flex;
    gap: 4px;
    padding: 8px 16px;
    border-bottom: 1px solid var(--border-color);
    align-items: center;
`;

const FlagLabel = styled.span`
    font-size: 10px;
    font-weight: 600;
    font-family: "Inter", sans-serif;
    color: var(--text-secondary);
    text-transform: uppercase;
    letter-spacing: 0.08em;
    margin-right: 4px;
`;

const FlagBtn = styled.button<{ $active?: boolean }>`
    background: ${(p) => (p.$active ? "rgba(34,204,153,0.15)" : "transparent")};
    color: ${(p) => (p.$active ? "#22cc99" : "var(--text-secondary)")};
    border: 1px solid ${(p) => (p.$active ? "rgba(34,204,153,0.4)" : "var(--border-color)")};
    border-radius: 4px;
    padding: 2px 7px;
    font-size: 11px;
    font-family: var(--font-mono);
    cursor: pointer;
    transition: all 0.15s;
    &:hover {
        color: #22cc99;
        border-color: rgba(34, 204, 153, 0.4);
    }
`;

const fadeInDownQuick = keyframes`
    from {
        opacity: 0;
        transform: translateY(-6px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
`;

const PresetStrip = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 4px;
    padding: 8px 16px;
    border-bottom: 1px solid var(--border-color);
`;

const PresetBtn = styled.button`
    background: transparent;
    color: var(--text-secondary);
    border: 1px solid var(--border-color);
    border-radius: 4px;
    padding: 2px 8px;
    font-size: 10px;
    font-family: "Inter", sans-serif;
    cursor: pointer;
    transition: all 0.15s;
    &:hover {
        color: #22cc99;
        border-color: rgba(34, 204, 153, 0.4);
        background: rgba(34, 204, 153, 0.05);
    }
`;

const QuickSelectBtn = styled(PresetBtn)`
    animation: ${fadeInDownQuick} 0.2s ease;
`;

const SubHeader = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 8px 16px;
    border-top: 1px solid var(--border-color);
    border-bottom: 1px solid var(--border-color);
    background: var(--bg-panel-header);
    min-height: 36px;
`;

const HighlightArea = styled.div`
    flex: 1;
    min-height: 200px;
    background: var(--bg-input);
    color: var(--text-primary);
    padding: 16px;
    font-family: var(--font-mono);
    font-size: 12px;
    line-height: 1.75;
    letter-spacing: 0.02em;
    white-space: pre-wrap;
    word-break: break-all;
    overflow: auto;
`;

const Highlight = styled.mark`
    background: rgba(34, 204, 153, 0.3);
    color: var(--text-primary);
    border-radius: 2px;
`;

const MatchList = styled.div`
    padding: 10px 16px;
    border-top: 1px solid var(--border-color);
    display: flex;
    flex-direction: column;
    gap: 4px;
    max-height: 140px;
    overflow-y: auto;
`;

const MatchItem = styled.div`
    font-size: 11px;
    font-family: var(--font-mono);
    color: var(--text-secondary);
    line-height: 1.5;
`;

const ErrorBadge = styled.span`
    font-size: 11px;
    font-weight: 600;
    font-family: "Inter", sans-serif;
    color: #ef4444;
    background: rgba(239, 68, 68, 0.1);
    border-radius: 4px;
    padding: 2px 8px;
`;

const DescriptionInput = styled.input`
    display: block;
    width: 100%;
    background: transparent;
    border: none;
    outline: none;
    padding: 12px 16px;
    font-size: 13px;
    font-family: var(--font-mono);
    color: var(--text-primary);
    border-bottom: 1px solid var(--border-color);
    &::placeholder {
        color: var(--text-secondary);
        opacity: 0.4;
    }
    &:focus {
        box-shadow: inset 0 0 0 2px rgba(34, 204, 153, 0.2);
    }
`;

const QuickSelectStrip = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 4px;
    padding: 8px 16px;
    border-bottom: 1px solid var(--border-color);
`;

const ExplanationSection = styled.div`
    padding: 16px;
    border-top: 1px solid var(--border-color);
    display: flex;
    flex-direction: column;
    gap: 8px;
    max-height: 160px;
    overflow-y: auto;
`;

const ExplanationRow = styled.div`
    display: flex;
    gap: 8px;
    font-size: 11px;
    line-height: 1.5;
    color: var(--text-secondary);
    code {
        font-family: var(--font-mono);
        color: #22cc99;
        background: rgba(34, 204, 153, 0.1);
        padding: 2px 6px;
        border-radius: 3px;
        flex-shrink: 0;
    }
`;

export default function RegexTester() {
    const [tab, setTab] = useState<"tester" | "generate">("tester");
    const [pattern, setPattern] = useState("");
    const [flags, setFlags] = useState<Record<string, boolean>>({ g: true, i: false, m: false, s: false });
    const [testStr, setTestStr] = useState("");
    const [description, setDescription] = useState("");
    const { consumeChain } = useToolChain();
    const { initialValue: initialPattern } = useShareableURL("p");
    const { initialValue: initialTestStr } = useShareableURL("s");

    useEffect(() => {
        const chained = consumeChain ? consumeChain("/regex-tester") : null;
        if (chained && typeof chained === "string") setTestStr(chained);
        else if (initialTestStr) setTestStr(initialTestStr);
    }, [consumeChain, initialTestStr]);

    useEffect(() => {
        if (initialPattern) setPattern(initialPattern);
    }, [initialPattern]);

    const handleShare = useCallback(() => {
        try {
            const url = new URL(window.location.href);
            if (pattern) url.searchParams.set("p", btoa(pattern));
            if (testStr) url.searchParams.set("s", btoa(testStr));
            navigator.clipboard.writeText(url.toString()).then(() => toast.success("Shareable link copied!"));
        } catch {
            toast.error("Failed to generate shareable link.");
        }
    }, [pattern, testStr]);

    const toggleFlag = (f: string) => setFlags((prev: Record<string, boolean>) => ({ ...prev, [f]: !prev[f] }));

    const { matches, segments, error } = useMemo(() => {
        if (!pattern || !testStr) return { matches: [], segments: [], error: "" };
        try {
            const activeFlags = FLAGS_LIST.filter((f: string) => (flags as Record<string, boolean>)[f]).join("");
            const globalFlags = activeFlags.includes("g") ? activeFlags : `${activeFlags}g`;
            const found = [...testStr.matchAll(new RegExp(pattern, globalFlags))];
            return { matches: found, segments: buildSegments(testStr, found), error: "" };
        } catch (e) {
            const errorMessage = e instanceof Error ? e.message : String(e);
            return { matches: [], segments: [], error: errorMessage };
        }
    }, [pattern, flags, testStr]);

    const matchCount = matches.length;

    const generatedEntry = useMemo(() => matchPattern(description), [description]);

    return (
        <>
            <TabStrip>
                <TabBtn $active={tab === "tester"} onClick={() => setTab("tester")}>
                    {L.testerTab}
                </TabBtn>
                <TabBtn $active={tab === "generate"} onClick={() => setTab("generate")}>
                    {L.generateTab}
                </TabBtn>
            </TabStrip>

            {tab === "tester" ? (
                <ToolLayout>
                    <Panel>
                        <PanelHeader>
                            <PanelLabel>{L.patternInputLabel}</PanelLabel>
                            {error && <ErrorBadge>{L.invalidRegexError}</ErrorBadge>}
                        </PanelHeader>
                        <PatternWrap>
                            <Slash>/</Slash>
                            <PatternInput
                                value={pattern}
                                onChange={(e) => setPattern(e.target.value)}
                                placeholder="[a-z]+"
                                spellCheck={false}
                                $error={!!error}
                                autoFocus
                            />
                            <Slash>/</Slash>
                        </PatternWrap>
                        <FlagStrip>
                            <FlagLabel>{L.flagsLabel}</FlagLabel>
                            {FLAGS_LIST.map((f) => (
                                <FlagBtn key={f} $active={flags[f]} onClick={() => toggleFlag(f)}>
                                    {f}
                                </FlagBtn>
                            ))}
                        </FlagStrip>
                        <PresetStrip>
                            {PRESETS.map((p) => (
                                <PresetBtn key={p.label} onClick={() => setPattern(p.pattern)}>
                                    {p.label}
                                </PresetBtn>
                            ))}
                        </PresetStrip>
                        <SubHeader>
                            <PanelLabel>{L.testStringLabel}</PanelLabel>
                            {testStr && <MetaText>{testStr.length.toLocaleString()} chars</MetaText>}
                        </SubHeader>
                        <SmartEditor
                            value={testStr}
                            onChange={setTestStr}
                            placeholder={L.testStringPlaceholder}
                            language="text"
                            minHeight="160px"
                        />
                        {(pattern || testStr) && (
                            <ActionBar>
                                <ActionBtnGroup>
                                    <ActionBtn
                                        $danger
                                        onClick={() => {
                                            setPattern("");
                                            setTestStr("");
                                        }}
                                    >
                                        {C.clearBtn}
                                    </ActionBtn>
                                    <ActionBtn onClick={handleShare}>
                                        <IosShare style={{ fontSize: 11 }} /> {L.shareBtn}
                                    </ActionBtn>
                                </ActionBtnGroup>
                            </ActionBar>
                        )}
                    </Panel>

                    <Panel>
                        <PanelHeader>
                            <PanelLabel>{L.matchesLabel}</PanelLabel>
                            {matchCount > 0 && (
                                <MetaText style={{ color: "#22cc99" }}>
                                    {matchCount} match{matchCount !== 1 ? "es" : ""}
                                </MetaText>
                            )}
                            {!matchCount && pattern && testStr && !error && <MetaText>{L.noMatches}</MetaText>}
                        </PanelHeader>
                        {testStr ? (
                            <>
                                <HighlightArea>
                                    {segments.length > 0
                                        ? segments.map((seg) =>
                                              seg.highlight ? (
                                                  <Highlight key={`${seg.text}-${seg.highlight}`}>{seg.text}</Highlight>
                                              ) : (
                                                  <span key={`${seg.text}-${seg.highlight}`}>{seg.text}</span>
                                              )
                                          )
                                        : testStr}
                                </HighlightArea>
                                {matchCount > 0 && (
                                    <MatchList>
                                        {matches.map((m, i) => (
                                            <MatchItem key={m.index}>
                                                <span style={{ color: "#22cc99" }}>#{i + 1}</span> at {m.index}:{" "}
                                                <span style={{ color: "var(--text-primary)" }}>{m[0]}</span>
                                                {m.length > 1 && m.slice(1).some(Boolean) && (
                                                    <span style={{ opacity: 0.6, marginLeft: 8 }}>[{m.slice(1).filter(Boolean).join(", ")}]</span>
                                                )}
                                            </MatchItem>
                                        ))}
                                    </MatchList>
                                )}
                            </>
                        ) : (
                            <EmptyState>
                                <span style={{ fontSize: 22, fontFamily: "var(--font-mono)" }}>/.*/ </span>
                                <span style={{ fontSize: 12, fontFamily: "Inter, sans-serif" }}>{L.emptyStateMessage}</span>
                            </EmptyState>
                        )}
                    </Panel>
                </ToolLayout>
            ) : (
                <ToolLayout style={{ gridTemplateColumns: "1fr 1fr" }}>
                    <Panel>
                        <PanelHeader>
                            <PanelLabel>{L.descriptionInputLabel}</PanelLabel>
                        </PanelHeader>
                        <DescriptionInput
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder={L.descriptionPlaceholder}
                            spellCheck={false}
                        />
                        <QuickSelectStrip>
                            {["Email", "Phone", "URL", "IP Address", "Date", "UUID", "Hex Color", "Credit Card", "Slug", "Semver"].map((label) => (
                                <QuickSelectBtn
                                    key={label}
                                    onClick={() => setDescription(label.toLowerCase())}
                                >
                                    {label}
                                </QuickSelectBtn>
                            ))}
                        </QuickSelectStrip>
                        <SubHeader>
                            <div />
                        </SubHeader>
                        {description && (
                            <ActionBar>
                                <ActionBtnGroup>
                                    <ActionBtn $danger onClick={() => setDescription("")}>
                                        {C.clearBtn}
                                    </ActionBtn>
                                </ActionBtnGroup>
                            </ActionBar>
                        )}
                    </Panel>

                    <Panel>
                        <PanelHeader>
                            <PanelLabel>{L.generatedRegexLabel}</PanelLabel>
                        </PanelHeader>
                        {generatedEntry ? (
                            <>
                                <SmartEditor
                                    readOnly
                                    value={`/${generatedEntry.pattern}/${generatedEntry.flags}`}
                                    language="text"
                                    minHeight="80px"
                                />
                                <PanelLabel style={{ padding: "16px 16px 8px" }}>{L.explanationLabel}</PanelLabel>
                                <ExplanationSection>
                                    {generatedEntry.explanation.map((exp) => (
                                        <ExplanationRow key={`${exp.segment}-${exp.description}`}>
                                            <code>{exp.segment}</code>
                                            <span>{exp.description}</span>
                                        </ExplanationRow>
                                    ))}
                                </ExplanationSection>
                                <ActionBar>
                                    <ActionBtnGroup>
                                        <ActionBtn
                                            onClick={() => {
                                                const regex = `/${generatedEntry.pattern}/${generatedEntry.flags}`;
                                                navigator.clipboard.writeText(regex).then(() => toast.success("Regex copied!"));
                                            }}
                                        >
                                            {L.copyRegexBtn}
                                        </ActionBtn>
                                        <ActionBtn
                                            onClick={() => {
                                                setPattern(generatedEntry.pattern);
                                                setTab("tester");
                                            }}
                                        >
                                            {L.testItBtn}
                                        </ActionBtn>
                                    </ActionBtnGroup>
                                </ActionBar>
                            </>
                        ) : (
                            <EmptyState>
                                <span style={{ fontSize: 12, fontFamily: "Inter, sans-serif" }}>
                                    {description ? L.noPatternMatch : L.generateEmptyState}
                                </span>
                            </EmptyState>
                        )}
                    </Panel>
                </ToolLayout>
            )}
        </>
    );
}
