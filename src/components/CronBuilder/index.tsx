// @ts-nocheck

"use client";

import { Check, ContentCopy, Schedule } from "@mui/icons-material";
import { Box, Tooltip, Typography } from "@mui/material";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import styled, { keyframes } from "styled-components";
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
import LocalBadge from "components/Shared/LocalBadge";
import localization from "localization";

const { cronBuilder: L } = localization;

// ── Animation ─────────────────────────────────────────────────────────────

const fadeUp = keyframes`
    from { opacity: 0; transform: translateY(6px); }
    to   { opacity: 1; transform: translateY(0); }
`;

// ── Cron field config ──────────────────────────────────────────────────────

const FIELDS = [
    {
        key: "minute",
        label: "Minute",
        min: 0,
        max: 59,
        presets: [
            { label: "Every minute", value: "*" },
            { label: "Every 5 min", value: "*/5" },
            { label: "Every 15 min", value: "*/15" },
            { label: "Every 30 min", value: "*/30" },
            { label: "At :00", value: "0" },
            { label: "At :30", value: "30" }
        ]
    },
    {
        key: "hour",
        label: "Hour",
        min: 0,
        max: 23,
        presets: [
            { label: "Every hour", value: "*" },
            { label: "Every 2 h", value: "*/2" },
            { label: "Every 6 h", value: "*/6" },
            { label: "Every 12 h", value: "*/12" },
            { label: "Midnight", value: "0" },
            { label: "Noon", value: "12" }
        ]
    },
    {
        key: "dom",
        label: "Day (Month)",
        min: 1,
        max: 31,
        presets: [
            { label: "Every day", value: "*" },
            { label: "1st", value: "1" },
            { label: "15th", value: "15" },
            { label: "Last (28th)", value: "28" },
            { label: "1st & 15th", value: "1,15" }
        ]
    },
    {
        key: "month",
        label: "Month",
        min: 1,
        max: 12,
        presets: [
            { label: "Every month", value: "*" },
            { label: "Jan", value: "1" },
            { label: "Apr", value: "4" },
            { label: "Jul", value: "7" },
            { label: "Oct", value: "10" },
            { label: "Quarterly", value: "*/3" }
        ]
    },
    {
        key: "dow",
        label: "Day (Week)",
        min: 0,
        max: 7,
        presets: [
            { label: "Every day", value: "*" },
            { label: "Weekdays", value: "1-5" },
            { label: "Weekends", value: "0,6" },
            { label: "Mon", value: "1" },
            { label: "Wed", value: "3" },
            { label: "Fri", value: "5" }
        ]
    }
];

const MONTH_NAMES = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const DOW_NAMES = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const DOW_FULL = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

// ── Cron parser utilities ──────────────────────────────────────────────────

function expandField(expr: string, min: number, max: number): number[] {
    const vals: number[] = [];
    if (expr === "*") {
        for (let i = min; i <= max; i += 1) vals.push(i);
        return vals;
    }
    // eslint-disable-next-line no-restricted-syntax
    for (const part of expr.split(",")) {
        const stepMatch = part.match(/^([^/]+)\/(\d+)$/);
        if (stepMatch) {
            const [, rangeStr, stepStr] = stepMatch;
            const step = parseInt(stepStr, 10);
            const [lo, hi] = rangeStr === "*" ? [min, max] : rangeStr.split("-").map(Number);
            for (let i = lo; i <= (hi ?? lo); i += step) vals.push(i);
            // eslint-disable-next-line no-continue
            continue;
        }
        const rangeMatch = part.match(/^(\d+)-(\d+)$/);
        if (rangeMatch) {
            const lo = parseInt(rangeMatch[1], 10);
            const hi = parseInt(rangeMatch[2], 10);
            for (let i = lo; i <= hi; i += 1) vals.push(i);
            // eslint-disable-next-line no-continue
            continue;
        }
        const n = parseInt(part, 10);
        // eslint-disable-next-line no-restricted-globals
        if (!Number.isNaN(n)) vals.push(n);
    }
    return [...new Set(vals)].sort((a, b) => a - b);
}

