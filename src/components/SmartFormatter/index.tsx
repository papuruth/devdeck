// @ts-nocheck
/* eslint-disable no-bitwise, no-restricted-syntax, prefer-template, prefer-const, quotes */
import { Box, Typography } from "@mui/material";
import React, { useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import { useToolChain } from "context/ToolChainContext";
import { useToolHistory } from "utils/hooks/useToolHistory.hooks";
import { useDebounce } from "utils/hooks/useDebounce.hooks";
import SendToButton from "components/Shared/SendToButton";
import LocalBadge from "components/Shared/LocalBadge";
import localization from "localization";
import {
    ActionBar,
    ActionBtn,
    ActionBtnGroup,
    EmptyState,
    Panel,
    PanelHeader,
    PanelLabel,
    ToolLayout
} from "components/Shared/ToolKit";
import { SmartEditor } from "components/Shared/SmartEditor";
import { detectInputType } from "utils/inputDetector";

const { smartFormatter: L, common: C } = localization;

// ─── Styled Components ────────────────────────────────────────────────────────

const DetectionBadge = styled.div`
    display: flex;
    align-items: center;
    gap: 6px;
    padding: 6px 12px;
    margin: 0 16px 6px;
    background: rgba(34, 153, 255, 0.1);
    border: 1px solid rgba(34, 153, 255, 0.25);
    border-radius: 6px;
    font-size: 11px;
    font-weight: 600;
    font-family: var(--font-mono);
    letter-spacing: 0.06em;
    color: #2299ff;
    animation: fadeIn 0.2s ease;
    @keyframes fadeIn {
        from {
            opacity: 0;
            transform: translateY(-4px);
        }
        to {
            opacity: 1;
            transform: none;
        }
    }
`;

const FormattedContainer = styled(Box)`
    flex: 1;
    display: flex;
    flex-direction: column;
    min-height: 280px;
`;

const FormattedPre = styled.pre`
    width: 100%;
    flex: 1;
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
    overflow-y: auto;
`;

const StatsGrid = styled(Box)`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
    gap: 12px;
    padding: 16px;
    background: var(--bg-input);
    border-top: 1px solid var(--border-color);
`;

const StatItem = styled(Box)`
    display: flex;
    flex-direction: column;
    gap: 4px;
`;

const StatLabel = styled(Typography)`
    font-size: 10px !important;
    font-weight: 600 !important;
    font-family: "Inter", sans-serif !important;
    color: var(--text-secondary) !important;
    opacity: 0.7;
    text-transform: uppercase;
    letter-spacing: 0.04em;
`;

const StatValue = styled(Typography)`
    font-size: 16px !important;
    font-weight: 700 !important;
    font-family: var(--font-mono) !important;
    color: #2299ff !important;
`;

const ColorSwatch = styled.div<{ $color: string }>`
    width: 60px;
    height: 60px;
    background: ${(p) => p.$color};
    border: 1px solid var(--border-color);
    border-radius: 6px;
    margin-bottom: 12px;
`;


// ─── Local Type Detectors ─────────────────────────────────────────────────────

function detectUnixTimestamp(text: string): { type: string; label: string; route: string } | null {
    const trimmed = text.trim();
    if (/^\d+$/.test(trimmed)) {
        const num = trimmed.length === 10 || trimmed.length === 13;
        if (num) return { type: "unix_timestamp", label: "Unix Timestamp", route: "/timestamp" };
    }
    return null;
}

function detectCSV(text: string): { type: string; label: string; route: string } | null {
    const trimmed = text.trim();
    const lines = trimmed.split("\n");
    if (lines.length < 2) return null;

    const firstLineCols = (lines[0].match(/,/g) || []).length + 1;
    const consistentCommas = lines.slice(0, Math.min(3, lines.length)).every((line) => {
        const cols = (line.match(/,/g) || []).length + 1;
        return cols === firstLineCols;
    });

    if (consistentCommas && firstLineCols >= 2) {
        return { type: "csv", label: "CSV", route: "/csv-json" };
    }
    return null;
}

function detectHTML(text: string): { type: string; label: string; route: string } | null {
    const trimmed = text.trim();
    if (trimmed.startsWith("<") && trimmed.includes(">") && trimmed.endsWith(">")) {
        return { type: "html", label: "HTML", route: "/smart-formatter" };
    }
    return null;
}

function detectHexColor(text: string): { type: string; label: string; route: string } | null {
    const trimmed = text.trim();
    if (/^#(?:[0-9a-fA-F]{3}){1,2}$/.test(trimmed)) {
        return { type: "hex_color", label: "Hex Color", route: "/color-converter" };
    }
    return null;
}

function detectIPAddress(text: string): { type: string; label: string; route: string } | null {
    const trimmed = text.trim();
    if (/^(\d{1,3}\.){3}\d{1,3}$/.test(trimmed)) {
        const octets = trimmed.split(".").map(Number);
        if (octets.every((o) => o >= 0 && o <= 255)) {
            return { type: "ip_address", label: "IP Address", route: "/smart-formatter" };
        }
    }
    return null;
}

function detectLargeJSON(text: string): { type: string; label: string; route: string } | null {
    const trimmed = text.trim();
    if (text.length > 500 && (trimmed.startsWith("{") || trimmed.startsWith("["))) {
        return { type: "json", label: "JSON (large)", route: "/json-viewer" };
    }
    return null;
}

function detectType(text: string) {
    if (!text.trim()) return null;

    const localDetectors = [
        detectUnixTimestamp,
        detectCSV,
        detectHTML,
        detectHexColor,
        detectIPAddress,
        detectLargeJSON
    ];

    for (const detector of localDetectors) {
        const result = detector(text);
        if (result) return result;
    }

    return detectInputType(text);
}

// ─── Formatting Functions ─────────────────────────────────────────────────────

function formatJSON(input: string) {
    try {
        const parsed = JSON.parse(input);
        return JSON.stringify(parsed, null, 2);
    } catch {
        return input;
    }
}

function formatJWT(input: string) {
    const parts = input.trim().split(".");
    if (parts.length !== 3) return null;

    try {
        const pad = (s: string) => s + "=".repeat((4 - (s.length % 4)) % 4);
        const decode = (s: string) => JSON.parse(atob(pad(s)));

        const header = decode(parts[0]);
        const payload = decode(parts[1]);

        return { header, payload };
    } catch {
        return null;
    }
}

function formatURL(input: string) {
    try {
        const url = new URL(input.trim());
        const params: Record<string, string> = {};
        url.searchParams.forEach((val, key) => {
            params[key] = val;
        });

        return {
            scheme: url.protocol.slice(0, -1),
            host: url.hostname,
            port: url.port || "default",
            pathname: url.pathname,
            params
        };
    } catch {
        return null;
    }
}

function formatBase64(input: string) {
    try {
        return atob(input.trim());
    } catch {
        return null;
    }
}

function formatUUID(input: string) {
    const trimmed = input.trim().toLowerCase();
    const parts = trimmed.split("-");
    if (parts.length !== 5) return null;

    const joined = parts.join("");
    const versionByte = parseInt(joined.substring(12, 13), 16);
    const version = (versionByte >> 4) & 0xf;

    return {
        version,
        variant: "RFC 4122",
        uppercase: input.trim().toUpperCase(),
        lowercase: trimmed,
        nohyphens: joined
    };
}

function formatHash(input: string) {
    const trimmed = input.trim().toLowerCase();
    const len = trimmed.length;

    let type = "Unknown";
    if (len === 32) type = "MD5";
    else if (len === 40) type = "SHA-1";
    else if (len === 64) type = "SHA-256";
    else if (len === 128) type = "SHA-512";

    return {
        type,
        length: len,
        bytes: Math.ceil(len / 2)
    };
}

function formatCurl(input: string) {
    const trimmed = input.trim();
    if (!/^curl\s/i.test(trimmed)) return null;

    const tokens: string[] = [];
    let current = "";
    let inDouble = false;

    for (let idx = 0; idx < trimmed.length; idx += 1) {
        const ch = trimmed[idx];
        if (inDouble) {
            if (ch === '"') {
                inDouble = false;
            } else if (ch === "\\" && idx + 1 < trimmed.length) {
                current += trimmed[idx + 1];
                idx += 1;
            } else {
                current += ch;
            }
        } else if (ch === '"') {
            inDouble = true;
        } else if (ch === " " || ch === "\t") {
            if (current) {
                tokens.push(current);
                current = "";
            }
        } else {
            current += ch;
        }
    }
    if (current) tokens.push(current);

    let method = "GET";
    let url = "";
    const headers: Record<string, string> = {};

    for (let i = 1; i < tokens.length; i += 1) {
        const t = tokens[i];
        if (t === "-X" || t === "--request") {
            method = (tokens[i + 1] || "GET").toUpperCase();
            i += 1;
        } else if (t === "-H" || t === "--header") {
            const h = tokens[i + 1] || "";
            i += 1;
            const colon = h.indexOf(":");
            if (colon !== -1) {
                headers[h.slice(0, colon).trim()] = h.slice(colon + 1).trim();
            }
        } else if (!t.startsWith("-") && !url) {
            url = t;
        }
    }

    return url ? { method, url, headerCount: Object.keys(headers).length } : null;
}

function formatUnixTimestamp(input: string) {
    const num = parseInt(input.trim(), 10);
    if (Number.isNaN(num)) return null;

    const ms = input.trim().length === 13 ? num : num * 1000;
    const date = new Date(ms);

    return {
        iso: date.toISOString(),
        locale: date.toString(),
        unix: Math.floor(ms / 1000),
        unixms: ms
    };
}

function formatCSV(input: string) {
    const lines = input.trim().split("\n");
    const headers = lines[0].split(",").map((h) => h.trim());

    return {
        rows: lines.length,
        columns: headers.length,
        headers,
        preview: lines.slice(0, 3)
    };
}

function formatHTML(input: string) {
    const trimmed = input.trim();
    let formatted = "";
    let indent = 0;
    const selfClosingTags = ["br", "hr", "img", "input", "meta", "link"];

    let i = 0;
    while (i < trimmed.length) {
        const ch = trimmed[i];
        if (ch === "<") {
            const close = trimmed.indexOf(">", i);
            if (close !== -1) {
                const tag = trimmed.slice(i, close + 1);
                if (tag.startsWith("</")) {
                    indent = Math.max(0, indent - 1);
                }
                formatted += `${"  ".repeat(indent)}${tag}\n`;
                if (!tag.startsWith("</") && !tag.endsWith("/>") && !selfClosingTags.some((t) => tag.includes(t))) {
                    indent += 1;
                }
                i = close + 1;
            } else {
                i += 1;
            }
        } else {
            i += 1;
        }
    }

    return formatted || trimmed;
}

function rgbToHsl(rVal: number, gVal: number, bVal: number) {
    const r = rVal / 255;
    const g = gVal / 255;
    const b = bVal / 255;

    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h = 0;
    let s = 0;
    const l = (max + min) / 2;

    if (max !== min) {
        const d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        if (max === r) {
            h = ((g - b) / d) + (g < b ? 6 : 0);
        } else if (max === g) {
            h = (b - r) / d + 2;
        } else {
            h = (r - g) / d + 4;
        }
        h /= 6;
    }

    return {
        h: Math.round(h * 360),
        s: Math.round(s * 100),
        l: Math.round(l * 100)
    };
}

function formatHexColor(input: string) {
    const hex = input.trim().toLowerCase();
    let r;
    let g;
    let b;

    if (hex.length === 4) {
        r = parseInt(`${hex[1]}${hex[1]}`, 16);
        g = parseInt(`${hex[2]}${hex[2]}`, 16);
        b = parseInt(`${hex[3]}${hex[3]}`, 16);
    } else {
        r = parseInt(hex.slice(1, 3), 16);
        g = parseInt(hex.slice(3, 5), 16);
        b = parseInt(hex.slice(5, 7), 16);
    }

    const hsl = rgbToHsl(r, g, b);

    return {
        hex: hex.toUpperCase(),
        rgb: `rgb(${r}, ${g}, ${b})`,
        hsl: `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`,
        r,
        g,
        b,
        ...hsl
    };
}

function formatIPAddress(input: string) {
    const octets = input.trim().split(".").map(Number);

    const first = octets[0];
    let cls = "A";
    if (first >= 128 && first < 192) {
        cls = "B";
    } else if (first >= 192 && first < 224) {
        cls = "C";
    } else if (first >= 224 && first < 240) {
        cls = "D";
    } else if (first >= 240) {
        cls = "E";
    }

    const isPrivate = first === 10 || (first === 172 && octets[1] >= 16 && octets[1] <= 31) || (first === 192 && octets[1] === 168);
    const isLoopback = first === 127;

    return {
        class: cls,
        private: isPrivate,
        loopback: isLoopback,
        public: !isPrivate && !isLoopback,
        octets
    };
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function SmartFormatter() {
    const { consumeChain } = useToolChain();
    const { addHistory } = useToolHistory("smart-formatter");

    const [input, setInput] = useState("");
    const [copied, setCopied] = useState(false);
    const debouncedInput = useDebounce(input, 200);
    const detectedType = useMemo(() => detectType(debouncedInput), [debouncedInput]);

    useEffect(() => {
        const incoming = consumeChain("/smart-formatter");
        if (incoming) {
            setInput(incoming);
        }
    }, [consumeChain]);

    useEffect(() => {
        if (debouncedInput.trim()) {
            addHistory(debouncedInput.trim());
        }
    }, [debouncedInput, addHistory]);

    const formattedOutput = useMemo(() => {
        if (!detectedType) return null;

        const { type } = detectedType;
        switch (type) {
            case "json":
                return formatJSON(input);
            case "jwt": {
                const decoded = formatJWT(input);
                return decoded ? `Header:\n${JSON.stringify(decoded.header, null, 2)}\n\nPayload:\n${JSON.stringify(decoded.payload, null, 2)}` : null;
            }
            case "url": {
                const parsed = formatURL(input);
                return parsed ? JSON.stringify(parsed, null, 2) : null;
            }
            case "base64":
                return formatBase64(input);
            case "uuid": {
                const parsed = formatUUID(input);
                return parsed ? JSON.stringify(parsed, null, 2) : null;
            }
            case "hash": {
                const parsed = formatHash(input);
                return parsed ? JSON.stringify(parsed, null, 2) : null;
            }
            case "curl": {
                const parsed = formatCurl(input);
                return parsed ? JSON.stringify(parsed, null, 2) : null;
            }
            case "unix_timestamp": {
                const parsed = formatUnixTimestamp(input);
                return parsed ? JSON.stringify(parsed, null, 2) : null;
            }
            case "csv": {
                const parsed = formatCSV(input);
                return parsed ? JSON.stringify(parsed, null, 2) : null;
            }
            case "html":
                return formatHTML(input);
            case "hex_color":
            case "ip_address":
                return JSON.stringify(
                    type === "hex_color" ? formatHexColor(input) : formatIPAddress(input),
                    null,
                    2
                );
            default:
                return null;
        }
    }, [detectedType, input]);

    const statsData = useMemo(() => {
        if (!input.trim()) return null;
        const chars = input.length;
        const lines = input.split("\n").length;
        const words = input.trim().split(/\s+/).length;
        return { chars, lines, words };
    }, [input]);

    const handleCopy = () => {
        if (!formattedOutput) return;
        navigator.clipboard.writeText(formattedOutput).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 1800);
        });
    };

    const handleClear = () => {
        setInput("");
    };

    return (
        <ToolLayout>
            <Panel style={{ maxHeight: "calc(100vh - 400px)", overflowY: "auto" }}>
                <PanelHeader>
                    <PanelLabel>{L.inputLabel}</PanelLabel>
                    <LocalBadge />
                </PanelHeader>
                <SmartEditor
                    value={input}
                    onChange={setInput}
                    placeholder={L.inputPlaceholder}
                    language="text"
                    style={{ flex: 1 }}
                    minHeight="300px"
                />
                <ActionBar>
                    <ActionBtn $danger onClick={handleClear}>
                        {C.clearBtn}
                    </ActionBtn>
                </ActionBar>
            </Panel>

            <Panel style={{ maxHeight: "calc(100vh - 400px)", overflowY: "auto" }}>
                <PanelHeader>
                    <PanelLabel>{L.formattedOutputLabel}</PanelLabel>
                </PanelHeader>

                {detectedType && <DetectionBadge>✓ {detectedType.label} {L.detectedLabel}</DetectionBadge>}

                {(() => {
                    if (!input.trim()) {
                        return (
                            <EmptyState>
                                <Typography variant="caption" sx={{ fontFamily: "var(--font-mono)", opacity: 0.6 }}>
                                    {L.emptyStateMessage}
                                </Typography>
                            </EmptyState>
                        );
                    }

                    if (!detectedType) {
                        return (
                            <Box sx={{ p: 3, display: "flex", flexDirection: "column", gap: 2, flex: 1 }}>
                                <Typography variant="caption" sx={{ fontFamily: "var(--font-mono)", color: "var(--text-secondary)" }}>
                                    {L.noDetectionLabel}
                                </Typography>
                                {statsData && (
                                    <StatsGrid>
                                        <StatItem>
                                            <StatLabel>{L.statsChars}</StatLabel>
                                            <StatValue>{statsData.chars}</StatValue>
                                        </StatItem>
                                        <StatItem>
                                            <StatLabel>{L.statsLines}</StatLabel>
                                            <StatValue>{statsData.lines}</StatValue>
                                        </StatItem>
                                        <StatItem>
                                            <StatLabel>{L.statsWords}</StatLabel>
                                            <StatValue>{statsData.words}</StatValue>
                                        </StatItem>
                                    </StatsGrid>
                                )}
                            </Box>
                        );
                    }

                    if (detectedType.type === "hex_color") {
                        return (
                            <FormattedContainer>
                                <Box sx={{ p: 3 }}>
                                    <ColorSwatch $color={input.trim()} />
                                    {formattedOutput && <FormattedPre>{formattedOutput}</FormattedPre>}
                                </Box>
                                <ActionBar>
                                    <ActionBtnGroup>
                                        <ActionBtn $success={copied} onClick={handleCopy}>
                                            {copied ? C.copiedLabel : C.copyBtn}
                                        </ActionBtn>
                                        <SendToButton
                                            value={input.trim()}
                                            targets={[{ label: "Color Converter", route: "/color-converter" }]}
                                        />
                                    </ActionBtnGroup>
                                </ActionBar>
                            </FormattedContainer>
                        );
                    }

                    if (formattedOutput) {
                        return (
                            <FormattedContainer>
                                <FormattedPre>{formattedOutput}</FormattedPre>
                                <ActionBar>
                                    <ActionBtnGroup>
                                        <ActionBtn $success={copied} onClick={handleCopy}>
                                            {copied ? C.copiedLabel : C.copyBtn}
                                        </ActionBtn>
                                        {detectedType.route && detectedType.route !== "/smart-formatter" && (
                                            <SendToButton
                                                value={input.trim()}
                                                targets={[{ label: `${detectedType.label} Tool`, route: detectedType.route }]}
                                            />
                                        )}
                                    </ActionBtnGroup>
                                </ActionBar>
                            </FormattedContainer>
                        );
                    }

                    return (
                        <EmptyState>
                            <Typography variant="caption" sx={{ fontFamily: "var(--font-mono)", opacity: 0.6 }}>
                                {L.binaryDataLabel}
                            </Typography>
                        </EmptyState>
                    );
                })()}
            </Panel>
        </ToolLayout>
    );
}
