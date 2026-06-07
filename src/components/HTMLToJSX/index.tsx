// @ts-nocheck
import localization from "localization";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import styled, { keyframes } from "styled-components";
import { ActionBar, ActionBtn, ActionBtnGroup, EmptyState, MetaText, Panel, PanelHeader, PanelLabel, ToolLayout } from "components/Shared/ToolKit";
import { SmartEditor } from "components/Shared/SmartEditor";
import { useToolChain } from "context/ToolChainContext";
import LocalBadge from "components/Shared/LocalBadge";

const { htmlToJsx: L } = localization;

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

const WarningBadge = styled.div`
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 4px 10px;
    border-radius: 4px;
    font-size: 11px;
    font-weight: 500;
    font-family: "Inter", sans-serif;
    animation: ${fadeInDown} 0.2s ease;
    color: #fbbf24;
    background: rgba(251, 191, 36, 0.1);
    border: 1px solid rgba(251, 191, 36, 0.3);
    margin: 0 16px 0;
    margin-top: 8px;
`;

function htmlToJsx(html: string): { jsx: string; transformations: number; hasWarnings: boolean } {
    if (!html.trim()) {
        return { jsx: "", transformations: 0, hasWarnings: false };
    }

    let jsx = html;
    let count = 0;
    let hasWarnings = false;

    jsx = jsx.replace(/class=/g, () => {
        count += 1;
        return "className=";
    });

    jsx = jsx.replace(/for=/g, () => {
        count += 1;
        return "htmlFor=";
    });

    jsx = jsx.replace(/tabindex=/g, () => {
        count += 1;
        return "tabIndex=";
    });

    const eventMap: Record<string, string> = {
        onclick: "onClick",
        onchange: "onChange",
        onsubmit: "onSubmit",
        onkeydown: "onKeyDown",
        onkeyup: "onKeyUp",
        onkeypress: "onKeyPress",
        onmouseenter: "onMouseEnter",
        onmouseleave: "onMouseLeave",
        onfocus: "onFocus",
        onblur: "onBlur"
    };

    Object.entries(eventMap).forEach(([from, to]) => {
        const regex = new RegExp(`\\b${from}=`, "gi");
        jsx = jsx.replace(regex, () => {
            count += 1;
            return `${to}=`;
        });
    });

    const styleRegex = /style="([^"]*)"/g;
    jsx = jsx.replace(styleRegex, (match, styleContent) => {
        const pairs = styleContent.split(";").filter((p) => p.trim());
        const obj: Record<string, string> = {};

        pairs.forEach((pair) => {
            const [key, value] = pair.split(":").map((p) => p.trim());
            if (key && value) {
                const camelKey = key.replace(/-([a-z])/g, (g) => g[1].toUpperCase());
                obj[camelKey] = value;
            }
        });

        count += 1;
        return `style={{ ${Object.entries(obj)
            .map(([k, v]) => `${k}: "${v}"`)
            .join(", ")} }}`;
    });

    const voidElements = ["br", "img", "input", "hr", "meta", "link"];
    voidElements.forEach((tag) => {
        jsx = jsx.replace(new RegExp(`<${tag}([^>]*)>(?!/)`, "gi"), (match, attrs) => {
            if (!attrs.includes("/>")) {
                count += 1;
                return `<${tag}${attrs} />`;
            }
            return match;
        });
    });

    const booleanAttrs = ["disabled", "checked", "readonly", "required", "autofocus", "autoplay", "controls", "loop"];
    booleanAttrs.forEach((attr) => {
        const regex = new RegExp(`\\b${attr}\\b(?!=)`, "gi");
        jsx = jsx.replace(regex, () => {
            count += 1;
            return `${attr}={true}`;
        });

        const regex2 = new RegExp(`\\b${attr}="true"\\b`, "gi");
        jsx = jsx.replace(regex2, () => {
            count += 1;
            return `${attr}={true}`;
        });
    });

    jsx = jsx.replace(/<!--([\s\S]*?)-->/g, (match, content) => {
        count += 1;
        return `{/* ${content.trim()} */}`;
    });

    // strip xmlns and xmlns:* namespace declarations
    jsx = jsx.replace(/\s*xmlns(?::[a-z][a-z0-9]*)?="[^"]*"/g, () => {
        count += 1;
        return "";
    });
    jsx = jsx.replace(/\s*xmlns(?::[a-z][a-z0-9]*)?='[^']*'/g, () => {
        count += 1;
        return "";
    });

    // xlink:href → href (modern React drops the xlink namespace)
    jsx = jsx.replace(/xlink:href=/g, () => {
        count += 1;
        return "href=";
    });

    jsx = jsx.replace(/<[^>]+>/g, (tag) => tag.replace(/\b([a-z][a-z0-9]*(?:-[a-z][a-z0-9]*)+)=/g, (match, attr) => {
        if (/^(data|aria)-/.test(attr)) return match;
        const camel = attr.replace(/-([a-z])/g, (_m, c) => c.toUpperCase());
        count += 1;
        return `${camel}=`;
    }));

    if (/<[^/a-zA-Z!]/.test(jsx) || /=["'][^"']*$/.test(jsx)) {
        hasWarnings = true;
    }

    return { jsx: jsx.trim(), transformations: count, hasWarnings };
}