function isValidCronField(expr: string, min: number, max: number): boolean {
    if (!expr || expr.trim() === "") return false;
    if (expr === "*") return true;
    return expr.split(",").every((part) => {
        const stepMatch = part.match(/^([^/]+)\/(\d+)$/);
        if (stepMatch) {
            const [, rangeStr, stepStr] = stepMatch;
            const step = parseInt(stepStr, 10);
            if (Number.isNaN(step) || step < 1) return false;
            if (rangeStr === "*") return true;
            const rangeParts = rangeStr.split("-");
            if (rangeParts.length === 2) {
                const lo = parseInt(rangeParts[0], 10);
                const hi = parseInt(rangeParts[1], 10);
                return !Number.isNaN(lo) && !Number.isNaN(hi) && lo >= min && hi <= max;
            }
            const n = parseInt(rangeStr, 10);
            return !Number.isNaN(n) && n >= min && n <= max;
        }
        const rangeMatch = part.match(/^(\d+)-(\d+)$/);
        if (rangeMatch) {
            const lo = parseInt(rangeMatch[1], 10);
            const hi = parseInt(rangeMatch[2], 10);
            return lo >= min && hi <= max && lo <= hi;
        }
        const n = parseInt(part, 10);
        // eslint-disable-next-line no-restricted-globals
        return !Number.isNaN(n) && n >= min && n <= max;
    });
}

function parseCronExpr(expr: string): { minute: string; hour: string; dom: string; month: string; dow: string } | null {
    const parts = expr.trim().split(/\s+/);
    if (parts.length !== 5) return null;
    const [minute, hour, dom, month, dow] = parts;
    if (
        !isValidCronField(minute, 0, 59) ||
        !isValidCronField(hour, 0, 23) ||
        !isValidCronField(dom, 1, 31) ||
        !isValidCronField(month, 1, 12) ||
        !isValidCronField(dow, 0, 7)
    ) return null;
    return { minute, hour, dom, month, dow };
}

// ── Next-run computation ───────────────────────────────────────────────────

function computeNextRuns(fields: { minute: string; hour: string; dom: string; month: string; dow: string }, count: number): Date[] {
    const minutes = expandField(fields.minute, 0, 59);
    const hours = expandField(fields.hour, 0, 23);
    const doms = expandField(fields.dom, 1, 31);
    const months = expandField(fields.month, 1, 12);
    const rawDows = expandField(fields.dow, 0, 7);
    const dows = [...new Set(rawDows.map((d) => d === 7 ? 0 : d))];

    const domIsWild = fields.dom === "*";
    const dowIsWild = fields.dow === "*";

    const results: Date[] = [];
    const cursor = new Date();
    cursor.setSeconds(0, 0);
    cursor.setMinutes(cursor.getMinutes() + 1); // start from next minute

    const limit = new Date(cursor.getTime() + 366 * 24 * 60 * 60 * 1000);

    while (results.length < count && cursor < limit) {
        const m = cursor.getMonth() + 1; // 1-12
        if (!months.includes(m)) {
            cursor.setDate(1);
            cursor.setHours(0, 0, 0, 0);
            cursor.setMonth(cursor.getMonth() + 1);
            // eslint-disable-next-line no-continue
            continue;
        }

        const d = cursor.getDate();
        const dw = cursor.getDay();

        const domMatch = domIsWild || doms.includes(d);
        const dowMatch = dowIsWild || dows.includes(dw);
        const dayMatch = (!domIsWild && !dowIsWild) ? (domMatch || dowMatch) : (domMatch && dowMatch);

        if (!dayMatch) {
            cursor.setDate(cursor.getDate() + 1);
            cursor.setHours(0, 0, 0, 0);
            // eslint-disable-next-line no-continue
            continue;
        }

        const h = cursor.getHours();
        if (!hours.includes(h)) {
            const nextHour = hours.find((x) => x > h);
            if (nextHour === undefined) {
                cursor.setDate(cursor.getDate() + 1);
                cursor.setHours(0, 0, 0, 0);
            } else {
                cursor.setHours(nextHour, 0, 0, 0);
            }
            // eslint-disable-next-line no-continue
            continue;
        }

        const min = cursor.getMinutes();
        const nextMin = minutes.find((x) => x >= min);
        if (nextMin === undefined) {
            const nextHour = hours.find((x) => x > h);
            if (nextHour === undefined) {
                cursor.setDate(cursor.getDate() + 1);
                cursor.setHours(0, 0, 0, 0);
            } else {
                cursor.setHours(nextHour, 0, 0, 0);
            }
            // eslint-disable-next-line no-continue
            continue;
        }

        const candidate = new Date(cursor);
        candidate.setMinutes(nextMin, 0, 0);
        results.push(candidate);
        cursor.setMinutes(nextMin + 1, 0, 0);
    }

    return results;
}

