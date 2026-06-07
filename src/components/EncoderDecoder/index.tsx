// @ts-nocheck
import localization from "localization";
import React, { useCallback, useMemo, useState } from "react";
import styled, { keyframes } from "styled-components";
import { ActionBar, ActionBtn, ActionBtnGroup, CodeArea, EmptyState, ModeBtn, ModeToggle, Panel, PanelHeader, PanelLabel, TabBtn, TabStrip, ToolLayout } from "components/Shared/ToolKit";
import LocalBadge from "components/Shared/LocalBadge";
import SendToButton from "components/Shared/SendToButton";

const { encoderDecoder: L } = localization;

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

const ErrorBadge = styled.div`
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 4px 10px;
    border-radius: 4px;
    font-size: 11px;
    font-weight: 500;
    font-family: "Inter", sans-serif;
    animation: ${fadeInDown} 0.2s ease;
    color: #ef4444;
    background: rgba(239, 68, 68, 0.1);
    border: 1px solid rgba(239, 68, 68, 0.3);
    margin: 0 16px 0;
    margin-top: 8px;
`;

const ModeToggleWrapper = styled.div`
    padding: 12px 16px;
    border-bottom: 1px solid var(--border-color);
`;

const debounce = (fn: Function, delay: number) => {
    let timeoutId: NodeJS.Timeout;
    return (...args: any[]) => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
            fn(...args);
        }, delay);
    };
};

type TabType = "base64" | "url" | "htmlEntities" | "unicode" | "hex" | "binary";

const TAB_CONFIG: Record<TabType, { label: string; encode: (input: string) => string | null; decode: (input: string) => string | null }> = {
    base64: {
        label: L.base64Tab,
        encode: (input: string) => {
            try {
                return btoa(unescape(encodeURIComponent(input)));
            } catch {
                return null;
            }
        },
        decode: (input: string) => {
            try {
                return decodeURIComponent(escape(atob(input)));
            } catch {
                return null;
            }
        }
    },
    url: {
        label: L.urlTab,
        encode: (input: string) => encodeURIComponent(input),
        decode: (input: string) => {
            try {
                return decodeURIComponent(input);
            } catch {
                return null;
            }
        }
    },
    htmlEntities: {
        label: L.htmlEntitiesTab,
        encode: (input: string) => input
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#x27;"),
        decode: (input: string) => {
            const doc = new DOMParser().parseFromString(input, "text/html");
            return doc.documentElement.textContent || null;
        }
    },
    unicode: {
        label: L.unicodeTab,
        encode: (input: string) => Array.from(input)
            .map((char) => `\\u${char.charCodeAt(0).toString(16).padStart(4, "0")}`)
            .join(""),
        decode: (input: string) => {
            try {
                const regex = /\\u([0-9a-f]{4})/gi;
                return input.replace(regex, (match, hex) => String.fromCharCode(parseInt(hex, 16)));
            } catch {
                return null;
            }
        }
    },
    hex: {
        label: L.hexTab,
        encode: (input: string) => Array.from(input)
            .map((char) => char.charCodeAt(0).toString(16).padStart(2, "0"))
            .join(" "),
        decode: (input: string) => {
            try {
                return input
                    .split(/\s+/)
                    .map((hex) => String.fromCharCode(parseInt(hex, 16)))
                    .join("");
            } catch {
                return null;
            }
        }
    },
    binary: {
        label: L.binaryTab,
        encode: (input: string) => Array.from(input)
            .map((char) => char.charCodeAt(0).toString(2).padStart(8, "0"))
            .join(" "),
        decode: (input: string) => {
            try {
                return input
                    .split(/\s+/)
                    .map((bin) => String.fromCharCode(parseInt(bin, 2)))
                    .join("");
            } catch {
                return null;
            }
        }
    }
};

function getErrorMessage(tab: TabType, mode: "encode" | "decode"): string {
    switch (tab) {
        case "base64":
            return mode === "decode" ? L.invalidBase64 : "";
        case "url":
            return L.invalidUrl;
        case "hex":
            return L.invalidHex;
        case "binary":
            return L.invalidBinary;
        case "unicode":
            return L.invalidUnicode;
        default:
            return "Invalid input";
    }
}

