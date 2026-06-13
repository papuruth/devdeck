"use client";

import React, { useEffect, useMemo, useState } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { EditorView } from "@codemirror/view";
import { HighlightStyle, StreamLanguage, syntaxHighlighting } from "@codemirror/language";
import { tags as t } from "@lezer/highlight";
import { json } from "@codemirror/lang-json";
import { css as cssLang } from "@codemirror/lang-css";
import { html as htmlLang } from "@codemirror/lang-html";
import { javascript } from "@codemirror/lang-javascript";
import { python } from "@codemirror/lang-python";
import { java } from "@codemirror/lang-java";
import { sql as sqlLang } from "@codemirror/lang-sql";
import { markdown } from "@codemirror/lang-markdown";
import { yaml } from "@codemirror/legacy-modes/mode/yaml";
import { shell } from "@codemirror/legacy-modes/mode/shell";
import { go } from "@codemirror/legacy-modes/mode/go";
import { ruby } from "@codemirror/legacy-modes/mode/ruby";
import { csharp } from "@codemirror/legacy-modes/mode/clike";
import { swift } from "@codemirror/legacy-modes/mode/swift";
import { php as phpLang } from "@codemirror/lang-php";
import styled from "styled-components";

/* ─── DevDeck dark theme ────────────────────────────────── */

const DARK_THEME = EditorView.theme(
    {
        "&": { backgroundColor: "transparent", color: "#e2e8f0" },
        ".cm-content": {
            padding: "12px 16px",
            fontFamily: "var(--font-mono, 'JetBrains Mono', 'Fira Code', monospace)",
            fontSize: "12px",
            lineHeight: "1.75",
            caretColor: "#22cc99",
            letterSpacing: "0.02em"
        },
        ".cm-focused": { outline: "none" },
        ".cm-cursor, .cm-dropCursor": { borderLeftColor: "#22cc99" },
        "&.cm-focused > .cm-scroller > .cm-selectionLayer .cm-selectionBackground, .cm-selectionBackground, ::selection": {
            backgroundColor: "rgba(34, 204, 153, 0.18)"
        },
        ".cm-gutters": {
            backgroundColor: "rgba(0,0,0,0.2)",
            color: "#475569",
            border: "none",
            borderRight: "1px solid rgba(255,255,255,0.05)",
            paddingRight: "4px",
            fontFamily: "var(--font-mono, 'JetBrains Mono', monospace)",
            fontSize: "11px"
        },
        ".cm-lineNumbers .cm-gutterElement": { minWidth: "2.8em", paddingRight: "12px" },
        ".cm-foldGutter": { paddingLeft: "4px" },
        ".cm-activeLine": { backgroundColor: "rgba(255,255,255,0.03)" },
        ".cm-activeLineGutter": { backgroundColor: "rgba(255,255,255,0.03)" },
        ".cm-scroller": { overflow: "auto" },
        ".cm-placeholder": { color: "rgba(148,163,184,0.4)" },
        ".cm-foldPlaceholder": {
            backgroundColor: "rgba(34,204,153,0.15)",
            color: "#22cc99",
            border: "none",
            borderRadius: "3px",
            padding: "0 4px",
            cursor: "pointer"
        },
        ".cm-tooltip": { backgroundColor: "#1e293b", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "6px" },
        ".cm-tooltip.cm-tooltip-autocomplete > ul > li[aria-selected]": { backgroundColor: "rgba(34,204,153,0.15)" }
    },
    { dark: true }
);

const DARK_HIGHLIGHT = HighlightStyle.define([
    { tag: t.keyword, color: "#22cc99" },
    { tag: t.string, color: "#86efac" },
    { tag: [t.number, t.bool, t.null], color: "#fbbf24" },
    { tag: [t.operator, t.punctuation], color: "#94a3b8" },
    { tag: t.comment, color: "#64748b", fontStyle: "italic" },
    { tag: [t.propertyName, t.attributeName], color: "#7dd3fc" },
    { tag: [t.typeName, t.className], color: "#a78bfa" },
    { tag: [t.tagName, t.angleBracket], color: "#22cc99" },
    { tag: t.definition(t.variableName), color: "#e2e8f0" },
    { tag: t.variableName, color: "#e2e8f0" },
    { tag: t.meta, color: "#64748b" },
    { tag: t.link, color: "#7dd3fc", textDecoration: "underline" }
]);