// ── Human-readable description ─────────────────────────────────────────────

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function describeField(expr: string, min: number, max: number, unit: string, singularUnit: string, names?: string[]): string {
    if (expr === "*") return `every ${singularUnit}`;
    const stepMatch = expr.match(/^\*\/(\d+)$/);
    if (stepMatch) return `every ${stepMatch[1]} ${unit}`;

    const vals = expandField(expr, min, max);
    if (vals.length === 0) return expr;

    const label = (v: number) => names ? names[v] : String(v);

    if (vals.length === 1) return `on ${singularUnit} ${label(vals[0])}`;

    const rangeMatch = expr.match(/^(\d+)-(\d+)$/);
    if (rangeMatch && names) {
        return `${names[parseInt(rangeMatch[1], 10)]} through ${names[parseInt(rangeMatch[2], 10)]}`;
    }

    return vals.map(label).join(", ");
}

function describeMinute(expr: string): string {
    if (expr === "*") return "every minute";
    const step = expr.match(/^\*\/(\d+)$/);
    if (step) return `every ${step[1]} minutes`;
    const vals = expandField(expr, 0, 59);
    if (vals.length === 1) return `at minute :${String(vals[0]).padStart(2, "0")}`;
    return `at minutes ${vals.map((v) => `:${String(v).padStart(2, "0")}`).join(", ")}`;
}

function describeHour(expr: string): string {
    if (expr === "*") return "every hour";
    const step = expr.match(/^\*\/(\d+)$/);
    if (step) return `every ${step[1]} hours`;
    const vals = expandField(expr, 0, 23);
    return vals
        .map((h) => {
            const ampm = h >= 12 ? "PM" : "AM";
            const h12 = h % 12 === 0 ? 12 : h % 12;
            return `${h12} ${ampm}`;
        })
        .join(", ");
}

function describeDom(expr: string): string {
    if (expr === "*") return "";
    const step = expr.match(/^\*\/(\d+)$/);
    if (step) return `every ${step[1]} days`;
    const vals = expandField(expr, 1, 31);
    const ordinal = (n: number) => {
        const s = ["th", "st", "nd", "rd"];
        const v = n % 100;
        return n + (s[(v - 20) % 10] || s[v] || s[0]);
    };
    return `on the ${vals.map(ordinal).join(", ")}`;
}

function describeMonth(expr: string): string {
    if (expr === "*") return "";
    const step = expr.match(/^\*\/(\d+)$/);
    if (step) return `every ${step[1]} months`;
    const rangeMatch = expr.match(/^(\d+)-(\d+)$/);
    if (rangeMatch) {
        return `${MONTH_NAMES[parseInt(rangeMatch[1], 10) - 1]}–${MONTH_NAMES[parseInt(rangeMatch[2], 10) - 1]}`;
    }
    const vals = expandField(expr, 1, 12);
    return `in ${vals.map((v) => MONTH_NAMES[v - 1]).join(", ")}`;
}