export default function EncoderDecoder() {
    const [tab, setTab] = useState<TabType>("base64");
    const [mode, setMode] = useState<"encode" | "decode">("encode");
    const [input, setInput] = useState("");
    const [copiedOutput, setCopiedOutput] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const debouncedConvert = useMemo(
        () => debounce((newInput: string) => {
            setError(null);
            if (!newInput.trim()) {
                return;
            }

            const config = TAB_CONFIG[tab];
            const converter = mode === "encode" ? config.encode : config.decode;
            const result = converter(newInput);

            if (result === null) {
                setError(getErrorMessage(tab, mode));
            }
        }, 150),
        [tab, mode]
    );

    const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setInput(e.target.value);
        debouncedConvert(e.target.value);
    };

    const output = useMemo(() => {
        if (!input.trim()) return "";
        const config = TAB_CONFIG[tab];
        const converter = mode === "encode" ? config.encode : config.decode;
        return converter(input) || "";
    }, [input, tab, mode]);

    const handleCopyOutput = useCallback(() => {
        if (!window?.navigator?.clipboard || !output) return;
        window.navigator.clipboard.writeText(output).then(() => {
            setCopiedOutput(true);
            setTimeout(() => setCopiedOutput(false), 1500);
        });
    }, [output]);

    const handleClear = useCallback(() => {
        setInput("");
        setError(null);
    }, []);

    const handlePaste = useCallback(async () => {
        try {
            const text = await window.navigator.clipboard.readText();
            if (text?.trim()) {
                setInput(text);
                debouncedConvert(text);
            }
        } catch {
            /*  ignore  */
        }
    }, [debouncedConvert]);

    return (
        <>
            <TabStrip>
                {(Object.keys(TAB_CONFIG) as TabType[]).map((t) => (
                    <TabBtn key={t} $active={tab === t} onClick={() => setTab(t)}>
                        {TAB_CONFIG[t].label}
                    </TabBtn>
                ))}
            </TabStrip>

            <ToolLayout>
                <Panel>
                    <ModeToggleWrapper>
                        <ModeToggle>
                            <ModeBtn $active={mode === "encode"} onClick={() => setMode("encode")}>
                                {L.encodeMode}
                            </ModeBtn>
                            <ModeBtn $active={mode === "decode"} onClick={() => setMode("decode")}>
                                {L.decodeMode}
                            </ModeBtn>
                        </ModeToggle>
                    </ModeToggleWrapper>
                    <PanelHeader>
                        <PanelLabel>{L.inputLabel}</PanelLabel>
                    </PanelHeader>
                    <CodeArea placeholder={L.emptyStateMessage} value={input} onChange={handleInputChange} spellCheck={false} />
                    {error && <ErrorBadge>✕ {error}</ErrorBadge>}
                    <ActionBar>
                        <ActionBtnGroup>
                            <ActionBtn onClick={handlePaste}>{L.pasteBtn}</ActionBtn>
                            <ActionBtn onClick={handleClear}>{L.clearBtn}</ActionBtn>
                        </ActionBtnGroup>
                    </ActionBar>
                </Panel>

                <Panel>
                    <PanelHeader>
                        <PanelLabel>{L.outputLabel}</PanelLabel>
                        <LocalBadge />
                    </PanelHeader>
                    {output ? (
                        <>
                            <CodeArea value={output} readOnly spellCheck={false} />
                            <ActionBar>
                                <ActionBtnGroup>
                                    <ActionBtn $success={copiedOutput} onClick={handleCopyOutput}>
                                        {copiedOutput ? L.copiedBtn : L.copyBtn}
                                    </ActionBtn>
                                    <SendToButton
                                        value={output}
                                        targets={[
                                            { label: "Hash Generator", route: "/hash-generator" },
                                            { label: "JSON Viewer", route: "/json-viewer" }
                                        ]}
                                    />
                                </ActionBtnGroup>
                            </ActionBar>
                        </>
                    ) : (
                        <EmptyState>
                            <span>{L.emptyStateMessage}</span>
                        </EmptyState>
                    )}
                </Panel>
            </ToolLayout>
        </>
    );
}
