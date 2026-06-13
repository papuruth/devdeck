import { diffLines, diffWords, diffChars, createPatch } from "diff";
import localization from "localization";
import React, { useMemo, useState, useCallback, useRef } from "react";
import styled from "styled-components";
import { ActionBtn, EmptyState, MetaText, ModeBtn, ModeToggle, Panel, PanelHeader, PanelLabel, ToolLayout } from "components/Shared/ToolKit";
import { SmartEditor } from "components/Shared/SmartEditor";
import { useCopyWithAnimation } from "utils/hooks/useCopyWithAnimation.hooks";
import { styledMedia } from "styles/global";

const { textDiff: L } = localization;

type DiffMode = "words" | "chars" | "lines";
type ViewMode = "split" | "unified" | "inline";

const MODES: { id: DiffMode; label: string }[] = [
    { id: "lines", label: "Lines" },
    { id: "words", label: "Words" },
    { id: "chars", label: "Chars" }
];

/* ─── Types ─────────────────────────────────── */

interface DiffLine {
    type: "added" | "removed" | "unchanged";
    content: string;
    lineNumLeft?: number;
    lineNumRight?: number;
    hunkId?: number;
}

interface Hunk {
    id: number;
    removedLines: DiffLine[];
    addedLines: DiffLine[];
}

/* ─── Layout ─────────────────────────────────── */

const ToolWrap = styled.div`
    display: flex;
    flex-direction: column;
    gap: 16px;
    width: 100%;
    margin-top: 4px;
`;

const ControlsRow = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 8px;
`;

const ControlGroup = styled.div`
    display: flex;
    align-items: center;
    gap: 8px;
    flex-wrap: wrap;
`;

/* ─── Stats bar ──────────────────────────────── */

const StatsBar = styled.div`
    display: flex;
    align-items: center;
    gap: 16px;
    padding: 8px 16px;
    background: var(--bg-surface);
    border-radius: var(--radius-panel);
    box-shadow: var(--shadow-panel);
    font-family: var(--font-mono);
    font-size: 11px;
    flex-wrap: wrap;
`;

const StatChip = styled.span<{ $color?: string }>`
    display: inline-flex;
    align-items: center;
    gap: 4px;
    color: ${({ $color }) => $color ?? "var(--text-secondary)"};
    font-weight: 600;
`;

const MatchBadge = styled.span`
    margin-left: auto;
    font-size: 10px;
    color: var(--text-secondary);
    font-family: var(--font-mono);
`;

/* ─── Split view ─────────────────────────────── */

const SplitWrap = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0;
    position: relative;
    padding-bottom: 220px;
`;

const SplitGrid = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
    width: 100%;
    ${styledMedia.lessThan("md")`
        grid-template-columns: 1fr;
    `}
`;

const DiffPanel = styled(Panel)``;

/* ─── Diff rows ──────────────────────────────── */

const DiffScroll = styled.div`
    width: 100%;
    overflow-x: auto;
    font-family: var(--font-mono);
    font-size: 12px;
    line-height: 1.8;
`;

const LineRow = styled.div<{
    $type?: "added" | "removed" | "unchanged";
    $active?: boolean;
    $clickable?: boolean;
    $blank?: boolean;
}>`
    display: flex;
    align-items: stretch;
    min-height: 1.8em;
    cursor: ${({ $clickable }) => ($clickable ? "pointer" : "default")};
    background: ${({ $type, $active, $blank }) => {
        if ($blank) return "rgba(0,0,0,0.04)";
        if ($active && $type === "removed") return "rgba(239, 68, 68, 0.22)";
        if ($active && $type === "added") return "rgba(34, 204, 153, 0.22)";
        if ($type === "added") return "rgba(34, 204, 153, 0.10)";
        if ($type === "removed") return "rgba(239, 68, 68, 0.10)";
        return "transparent";
    }};
    border-left: 3px solid
        ${({ $type, $active, $blank }) => {
            if ($blank) return "transparent";
            if ($active && $type === "removed") return "#ef4444";
            if ($active && $type === "added") return "#22cc99";
            if ($type === "added") return "rgba(34, 204, 153, 0.6)";
            if ($type === "removed") return "rgba(239, 68, 68, 0.6)";
            return "transparent";
        }};
    transition: background 0.1s ease;
    &:hover {
        background: ${({ $type, $clickable, $blank }) => {
            if ($blank) return "rgba(0,0,0,0.04)";
            if (!$clickable) return undefined;
            if ($type === "added") return "rgba(34, 204, 153, 0.18)";
            if ($type === "removed") return "rgba(239, 68, 68, 0.18)";
            return "rgba(255,255,255,0.03)";
        }};
    }
`;

function lineNumColor(type?: "added" | "removed" | "unchanged"): string {
    if (type === "added") return "rgba(34,204,153,0.7)";
    if (type === "removed") return "rgba(239,68,68,0.7)";
    return "var(--text-secondary)";
}

function lineSignColor(type?: "added" | "removed" | "unchanged"): string {
    if (type === "added") return "#22cc99";
    if (type === "removed") return "#ef4444";
    return "transparent";
}

const LineNumber = styled.span<{ $type?: "added" | "removed" | "unchanged" }>`
    flex-shrink: 0;
    width: 40px;
    padding: 0 8px;
    text-align: right;
    font-size: 10px;
    color: ${({ $type }) => lineNumColor($type)};
    user-select: none;
    border-right: 1px solid var(--border-color);
    line-height: 1.8;
    background: rgba(0, 0, 0, 0.04);
`;

const LineSign = styled.span<{ $type?: "added" | "removed" | "unchanged" }>`
    flex-shrink: 0;
    width: 18px;
    text-align: center;
    font-size: 11px;
    color: ${({ $type }) => lineSignColor($type)};
    user-select: none;
    line-height: 1.8;
`;

const LineContent = styled.span`
    flex: 1;
    padding: 0 8px;
    white-space: pre-wrap;
    word-break: break-all;
    line-height: 1.8;
    color: var(--text-primary);