function describeDow(expr: string): string {
    if (expr === "*") return "";
    const rangeMatch = expr.match(/^(\d+)-(\d+)$/);
    if (rangeMatch) {
        return `${DOW_FULL[parseInt(rangeMatch[1], 10)]} through ${DOW_FULL[parseInt(rangeMatch[2], 10)]}`;
    }
    const vals = expandField(expr, 0, 7);
    const unique = [...new Set(vals.map((v) => (v === 7 ? 0 : v)))].sort((a, b) => a - b);
    return unique.map((v) => DOW_FULL[v]).join(", ");
}

function buildDescription(fields: { minute: string; hour: string; dom: string; month: string; dow: string }): string {
    const { minute, hour, dom, month, dow } = fields;

    // Special cases
    if (minute === "*" && hour === "*" && dom === "*" && month === "*" && dow === "*") return "Runs every minute";
    if (minute === "0" && hour === "*" && dom === "*" && month === "*" && dow === "*") return "Runs at the start of every hour";
    if (minute === "0" && hour === "0" && dom === "*" && month === "*" && dow === "*") return "Runs at midnight every day";
    if (minute === "0" && hour === "0" && dom === "1" && month === "*" && dow === "*") return "Runs at midnight on the 1st of every month";
    if (minute === "0" && hour === "0" && dom === "*" && month === "*" && dow === "0") return "Runs at midnight every Sunday";
    if (minute === "0" && hour === "0" && dom === "1" && month === "1" && dow === "*") return "Runs at midnight on January 1st";

    const parts: string[] = [];

    const minDesc = describeMinute(minute);
    const hrDesc = hour === "*" ? "" : describeHour(hour);
    const domDesc = describeDom(dom);
    const monthDesc = describeMonth(month);
    const dowDesc = describeDow(dow);

    // Build time phrase
    if (hour !== "*" && minute !== "*") {
        const hrs = expandField(hour, 0, 23);
        const mins = expandField(minute, 0, 59);
        if (hrs.length <= 3 && mins.length <= 3) {
            const timeParts = hrs.map((h) => {
                const ampm = h >= 12 ? "PM" : "AM";
                const h12 = h % 12 === 0 ? 12 : h % 12;
                return mins.map((m) => `${h12}:${String(m).padStart(2, "0")} ${ampm}`).join(", ");
            });
            parts.push(`At ${timeParts.join(" and ")}`);
        } else {
            parts.push(`${minDesc} past ${hrDesc}`);
        }
    } else if (hour !== "*") {
        parts.push(`${minDesc} past ${hrDesc}`);
    } else if (minute !== "*") {
        parts.push(minDesc.charAt(0).toUpperCase() + minDesc.slice(1));
    } else {
        parts.push("Every minute");
    }

    if (dowDesc && domDesc) parts.push(`on ${dowDesc}, ${domDesc.replace(/^on /, "")}`);
    else if (dowDesc) parts.push(`on ${dowDesc}`);
    else if (domDesc) parts.push(domDesc);

    if (monthDesc) parts.push(monthDesc);

    return parts.join(", ");
}

// ── Styled components ──────────────────────────────────────────────────────

const ExpressionWrap = styled(Box)`
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 14px 16px 12px;
    border-bottom: 1px solid var(--border-color);
    background: var(--bg-input);
    flex-wrap: wrap;
`;

const ExpressionInput = styled.input`
    flex: 1;
    min-width: 180px;
    background: transparent;
    border: none;
    outline: none;
    font-family: "JetBrains Mono", "Fira Code", monospace;
    font-size: 16px;
    font-weight: 600;
    color: var(--text-primary);
    letter-spacing: 0.06em;
    &::placeholder { color: var(--text-secondary); opacity: 0.5; font-weight: 400; }
`;

const ValidDot = styled.span<{ $valid: boolean }>`
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: ${(p) => (p.$valid ? "#22cc99" : "#ef4444")};
    flex-shrink: 0;
    transition: background 0.2s ease;
`;

