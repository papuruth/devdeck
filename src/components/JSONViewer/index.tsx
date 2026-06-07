"use client";

import dynamic from "next/dynamic";
import Ajv from "ajv";
import ReactJsonView from "@microlink/react-json-view";
import HistoryDropdown from "components/Shared/HistoryDropdown";
import localization from "localization";
import React, { useContext, useEffect, useMemo, useState } from "react";
import styled, { keyframes } from "styled-components";
import { ActionBar, ActionBtn, ActionBtnGroup, EmptyState, Panel, PanelHeader, PanelLabel, TabBtn, TabStrip } from "components/Shared/ToolKit";
import { SmartEditor } from "components/Shared/SmartEditor";
import { useToolHistory } from "utils/hooks/useToolHistory.hooks";
import { useToolChain } from "context/ToolChainContext";
import ColorModeContext from "../../context/ColorModeContext";

const LoadJSONModal = dynamic(() => import("./components/LoadJSONModal"), { ssr: false });
const Editor = dynamic(() => import("./components/Editor"), { ssr: false });

const fadeInDown = keyframes`
    from {
        opacity: 0;
        transform: translateY(-4px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
`;

const LIGHT_THEME = {
    base00: "rgba(0,0,0,0)",
    base01: "rgb(245,245,245)",
    base02: "rgb(235,235,235)",
    base03: "#6b7280",
    base04: "rgba(0,0,0,0.65)",
    base05: "#374151",
    base06: "#1f2937",
    base07: "#111827",
    base08: "#d33682",
    base09: "#c2410c",
    base0A: "#b45309",
    base0B: "#16a34a",
    base0C: "#6c71c4",
    base0D: "#374151",
    base0E: "#2aa198",
    base0F: "#268bd2"
};

const { jsonViewer: L } = localization;

function filterJsonByQuery(obj: any, query: string): any {
    if (!query) return obj;
    const q = query.toLowerCase();
    function walk(val: any): any {
        if (val === null || val === undefined) return val;
        if (typeof val === "string") return val.toLowerCase().includes(q) ? val : undefined;
        if (typeof val === "number" || typeof val === "boolean") return String(val).toLowerCase().includes(q) ? val : undefined;
        if (Array.isArray(val)) {
            const filtered = val.map((item: any) => walk(item)).filter((v: any) => v !== undefined);
            return filtered.length ? filtered : undefined;
        }
        if (typeof val === "object") {
            const out: Record<string, any> = {};
            Object.entries(val).forEach(([k, v]: [string, any]) => {
                if (k.toLowerCase().includes(q)) {
                    out[k] = v;
                    return;
                }
                const child = walk(v);
                if (child !== undefined) out[k] = child;
            });
            return Object.keys(out).length ? out : undefined;
        }
        return undefined;
    }
    const result = walk(obj);
    return result !== undefined ? result : null;
}

const ToolWrap = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0;
    width: 100%;
    flex: 1;
`;

const ViewerControls = styled.div`
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 10px 16px;
    border-bottom: 1px solid var(--border-color);
    flex-wrap: wrap;
`;

const SearchInput = styled.input`
    flex: 1;
    min-width: 160px;
    max-width: 280px;
    background: var(--bg-input);
    border: 1px solid var(--border-color);
    border-radius: 4px;
    color: var(--text-primary);
    font-family: "Inter", sans-serif;
    font-size: 12px;
    padding: 5px 10px;
    outline: none;
    &:focus {
        border-color: #22cc99;
    }
    &::placeholder {
        color: var(--text-secondary);
    }
`;

const ViewerArea = styled.div`
    flex: 1;
    overflow: auto;
    padding: 16px;
    background: var(--bg-input);
    min-height: 320px;
`;

const NoMatch = styled.div`
    color: var(--text-secondary);
    font-family: var(--font-mono);
    font-size: 12px;
    opacity: 0.6;