const debounce = (fn: Function, delay: number) => {
    let timeoutId: NodeJS.Timeout;
    return (...args: any[]) => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => fn(...args), delay);
    };
};

export default function HTMLToJSX() {
    const [html, setHtml] = useState("");
    const [converted, setConverted] = useState("");
    const [transformations, setTransformations] = useState(0);
    const [hasWarnings, setHasWarnings] = useState(false);
    const [copiedJsx, setCopiedJsx] = useState(false);
    const { consumeChain } = useToolChain();

    useEffect(() => {
        const chained = consumeChain("/html-jsx");
        if (chained && typeof chained === "string") setHtml(chained);
    }, [consumeChain]);

    const debouncedConvert = useMemo(
        () => debounce((input: string) => {
            const { jsx, transformations: count, hasWarnings: warns } = htmlToJsx(input);
            setConverted(jsx);
            setTransformations(count);
            setHasWarnings(warns);
        }, 200),
        []
    );

    const handleHtmlChange = (val: string) => {
        setHtml(val);
        debouncedConvert(val);
    };

    const handleCopyJsx = useCallback(() => {
        if (!window?.navigator?.clipboard) return;
        window.navigator.clipboard.writeText(converted).then(() => {
            setCopiedJsx(true);
            setTimeout(() => setCopiedJsx(false), 1500);
        });
    }, [converted]);

    const handleClear = useCallback(() => {
        setHtml("");
        setConverted("");
        setTransformations(0);
        setHasWarnings(false);
    }, []);

    const handlePaste = useCallback(async () => {
        try {
            const text = await window.navigator.clipboard.readText();
            if (text?.trim()) {
                setHtml(text);
                const { jsx, transformations: count, hasWarnings: warns } = htmlToJsx(text);
                setConverted(jsx);
                setTransformations(count);
                setHasWarnings(warns);
            }
        } catch {
            // ignore
        }
    }, []);

    return (
        <ToolLayout>
            <Panel>
                <PanelHeader>
                    <PanelLabel>{L.htmlInputLabel}</PanelLabel>
                </PanelHeader>
                <SmartEditor placeholder={L.htmlInputPlaceholder} value={html} onChange={handleHtmlChange} language="html" />
                {hasWarnings && html && (
                    <WarningBadge>⚠️ {L.partialConversionWarning}</WarningBadge>
                )}
                <ActionBar>
                    <ActionBtnGroup>
                        <ActionBtn onClick={handlePaste}>{L.pasteBtn}</ActionBtn>
                        <ActionBtn onClick={handleClear}>{L.clearBtn}</ActionBtn>
                    </ActionBtnGroup>
                </ActionBar>
            </Panel>

            <Panel>
                <PanelHeader>
                    <PanelLabel>{L.jsxOutputLabel}</PanelLabel>
                    <LocalBadge />
                </PanelHeader>
                {converted ? (
                    <>
                        <SmartEditor value={converted} readOnly language="javascript" />
                        <ActionBar>
                            <ActionBtnGroup>
                                {transformations > 0 && <MetaText>{transformations} {L.transformationsLabel}</MetaText>}
                            </ActionBtnGroup>
                            <ActionBtnGroup>
                                <ActionBtn $success={copiedJsx} onClick={handleCopyJsx}>
                                    {copiedJsx ? L.copiedLabel : L.copyJsxBtn}
                                </ActionBtn>
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
    );
}
