import { Check, ContentCopy, Download } from "@mui/icons-material";
import localization from "localization";
import Papa from "papaparse";
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
    TabBtn,
    TabStrip,
    ToolLayout
} from "components/Shared/ToolKit";
import { SmartEditor } from "components/Shared/SmartEditor";
import SendToButton from "components/Shared/SendToButton";

const { csvToJson: L, common: C } = localization;

const PREVIEW_LIMIT = 50;

const ToggleRow = styled.div`
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 8px 16px;
    border-bottom: 1px solid var(--border-color);
`;

const ToggleLabel = styled.label`
    display: flex;
    align-items: center;
    gap: 8px;
    cursor: pointer;
    font-size: 11px;
    font-weight: 600;
    font-family: "Inter", sans-serif;
    color: var(--text-secondary);
    text-transform: uppercase;
    letter-spacing: 0.08em;
    user-select: none;
`;

const ToggleSwitch = styled.input.attrs({ type: "checkbox" })`
    appearance: none;
    width: 28px;
    height: 16px;
    border-radius: 8px;
    background: ${(p) => (p.checked ? "#22cc99" : "var(--border-color)")};
    cursor: pointer;
    position: relative;
    transition: background 0.2s;
    flex-shrink: 0;
    &::after {
        content: "";
        position: absolute;
        width: 10px;
        height: 10px;
        border-radius: 50%;
        background: #fff;
        top: 3px;
        left: ${(p) => (p.checked ? "15px" : "3px")};
        transition: left 0.2s;
    }
`;

const TableWrap = styled.div`
    flex: 1;
    overflow: auto;
    min-height: 200px;
    min-width: 0;
`;

const StyledTable = styled.table`
    width: 100%;
    border-collapse: collapse;
    font-family: var(--font-mono);
    font-size: 11px;
`;

const Th = styled.th`
    position: sticky;
    top: 0;
    background: var(--bg-surface);
    color: #22cc99;
    font-weight: 600;
    font-family: "Inter", sans-serif;
    font-size: 10px;
    text-transform: uppercase;
    letter-spacing: 0.06em;
    padding: 8px 12px;
    text-align: left;
    border-bottom: 2px solid var(--border-color);
    white-space: nowrap;
`;

const Td = styled.td`
    padding: 6px 12px;
    color: var(--text-primary);
    border-bottom: 1px solid var(--border-color);
    white-space: nowrap;
    max-width: 240px;
    overflow: hidden;
    text-overflow: ellipsis;
    &:first-child {
        color: var(--text-secondary);
        font-size: 10px;
    }
`;

const Tr = styled.tr`
    &:nth-child(even) {
        background: rgba(255, 255, 255, 0.02);
    }
    &:hover {
        background: rgba(34, 204, 153, 0.04);
    }
`;

const BtnGroup = styled(ActionBtnGroup)`
    margin-left: auto;
`;