`;

/* ─── Merge bar ──────────────────────────────── */

const MergeBarWrap = styled.div`
    position: absolute;
    z-index: 0;
    left: 50%;
    transform: translateX(-50%);
    width: min(720px, calc(100vw - 32px));
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
    padding: 12px 20px;
    background: var(--bg-surface);
    border: 1px solid var(--border-color);
    border-radius: var(--radius-panel);
    box-shadow:
        0 6px 28px rgba(0, 0, 0, 0.22),
        0 1px 6px rgba(0, 0, 0, 0.12);
    backdrop-filter: blur(10px);
`;

const HunkPreview = styled.div`
    width: 100%;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 6px;
    max-height: 120px;
    overflow: hidden;
`;

const HunkPreviewPanel = styled.div<{ $side: "left" | "right" }>`
    background: ${({ $side }) => ($side === "left" ? "rgba(239,68,68,0.08)" : "rgba(34,204,153,0.08)")};
    border: 1px solid ${({ $side }) => ($side === "left" ? "rgba(239,68,68,0.25)" : "rgba(34,204,153,0.25)")};
    border-radius: 5px;
    padding: 6px 8px;
    overflow: hidden;
`;

const HunkPreviewLine = styled.div<{ $side: "left" | "right" }>`
    font-family: var(--font-mono);
    font-size: 10px;
    line-height: 1.6;
    color: ${({ $side }) => ($side === "left" ? "#fca5a5" : "#6ee7b7")};
    white-space: pre;
    overflow: hidden;
    text-overflow: ellipsis;
`;

const HunkPreviewEmpty = styled.div`
    font-family: var(--font-mono);
    font-size: 10px;
    color: var(--text-secondary);
    opacity: 0.5;
    font-style: italic;
`;

const MergeNavRow = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
    width: 100%;
    justify-content: center;
`;

const MergeLabel = styled.span`
    font-family: var(--font-mono);
    font-size: 11px;
    font-weight: 600;
    color: var(--text-secondary);
    min-width: 100px;
    text-align: center;
`;

const NavBtn = styled.button`
    display: inline-flex;
    align-items: center;
    gap: 5px;
    padding: 4px 10px;
    font-size: 11px;
    font-family: Inter, sans-serif;
    font-weight: 500;
    color: var(--text-secondary);
    background: transparent;
    border: 1px solid var(--border-color);
    border-radius: 6px;
    cursor: pointer;
    transition:
        color 0.15s,
        border-color 0.15s,
        background 0.15s;
    &:hover:not(:disabled) {
        color: var(--text-primary);
        border-color: rgba(34, 204, 153, 0.45);
        background: rgba(34, 204, 153, 0.06);
    }
    &:disabled {
        opacity: 0.35;
        cursor: default;
    }
`;

const DismissBtn = styled.button`
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 26px;
    height: 26px;
    font-size: 14px;
    color: var(--text-secondary);
    background: transparent;
    border: 1px solid var(--border-color);
    border-radius: 50%;
    cursor: pointer;
    transition:
        color 0.15s,
        border-color 0.15s,
        background 0.15s;
    &:hover {
        color: var(--text-primary);
        border-color: rgba(239, 68, 68, 0.45);
        background: rgba(239, 68, 68, 0.08);
    }
`;

const MergeActionsRow = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
    width: 100%;
    justify-content: center;
`;

const MergeBtn = styled.button<{ $side: "left" | "right" }>`
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 7px 18px;
    font-size: 12px;
    font-family: Inter, sans-serif;
    font-weight: 600;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.15s ease;
    border: 1.5px solid ${({ $side }) => ($side === "left" ? "rgba(239,68,68,0.5)" : "rgba(34,204,153,0.5)")};
    color: ${({ $side }) => ($side === "left" ? "#ef4444" : "#22cc99")};
    background: ${({ $side }) => ($side === "left" ? "rgba(239,68,68,0.08)" : "rgba(34,204,153,0.08)")};

    &:hover {
        background: ${({ $side }) => ($side === "left" ? "rgba(239,68,68,0.18)" : "rgba(34,204,153,0.18)")};
        border-color: ${({ $side }) => ($side === "left" ? "#ef4444" : "#22cc99")};
        transform: translateY(-1px);
        box-shadow: 0 3px 10px ${({ $side }) => ($side === "left" ? "rgba(239,68,68,0.2)" : "rgba(34,204,153,0.2)")};
    }
    &:active {
        transform: translateY(0);
    }
`;

const MergeDivider = styled.span`
    width: 1px;
    height: 24px;
    background: var(--border-color);
    flex-shrink: 0;
`;

/* ─── Inline word marks ──────────────────────── */

const InlineAdded = styled.mark`
    background: rgba(34, 204, 153, 0.3);
    color: var(--text-primary);
    border-radius: 2px;
    outline: 1px solid rgba(34, 204, 153, 0.45);
`;

const InlineRemoved = styled.mark`
    background: rgba(239, 68, 68, 0.2);
    color: #ef4444;
    text-decoration: line-through;
    border-radius: 2px;
    outline: 1px solid rgba(239, 68, 68, 0.35);
`;

/* ─── Unified diff ───────────────────────────── */

const UnifiedWrap = styled(Panel)`
    width: 100%;
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-bottom: 220px;
`;

const InlineDiffArea = styled.div`
    width: 100%;
    padding: 16px;
    font-family: var(--font-mono);
    font-size: 12px;
    line-height: 1.8;
    white-space: pre-wrap;
    word-break: break-word;
    overflow-x: auto;
`;

/* ─── URL modal ──────────────────────────────── */

const Overlay = styled.div`
    position: fixed;
    inset: 0;
    z-index: 100;
    background: rgba(0, 0, 0, 0.45);
    display: flex;
    align-items: center;
    justify-content: center;
    backdrop-filter: blur(2px);