const FieldsWrap = styled(Box)`
    display: flex;
    flex-direction: column;
    gap: 0;
    flex: 1;
    overflow-y: auto;
`;

const FieldSection = styled(Box)`
    padding: 12px 16px;
    border-bottom: 1px solid var(--border-color);
    &:last-child { border-bottom: none; }
    animation: ${fadeUp} 0.25s ease both;
`;

const FieldLabel = styled(Typography)`
    font-size: 10px !important;
    font-weight: 700 !important;
    font-family: "Inter", sans-serif !important;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    color: var(--text-secondary) !important;
    margin-bottom: 8px !important;
`;

const PresetRow = styled(Box)`
    display: flex;
    flex-wrap: wrap;
    gap: 5px;
    margin-bottom: 8px;
`;

const PresetChip = styled.button<{ $active: boolean }>`
    padding: 3px 9px;
    border-radius: 5px;
    font-size: 11px;
    font-weight: 600;
    font-family: "Inter", sans-serif;
    cursor: pointer;
    border: 1.5px solid ${(p) => (p.$active ? "#22cc99" : "var(--border-color)")};
    background: ${(p) => (p.$active ? "rgba(34,204,153,0.1)" : "var(--bg-input)")};
    color: ${(p) => (p.$active ? "#22cc99" : "var(--text-secondary)")};
    transition: all 0.15s ease;
    &:hover {
        border-color: #22cc99;
        color: #22cc99;
        background: rgba(34, 204, 153, 0.07);
    }
`;

const FieldInput = styled.input`
    width: 100%;
    background: var(--bg-input);
    border: 1.5px solid var(--border-color);
    border-radius: 6px;
    color: var(--text-primary);
    font-family: "JetBrains Mono", "Fira Code", monospace;
    font-size: 12px;
    padding: 5px 10px;
    outline: none;
    box-sizing: border-box;
    transition: border-color 0.15s ease;
    &:focus { border-color: #22cc99; }
    &.invalid { border-color: #ef4444; }
`;

const DescriptionCard = styled(Box)`
    padding: 16px;
    border-bottom: 1px solid var(--border-color);
`;

const DescriptionText = styled(Typography)`
    font-size: 14px !important;
    font-weight: 500 !important;
    font-family: "Inter", sans-serif !important;
    color: var(--text-primary) !important;
    line-height: 1.6 !important;
`;

const NextRunsWrap = styled(Box)`
    padding: 12px 16px;
    flex: 1;
`;

const NextRunRow = styled(Box)<{ $index: number }>`
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 7px 0;
    border-bottom: 1px solid var(--border-color);
    animation: ${fadeUp} ${(p) => 0.1 + p.$index * 0.05}s ease both;
    &:last-child { border-bottom: none; }
`;

const RunIndex = styled(Typography)`
    font-size: 10px !important;
    font-weight: 700 !important;
    font-family: "JetBrains Mono", monospace !important;
    color: #22cc99 !important;
    min-width: 16px;
    opacity: 0.7;
`;

const RunTime = styled(Typography)`
    font-size: 12px !important;
    font-family: "JetBrains Mono", monospace !important;
    color: var(--text-primary) !important;
    letter-spacing: 0.02em;
`;

const RunRelative = styled(Typography)`
    font-size: 11px !important;
    font-family: "Inter", sans-serif !important;
    color: var(--text-secondary) !important;
    margin-left: auto !important;
    opacity: 0.7;
`;

const PartLabelsRow = styled(Box)`
    display: flex;
    gap: 0;
    padding: 6px 16px 0;
    border-bottom: 1px solid var(--border-color);
`;

const PartLabelCell = styled(Typography)<{ $width?: string }>`
    font-size: 9px !important;
    font-weight: 700 !important;
    font-family: "Inter", sans-serif !important;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    color: #22cc99 !important;
    opacity: 0.65;
    min-width: ${(p) => p.$width ?? "28px"};
    text-align: center;
`;

const PART_LABELS = ["MIN", "HR", "DOM", "MON", "DOW"];