/* ─── DevDeck light theme ───────────────────────────────── */

const LIGHT_THEME = EditorView.theme(
    {
        "&": { backgroundColor: "transparent", color: "#1e293b" },
        ".cm-content": {
            padding: "12px 16px",
            fontFamily: "var(--font-mono, 'JetBrains Mono', 'Fira Code', monospace)",
            fontSize: "12px",
            lineHeight: "1.75",
            caretColor: "#22cc99",
            letterSpacing: "0.02em"
        },
        ".cm-focused": { outline: "none" },
        ".cm-cursor, .cm-dropCursor": { borderLeftColor: "#22cc99" },
        "&.cm-focused > .cm-scroller > .cm-selectionLayer .cm-selectionBackground, .cm-selectionBackground, ::selection": {
            backgroundColor: "rgba(34, 204, 153, 0.15)"
        },
        ".cm-gutters": {
            backgroundColor: "rgba(0,0,0,0.04)",
            color: "#94a3b8",
            border: "none",
            borderRight: "1px solid rgba(0,0,0,0.07)",
            paddingRight: "4px",
            fontFamily: "var(--font-mono, 'JetBrains Mono', monospace)",
            fontSize: "11px"
        },
        ".cm-lineNumbers .cm-gutterElement": { minWidth: "2.8em", paddingRight: "12px" },
        ".cm-foldGutter": { paddingLeft: "4px" },
        ".cm-activeLine": { backgroundColor: "rgba(0,0,0,0.025)" },
        ".cm-activeLineGutter": { backgroundColor: "rgba(0,0,0,0.025)" },
        ".cm-scroller": { overflow: "auto" },
        ".cm-placeholder": { color: "rgba(100,116,139,0.45)" },
        ".cm-foldPlaceholder": {
            backgroundColor: "rgba(34,204,153,0.12)",
            color: "#0891b2",
            border: "none",
            borderRadius: "3px",
            padding: "0 4px",
            cursor: "pointer"
        },
        ".cm-tooltip": { backgroundColor: "#ffffff", border: "1px solid rgba(0,0,0,0.1)", borderRadius: "6px" },
        ".cm-tooltip.cm-tooltip-autocomplete > ul > li[aria-selected]": { backgroundColor: "rgba(34,204,153,0.12)" }
    },
    { dark: false }
);

const LIGHT_HIGHLIGHT = HighlightStyle.define([
    { tag: t.keyword, color: "#0891b2" },
    { tag: t.string, color: "#16a34a" },
    { tag: [t.number, t.bool, t.null], color: "#d97706" },
    { tag: [t.operator, t.punctuation], color: "#64748b" },
    { tag: t.comment, color: "#94a3b8", fontStyle: "italic" },
    { tag: [t.propertyName, t.attributeName], color: "#0369a1" },
    { tag: [t.typeName, t.className], color: "#7c3aed" },
    { tag: [t.tagName, t.angleBracket], color: "#0891b2" },
    { tag: t.definition(t.variableName), color: "#1e293b" },
    { tag: t.variableName, color: "#1e293b" },
    { tag: t.meta, color: "#94a3b8" },
    { tag: t.link, color: "#0369a1", textDecoration: "underline" }
]);

/* ─── Language map ──────────────────────────────────────── */

type Language =
    | "json"
    | "css"
    | "html"
    | "javascript"
    | "python"
    | "java"
    | "sql"
    | "markdown"
    | "yaml"
    | "shell"
    | "go"
    | "ruby"
    | "csharp"
    | "swift"
    | "php"
    | "text";