`;

const ModalCard = styled.div`
    background: var(--bg-surface);
    border: 1px solid var(--border-color);
    border-radius: 12px;
    padding: 20px 24px;
    width: 420px;
    max-width: 95vw;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.28);
    display: flex;
    flex-direction: column;
    gap: 12px;
`;

const ModalTitle = styled.div`
    font-size: 13px;
    font-weight: 600;
    color: var(--text-primary);
`;

const ModalInput = styled.input`
    width: 100%;
    padding: 8px 12px;
    font-size: 12px;
    font-family: var(--font-mono);
    background: var(--bg-input);
    border: 1px solid var(--border-color);
    border-radius: 8px;
    color: var(--text-primary);
    outline: none;
    box-sizing: border-box;
    &:focus {
        border-color: rgba(34, 204, 153, 0.5);
        box-shadow: 0 0 0 2px rgba(34, 204, 153, 0.12);
    }
    &::placeholder {
        color: var(--text-secondary);
        opacity: 0.6;
    }
`;

const ModalError = styled.div`
    font-size: 11px;
    color: #ef4444;
    font-family: var(--font-mono);
`;

const ModalActions = styled.div`
    display: flex;
    justify-content: flex-end;
    gap: 8px;
`;

/* ─── Toolbar icon btn ───────────────────────── */

const IconBtn = styled.button`
    display: inline-flex;
    align-items: center;
    gap: 5px;
    padding: 3px 9px;
    font-size: 10px;
    font-family: Inter, sans-serif;
    font-weight: 500;
    color: var(--text-secondary);
    background: transparent;
    border: 1px solid var(--border-color);
    border-radius: 6px;
    cursor: pointer;
    white-space: nowrap;
    transition:
        color 0.15s,
        border-color 0.15s,
        background 0.15s;
    &:hover {
        color: var(--text-primary);
        border-color: rgba(34, 204, 153, 0.45);
        background: rgba(34, 204, 153, 0.06);
    }