// ── Relative time helper ───────────────────────────────────────────────────

function relativeTime(date: Date): string {
    const diffMs = date.getTime() - Date.now();
    const diffMin = Math.round(diffMs / 60000);
    if (diffMin < 60) return `in ${diffMin}m`;
    const diffHr = Math.floor(diffMin / 60);
    if (diffHr < 24) return `in ${diffHr}h ${diffMin % 60}m`;
    const diffDays = Math.floor(diffHr / 24);
    return `in ${diffDays}d`;
}

function formatRunDate(date: Date): string {
    return date.toLocaleString("en-US", {
        weekday: "short",
        month: "short",
        day: "numeric",
        hour: "numeric",
        minute: "2-digit",
        hour12: true
    });
}

// ── Common presets ─────────────────────────────────────────────────────────

const COMMON_PRESETS = [
    { label: "Every minute", cron: "* * * * *" },
    { label: "Hourly", cron: "0 * * * *" },
    { label: "Daily midnight", cron: "0 0 * * *" },
    { label: "Daily noon", cron: "0 12 * * *" },
    { label: "Weekly (Mon)", cron: "0 9 * * 1" },
    { label: "Monthly (1st)", cron: "0 0 1 * *" },
    { label: "Weekdays 9 AM", cron: "0 9 * * 1-5" },
    { label: "Every 5 min", cron: "*/5 * * * *" }
];

const DEFAULT_FIELDS = { minute: "*", hour: "*", dom: "*", month: "*", dow: "*" };

// ── Main component ─────────────────────────────────────────────────────────