function getLanguageExtension(language: Language) {
    switch (language) {
        case "json":
            return json();
        case "css":
            return cssLang();
        case "html":
            return htmlLang();
        case "javascript":
            return javascript();
        case "python":
            return python();
        case "java":
            return java();
        case "sql":
            return sqlLang();
        case "markdown":
            return markdown();
        case "php":
            return phpLang();
        case "yaml":
            return StreamLanguage.define(yaml);
        case "shell":
            return StreamLanguage.define(shell);
        case "go":
            return StreamLanguage.define(go);
        case "ruby":
            return StreamLanguage.define(ruby);
        case "csharp":
            return StreamLanguage.define(csharp);
        case "swift":
            return StreamLanguage.define(swift);
        default:
            return null;
    }
}

/* ─── Styled wrapper ────────────────────────────────────── */

const Wrap = styled.div`
    width: 100%;
    background: var(--bg-input);
    position: relative;
    transition: box-shadow 0.2s ease;

    &:focus-within {
        box-shadow: inset 0 0 0 2px rgba(34, 204, 153, 0.3);
    }

    &.stretch-height {
        flex: 1;
        display: flex;
        flex-direction: column;

        .cm-editor {
            flex: 1;
        }
        .cm-scroller {
            flex: 1;
            overflow: auto;
        }
    }
`;

/* ─── SmartEditor ───────────────────────────────────────── */

interface SmartEditorProps {
    value: string;
    onChange?: (value: string) => void;
    language?: Language;
    readOnly?: boolean;
    placeholder?: string;
    minHeight?: string;
    maxHeight?: string;
    autoFocus?: boolean;
    style?: React.CSSProperties;
    stretchHeight?: boolean;
}

export function SmartEditor({
    value,
    onChange,
    language = "text",
    readOnly = false,
    placeholder,
    minHeight = "260px",
    maxHeight,
    autoFocus = false,
    style,
    stretchHeight = false
}: SmartEditorProps) {
    const [isDark, setIsDark] = useState(false);

    useEffect(() => {
        const check = () => setIsDark(document.documentElement.getAttribute("data-theme") === "dark");
        check();
        const observer = new MutationObserver(check);
        observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
        return () => observer.disconnect();
    }, []);

    const langExtension = useMemo(() => getLanguageExtension(language), [language]);

    const themeExtensions = useMemo(
        () => [isDark ? DARK_THEME : LIGHT_THEME, syntaxHighlighting(isDark ? DARK_HIGHLIGHT : LIGHT_HIGHLIGHT)],
        [isDark]
    );

    const scrollerGrow = useMemo(() => (!maxHeight ? EditorView.theme({ ".cm-scroller": { height: "auto" } }) : []), [maxHeight]);

    const extensions = useMemo(() => {
        const base = langExtension ? [langExtension, ...themeExtensions] : themeExtensions;
        return [...base, scrollerGrow];
    }, [langExtension, themeExtensions, scrollerGrow]);

    const isRich = language !== "text";

    return (
        <Wrap style={style} className={stretchHeight ? "stretch-height" : undefined}>
            <CodeMirror
                value={value}
                onChange={onChange ? (val) => onChange(val) : undefined}
                theme="none"
                extensions={extensions}
                readOnly={readOnly}
                placeholder={placeholder}
                autoFocus={autoFocus}
                minHeight={minHeight}
                maxHeight={maxHeight}
                basicSetup={{
                    lineNumbers: true,
                    foldGutter: isRich,
                    dropCursor: false,
                    allowMultipleSelections: false,
                    indentOnInput: isRich,
                    bracketMatching: isRich,
                    closeBrackets: isRich,
                    autocompletion: isRich,
                    rectangularSelection: false,
                    crosshairCursor: false,
                    highlightActiveLine: true,
                    highlightActiveLineGutter: true,
                    highlightSelectionMatches: false,
                    searchKeymap: false,
                    foldKeymap: isRich,
                    lintKeymap: false,
                    tabSize: 2
                }}
                style={{ width: "100%" }}
            />
        </Wrap>
    );
}

export default SmartEditor;