`;

/* ─── Sample data ─────────────────────────────── */

const SAMPLE_ORIGINAL = JSON.stringify(
    {
        name: "devdeck-api",
        version: "1.2.0",
        description: "Backend API for DevDeck tooling platform",
        author: "DevDeck Team",
        license: "MIT",
        main: "src/index.js",
        scripts: {
            start: "node src/index.js",
            dev: "nodemon src/index.js",
            test: "jest --coverage",
            lint: "eslint src/**/*.js"
        },
        dependencies: {
            express: "^4.18.2",
            cors: "^2.8.5",
            dotenv: "^16.0.3",
            mongoose: "^7.0.0",
            jsonwebtoken: "^9.0.0",
            axios: "^1.3.4"
        },
        devDependencies: {
            jest: "^29.0.0",
            nodemon: "^2.0.22",
            eslint: "^8.36.0"
        },
        engines: {
            node: ">=18.0.0"
        },
        config: {
            port: 3000,
            rateLimit: 100,
            cacheTtl: 300,
            logLevel: "info",
            enableCors: true
        }
    },
    null,
    2
);

const SAMPLE_MODIFIED = JSON.stringify(
    {
        name: "devdeck-api",
        version: "2.0.0",
        description: "Backend API for DevDeck — developer utilities platform",
        author: "DevDeck Team",
        license: "Apache-2.0",
        main: "dist/index.js",
        scripts: {
            start: "node dist/index.js",
            dev: "tsx watch src/index.ts",
            build: "tsc --outDir dist",
            test: "vitest run --coverage",
            lint: "eslint src/**/*.ts",
            format: "prettier --write src"
        },
        dependencies: {
            express: "^4.18.2",
            cors: "^2.8.5",
            dotenv: "^16.3.1",
            mongoose: "^8.0.0",
            jsonwebtoken: "^9.0.0",
            axios: "^1.5.0",
            zod: "^3.22.0",
            pino: "^8.15.0"
        },
        devDependencies: {
            vitest: "^1.0.0",
            tsx: "^3.14.0",
            typescript: "^5.2.0",
            eslint: "^8.50.0",
            prettier: "^3.0.0"
        },
        engines: {
            node: ">=20.0.0"
        },
        config: {
            port: 8080,
            rateLimit: 200,
            cacheTtl: 600,
            logLevel: "warn",
            enableCors: true,
            enableMetrics: true
        }
    },
    null,
    2
);

/* ─── Helpers ────────────────────────────────── */

function buildLineDiff(original: string, modified: string): { lines: DiffLine[]; hunks: Hunk[] } {
    const changes = diffLines(original, modified);
    const lines: DiffLine[] = [];
    let leftLine = 1;
    let rightLine = 1;
    let hunkId = 0;
    let prevWasChanged = false;

    changes.forEach((change) => {
        const rawLines = change.value.split("\n");
        if (rawLines[rawLines.length - 1] === "") rawLines.pop();

        if (change.added || change.removed) {
            if (!prevWasChanged) hunkId += 1;
            prevWasChanged = true;
        } else {
            prevWasChanged = false;
        }

        if (change.added) {
            rawLines.forEach((l) => {
                lines.push({ type: "added", content: l, lineNumRight: rightLine, hunkId });
                rightLine += 1;
            });
        } else if (change.removed) {
            rawLines.forEach((l) => {
                lines.push({ type: "removed", content: l, lineNumLeft: leftLine, hunkId });
                leftLine += 1;
            });
        } else {
            rawLines.forEach((l) => {
                lines.push({ type: "unchanged", content: l, lineNumLeft: leftLine, lineNumRight: rightLine });
                leftLine += 1;
                rightLine += 1;
            });
        }
    });

    // Build hunks map
    const hunkMap = new Map<number, Hunk>();
    lines.forEach((line) => {
        if (line.hunkId == null) return;
        if (!hunkMap.has(line.hunkId)) {
            hunkMap.set(line.hunkId, { id: line.hunkId, removedLines: [], addedLines: [] });
        }
        const hunk = hunkMap.get(line.hunkId)!;
        if (line.type === "removed") hunk.removedLines.push(line);
        else if (line.type === "added") hunk.addedLines.push(line);
    });

    return { lines, hunks: Array.from(hunkMap.values()) };
}

function applyMergeRight(lines: DiffLine[], hunkId: number): string {
    return lines
        .filter((line) => {
            if (line.type === "unchanged") return true;
            if (line.type === "removed") return line.hunkId !== hunkId;
            if (line.type === "added") return line.hunkId === hunkId;
            return false;
        })
        .map((line) => line.content)
        .join("\n");
}

function applyMergeLeft(lines: DiffLine[], hunkId: number): string {
    return lines
        .filter((line) => {
            if (line.type === "unchanged") return true;
            if (line.type === "added") return line.hunkId !== hunkId;
            if (line.type === "removed") return line.hunkId === hunkId;
            return false;
        })
        .map((line) => line.content)
        .join("\n");
}

function buildInlineDiff(original: string, modified: string, mode: DiffMode) {
    if (mode === "lines") return diffLines(original, modified);
    if (mode === "chars") return diffChars(original, modified);
    return diffWords(original, modified);
}

function inlinePartPrefix(part: { added?: boolean; removed?: boolean }): string {
    if (part.added) return "a";
    if (part.removed) return "r";
    return "u";
}

function renderInlineParts(parts: ReturnType<typeof diffWords>) {
    return parts.map((part, i) => {
        const key = `${inlinePartPrefix(part)}-${i}`;
        if (part.added) return <InlineAdded key={key}>{part.value}</InlineAdded>;
        if (part.removed) return <InlineRemoved key={key}>{part.value}</InlineRemoved>;
        return <span key={key}>{part.value}</span>;
    });
}

/* ─── Split view helpers ─────────────────────── */

interface SplitRow {
    left: DiffLine | null;
    right: DiffLine | null;
    hunkId?: number;
}

function buildSplitRows(lines: DiffLine[]): SplitRow[] {
    const rows: SplitRow[] = [];
    let i = 0;
    while (i < lines.length) {
        const line = lines[i];
        if (line.type === "unchanged") {
            rows.push({ left: line, right: line });
            i += 1;
        } else {
            const { hunkId } = line;
            const removed: DiffLine[] = [];
            const added: DiffLine[] = [];
            while (i < lines.length && lines[i].hunkId === hunkId && lines[i].type !== "unchanged") {
                if (lines[i].type === "removed") removed.push(lines[i]);
                else added.push(lines[i]);
                i += 1;
            }
            const maxLen = Math.max(removed.length, added.length);
            Array.from({ length: maxLen }).forEach((_, j) => {
                rows.push({
                    left: removed[j] ?? null,
                    right: added[j] ?? null,
                    hunkId
                });
            });
        }
    }
    return rows;
}

/* ─── Split view renderer ────────────────────── */

interface SplitDiffViewProps {
    lines: DiffLine[];
    hunks: Hunk[];
    activeHunk: number | null;
    onHunkClick: (hunkId: number) => void;
    onDismiss: () => void;
    onPrev: () => void;
    onNext: () => void;
    onMergeLeft: (hunkId: number) => void;
    onMergeRight: (hunkId: number) => void;
}

function SplitDiffView({ lines, hunks, activeHunk, onHunkClick, onDismiss, onPrev, onNext, onMergeLeft, onMergeRight }: SplitDiffViewProps) {
    const splitRows = useMemo(() => buildSplitRows(lines), [lines]);
    const activeIdx = hunks.findIndex((h) => h.id === activeHunk);
    const wrapRef = useRef<HTMLDivElement>(null);
    const [barY, setBarY] = useState<number>(0);

    const handleHunkClick = useCallback(
        (e: React.MouseEvent, hid: number) => {
            if (wrapRef.current) {
                const rect = wrapRef.current.getBoundingClientRect();
                const wrapTop = rect.top + window.scrollY;
                const rawY = e.clientY + window.scrollY - wrapTop + 12;
                // clamp so bar stays inside SplitWrap (padding-bottom gives the space)
                const maxY = rect.height - 220 - 16;
                setBarY(Math.min(Math.max(0, rawY), maxY));
            }
            onHunkClick(hid);
        },
        [onHunkClick]
    );

    const renderLeft = (row: SplitRow, i: number) => {
        const line = row.left;
        const isBlank = line === null;
        const isActive = !isBlank && line!.hunkId === activeHunk;
        const hid = row.hunkId;
        const clickable = !isBlank && line!.type === "removed" && hid != null;
        let rowType: "added" | "removed" | "unchanged" = "unchanged";
        if (isBlank) rowType = "added";
        else if (line!.type === "removed") rowType = "removed";
        let signType: "added" | "removed" | "unchanged" = "unchanged";
        if (!isBlank && line!.type === "removed") signType = "removed";
        const key = `L-${hid ?? "u"}-${i}`;
        return (
            <LineRow
                key={key}
                $type={rowType}
                $active={isActive}
                $clickable={clickable}
                $blank={isBlank}
                onClick={clickable ? (e) => handleHunkClick(e, hid!) : undefined}
            >
                <LineNumber $type={rowType}>{isBlank ? " " : line!.lineNumLeft}</LineNumber>
                <LineSign $type={signType}>{!isBlank && line!.type === "removed" ? "−" : " "}</LineSign>
                <LineContent>{isBlank ? " " : line!.content}</LineContent>
            </LineRow>
        );
    };

    const renderRight = (row: SplitRow, i: number) => {
        const line = row.right;
        const isBlank = line === null;
        const isActive = !isBlank && line!.hunkId === activeHunk;
        const hid = row.hunkId;
        const clickable = !isBlank && line!.type === "added" && hid != null;
        let rowType: "added" | "removed" | "unchanged" = "unchanged";
        if (isBlank) rowType = "removed";
        else if (line!.type === "added") rowType = "added";
        let signType: "added" | "removed" | "unchanged" = "unchanged";
        if (!isBlank && line!.type === "added") signType = "added";
        const key = `R-${hid ?? "u"}-${i}`;
        return (
            <LineRow
                key={key}
                $type={rowType}
                $active={isActive}
                $clickable={clickable}
                $blank={isBlank}
                onClick={clickable ? (e) => handleHunkClick(e, hid!) : undefined}
            >
                <LineNumber $type={rowType}>{isBlank ? " " : line!.lineNumRight}</LineNumber>
                <LineSign $type={signType}>{!isBlank && line!.type === "added" ? "+" : " "}</LineSign>
                <LineContent>{isBlank ? " " : line!.content}</LineContent>
            </LineRow>
        );
    };

    return (
        <SplitWrap ref={wrapRef}>
            <SplitGrid>
                <DiffPanel>
                    <PanelHeader>
                        <PanelLabel style={{ fontSize: 11 }}>Original</PanelLabel>
                        <MetaText style={{ color: "#ef4444" }}>-{lines.filter((l) => l.type === "removed").length} lines</MetaText>
                    </PanelHeader>
                    <DiffScroll>{splitRows.map((row, i) => renderLeft(row, i))}</DiffScroll>
                </DiffPanel>

                <DiffPanel>
                    <PanelHeader>
                        <PanelLabel style={{ fontSize: 11 }}>Modified</PanelLabel>
                        <MetaText style={{ color: "#22cc99" }}>+{lines.filter((l) => l.type === "added").length} lines</MetaText>
                    </PanelHeader>
                    <DiffScroll>{splitRows.map((row, i) => renderRight(row, i))}</DiffScroll>
                </DiffPanel>
            </SplitGrid>

            {activeHunk !== null &&
                (() => {
                    const hunk = hunks.find((h) => h.id === activeHunk);
                    return (
                        <MergeBarWrap style={{ top: barY }}>
                            <MergeNavRow>
                                <NavBtn onClick={onPrev} disabled={activeIdx <= 0}>
                                    ↑ Prev
                                </NavBtn>
                                <MergeLabel>
                                    Change {activeIdx + 1} of {hunks.length}
                                </MergeLabel>
                                <NavBtn onClick={onNext} disabled={activeIdx >= hunks.length - 1}>
                                    Next ↓
                                </NavBtn>
                                <DismissBtn onClick={onDismiss} title="Dismiss">
                                    ×
                                </DismissBtn>
                            </MergeNavRow>

                            {hunk && (
                                <HunkPreview>
                                    <HunkPreviewPanel $side="left">
                                        {hunk.removedLines.length === 0 ? (
                                            <HunkPreviewEmpty>— deleted —</HunkPreviewEmpty>
                                        ) : (
                                            hunk.removedLines.slice(0, 6).map((l, i) => (
                                                <HunkPreviewLine key={l.lineNumLeft ?? l.lineNumRight ?? i} $side="left">
                                                    − {l.content}
                                                </HunkPreviewLine>
                                            ))
                                        )}
                                    </HunkPreviewPanel>
                                    <HunkPreviewPanel $side="right">
                                        {hunk.addedLines.length === 0 ? (
                                            <HunkPreviewEmpty>— deleted —</HunkPreviewEmpty>
                                        ) : (
                                            hunk.addedLines.slice(0, 6).map((l, i) => (
                                                <HunkPreviewLine key={l.lineNumRight ?? l.lineNumLeft ?? i} $side="right">
                                                    + {l.content}
                                                </HunkPreviewLine>
                                            ))
                                        )}
                                    </HunkPreviewPanel>
                                </HunkPreview>
                            )}

                            <MergeActionsRow>
                                <MergeBtn $side="left" onClick={() => onMergeLeft(activeHunk)}>
                                    ← Use original
                                </MergeBtn>
                                <MergeDivider />
                                <MergeBtn $side="right" onClick={() => onMergeRight(activeHunk)}>
                                    Use modified →
                                </MergeBtn>
                            </MergeActionsRow>
                        </MergeBarWrap>
                    );
                })()}
        </SplitWrap>
    );
}

/* ─── Unified view renderer ──────────────────── */

interface UnifiedDiffViewProps {
    lines: DiffLine[];
    hunks: Hunk[];
    activeHunk: number | null;
    onHunkClick: (hunkId: number) => void;
    onDismiss: () => void;
    onPrev: () => void;
    onNext: () => void;
    onMergeLeft: (hunkId: number) => void;
    onMergeRight: (hunkId: number) => void;
}

function UnifiedDiffView({ lines, hunks, activeHunk, onHunkClick, onDismiss, onPrev, onNext, onMergeLeft, onMergeRight }: UnifiedDiffViewProps) {
    const activeIdx = hunks.findIndex((h) => h.id === activeHunk);
    const wrapRef = useRef<HTMLDivElement>(null);
    const [barY, setBarY] = useState<number>(0);

    const handleLineClick = useCallback(
        (e: React.MouseEvent, hid: number) => {
            if (wrapRef.current) {
                const rect = wrapRef.current.getBoundingClientRect();
                const wrapTop = rect.top + window.scrollY;
                const rawY = e.clientY + window.scrollY - wrapTop + 12;
                const maxY = rect.height - 220 - 16;
                setBarY(Math.min(Math.max(0, rawY), maxY));
            }
            onHunkClick(hid);
        },
        [onHunkClick]
    );

    return (
        <UnifiedWrap ref={wrapRef}>
            <PanelHeader style={{ width: "100%" }}>
                <PanelLabel>Unified Diff</PanelLabel>
            </PanelHeader>
            <DiffScroll style={{ width: "100%" }}>
                {lines.map((line) => {
                    const isChanged = line.type !== "unchanged";
                    const hid = line.hunkId;
                    const isActive = isChanged && hid === activeHunk;
                    return (
                        <LineRow
                            key={`${line.lineNumLeft ?? ""}-${line.lineNumRight ?? ""}-${line.type}`}
                            $type={line.type}
                            $active={isActive}
                            $clickable={isChanged && hid != null}
                            onClick={isChanged && hid != null ? (e) => handleLineClick(e, hid!) : undefined}
                        >
                            <LineNumber $type={line.type === "removed" ? "removed" : "unchanged"} style={{ width: 32 }}>
                                {line.lineNumLeft ?? ""}
                            </LineNumber>
                            <LineNumber $type={line.type === "added" ? "added" : "unchanged"} style={{ width: 32 }}>
                                {line.lineNumRight ?? ""}
                            </LineNumber>
                            <LineSign $type={line.type}>
                                {(() => {
                                    if (line.type === "added") return "+";
                                    if (line.type === "removed") return "−";
                                    return "";
                                })()}
                            </LineSign>
                            <LineContent>{line.content}</LineContent>
                        </LineRow>
                    );
                })}
            </DiffScroll>

            {activeHunk !== null &&
                (() => {
                    const hunk = hunks.find((h) => h.id === activeHunk);
                    return (
                        <MergeBarWrap style={{ top: barY }}>
                            <MergeNavRow>
                                <NavBtn onClick={onPrev} disabled={activeIdx <= 0}>
                                    ↑ Prev
                                </NavBtn>
                                <MergeLabel>
                                    Change {activeIdx + 1} of {hunks.length}
                                </MergeLabel>
                                <NavBtn onClick={onNext} disabled={activeIdx >= hunks.length - 1}>
                                    Next ↓
                                </NavBtn>
                                <DismissBtn onClick={onDismiss} title="Dismiss">
                                    ×
                                </DismissBtn>
                            </MergeNavRow>

                            {hunk && (
                                <HunkPreview>
                                    <HunkPreviewPanel $side="left">
                                        {hunk.removedLines.length === 0 ? (
                                            <HunkPreviewEmpty>— deleted —</HunkPreviewEmpty>
                                        ) : (
                                            hunk.removedLines.slice(0, 6).map((l, i) => (
                                                <HunkPreviewLine key={l.lineNumLeft ?? l.lineNumRight ?? i} $side="left">
                                                    − {l.content}
                                                </HunkPreviewLine>
                                            ))
                                        )}
                                    </HunkPreviewPanel>
                                    <HunkPreviewPanel $side="right">
                                        {hunk.addedLines.length === 0 ? (
                                            <HunkPreviewEmpty>— deleted —</HunkPreviewEmpty>
                                        ) : (
                                            hunk.addedLines.slice(0, 6).map((l, i) => (
                                                <HunkPreviewLine key={l.lineNumRight ?? l.lineNumLeft ?? i} $side="right">
                                                    + {l.content}
                                                </HunkPreviewLine>
                                            ))
                                        )}
                                    </HunkPreviewPanel>
                                </HunkPreview>
                            )}

                            <MergeActionsRow>
                                <MergeBtn $side="left" onClick={() => onMergeLeft(activeHunk)}>
                                    ← Use original
                                </MergeBtn>
                                <MergeDivider />
                                <MergeBtn $side="right" onClick={() => onMergeRight(activeHunk)}>
                                    Use modified →
                                </MergeBtn>
                            </MergeActionsRow>
                        </MergeBarWrap>
                    );
                })()}
        </UnifiedWrap>
    );
}

/* ─── Main component ─────────────────────────── */

export default function TextDiff() {
    const [original, setOriginal] = useState("");
    const [modified, setModified] = useState("");
    const [diffMode, setDiffMode] = useState<DiffMode>("lines");
    const [viewMode, setViewMode] = useState<ViewMode>("split");
    const [activeHunk, setActiveHunk] = useState<number | null>(null);
    const { copied: patchCopied, copy: copyPatch } = useCopyWithAnimation();
    const { copied: diffCopied, copy: copyDiff } = useCopyWithAnimation();

    // Upload refs
    const uploadOrigRef = useRef<HTMLInputElement>(null);
    const uploadModRef = useRef<HTMLInputElement>(null);

    // URL modal state
    const [urlModal, setUrlModal] = useState<"original" | "modified" | null>(null);
    const [urlValue, setUrlValue] = useState("");
    const [urlLoading, setUrlLoading] = useState(false);
    const [urlError, setUrlError] = useState("");

    const { lines: lineDiff, hunks } = useMemo(() => {
        if (!original && !modified) return { lines: [], hunks: [] };
        return buildLineDiff(original, modified);
    }, [original, modified]);

    const inlineParts = useMemo(() => {
        if (!original && !modified) return [];
        return buildInlineDiff(original, modified, diffMode);
    }, [original, modified, diffMode]);

    const stats = useMemo(() => {
        const added = lineDiff.filter((l) => l.type === "added").length;
        const removed = lineDiff.filter((l) => l.type === "removed").length;
        const unchanged = lineDiff.filter((l) => l.type === "unchanged").length;
        const total = added + removed + unchanged;
        const similarity = total === 0 ? 100 : Math.round((unchanged / total) * 100);
        return { added, removed, unchanged, similarity };
    }, [lineDiff]);

    const hasContent = original || modified;
    const hasDiff = lineDiff.some((l) => l.type !== "unchanged");

    const handleHunkClick = useCallback((hunkId: number) => {
        setActiveHunk((prev) => (prev === hunkId ? null : hunkId));
    }, []);

    const handlePrev = useCallback(() => {
        const idx = hunks.findIndex((h) => h.id === activeHunk);
        if (idx > 0) setActiveHunk(hunks[idx - 1].id);
    }, [hunks, activeHunk]);

    const handleNext = useCallback(() => {
        const idx = hunks.findIndex((h) => h.id === activeHunk);
        if (idx < hunks.length - 1) setActiveHunk(hunks[idx + 1].id);
    }, [hunks, activeHunk]);

    const handleMergeRight = useCallback(
        (hunkId: number) => {
            setOriginal(applyMergeRight(lineDiff, hunkId));
            // advance to next hunk, or close if last
            const idx = hunks.findIndex((h) => h.id === hunkId);
            setActiveHunk(idx < hunks.length - 1 ? hunks[idx + 1].id : null);
        },
        [lineDiff, hunks]
    );

    const handleMergeLeft = useCallback(
        (hunkId: number) => {
            setModified(applyMergeLeft(lineDiff, hunkId));
            // advance to next hunk, or close if last
            const idx = hunks.findIndex((h) => h.id === hunkId);
            setActiveHunk(idx < hunks.length - 1 ? hunks[idx + 1].id : null);
        },
        [lineDiff, hunks]
    );

    const handleSwap = useCallback(() => {
        setOriginal(modified);
        setModified(original);
        setActiveHunk(null);
    }, [original, modified]);

    const handleCopyPatch = useCallback(() => {
        const patch = createPatch("file", original, modified, "Original", "Modified");
        copyPatch(patch);
    }, [original, modified, copyPatch]);

    const handleCopyDiff = useCallback(() => {
        const text = lineDiff
            .filter((l) => l.type !== "unchanged")
            .map((l) => `${l.type === "added" ? "+" : "-"} ${l.content}`)
            .join("\n");
        copyDiff(text);
    }, [lineDiff, copyDiff]);

    const tryPrettify = useCallback((text: string): string => {
        const trimmed = text.trim();
        if ((trimmed.startsWith("{") || trimmed.startsWith("[")) && trimmed.length > 0) {
            try {
                return JSON.stringify(JSON.parse(trimmed), null, 2);
            } catch {
                /* not valid JSON */
            }
        }
        return text;
    }, []);

    const handlePrettify = useCallback(() => {
        setOriginal((v) => tryPrettify(v));
        setModified((v) => tryPrettify(v));
    }, [tryPrettify]);

    const handleLoadSample = useCallback(() => {
        setOriginal(SAMPLE_ORIGINAL);
        setModified(SAMPLE_MODIFIED);
        setActiveHunk(null);
    }, []);

    const handleFileUpload = useCallback(
        (side: "original" | "modified") => (e: React.ChangeEvent<HTMLInputElement>) => {
            const file = e.target.files?.[0];
            if (!file) return;
            const reader = new FileReader();
            reader.onload = (ev) => {
                const text = ev.target?.result as string;
                const pretty = tryPrettify(text);
                if (side === "original") setOriginal(pretty);
                else setModified(pretty);
            };
            reader.readAsText(file);
            e.target.value = "";
        },
        [tryPrettify]
    );

    const openUrlModal = useCallback((side: "original" | "modified") => {
        setUrlValue("");
        setUrlError("");
        setUrlModal(side);
    }, []);

    const handleLoadUrl = useCallback(async () => {
        if (!urlValue.trim()) return;
        setUrlLoading(true);
        setUrlError("");
        try {
            const res = await fetch(urlValue.trim());
            if (!res.ok) throw new Error(`HTTP ${res.status}`);
            const text = await res.text();
            const pretty = tryPrettify(text);
            if (urlModal === "original") setOriginal(pretty);
            else setModified(pretty);
            setUrlModal(null);
        } catch (err: unknown) {
            setUrlError(err instanceof Error ? err.message : "Failed to fetch URL");
        } finally {
            setUrlLoading(false);
        }
    }, [urlValue, urlModal, tryPrettify]);

    return (
        <ToolWrap>
            {/* Top toolbar */}
            <ControlsRow>
                <ControlGroup>
                    <IconBtn onClick={handleLoadSample}>⚡ Load Sample</IconBtn>
                </ControlGroup>
            </ControlsRow>

            {/* Input panels */}
            <ToolLayout style={{ marginTop: 0 }}>
                <Panel>
                    <PanelHeader>
                        <PanelLabel>{L.originalLabel}</PanelLabel>
                        <ControlGroup style={{ gap: 6 }}>
                            {original && <MetaText>{original.length.toLocaleString()} chars</MetaText>}
                            {original && <IconBtn onClick={() => setOriginal(tryPrettify(original))}>{"{ }"} Prettify</IconBtn>}
                            <IconBtn onClick={() => uploadOrigRef.current?.click()}>↑ Upload</IconBtn>
                            <IconBtn onClick={() => openUrlModal("original")}>⊕ URL</IconBtn>
                        </ControlGroup>
                    </PanelHeader>
                    <SmartEditor
                        value={original}
                        onChange={setOriginal}
                        placeholder={L.originalPlaceholder}
                        language="text"
                        autoFocus
                        minHeight="400px"
                        maxHeight="400px"
                    />
                </Panel>

                <Panel>
                    <PanelHeader>
                        <PanelLabel>{L.modifiedLabel}</PanelLabel>
                        <ControlGroup style={{ gap: 6 }}>
                            {modified && <MetaText>{modified.length.toLocaleString()} chars</MetaText>}
                            {modified && <IconBtn onClick={() => setModified(tryPrettify(modified))}>{"{ }"} Prettify</IconBtn>}
                            <IconBtn onClick={() => uploadModRef.current?.click()}>↑ Upload</IconBtn>
                            <IconBtn onClick={() => openUrlModal("modified")}>⊕ URL</IconBtn>
                        </ControlGroup>
                    </PanelHeader>
                    <SmartEditor
                        value={modified}
                        onChange={setModified}
                        placeholder={L.modifiedPlaceholder}
                        language="text"
                        minHeight="400px"
                        maxHeight="400px"
                    />
                </Panel>
            </ToolLayout>

            {/* Controls */}
            {hasContent && (
                <ControlsRow>
                    <ControlGroup>
                        <ModeToggle style={{ padding: "2px", gap: "1px" }}>
                            <ModeBtn
                                $active={viewMode === "split"}
                                onClick={() => setViewMode("split")}
                                style={{ padding: "5px 12px", fontSize: "11px" }}
                            >
                                Split
                            </ModeBtn>
                            <ModeBtn
                                $active={viewMode === "unified"}
                                onClick={() => setViewMode("unified")}
                                style={{ padding: "5px 12px", fontSize: "11px" }}
                            >
                                Unified
                            </ModeBtn>
                            <ModeBtn
                                $active={viewMode === "inline"}
                                onClick={() => setViewMode("inline")}
                                style={{ padding: "5px 12px", fontSize: "11px" }}
                            >
                                Inline
                            </ModeBtn>
                        </ModeToggle>

                        {viewMode === "inline" && (
                            <ModeToggle style={{ padding: "2px", gap: "1px" }}>
                                {MODES.map(({ id, label }) => (
                                    <ModeBtn
                                        key={id}
                                        $active={diffMode === id}
                                        onClick={() => setDiffMode(id)}
                                        style={{ padding: "5px 10px", fontSize: "11px" }}
                                    >
                                        {label}
                                    </ModeBtn>
                                ))}
                            </ModeToggle>
                        )}
                    </ControlGroup>

                    <ControlGroup>
                        <ActionBtn onClick={handlePrettify}>{"{ }"} Prettify</ActionBtn>
                        <ActionBtn onClick={handleSwap}>⇄ Swap</ActionBtn>
                        {hasDiff && (
                            <>
                                <ActionBtn onClick={handleCopyDiff}>{diffCopied ? "Copied!" : "Copy Diff"}</ActionBtn>
                                <ActionBtn onClick={handleCopyPatch}>{patchCopied ? "Copied!" : "Copy Patch"}</ActionBtn>
                            </>
                        )}
                        <ActionBtn
                            $danger
                            onClick={() => {
                                setOriginal("");
                                setModified("");
                                setActiveHunk(null);
                            }}
                        >
                            {L.clearAllBtn}
                        </ActionBtn>
                    </ControlGroup>
                </ControlsRow>
            )}

            {/* Stats bar */}
            {hasContent && (
                <StatsBar>
                    <StatChip $color="#22cc99">+{stats.added} added</StatChip>
                    <StatChip $color="#ef4444">−{stats.removed} removed</StatChip>
                    <StatChip $color="var(--text-secondary)">{stats.unchanged} unchanged</StatChip>
                    {!hasDiff && <StatChip $color="#22cc99">✓ Identical</StatChip>}
                    {hasDiff && hunks.length > 0 && (
                        <StatChip $color="var(--text-secondary)">
                            {hunks.length} {hunks.length === 1 ? "hunk" : "hunks"}
                        </StatChip>
                    )}
                    <MatchBadge>{stats.similarity}% similar</MatchBadge>
                </StatsBar>
            )}

            {/* Diff output */}
            {hasContent && lineDiff.length > 0 && (
                <>
                    {viewMode === "split" && (
                        <SplitDiffView
                            lines={lineDiff}
                            hunks={hunks}
                            activeHunk={activeHunk}
                            onHunkClick={handleHunkClick}
                            onDismiss={() => setActiveHunk(null)}
                            onPrev={handlePrev}
                            onNext={handleNext}
                            onMergeLeft={handleMergeLeft}
                            onMergeRight={handleMergeRight}
                        />
                    )}
                    {viewMode === "unified" && (
                        <UnifiedDiffView
                            lines={lineDiff}
                            hunks={hunks}
                            activeHunk={activeHunk}
                            onHunkClick={handleHunkClick}
                            onDismiss={() => setActiveHunk(null)}
                            onPrev={handlePrev}
                            onNext={handleNext}
                            onMergeLeft={handleMergeLeft}
                            onMergeRight={handleMergeRight}
                        />
                    )}
                    {viewMode === "inline" && (
                        <Panel>
                            <PanelHeader>
                                <PanelLabel>Inline Diff</PanelLabel>
                                <MetaText>
                                    <span style={{ color: "#22cc99" }}>
                                        +{inlineParts.filter((p) => p.added).reduce((n, p) => n + (p.count ?? 0), 0)}
                                    </span>
                                    {" / "}
                                    <span style={{ color: "#ef4444" }}>
                                        -{inlineParts.filter((p) => p.removed).reduce((n, p) => n + (p.count ?? 0), 0)}
                                    </span>{" "}
                                    {diffMode}
                                </MetaText>
                            </PanelHeader>
                            <InlineDiffArea>{renderInlineParts(inlineParts)}</InlineDiffArea>
                        </Panel>
                    )}
                </>
            )}

            {!hasContent && (
                <Panel>
                    <EmptyState>
                        <span style={{ fontSize: 12, fontFamily: "Inter, sans-serif" }}>{L.emptyStateMessage}</span>
                    </EmptyState>
                </Panel>
            )}

            {/* Hidden file inputs */}
            <input
                ref={uploadOrigRef}
                type="file"
                accept=".json,.txt,.yaml,.yml,.toml,.csv,.md,.xml,.js,.ts,.css,.html,.env"
                style={{ display: "none" }}
                onChange={handleFileUpload("original")}
            />
            <input
                ref={uploadModRef}
                type="file"
                accept=".json,.txt,.yaml,.yml,.toml,.csv,.md,.xml,.js,.ts,.css,.html,.env"
                style={{ display: "none" }}
                onChange={handleFileUpload("modified")}
            />

            {/* URL modal */}
            {urlModal !== null && (
                <Overlay onClick={() => setUrlModal(null)}>
                    <ModalCard onClick={(e) => e.stopPropagation()}>
                        <ModalTitle>Load from URL — {urlModal === "original" ? "Original" : "Modified"}</ModalTitle>
                        <ModalInput
                            autoFocus
                            placeholder="https://example.com/data.json"
                            value={urlValue}
                            onChange={(e) => setUrlValue(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === "Enter") handleLoadUrl();
                                if (e.key === "Escape") setUrlModal(null);
                            }}
                        />
                        {urlError && <ModalError>Error: {urlError}</ModalError>}
                        <ModalActions>
                            <ActionBtn onClick={() => setUrlModal(null)}>Cancel</ActionBtn>
                            <ActionBtn onClick={handleLoadUrl} disabled={urlLoading || !urlValue.trim()}>
                                {urlLoading ? "Loading…" : "Load"}
                            </ActionBtn>
                        </ModalActions>
                    </ModalCard>
                </Overlay>
            )}
        </ToolWrap>
    );
}