`;

const ViewerBtnGroup = styled(ActionBtnGroup)`
    flex-shrink: 0;
`;

const SchemaContainer = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
    width: 100%;
    margin-top: 20px;
    ${({ theme }) => theme ? "" : "@media (max-width: 768px) { grid-template-columns: 1fr; }"}
`;

const SchemaPanelSection = styled.div`
    display: flex;
    flex-direction: column;
`;


const ValidationBadge = styled.div<{ $valid: boolean }>`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    padding: 30px 20px;
    border-radius: 8px;
    font-size: 16px;
    font-weight: 600;
    font-family: "Inter", sans-serif;
    animation: ${fadeInDown} 0.2s ease;
    color: ${(p) => (p.$valid ? "#22cc99" : "#ef4444")};
    background: ${(p) => (p.$valid ? "rgba(34,204,153,0.1)" : "rgba(239,68,68,0.06)")};
    border: 1px solid ${(p) => (p.$valid ? "rgba(34,204,153,0.3)" : "rgba(239,68,68,0.3)")};
`;

const ErrorList = styled.div`
    display: flex;
    flex-direction: column;
    gap: 8px;
    padding: 16px;
    flex: 1;
    overflow-y: auto;
`;

const ErrorItem = styled.div`
    padding: 10px 12px;
    border-radius: 4px;
    font-size: 11px;
    font-family: var(--font-mono);
    color: #ef4444;
    background: rgba(239, 68, 68, 0.06);
    border-left: 3px solid #ef4444;
    line-height: 1.5;
`;

const ErrorPath = styled.span`
    color: #fbbf24;
    font-weight: 600;
`;

const ParseErrorNote = styled.div`
    padding: 10px 16px;
    background: rgba(239, 68, 68, 0.06);
    border-bottom: 1px solid rgba(239, 68, 68, 0.3);
    color: #ef4444;
    font-size: 11px;
    font-family: var(--font-mono);
    border-radius: 4px 4px 0 0;
`;

const NoDataNote = styled.div`
    padding: 16px;
    color: var(--text-secondary);
    font-size: 12px;
    font-family: "Inter", sans-serif;
    opacity: 0.6;
`;

const SAMPLE_SCHEMA = {
    type: "object",
    properties: {
        name: { type: "string" },
        age: { type: "integer", minimum: 0 },
        email: { type: "string" }
    },
    required: ["name", "email"]
};