export default function CronBuilder() {
    const [fields, setFields] = useState(DEFAULT_FIELDS);
    const [exprInput, setExprInput] = useState("* * * * *");
    const [copied, setCopied] = useState(false);

    const cronExpr = `${fields.minute} ${fields.hour} ${fields.dom} ${fields.month} ${fields.dow}`;
    const isValid = parseCronExpr(exprInput) !== null;

    // Sync fields → expression input
    useEffect(() => {
        setExprInput(cronExpr);
    }, [cronExpr]);

    // Parse expression input → fields
    const handleExprInput = useCallback((raw: string) => {
        setExprInput(raw);
        const parsed = parseCronExpr(raw);
        if (parsed) setFields(parsed);
    }, []);

    const setField = useCallback((key: string, val: string) => {
        setFields((prev) => ({ ...prev, [key]: val }));
    }, []);

    const applyPreset = useCallback((cron: string) => {
        const parsed = parseCronExpr(cron);
        if (parsed) {
            setFields(parsed);
            setExprInput(cron);
        }
    }, []);

    const description = useMemo(() => {
        if (!isValid && parseCronExpr(cronExpr) === null) return null;
        return buildDescription(fields);
    }, [fields, isValid, cronExpr]);

    const nextRuns = useMemo(() => {
        if (!description) return [];
        return computeNextRuns(fields, 5);
    }, [fields, description]);

    const handleCopy = useCallback(() => {
        navigator.clipboard.writeText(cronExpr).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 1800);
        });
    }, [cronExpr]);

    return (
        <ToolLayout>
            {/* ── Left panel: Builder ── */}
            <Panel style={{ display: "flex", flexDirection: "column", minHeight: 520 }}>
                <PanelHeader>
                    <PanelLabel>{L.builderLabel}</PanelLabel>
                    <LocalBadge />
                </PanelHeader>

                {/* Expression input */}
                <ExpressionWrap>
                    <ValidDot $valid={isValid} />
                    <ExpressionInput
                        value={exprInput}
                        onChange={(e) => handleExprInput(e.target.value)}
                        placeholder="* * * * *"
                        spellCheck={false}
                    />
                    <PartLabelsRow style={{ padding: 0, border: "none" }}>
                        {PART_LABELS.map((lbl) => (
                            <PartLabelCell key={lbl} $width="36px" style={{ fontSize: "9px" }}>
                                {lbl}
                            </PartLabelCell>
                        ))}
                    </PartLabelsRow>
                </ExpressionWrap>

                {/* Common presets */}
                <Box sx={{ px: 2, pt: 1.25, pb: 0.5, borderBottom: "1px solid var(--border-color)" }}>
                    <FieldLabel style={{ marginBottom: "6px" }}>{L.presetsLabel}</FieldLabel>
                    <PresetRow>
                        {COMMON_PRESETS.map((p) => (
                            <PresetChip
                                key={p.cron}
                                $active={cronExpr === p.cron}
                                onClick={() => applyPreset(p.cron)}
                            >
                                {p.label}
                            </PresetChip>
                        ))}
                    </PresetRow>
                </Box>

                {/* Per-field controls */}
                <FieldsWrap>
                    {FIELDS.map(({ key, label, min, max, presets }) => {
                        const val = fields[key as keyof typeof fields];
                        const fieldValid = isValidCronField(val, min, max);
                        return (
                            <FieldSection key={key}>
                                <FieldLabel>{label}</FieldLabel>
                                <PresetRow>
                                    {presets.map((p) => (
                                        <PresetChip
                                            key={p.value}
                                            $active={val === p.value}
                                            onClick={() => setField(key, p.value)}
                                        >
                                            {p.label}
                                        </PresetChip>
                                    ))}
                                </PresetRow>
                                <FieldInput
                                    value={val}
                                    onChange={(e) => setField(key, e.target.value)}
                                    className={!fieldValid ? "invalid" : ""}
                                    placeholder="*"
                                    spellCheck={false}
                                />
                            </FieldSection>
                        );
                    })}
                </FieldsWrap>
            </Panel>

            {/* ── Right panel: Output ── */}
            <Panel style={{ display: "flex", flexDirection: "column", minHeight: 520 }}>
                <PanelHeader>
                    <PanelLabel>{L.outputLabel}</PanelLabel>
                </PanelHeader>

                {description ? (
                    <>
                        <DescriptionCard>
                            <FieldLabel style={{ marginBottom: "8px" }}>{L.descriptionLabel}</FieldLabel>
                            <DescriptionText>{description}</DescriptionText>
                        </DescriptionCard>

                        <NextRunsWrap>
                            <FieldLabel style={{ marginBottom: "8px" }}>{L.nextRunsLabel}</FieldLabel>
                            {nextRuns.length > 0 ? (
                                nextRuns.map((date, i) => (
                                    // eslint-disable-next-line react/no-array-index-key
                                    <NextRunRow key={i} $index={i}>
                                        <RunIndex>#{i + 1}</RunIndex>
                                        <RunTime>{formatRunDate(date)}</RunTime>
                                        <RunRelative>{relativeTime(date)}</RunRelative>
                                    </NextRunRow>
                                ))
                            ) : (
                                <EmptyState>
                                    <Schedule sx={{ fontSize: 32, opacity: 0.3, mb: 1 }} />
                                    <Typography variant="body2" color="text.secondary">
                                        {L.noRunsMessage}
                                    </Typography>
                                </EmptyState>
                            )}
                        </NextRunsWrap>
                    </>
                ) : (
                    <EmptyState>
                        <Schedule sx={{ fontSize: 40, opacity: 0.25, mb: 1.5 }} />
                        <Typography variant="body2" sx={{ color: "var(--text-secondary)" }}>
                            {L.emptyStateMessage}
                        </Typography>
                    </EmptyState>
                )}

                <ActionBar>
                    <ActionBtnGroup>
                        <Tooltip title={L.copyTooltip} placement="top">
                            <ActionBtn onClick={handleCopy} disabled={!isValid}>
                                {copied ? <Check sx={{ fontSize: 14 }} /> : <ContentCopy sx={{ fontSize: 14 }} />}
                                {copied ? L.copiedBtn : L.copyBtn}
                            </ActionBtn>
                        </Tooltip>
                    </ActionBtnGroup>
                </ActionBar>
            </Panel>
        </ToolLayout>
    );
}