export default function CSVToJSON() {
    const [csv, setCsv] = useState("");
    const [hasHeader, setHasHeader] = useState(true);
    const [trimValues, setTrimValues] = useState(false);
    const [tab, setTab] = useState("table");
    const [copied, setCopied] = useState(false);

    const { rows, columns, json, error, total } = useMemo(() => {
        if (!csv.trim()) return { rows: [], columns: [], json: "", error: "", total: 0 };
        try {
            const result = Papa.parse(csv.trim(), {
                header: hasHeader,
                skipEmptyLines: true,
                transform: trimValues ? (v: string) => v.trim() : undefined,
                transformHeader: trimValues ? (h: string) => h.trim() : undefined
            }) as Papa.ParseResult<Record<string, unknown>>;
            if (result.errors.length) {
                return { rows: [], columns: [], json: "", error: result.errors[0].message, total: 0 };
            }
            const { data } = result;
            const cols = data.length ? Object.keys(data[0] as Record<string, unknown>) : [];
            return {
                rows: data.slice(0, PREVIEW_LIMIT),
                columns: cols,
                json: JSON.stringify(data, null, 2),
                error: "",
                total: data.length
            };
        } catch (e) {
            const errorMessage = e instanceof Error ? e.message : String(e);
            return { rows: [], columns: [], json: "", error: errorMessage, total: 0 };
        }
    }, [csv, hasHeader, trimValues]);

    const handleCopy = useCallback(() => {
        if (!json || !window?.navigator?.clipboard) return;
        window.navigator.clipboard.writeText(json).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 1500);
        });
    }, [json]);

    const handleDownload = useCallback(() => {
        if (!json) return;
        const blob = new Blob([json], { type: "application/json" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "output.json";
        a.click();
        URL.revokeObjectURL(url);
    }, [json]);

    const hasOutput = rows.length > 0 || json;

    return (
        <ToolLayout>
            <Panel>
                <PanelHeader>
                    <PanelLabel>{L.csvInputLabel}</PanelLabel>
                    {csv && <MetaText>{csv.length.toLocaleString()} chars</MetaText>}
                </PanelHeader>
                <ToggleRow>
                    <ToggleLabel>
                        <ToggleSwitch checked={hasHeader} onChange={(e) => setHasHeader(e.target.checked)} />
                        {L.firstRowHeaderLabel}
                    </ToggleLabel>
                    <ToggleLabel style={{ marginLeft: 12 }}>
                        <ToggleSwitch checked={trimValues} onChange={(e) => setTrimValues(e.target.checked)} />
                        Ignore whitespace
                    </ToggleLabel>
                </ToggleRow>
                <SmartEditor
                    value={csv}
                    onChange={setCsv}
                    placeholder={"name,age,city\nAlice,30,New York\nBob,25,London"}
                    language="text"
                    autoFocus
                    minHeight="360px"
                />
                {csv && (
                    <ActionBar>
                        <ActionBtnGroup>
                            <ActionBtn $danger onClick={() => setCsv("")}>
                                {C.clearBtn}
                            </ActionBtn>
                        </ActionBtnGroup>
                    </ActionBar>
                )}
            </Panel>

            <Panel>
                <TabStrip>
                    <TabBtn $active={tab === "table"} onClick={() => setTab("table")}>
                        {L.tableTabLabel}
                    </TabBtn>
                    <TabBtn $active={tab === "json"} onClick={() => setTab("json")}>
                        {L.jsonTabLabel}
                    </TabBtn>
                    {total > 0 && (
                        <MetaText style={{ marginLeft: "auto", paddingRight: 16, alignSelf: "center" }}>
                            {total > PREVIEW_LIMIT ? `${PREVIEW_LIMIT} of ${total} rows` : `${total} row${total !== 1 ? "s" : ""}`}
                        </MetaText>
                    )}
                </TabStrip>

                {hasOutput ? (
                    <>
                        {tab === "table" ? (
                            <TableWrap>
                                <StyledTable>
                                    <thead>
                                        <tr>
                                            <Th>#</Th>
                                            {columns.map((col) => (
                                                <Th key={col}>{col}</Th>
                                            ))}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {rows.map((row: Record<string, unknown>, i: number) => (
                                            // eslint-disable-next-line react/no-array-index-key
                                            <Tr key={i}>
                                                <Td>{i + 1}</Td>
                                                {columns.map((col: string) => (
                                                    <Td key={col} title={String(row[col] ?? "")}>
                                                        {String(row[col] ?? "")}
                                                    </Td>
                                                ))}
                                            </Tr>
                                        ))}
                                    </tbody>
                                </StyledTable>
                            </TableWrap>
                        ) : (
                            <SmartEditor value={json} readOnly language="json" style={{ flex: 1 }} minHeight="320px" />
                        )}
                        <ActionBar>
                            <BtnGroup>
                                <ActionBtn $success={copied} onClick={handleCopy}>
                                    {copied ? <Check style={{ fontSize: 11 }} /> : <ContentCopy style={{ fontSize: 11 }} />}
                                    {copied ? C.copiedLabel : L.copyJsonBtn}
                                </ActionBtn>
                                <ActionBtn onClick={handleDownload}>
                                    <Download style={{ fontSize: 11 }} />
                                    {L.downloadBtn}
                                </ActionBtn>
                                <SendToButton value={json} targets={[{ label: "JSON Viewer", route: "/json-viewer", icon: undefined }]} />
                            </BtnGroup>
                        </ActionBar>
                    </>
                ) : (
                    <EmptyState>
                        {error ? (
                            <span style={{ fontSize: 11, fontFamily: "Inter, sans-serif", color: "#ef4444" }}>{error}</span>
                        ) : (
                            <>
                                <span style={{ fontSize: 22, fontFamily: "var(--font-mono)" }}>[ ]</span>
                                <span style={{ fontSize: 12, fontFamily: "Inter, sans-serif" }}>{L.emptyStateMessage}</span>
                            </>
                        )}
                    </EmptyState>
                )}
            </Panel>
        </ToolLayout>
    );
}