export default function JSONViewer() {
    const { mode } = useContext(ColorModeContext);
    const [tab, setTab] = useState("editor");
    const [jsonInput, setJSONInput] = useState("");
    const [showLinkModal, setShowLinkModal] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [collapsed, setCollapsed] = useState<number | boolean>(1);
    const [schemaInput, setSchemaInput] = useState(JSON.stringify(SAMPLE_SCHEMA, null, 2));
    const [validationResult, setValidationResult] = useState<{ valid: boolean; errors: any[] } | null>(null);
    const [schemaParseError, setSchemaParseError] = useState<string | null>(null);
    const { history: jsonHistory, addHistory: addJsonHistory, clearHistory: clearJsonHistory } = useToolHistory("json-viewer");
    const { consumeChain } = useToolChain();

    useEffect(() => {
        const chained = consumeChain("/json-viewer");
        if (chained) {
            const value = typeof chained === "string" ? chained : JSON.stringify(chained, null, 2);
            setJSONInput(value);
        }
    }, [consumeChain]);

    const handleJSONInput = (value: string): void => {
        setJSONInput(value);
        if (value.trim().length > 5) addJsonHistory(value.trim());
    };

    const handleEditorOperations = async (ctaId: string | string): Promise<void> => {
        switch (ctaId) {
            case "paste":
                try {
                    const t = await window.navigator.clipboard.readText();
                    if (t?.trim()) setJSONInput(t);
                } catch {
                    /* ignore */
                }
                break;
            case "copy":
                try {
                    await window.navigator.clipboard.writeText(jsonInput);
                } catch {
                    /* ignore */
                }
                break;
            case "format":
                try {
                    setJSONInput(JSON.stringify(JSON.parse(jsonInput), null, 4));
                } catch {
                    /* ignore */
                }
                break;
            case "clear":
                setJSONInput("");
                setSearchQuery("");
                break;
            case "removeWhitespace":
                try {
                    const o = JSON.parse(jsonInput);
                    if (o) setJSONInput(JSON.stringify(o));
                } catch {
                    /* ignore */
                }
                break;
            case "loadJSONData":
                setShowLinkModal(true);
                break;
            default:
                break;
        }
    };

    const handleModalLoad = (jsonString: string): void => {
        setJSONInput(jsonString);
        if (jsonString.trim().length > 5) addJsonHistory(jsonString.trim());
    }

    const parsedJson = useMemo(() => {
        if (!jsonInput) return null;
        try {
            return JSON.parse(jsonInput);
        } catch {
            return null;
        }
    }, [jsonInput]);

    const filteredJson = useMemo(() => filterJsonByQuery(parsedJson, searchQuery), [parsedJson, searchQuery]);

    const handleJsonMutation = ({ updated_src }: { updated_src: any }): void => {
        const formatted = JSON.stringify(updated_src, null, 4);
        setJSONInput(formatted);
        addJsonHistory(formatted);
    }

    const handleValidateSchema = () => {
        setSchemaParseError(null);
        setValidationResult(null);

        try {
            const { $schema: ignored, ...schema } = JSON.parse(schemaInput);
            const ajv = new Ajv({ allErrors: true, strict: false });
            const validate = ajv.compile(schema);

            try {
                const data = JSON.parse(jsonInput);
                const isValid = validate(data);
                setValidationResult({
                    valid: isValid,
                    errors: isValid ? [] : (validate.errors || [])
                });
            } catch (e) {
                setSchemaParseError(L.dataParseError);
            }
        } catch (e) {
            setSchemaParseError(L.schemaParseError);
        }
    };

    const handleLoadExample = () => {
        setSchemaInput(JSON.stringify(SAMPLE_SCHEMA, null, 2));
        setValidationResult(null);
        setSchemaParseError(null);
    };

    return (
        <ToolWrap>
            <TabStrip>
                <TabBtn $active={tab === "editor"} onClick={() => setTab("editor")}>
                    {L.editorTab}
                </TabBtn>
                <TabBtn $active={tab === "viewer"} onClick={() => setTab("viewer")} disabled={!jsonInput}>
                    {L.viewerTab}
                </TabBtn>
                <TabBtn $active={tab === "schema"} onClick={() => setTab("schema")}>
                    {L.schemaTab}
                </TabBtn>
            </TabStrip>

            {tab === "schema" ? (
                <SchemaContainer>
                    <SchemaPanelSection>
                        <Panel style={{ flex: 1, display: "flex", flexDirection: "column" }}>
                            <PanelHeader>
                                <PanelLabel>{L.jsonDataLabel}</PanelLabel>
                            </PanelHeader>
                            {jsonInput ? (
                                <SmartEditor value={jsonInput} readOnly language="json" minHeight="180px" />
                            ) : (
                                <NoDataNote>{L.noJsonDataNote}</NoDataNote>
                            )}
                        </Panel>
                    </SchemaPanelSection>

                    <SchemaPanelSection>
                        <Panel style={{ flex: 1, display: "flex", flexDirection: "column" }}>
                            <PanelHeader>
                                <PanelLabel>{L.schemaInputLabel}</PanelLabel>
                            </PanelHeader>
                            <SmartEditor
                                value={schemaInput}
                                onChange={(val) => {
                                    setSchemaInput(val);
                                    setValidationResult(null);
                                    setSchemaParseError(null);
                                }}
                                placeholder={L.schemaInputLabel}
                                language="json"
                                minHeight="180px"
                            />
                            <ActionBar>
                                <ActionBtnGroup>
                                    <ActionBtn onClick={handleValidateSchema}>{L.validateBtn}</ActionBtn>
                                    <ActionBtn onClick={handleLoadExample}>{L.loadExampleBtn}</ActionBtn>
                                </ActionBtnGroup>
                            </ActionBar>
                        </Panel>
                    </SchemaPanelSection>

                    <Panel style={{ gridColumn: "1 / -1", flex: 1, display: "flex", flexDirection: "column" }}>
                        <PanelHeader>
                            <PanelLabel>{L.validationResult}</PanelLabel>
                        </PanelHeader>
                        {schemaParseError && (
                            <>
                                <ParseErrorNote>{schemaParseError}</ParseErrorNote>
                                <ErrorList />
                            </>
                        )}
                        {!schemaParseError && validationResult && validationResult.valid && (
                            <ValidationBadge $valid>✓ {L.validLabel}</ValidationBadge>
                        )}
                        {!schemaParseError && validationResult && !validationResult.valid && (
                            <>
                                <ValidationBadge $valid={false}>
                                    ✕ {validationResult.errors.length} {L.errorsLabel}
                                </ValidationBadge>
                                <ErrorList>
                                    {validationResult.errors.map((err: any) => (
                                        <ErrorItem key={`${err.instancePath}-${err.message}`}>
                                            <ErrorPath>{err.instancePath || "root"}</ErrorPath>: {err.message}
                                        </ErrorItem>
                                    ))}
                                </ErrorList>
                            </>
                        )}
                        {!schemaParseError && !validationResult && (
                            <EmptyState>
                                <span>{L.schemaEmptyState}</span>
                            </EmptyState>
                        )}
                    </Panel>
                </SchemaContainer>
            ) : (
                <Panel>
                    <PanelHeader>
                        <PanelLabel>{tab === "editor" ? L.jsonInputLabel : L.jsonViewerLabel}</PanelLabel>
                        {tab === "editor" && <HistoryDropdown history={jsonHistory} onSelect={(v: string) => setJSONInput(v)} onClear={clearJsonHistory} />}
                    </PanelHeader>

                    {tab === "editor" ? (
                        <Editor handleJSONInput={handleJSONInput} jsonInput={jsonInput} handleEditorOperations={handleEditorOperations} />
                    ) : (
                        <>
                            <ViewerControls>
                                <SearchInput
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    placeholder={L.searchPlaceholder}
                                    spellCheck={false}
                                />
                                <ViewerBtnGroup>
                                    <ActionBtn onClick={() => setCollapsed(false)}>{L.expandAllBtn}</ActionBtn>
                                    <ActionBtn onClick={() => setCollapsed(true)}>{L.collapseAllBtn}</ActionBtn>
                                </ViewerBtnGroup>
                            </ViewerControls>
                            <ViewerArea>
                                {filteredJson !== null && filteredJson !== undefined ? (
                                    <ReactJsonView
                                        key={String(collapsed)}
                                        src={filteredJson}
                                        collapsed={collapsed}
                                        theme={mode === "dark" ? "ocean" : LIGHT_THEME}
                                        iconStyle="circle"
                                        displayDataTypes={false}
                                        quotesOnKeys={false}
                                        onAdd={searchQuery ? undefined : handleJsonMutation}
                                        onEdit={searchQuery ? undefined : handleJsonMutation}
                                        onDelete={searchQuery ? undefined : handleJsonMutation}
                                    />
                                ) : (
                                    <NoMatch>{searchQuery ? L.noMatchesMessage : L.noValidJsonMessage}</NoMatch>
                                )}
                            </ViewerArea>
                        </>
                    )}
                </Panel>
            )}

            <LoadJSONModal open={showLinkModal} onClose={() => setShowLinkModal(false)} onLoad={handleModalLoad} />
        </ToolWrap>
    );
}
