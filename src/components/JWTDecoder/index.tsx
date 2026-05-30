"use client";

import { Backspace, Close, ContentCopy, Done, OpenInFull, Visibility, VisibilityOff } from "@mui/icons-material";
import { Dialog, DialogContent, IconButton, Tooltip } from "@mui/material";
import localization from "localization";

import React, { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { useToolChain } from "context/ToolChainContext";
import styled from "styled-components";
import {
    ActionBar,
    ActionBtn,
    ActionBtnGroup,
    EmptyState,
    Panel,
    PanelHeader,
    PanelLabel,
    TabBtn,
    TabStrip,
    ToolLayout
} from "components/Shared/ToolKit";
import LocalBadge from "components/Shared/LocalBadge";
import { SignJWT, importPKCS8, importSPKI, jwtVerify } from "jose";

const { jwtDecoder: L, common: C } = localization;

type ClaimMeta = { desc: string; note?: string };
const CLAIM_META: Record<string, ClaimMeta> = {
    alg: { desc: "The algorithm used to sign the JWT." },
    typ: { desc: "The media type of this complete JWT." },
    kid: { desc: "Identifies the key used to sign the token." },
    iss: { desc: "Identifies the principal that issued the JWT." },
    sub: { desc: "The subject of the JWT (the user)." },
    aud: { desc: "Recipients this JWT is intended for." },
    exp: { desc: "The time after which the JWT expires.", note: "NumericDate" },
    nbf: { desc: "The time before which the JWT must not be accepted.", note: "NumericDate" },
    iat: { desc: "The time at which the JWT was issued.", note: "NumericDate" },
    jti: { desc: "Unique identifier for this token." }
};

const EXAMPLE_TOKEN = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ1c2VyXzEyMyIsIm5hbWUiOiJKb2huIERvZSIsImlhdCI6MTc3ODQxNTQxNiwiZXhwIjoxNzc4NDE5MDE2fQ.MZdAkif-gIEF3UC0kMMPSr-CSBP7AtbPK6mRjTpRHZg`;

const DEFAULT_HEADER = JSON.stringify({ alg: "HS256", typ: "JWT" }, null, 2);
const DEFAULT_PAYLOAD = JSON.stringify(
    {
        sub: "user_123",
        name: "John Doe",
        iat: Math.floor(Date.now() / 1000),
        exp: Math.floor(Date.now() / 1000) + 3600
    },
    null,
    2
);

const ALGORITHM_GROUPS = [
    { group: "HMAC", algorithms: ["HS256", "HS384", "HS512"] },
    { group: "RSA", algorithms: ["RS256", "RS384", "RS512"] },
    { group: "RSA-PSS", algorithms: ["PS256", "PS384", "PS512"] },
    { group: "ECDSA", algorithms: ["ES256", "ES384", "ES512"] },
    { group: "EdDSA", algorithms: ["Ed25519"] }
];

function safeDecodeSegment(str: string): Record<string, unknown> | null {
    try {
        const padded = str.replace(/-/g, "+").replace(/_/g, "/");
        return JSON.parse(atob(padded));
    } catch {
        return null;
    }
}

function formatRelative(unixSec: number): string {
    const diff = unixSec - Math.floor(Date.now() / 1000);
    const abs = Math.abs(diff);
    const expired = diff < 0;
    if (abs < 60) return `${expired ? "expired" : "expires in"} ${abs}s`;
    if (abs < 3600) return `${expired ? "expired" : "expires in"} ${Math.floor(abs / 60)}m`;
    if (abs < 86400) return `${expired ? "expired" : "expires in"} ${Math.floor(abs / 3600)}h`;
    return `${expired ? "expired" : "expires in"} ${Math.floor(abs / 86400)}d`;
}

function formatClaimValue(key: string, value: unknown): string {
    const meta = CLAIM_META[key as keyof typeof CLAIM_META];
    if (meta?.note === "NumericDate" && typeof value === "number") {
        return `${value} (${new Date(value * 1000).toString()})`;
    }
    if (typeof value === "object" && value !== null) return JSON.stringify(value);
    return String(value);
}

function syntaxHighlightJson(json: string): React.ReactNode {
    const tokens: React.ReactNode[] = [];
    const re = /("(?:[^"\\]|\\.)*")([ \t]*:)?|(-?\d+(?:\.\d+)?(?:[eE][+-]?\d+)?)|(\btrue\b|\bfalse\b|\bnull\b)|([{}[\],])/g;
    let last = 0;
    let i = 0;
    let m = re.exec(json);
    while (m !== null) {
        if (m.index > last) {
            tokens.push(
                <span key={i} style={{ color: "var(--text-primary)" }}>
                    {json.slice(last, m.index)}
                </span>
            );
            i += 1;
        }
        if (m[1] !== undefined) {
            tokens.push(
                <span key={i} style={{ color: m[2] ? "#818cf8" : "#22cc99" }}>
                    {m[1]}
                </span>
            );
            i += 1;
            if (m[2]) {
                tokens.push(
                    <span key={i} style={{ color: "var(--text-secondary)", opacity: 0.7 }}>
                        {m[2]}
                    </span>
                );
                i += 1;
            }
        } else if (m[3] !== undefined) {
            tokens.push(
                <span key={i} style={{ color: "#f59e0b" }}>
                    {m[3]}
                </span>
            );
            i += 1;
        } else if (m[4] !== undefined) {
            tokens.push(
                <span key={i} style={{ color: "#a78bfa" }}>
                    {m[4]}
                </span>
            );
            i += 1;
        } else {
            tokens.push(
                <span key={i} style={{ color: "var(--text-secondary)" }}>
                    {m[5]}
                </span>
            );
            i += 1;
        }
        last = re.lastIndex;
        m = re.exec(json);
    }
    if (last < json.length) {
        tokens.push(
            <span key={i} style={{ color: "var(--text-primary)" }}>
                {json.slice(last)}
            </span>
        );
    }
    return tokens;
}

async function verifyHmac(
    tokenStr: string,
    secret: string,
    alg: string,
    b64Encoded: boolean
): Promise<"valid" | "invalid" | "unsupported" | "error"> {
    const algMap: Record<string, string> = { HS256: "SHA-256", HS384: "SHA-384", HS512: "SHA-512" };
    const hashName = algMap[alg];
    if (!hashName) return "unsupported";
    try {
        const parts = tokenStr.split(".");
        const signingInput = new TextEncoder().encode(`${parts[0]}.${parts[1]}`);
        let keyBytes;
        if (b64Encoded) {
            const normalized = secret.replace(/-/g, "+").replace(/_/g, "/");
            const bin = btoa(normalized);
            keyBytes = new Uint8Array(bin.length).map((_, i) => bin.charCodeAt(i));
        } else {
            keyBytes = new TextEncoder().encode(secret);
        }
        const key = await crypto.subtle.importKey("raw", keyBytes, { name: "HMAC", hash: hashName }, false, ["sign"]);
        const sigBuf = await crypto.subtle.sign("HMAC", key, signingInput);
        const computed = btoa(String.fromCharCode(...new Uint8Array(sigBuf)))
            .replace(/\+/g, "-")
            .replace(/\//g, "_")
            .replace(/=/g, "");
        return computed === parts[2] ? "valid" : "invalid";
    } catch {
        return "error";
    }
}

function isHmac(alg: string): boolean {
    return alg.startsWith("HS");
}

// Ed25519 uses "EdDSA" as the JWT alg header and jose algorithm name
function joseAlg(alg: string): string {
    if (alg === "Ed25519") return "EdDSA";
    return alg;
}

function arrayBufferToPem(buf: ArrayBuffer, type: "PRIVATE KEY" | "PUBLIC KEY"): string {
    const b64 = btoa(String.fromCharCode(...new Uint8Array(buf)));
    const lines: string[] = [];
    let i = 0;
    while (i < b64.length) {
        lines.push(b64.slice(i, i + 64));
        i += 64;
    }
    return `-----BEGIN ${type}-----\n${lines.join("\n")}\n-----END ${type}-----`;
}

async function generateKeyPairPem(alg: string): Promise<{ privateKey: string; publicKey: string }> {
    let pair: CryptoKeyPair;
    if (alg.startsWith("RS")) {
        pair = (await crypto.subtle.generateKey(
            { name: "RSASSA-PKCS1-v1_5", modulusLength: 2048, publicExponent: new Uint8Array([1, 0, 1]), hash: `SHA-${alg.slice(2)}` },
            true,
            ["sign", "verify"]
        )) as CryptoKeyPair;
    } else if (alg.startsWith("PS")) {
        pair = (await crypto.subtle.generateKey(
            { name: "RSA-PSS", modulusLength: 2048, publicExponent: new Uint8Array([1, 0, 1]), hash: `SHA-${alg.slice(2)}` },
            true,
            ["sign", "verify"]
        )) as CryptoKeyPair;
    } else if (alg.startsWith("ES")) {
        const curves: Record<string, string> = { ES256: "P-256", ES384: "P-384", ES512: "P-521" };
        pair = (await crypto.subtle.generateKey({ name: "ECDSA", namedCurve: curves[alg] ?? "P-256" }, true, ["sign", "verify"])) as CryptoKeyPair;
    } else {
        pair = (await crypto.subtle.generateKey({ name: "Ed25519" } as Algorithm, true, ["sign", "verify"])) as CryptoKeyPair;
    }
    const privBuf = await crypto.subtle.exportKey("pkcs8", pair.privateKey);
    const pubBuf = await crypto.subtle.exportKey("spki", pair.publicKey);
    return {
        privateKey: arrayBufferToPem(privBuf, "PRIVATE KEY"),
        publicKey: arrayBufferToPem(pubBuf, "PUBLIC KEY")
    };
}

// ─── Styled components ────────────────────────────────────────────────────────

const BadgeRow = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
    padding: 10px 16px;
    border-bottom: 1px solid var(--border-color);
`;

const Badge = styled.span<{ $type?: string }>`
    display: inline-flex;
    align-items: center;
    font-size: 12px;
    font-weight: 600;
    font-family: "Inter", sans-serif;
    padding: 3px 8px;
    border-radius: 4px;
    background: ${(p) => {
        if (p.$type === "error") return "rgba(239,68,68,0.1)";
        if (p.$type === "success") return "rgba(34,204,153,0.1)";
        if (p.$type === "warning") return "rgba(251,191,36,0.1)";
        return "rgba(99,102,241,0.1)";
    }};
    color: ${(p) => {
        if (p.$type === "error") return "#ef4444";
        if (p.$type === "success") return "#22cc99";
        if (p.$type === "warning") return "#fbbf24";
        return "#818cf8";
    }};
    border: 1px solid
        ${(p) => {
            if (p.$type === "error") return "rgba(239,68,68,0.28)";
            if (p.$type === "success") return "rgba(34,204,153,0.28)";
            if (p.$type === "warning") return "rgba(251,191,36,0.28)";
            return "rgba(99,102,241,0.28)";
        }};
`;

const StatusBadge = styled.span<{ $valid?: boolean }>`
    font-size: 12px;
    font-weight: 600;
    font-family: "Inter", sans-serif;
    padding: 3px 10px;
    border-radius: 4px;
    margin-left: auto;
    background: ${(p) => (p.$valid ? "rgba(34,204,153,0.12)" : "rgba(239,68,68,0.12)")};
    color: ${(p) => (p.$valid ? "#22cc99" : "#ef4444")};
`;

const BtnGroup = styled(ActionBtnGroup)`
    margin-left: auto;
`;

const TOKEN_LAYER = `
  font-family: var(--font-mono) !important;
  font-size: 12px;
  line-height: 21px;
  letter-spacing: 0;
  margin: 0;
  padding: 16px;
  border: none;
  white-space: pre-wrap;
  word-break: break-all;
  overflow-wrap: break-word;
  text-rendering: geometricPrecision;
  -webkit-font-smoothing: antialiased;
  width: 100%;
  box-sizing: border-box;
`;

const TokenWrapper = styled.div`
    position: relative;
    display: block;
    min-height: 260px;
    background: var(--bg-input);
    overflow: auto;
    transition: box-shadow 0.2s ease;
    &:focus-within {
        box-shadow: inset 0 0 0 2px rgba(34, 204, 153, 0.3);
    }
`;

const TokenHighlight = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    pointer-events: none;
    color: transparent;
    ${TOKEN_LAYER}
`;

const TokenTextarea = styled.textarea`
    display: block;
    position: relative;
    background: transparent;
    color: transparent;
    caret-color: var(--text-primary);
    outline: none;
    resize: none;
    overflow: hidden;
    -webkit-appearance: none;
    appearance: none;
    z-index: 1;
    ${TOKEN_LAYER}
`;

const SectionBlock = styled.div`
    border-bottom: 1px solid var(--border-color);
    &:last-child {
        border-bottom: none;
    }
`;

const SectionTitle = styled.div`
    padding: 8px 16px 8px 13px;
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: var(--text-secondary);
    background: var(--bg-panel-header);
    border-bottom: 1px solid var(--border-color);
    border-left: 3px solid rgba(34, 204, 153, 0.45);
`;

const TabRow = styled.div`
    display: flex;
    align-items: stretch;
    border-bottom: 1px solid var(--border-color);
    background: var(--bg-panel-header);
`;

const JsonOutput = styled.div`
    background: var(--bg-input);
    color: var(--text-primary);
    padding: 16px;
    font-family: var(--font-mono);
    font-size: 12px;
    line-height: 1.75;
    margin: 0;
    white-space: pre-wrap;
    word-break: break-all;
    min-height: 80px;
`;

const ClaimsTable = styled.table`
    width: 100%;
    border-collapse: collapse;
    font-size: 12px;
    background: var(--bg-input);
`;

const ClaimsTh = styled.th`
    text-align: left;
    padding: 8px 12px;
    font-size: 10px;
    font-weight: 700;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    color: var(--text-secondary);
    border-bottom: 1px solid var(--border-color);
    background: var(--bg-surface);
`;

const ClaimsTr = styled.tr`
    &:last-child td {
        border-bottom: none;
    }
`;

const ClaimsTd = styled.td`
    padding: 8px 12px;
    vertical-align: top;
    border-bottom: 1px solid var(--border-color);
    color: var(--text-primary);
    &.key {
        font-family: var(--font-mono);
        font-size: 11px;
        color: #818cf8;
        white-space: nowrap;
        width: 90px;
    }
    &.value {
        font-family: var(--font-mono);
        font-size: 11px;
        word-break: break-all;
    }
    &.desc {
        font-size: 11px;
        color: var(--text-secondary);
        font-style: italic;
        min-width: 140px;
    }
`;

const NumericNote = styled.div`
    padding: 6px 12px;
    font-size: 11px;
    color: var(--text-secondary);
    background: var(--bg-input);
    border-top: 1px solid var(--border-color);
    font-style: italic;
`;

const SigRaw = styled.div`
    padding: 12px 16px 12px 13px;
    font-size: 12px;
    font-family: var(--font-mono);
    color: #8b5cf6;
    background: var(--bg-input);
    word-break: break-all;
    line-height: 1.75;
    border-bottom: 1px solid var(--border-color);
    border-left: 3px solid rgba(139, 92, 246, 0.4);
    text-shadow: 0 0 14px rgba(139, 92, 246, 0.3);
`;

const VerifyForm = styled.div`
    padding: 12px 16px;
    display: flex;
    flex-direction: column;
    gap: 8px;
    background: var(--bg-surface);
`;

const VerifyFormLabel = styled.div`
    font-size: 10px;
    font-weight: 700;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: var(--text-secondary);
`;

const SecretInput = styled.input`
    background: var(--bg-input);
    border: 1px solid var(--border-color);
    border-radius: 4px;
    color: var(--text-primary);
    font-family: var(--font-mono);
    font-size: 12px;
    padding: 8px 10px;
    outline: none;
    width: 100%;
    &:focus {
        border-color: #818cf8;
    }
    &::placeholder {
        color: var(--text-secondary);
        opacity: 0.5;
    }
`;

const SecretInputRow = styled.div`
    display: flex;
    gap: 0;
    border: 1px solid var(--border-color);
    border-radius: 4px;
    overflow: hidden;
    &:focus-within {
        border-color: #818cf8;
    }
`;

const B64ToggleBtn = styled.button<{ $active?: boolean }>`
    flex: 0 0 auto;
    background: ${(p) => (p.$active ? "linear-gradient(135deg, rgba(129,140,248,0.2) 0%, rgba(129,140,248,0.08) 100%)" : "var(--bg-panel-header)")};
    color: ${(p) => (p.$active ? "#818cf8" : "var(--text-secondary)")};
    border: none;
    border-left: 1px solid ${(p) => (p.$active ? "rgba(129,140,248,0.3)" : "var(--border-color)")};
    padding: 14px;
    font-size: 10px;
    font-weight: 700;
    letter-spacing: 0.04em;
    text-transform: uppercase;
    cursor: pointer;
    white-space: nowrap;
    line-height: 1;
    transition:
        background 0.15s,
        color 0.15s,
        border-color 0.15s;
    &:hover {
        background: rgba(129, 140, 248, 0.12);
        color: #818cf8;
        border-left-color: rgba(129, 140, 248, 0.3);
    }
    &:disabled {
        background: rgba(0, 0, 0, 0.02);
        color: var(--text-secondary);
        cursor: not-allowed;
    }
`;

const SigStatusBadge = styled.span<{ $s?: string }>`
    font-size: 12px;
    font-weight: 600;
    padding: 3px 10px;
    border-radius: 4px;
    background: ${(p) => {
        if (p.$s === "valid") return "rgba(34,204,153,0.12)";
        if (p.$s === "invalid") return "rgba(239,68,68,0.12)";
        if (p.$s === "unsupported") return "rgba(251,191,36,0.12)";
        return "rgba(99,102,241,0.12)";
    }};
    color: ${(p) => {
        if (p.$s === "valid") return "#22cc99";
        if (p.$s === "invalid") return "#ef4444";
        if (p.$s === "unsupported") return "#fbbf24";
        return "#818cf8";
    }};
`;

const GenFormWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0;
    width: 100%;
`;

const GenSection = styled.div`
    border-bottom: 1px solid var(--border-color);
    &:last-child {
        border-bottom: none;
    }
`;

const GenLabel = styled.div`
    font-size: 10px;
    font-weight: 700;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: var(--text-secondary);
    background: var(--bg-panel-header);
    border-bottom: 1px solid var(--border-color);
    border-left: 3px solid rgba(34, 204, 153, 0.45);
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0;
`;

const GenLabelText = styled.span`
    padding: 10px 16px 6px 13px;
`;

const GenLabelClearBtn = styled.button`
    display: inline-flex;
    align-items: center;
    justify-content: center;
    background: none;
    border: 1px solid transparent;
    border-radius: 4px;
    color: var(--text-secondary);
    cursor: pointer;
    padding: 5px 8px;
    margin-right: 8px;
    transition:
        color 0.15s,
        background 0.15s;
    &:hover {
        background: rgba(239, 68, 68, 0.08);
        border-color: var(--border-color);
    }
    &:disabled {
        color: rgba(156, 163, 175, 0.5);
        cursor: not-allowed;
        background: none;
        border-color: transparent;
    }
`;

const AlgoSelectWrapper = styled.div`
    padding: 10px 16px;
    display: flex;
    align-items: center;
    gap: 10px;
`;

const AlgoSelect = styled.select`
    background: var(--bg-input);
    border: 1px solid var(--border-color);
    border-radius: 6px;
    color: var(--text-primary);
    font-family: "Inter", sans-serif;
    font-size: 12px;
    font-weight: 600;
    padding: 7px 32px 7px 12px;
    outline: none;
    cursor: pointer;
    -webkit-appearance: none;
    appearance: none;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%2322cc99' stroke-width='1.5' fill='none' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");
    background-repeat: no-repeat;
    background-position: right 10px center;
    min-width: 120px;
    transition:
        border-color 0.15s,
        box-shadow 0.15s;
    &:focus {
        border-color: #22cc99;
        box-shadow: 0 0 0 2px rgba(34, 204, 153, 0.15);
    }
    option,
    optgroup {
        background: var(--bg-surface);
        color: var(--text-primary);
    }
`;

const KeyPemArea = styled.div`
    padding: 12px 16px;
    display: flex;
    flex-direction: column;
    gap: 8px;
    background: var(--bg-input);
`;

const KeyPemTextarea = styled.textarea`
    background: var(--bg-input);
    border: 1px solid var(--border-color);
    border-radius: 4px;
    color: var(--text-primary);
    font-family: var(--font-mono);
    font-size: 11px;
    line-height: 1.6;
    padding: 8px 10px;
    outline: none;
    width: 100%;
    resize: vertical;
    min-height: 100px;
    box-sizing: border-box;
    &:focus {
        border-color: #818cf8;
    }
    &[readonly] {
        background: var(--bg-panel-header);
        color: var(--text-secondary);
        cursor: default;
    }
    &::placeholder {
        color: var(--text-secondary);
        opacity: 0.4;
        font-size: 10px;
    }
`;

const GenKeyBtn = styled.button`
    background: linear-gradient(135deg, rgba(34, 204, 153, 0.12) 0%, rgba(34, 204, 153, 0.04) 100%);
    color: #22cc99;
    border: 1px solid rgba(34, 204, 153, 0.4);
    border-radius: 6px;
    padding: 7px 14px;
    font-size: 11px;
    font-weight: 600;
    font-family: "Inter", sans-serif;
    cursor: pointer;
    white-space: nowrap;
    transition: all 0.15s ease;
    &:hover {
        background: rgba(34, 204, 153, 0.18);
        border-color: rgba(34, 204, 153, 0.6);
    }
    &:disabled {
        opacity: 0.4;
        cursor: not-allowed;
    }
`;

const GenFieldArea = styled.div`
    padding: 12px 16px;
    background: var(--bg-input);
    min-height: 160px;
`;

const GenSecretRow = styled.div`
    display: flex;
    align-items: center;
    gap: 0;
    border: 1px solid var(--border-color);
    border-radius: 4px;
    margin: 0 16px 12px;
    overflow: hidden;
    &:focus-within {
        border-color: #818cf8;
    }
`;

const GenSecretField = styled.input`
    flex: 1 1 0;
    min-width: 0;
    background: var(--bg-input);
    border: none;
    color: var(--text-primary);
    font-family: var(--font-mono);
    font-size: 12px;
    padding: 8px 10px;
    outline: none;
    &::placeholder {
        color: var(--text-secondary);
        opacity: 0.5;
    }
    &:disabled {
        background: rgba(0, 0, 0, 0.02);
        color: var(--text-secondary);
        cursor: not-allowed;
    }
`;

const JSON_EDITOR_LAYER = `
  font-family: var(--font-mono) !important;
  font-size: 12px;
  line-height: 1.75;
  letter-spacing: 0.02em;
  padding: 12px 16px;
  margin: 0;
  border: none;
  white-space: pre-wrap;
  word-break: break-all;
  overflow-wrap: break-word;
  width: 100%;
  box-sizing: border-box;
  min-height: 130px;
  display: block;
`;

const JsonEditorWrapper = styled.div`
    position: relative;
    min-height: 155px;
    background: var(--bg-input);
    overflow: auto;
    transition: box-shadow 0.2s ease;
    &:focus-within {
        box-shadow: inset 0 0 0 2px rgba(34, 204, 153, 0.3);
    }
`;

const JsonHighlightLayer = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    pointer-events: none;
    color: transparent;
    ${JSON_EDITOR_LAYER}
`;

const JsonEditorTextarea = styled.textarea`
    display: block;
    position: relative;
    background: transparent;
    color: transparent;
    caret-color: var(--text-primary);
    outline: none;
    resize: none;
    overflow: hidden;
    -webkit-appearance: none;
    appearance: none;
    z-index: 1;
    ${JSON_EDITOR_LAYER}
`;

const GenOutputSection = styled.div`
    display: flex;
    flex-direction: column;
    height: 100%;
`;

const GenOutputContent = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    background: radial-gradient(ellipse at 50% -10%, rgba(34, 204, 153, 0.07) 0%, var(--bg-input) 65%);
    padding: 28px 20px;
    min-height: 200px;
    overflow: auto;
    position: relative;
`;

const GenTokenOutput = styled.div`
    width: 100%;
    font-family: var(--font-mono);
    font-size: 12px;
    line-height: 1.75;
    word-break: break-all;
    color: var(--text-primary);
    white-space: pre-wrap;
`;

const GenErrorBadge = styled.div`
    font-size: 12px;
    color: #ef4444;
    padding: 4px 0;
    font-family: "Inter", sans-serif;
`;

// ─── ClaimsCard ───────────────────────────────────────────────────────────────

interface ClaimsCardProps {
    title: string;
    data: Record<string, unknown>;
    showDetails: boolean;
    onToggleDetails: () => void;
}

function ClaimsCard({ title, data, showDetails, onToggleDetails }: ClaimsCardProps) {
    const [tab, setTab] = useState("json");
    const [expanded, setExpanded] = useState(false);

    const hasNumericDate = Object.keys(data).some((k) => CLAIM_META[k as keyof typeof CLAIM_META]?.note === "NumericDate");

    const renderTable = () => (
        <>
            <ClaimsTable>
                <thead>
                    <tr>
                        <ClaimsTh>{L.claimCol}</ClaimsTh>
                        <ClaimsTh>{L.valueCol}</ClaimsTh>
                        {showDetails && <ClaimsTh>{L.descriptionCol}</ClaimsTh>}
                    </tr>
                </thead>
                <tbody>
                    {Object.entries(data).map(([k, v]) => (
                        <ClaimsTr key={k}>
                            <ClaimsTd className="key">{k}</ClaimsTd>
                            <ClaimsTd className="value">{formatClaimValue(k, v)}</ClaimsTd>
                            {showDetails && <ClaimsTd className="desc">{CLAIM_META[k as keyof typeof CLAIM_META]?.desc ?? "—"}</ClaimsTd>}
                        </ClaimsTr>
                    ))}
                </tbody>
            </ClaimsTable>
            {hasNumericDate && <NumericNote>{L.numericDateNote}</NumericNote>}
        </>
    );

    const renderContent = () => (tab === "json" ? <JsonOutput>{syntaxHighlightJson(JSON.stringify(data, null, 2))}</JsonOutput> : renderTable());

    const renderTabRow = (inDialog: boolean) => (
        <TabRow>
            <TabStrip style={{ flex: 1, borderBottom: "none" }}>
                <TabBtn $active={tab === "json"} onClick={() => setTab("json")}>
                    {L.jsonTab}
                </TabBtn>
                <TabBtn $active={tab === "claims"} onClick={() => setTab("claims")}>
                    {L.claimsBreakdownTab}
                </TabBtn>
            </TabStrip>
            <IconButton
                size="small"
                onClick={onToggleDetails}
                title={showDetails ? L.hideDetailsLabel : L.showDetailsLabel}
                sx={{ color: "var(--text-secondary)", borderRadius: 1, px: 1 }}
            >
                {showDetails ? <VisibilityOff fontSize="small" /> : <Visibility fontSize="small" />}
            </IconButton>
            {inDialog ? (
                <IconButton size="small" onClick={() => setExpanded(false)} sx={{ color: "var(--text-secondary)", borderRadius: 1, px: 1 }}>
                    <Close fontSize="small" />
                </IconButton>
            ) : (
                <IconButton size="small" onClick={() => setExpanded(true)} sx={{ color: "var(--text-secondary)", borderRadius: 1, px: 1 }}>
                    <OpenInFull fontSize="small" />
                </IconButton>
            )}
        </TabRow>
    );

    return (
        <SectionBlock>
            <SectionTitle>{title}</SectionTitle>
            {renderTabRow(false)}
            {renderContent()}
            <Dialog
                open={expanded}
                onClose={() => setExpanded(false)}
                fullWidth
                maxWidth="md"
                slotProps={{ paper: { sx: { background: "var(--bg-surface)", color: "var(--text-primary)" } } }}
            >
                <SectionTitle>{title}</SectionTitle>
                {renderTabRow(true)}
                <DialogContent sx={{ p: 0, overflow: "auto" }}>{renderContent()}</DialogContent>
            </Dialog>
        </SectionBlock>
    );
}

// ─── SigVerify ────────────────────────────────────────────────────────────────

interface SigVerifyProps {
    token: string;
    alg: string;
    signature: string;
    secretKey: string;
}

function SigVerify({ token, alg, signature, secretKey }: SigVerifyProps) {
    const hmac = isHmac(alg);
    const [keyInput, setKeyInput] = useState(secretKey);
    const [b64, setB64] = useState(false);
    const [status, setStatus] = useState<"valid" | "invalid" | "unsupported" | "error" | null>(null);

    useEffect(() => {
        setKeyInput("");
        setStatus(null);
    }, [alg]);

    useEffect(() => {
        if (secretKey) {
            setKeyInput(secretKey);
        }
    }, [secretKey]);

    useEffect(() => {
        let cancelled = false;
        const key = keyInput.trim();
        if (!key) {
            setStatus(null);
            return () => {
                cancelled = true;
            };
        }
        const timer = setTimeout(async () => {
            try {
                let result: "valid" | "invalid" | "unsupported" | "error";
                if (hmac) {
                    result = await verifyHmac(token, key, alg, b64);
                } else {
                    try {
                        const pubKey = await importSPKI(key, joseAlg(alg));
                        await jwtVerify(token, pubKey);
                        result = "valid";
                    } catch {
                        result = "invalid";
                    }
                }
                if (!cancelled) setStatus(result);
            } catch {
                if (!cancelled) setStatus("error");
            }
        }, 400);
        return () => {
            cancelled = true;
            clearTimeout(timer);
        };
    }, [token, keyInput, alg, b64, hmac]);

    const STATUS_LABELS: Record<string, string> = {
        valid: L.sigValidLabel,
        invalid: L.sigInvalidLabel,
        unsupported: L.sigUnsupportedLabel,
        error: "Verification error"
    };

    return (
        <SectionBlock>
            <SectionTitle>{L.signatureLabel}</SectionTitle>
            <SigRaw>{signature}</SigRaw>
            <VerifyForm>
                <VerifyFormLabel>{hmac ? L.signatureVerifyLabel : "Verify with public key (PEM)"}</VerifyFormLabel>
                {hmac ? (
                    <SecretInputRow>
                        <SecretInput
                            value={keyInput}
                            onChange={(e) => setKeyInput(e.target.value)}
                            placeholder={L.secretKeyPlaceholder}
                            style={{ border: "none", borderRadius: 0 }}
                        />
                        <B64ToggleBtn $active={b64} onClick={() => setB64((v) => !v)}>
                            {L.base64EncodedToggle}
                        </B64ToggleBtn>
                    </SecretInputRow>
                ) : (
                    <KeyPemTextarea
                        value={keyInput}
                        onChange={(e) => setKeyInput(e.target.value)}
                        placeholder={"-----BEGIN PUBLIC KEY-----\n...\n-----END PUBLIC KEY-----"}
                        rows={5}
                        spellCheck={false}
                    />
                )}
                {status && <SigStatusBadge $s={status}>{STATUS_LABELS[status]}</SigStatusBadge>}
            </VerifyForm>
        </SectionBlock>
    );
}

// ─── JsonEditor ───────────────────────────────────────────────────────────────

function JsonEditor({ value, onChange }: { value: string; onChange: (v: string) => void }) {
    return (
        <JsonEditorWrapper>
            <JsonHighlightLayer aria-hidden="true">
                {value ? syntaxHighlightJson(value) : <span style={{ color: "var(--text-secondary)", opacity: 0.4 }}>{"{ }"}</span>}
            </JsonHighlightLayer>
            <JsonEditorTextarea value={value} onChange={(e) => onChange(e.target.value)} spellCheck={false} />
        </JsonEditorWrapper>
    );
}

// ─── GenerateTab ──────────────────────────────────────────────────────────────

function GenerateTab() {
    const [algorithm, setAlgorithm] = useState("HS256");
    const [headerJson, setHeaderJson] = useState(() => DEFAULT_HEADER);
    const [payloadJson, setPayloadJson] = useState(DEFAULT_PAYLOAD);
    const [secret, setSecret] = useState("my-secret-key");
    const [b64, setB64] = useState(false);
    const [privateKeyPem, setPrivateKeyPem] = useState("");
    const [publicKeyPem, setPublicKeyPem] = useState("");
    const [isGeneratingKey, setIsGeneratingKey] = useState(false);
    const [copiedPubKey, setCopiedPubKey] = useState(false);
    const [generatedToken, setGeneratedToken] = useState("");
    const [error, setError] = useState("");
    const [copied, setCopied] = useState(false);

    const { sendTo } = useToolChain();

    const headerJsonValid = useMemo(() => {
        try {
            JSON.parse(headerJson);
            return true;
        } catch {
            return false;
        }
    }, [headerJson]);

    const formFieldsValid = headerJson.trim() !== "" && headerJsonValid;

    useEffect(() => {
        setPrivateKeyPem("");
        setPublicKeyPem("");
        const headerEmpty = !headerJson.trim() || headerJson === "{}";
        if (headerEmpty) {
            setHeaderJson(JSON.stringify({ alg: joseAlg(algorithm), typ: "JWT" }, null, 2));
        } else {
            try {
                const parsed = JSON.parse(headerJson);
                parsed.alg = joseAlg(algorithm);
                setHeaderJson(JSON.stringify(parsed, null, 2));
            } catch {
                // Invalid JSON — leave as-is
            }
        }
        if (!payloadJson.trim() || payloadJson === "{}") {
            setPayloadJson(DEFAULT_PAYLOAD);
        }
        if (isHmac(algorithm) && !secret.trim()) {
            setSecret("my-secret-key");
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [algorithm]);

    useEffect(() => {
        const timer = setTimeout(async () => {
            try {
                let headerObj: Record<string, unknown>;
                let payloadObj: Record<string, unknown>;
                try {
                    headerObj = JSON.parse(headerJson);
                } catch {
                    setError(L.invalidHeaderJson);
                    setGeneratedToken("");
                    return;
                }
                try {
                    payloadObj = JSON.parse(payloadJson);
                } catch {
                    setError(L.invalidPayloadJson);
                    setGeneratedToken("");
                    return;
                }
                headerObj = { ...headerObj, alg: joseAlg(algorithm), typ: "JWT" };
                let jwt: string;
                if (isHmac(algorithm)) {
                    if (!secret.trim()) {
                        setError("Secret key is required");
                        setGeneratedToken("");
                        return;
                    }
                    let keyBytes: Uint8Array<ArrayBuffer>;
                    if (b64) {
                        const normalized = secret.replace(/-/g, "+").replace(/_/g, "/");
                        const bin = btoa(normalized);
                        keyBytes = Uint8Array.from({ length: bin.length }, (_, idx) => bin.charCodeAt(idx));
                    } else {
                        keyBytes = new TextEncoder().encode(secret);
                    }
                    const hmacKey = await crypto.subtle.importKey("raw", keyBytes, { name: "HMAC", hash: `SHA-${algorithm.slice(2)}` }, false, [
                        "sign"
                    ]);
                    jwt = await new SignJWT(payloadObj as Record<string, unknown>)
                        .setProtectedHeader(headerObj as { alg: string; [key: string]: unknown })
                        .sign(hmacKey);
                } else {
                    if (!privateKeyPem.trim()) {
                        setError("Generate or paste a private key (PEM) below");
                        setGeneratedToken("");
                        return;
                    }
                    const privKey = await importPKCS8(privateKeyPem.trim(), joseAlg(algorithm));
                    jwt = await new SignJWT(payloadObj as Record<string, unknown>)
                        .setProtectedHeader(headerObj as { alg: string; [key: string]: unknown })
                        .sign(privKey);
                }
                setGeneratedToken(jwt);
                setError("");
            } catch (e) {
                setError(e instanceof Error ? e.message : "Token generation failed");
                setGeneratedToken("");
            }
        }, 300);
        return () => clearTimeout(timer);
    }, [algorithm, headerJson, payloadJson, secret, b64, privateKeyPem]);

    const handleGenerateKeyPair = useCallback(async () => {
        setIsGeneratingKey(true);
        try {
            const pair = await generateKeyPairPem(algorithm);
            setPrivateKeyPem(pair.privateKey);
            setPublicKeyPem(pair.publicKey);
            setError("");
        } catch (e) {
            setError(e instanceof Error ? e.message : "Key generation failed");
        } finally {
            setIsGeneratingKey(false);
        }
    }, [algorithm]);

    const handleCopyPublicKey = useCallback(async () => {
        if (!publicKeyPem) return;
        try {
            await navigator.clipboard.writeText(publicKeyPem);
            setCopiedPubKey(true);
            setTimeout(() => setCopiedPubKey(false), 1500);
        } catch {
            // clipboard unavailable
        }
    }, [publicKeyPem]);

    const handleCopyToken = useCallback(async () => {
        if (generatedToken)
            try {
                await navigator.clipboard.writeText(generatedToken);
                setCopied(true);
                setTimeout(() => setCopied(false), 1500);
            } catch {
                // clipboard unavailable
            }
    }, [generatedToken]);

    const handleSendToDecoder = useCallback(() => {
        if (generatedToken)
            sendTo(
                { generatedToken, secret: isHmac(algorithm) ? secret : undefined, publicKeyPem: isHmac(algorithm) ? undefined : publicKeyPem },
                "/jwt-decoder"
            );
    }, [generatedToken, secret, publicKeyPem, sendTo, algorithm]);

    const copyLabel = copied ? L.copiedLabel : C.copyBtn;
    const copyIcon = copied ? <Done sx={{ fontSize: 12 }} /> : <ContentCopy sx={{ fontSize: 12 }} />;
    const algFamily = ALGORITHM_GROUPS.find((g) => g.algorithms.includes(algorithm))?.group ?? "HMAC";

    return (
        <ToolLayout>
            <Panel>
                <PanelHeader>
                    <PanelLabel>{L.jwtTokenLabel}</PanelLabel>
                    <LocalBadge />
                </PanelHeader>
                <GenFormWrapper>
                    <GenSection>
                        <GenLabel>
                            <GenLabelText>{L.algorithmLabel}</GenLabelText>
                        </GenLabel>
                        <AlgoSelectWrapper>
                            <AlgoSelect value={algorithm} onChange={(e) => setAlgorithm(e.target.value)}>
                                {ALGORITHM_GROUPS.map((g) => (
                                    <optgroup key={g.group} label={g.group}>
                                        {g.algorithms.map((a) => (
                                            <option key={a} value={a}>
                                                {a}
                                            </option>
                                        ))}
                                    </optgroup>
                                ))}
                            </AlgoSelect>
                            <Badge $type="info" style={{ fontSize: 11 }}>
                                {algFamily}
                            </Badge>
                        </AlgoSelectWrapper>
                    </GenSection>

                    <GenSection>
                        <GenLabel>
                            <GenLabelText>{L.headerJsonLabel}</GenLabelText>
                            <GenLabelClearBtn onClick={() => setHeaderJson("")} title="Clear header">
                                <Backspace sx={{ fontSize: 13 }} />
                            </GenLabelClearBtn>
                        </GenLabel>
                        <JsonEditor value={headerJson} onChange={setHeaderJson} />
                    </GenSection>

                    <GenSection>
                        <GenLabel>
                            <GenLabelText>{L.payloadJsonLabel}</GenLabelText>
                            <GenLabelClearBtn onClick={() => setPayloadJson("")} title="Clear payload">
                                <Backspace sx={{ fontSize: 13 }} />
                            </GenLabelClearBtn>
                        </GenLabel>
                        <JsonEditor value={payloadJson} onChange={setPayloadJson} />
                    </GenSection>

                    <GenSection>
                        <GenLabel>
                            <GenLabelText>{isHmac(algorithm) ? L.secretLabel : "Private Key (PEM)"}</GenLabelText>
                            {isHmac(algorithm) && (
                                <GenLabelClearBtn onClick={() => setSecret("")} title="Clear secret" disabled={!formFieldsValid}>
                                    <Backspace sx={{ fontSize: 13 }} />
                                </GenLabelClearBtn>
                            )}
                        </GenLabel>
                        {isHmac(algorithm) ? (
                            <GenFieldArea style={{ padding: "12px 16px", minHeight: "auto" }}>
                                <Tooltip
                                    title={!formFieldsValid ? "Fix any errors in the JWT header to enable editing this field." : ""}
                                    placement="top"
                                    arrow
                                    disableHoverListener={formFieldsValid}
                                >
                                    <GenSecretRow style={{ margin: 0 }}>
                                        <GenSecretField
                                            name="secret"
                                            id="secret"
                                            type="text"
                                            value={secret}
                                            onChange={(e) => setSecret(e.target.value)}
                                            placeholder="Enter secret or key..."
                                            disabled={!formFieldsValid}
                                        />
                                        <B64ToggleBtn $active={b64} onClick={() => setB64((v) => !v)} disabled={!formFieldsValid}>
                                            {L.base64EncodedToggle}
                                        </B64ToggleBtn>
                                    </GenSecretRow>
                                </Tooltip>
                            </GenFieldArea>
                        ) : (
                            <Tooltip
                                title={!formFieldsValid ? "Fix any errors in the JWT header to enable editing this field." : ""}
                                placement="top"
                                arrow
                                disableHoverListener={formFieldsValid}
                            >
                                <KeyPemArea>
                                    <KeyPemTextarea
                                        value={privateKeyPem}
                                        onChange={(e) => setPrivateKeyPem(e.target.value)}
                                        placeholder={"-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----"}
                                        rows={6}
                                        spellCheck={false}
                                        disabled={!formFieldsValid}
                                    />
                                    <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                                        <GenKeyBtn onClick={handleGenerateKeyPair} disabled={isGeneratingKey || !formFieldsValid}>
                                            {isGeneratingKey ? "Generating…" : "Generate Key Pair"}
                                        </GenKeyBtn>
                                        {publicKeyPem && formFieldsValid && (
                                            <span style={{ fontSize: 11, color: "#22cc99", fontFamily: "Inter, sans-serif" }}>Key pair ready</span>
                                        )}
                                    </div>
                                    {publicKeyPem && (
                                        <>
                                            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                                                <div
                                                    style={{
                                                        fontSize: 10,
                                                        fontWeight: 700,
                                                        letterSpacing: "0.08em",
                                                        textTransform: "uppercase",
                                                        color: "var(--text-secondary)"
                                                    }}
                                                >
                                                    Public Key (PEM)
                                                </div>
                                                <ActionBtn onClick={handleCopyPublicKey} style={{ fontSize: 10, padding: "3px 8px" }}>
                                                    {copiedPubKey ? <Done sx={{ fontSize: 11 }} /> : <ContentCopy sx={{ fontSize: 11 }} />}
                                                    {copiedPubKey ? "Copied" : "Copy"}
                                                </ActionBtn>
                                            </div>
                                            <KeyPemTextarea value={publicKeyPem} readOnly rows={5} spellCheck={false} />
                                        </>
                                    )}
                                </KeyPemArea>
                            </Tooltip>
                        )}
                    </GenSection>
                </GenFormWrapper>

                {error && (
                    <ActionBar>
                        <GenErrorBadge>{error}</GenErrorBadge>
                    </ActionBar>
                )}
            </Panel>

            <Panel>
                <PanelHeader>
                    <PanelLabel>{L.tokenOutputLabel}</PanelLabel>
                </PanelHeader>
                <GenOutputSection>
                    <GenOutputContent>
                        {generatedToken ? (
                            <GenTokenOutput>
                                {(() => {
                                    const pts = generatedToken.split(".");
                                    if (pts.length === 3) {
                                        return (
                                            <>
                                                <span style={{ color: "#d97706", userSelect: "all", textShadow: "0 0 18px rgba(217,119,6,0.45)" }}>
                                                    {pts[0]}
                                                </span>
                                                <span style={{ color: "var(--text-secondary)", opacity: 0.35 }}>.</span>
                                                <span style={{ color: "#3b82f6", userSelect: "all", textShadow: "0 0 18px rgba(59,130,246,0.45)" }}>
                                                    {pts[1]}
                                                </span>
                                                <span style={{ color: "var(--text-secondary)", opacity: 0.35 }}>.</span>
                                                <span style={{ color: "#8b5cf6", userSelect: "all", textShadow: "0 0 18px rgba(139,92,246,0.45)" }}>
                                                    {pts[2]}
                                                </span>
                                            </>
                                        );
                                    }
                                    return generatedToken;
                                })()}
                            </GenTokenOutput>
                        ) : (
                            <EmptyState>
                                <span style={{ fontSize: 12, fontFamily: "Inter, sans-serif" }}>{L.generateEmptyState}</span>
                            </EmptyState>
                        )}
                    </GenOutputContent>
                    {generatedToken && !error && (
                        <ActionBar>
                            <Badge $type="info">{algorithm}</Badge>
                            {(() => {
                                try {
                                    const p = JSON.parse(payloadJson);
                                    if (p.exp) {
                                        const now = Math.floor(Date.now() / 1000);
                                        return <Badge $type={now > p.exp ? "error" : "success"}>{formatRelative(p.exp)}</Badge>;
                                    }
                                    return <Badge $type="warning">No expiry</Badge>;
                                } catch {
                                    return null;
                                }
                            })()}
                            <BtnGroup>
                                <ActionBtn onClick={handleCopyToken}>
                                    {copyIcon}
                                    {copyLabel}
                                </ActionBtn>
                                <ActionBtn onClick={handleSendToDecoder}>{L.sendToDecoderBtn}</ActionBtn>
                            </BtnGroup>
                        </ActionBar>
                    )}
                </GenOutputSection>
            </Panel>
        </ToolLayout>
    );
}

// ─── Main ─────────────────────────────────────────────────────────────────────

export default function JWTDecoder() {
    const [tab, setTab] = useState<"decode" | "generate">("decode");
    const [token, setToken] = useState("");
    const [showDetails, setShowDetails] = useState(true);
    const [secret, setSecret] = useState("");
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const selectionRef = useRef({ start: 0, end: 0 });
    const shouldFocusRef = useRef(false);

    const { chain, consumeChain } = useToolChain();

    useLayoutEffect(() => {
        const el = textareaRef.current;
        if (!el) return;
        el.style.height = "auto";
        el.style.height = `${el.scrollHeight}px`;
        if (shouldFocusRef.current) {
            shouldFocusRef.current = false;
            el.focus();
        }
        el.setSelectionRange(selectionRef.current.start, selectionRef.current.end);
    });

    const handleTokenChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        selectionRef.current = { start: e.target.selectionStart, end: e.target.selectionEnd };
        setToken(e.target.value);
    };

    const handleTokenDoubleClick = () => {
        if (!token || !textareaRef.current) return;
        const parts = token.split(".");
        if (parts.length !== 3) return;
        requestAnimationFrame(() => {
            if (!textareaRef.current) return;
            const pos = textareaRef.current.selectionStart;
            const end0 = parts[0].length;
            const end1 = end0 + 1 + parts[1].length;
            let start;
            let end;
            if (pos <= end0) {
                start = 0;
                end = end0;
            } else if (pos <= end1) {
                start = end0 + 1;
                end = end1;
            } else {
                start = end1 + 1;
                end = token.length;
            }
            selectionRef.current = { start, end };
            textareaRef.current.setSelectionRange(start, end);
        });
    };

    const setTokenEnd = (value: string) => {
        selectionRef.current = { start: value.length, end: value.length };
        shouldFocusRef.current = true;
        setToken(value);
    };

    useEffect(() => {
        const chained = consumeChain("/jwt-decoder");
        if (chained) {
            setTab("decode");
            if (typeof chained === "string") {
                setTokenEnd(chained as string);
            } else if (typeof chained === "object") {
                if (chained.generatedToken) {
                    setToken(chained.generatedToken as string);
                }
                if (chained.secret || chained.publicKeyPem) {
                    setSecret((chained.secret || chained.publicKeyPem) as string);
                }
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [consumeChain, chain]);

    const {
        header,
        payload,
        signature,
        badges,
        error: decodeError
    } = useMemo(() => {
        if (!token.trim()) return { header: null, payload: null, signature: null, badges: [], error: "" };
        const parts = token.trim().split(".");
        if (parts.length !== 3) return { header: null, payload: null, signature: null, badges: [], error: L.invalidJwtError };
        const h = safeDecodeSegment(parts[0]);
        const p = safeDecodeSegment(parts[1]);
        if (!h || !p) return { header: null, payload: null, signature: null, badges: [], error: L.decodeError };
        const now = Math.floor(Date.now() / 1000);
        const computed: Array<{ label: string; type: string }> = [];
        if (h.alg) computed.push({ label: String(h.alg), type: "info" });
        if (p.exp) {
            computed.push({ label: formatRelative(p.exp as number), type: now > (p.exp as number) ? "error" : "success" });
        } else {
            computed.push({ label: "No expiry", type: "warning" });
        }
        if (p.nbf && now < (p.nbf as number)) computed.push({ label: "Not valid yet", type: "warning" });
        if (p.iss) computed.push({ label: `iss: ${p.iss}`, type: "info" });
        if (p.sub) computed.push({ label: `sub: ${p.sub}`, type: "info" });
        return { header: h, payload: p, signature: parts[2], badges: computed, error: "" };
    }, [token]);

    const renderHighlight = (raw: string) => {
        const parts = raw.split(".");
        if (parts.length !== 3) return <span style={{ color: "var(--text-primary)" }}>{raw}</span>;
        return (
            <>
                <span style={{ color: "#d97706", textShadow: "0 0 16px rgba(217,119,6,0.35)" }}>{parts[0]}</span>
                <span style={{ color: "var(--text-secondary)", opacity: 0.35 }}>.</span>
                <span style={{ color: "#3b82f6", textShadow: "0 0 16px rgba(59,130,246,0.35)" }}>{parts[1]}</span>
                <span style={{ color: "var(--text-secondary)", opacity: 0.35 }}>.</span>
                <span style={{ color: "#8b5cf6", textShadow: "0 0 16px rgba(139,92,246,0.35)" }}>{parts[2]}</span>
            </>
        );
    };

    const isValid = !!header && !decodeError;

    return (
        <>
            <TabStrip style={{ marginBottom: 8 }}>
                <TabBtn $active={tab === "decode"} onClick={() => setTab("decode")}>
                    {L.decodeTab}
                </TabBtn>
                <TabBtn $active={tab === "generate"} onClick={() => setTab("generate")}>
                    {L.generateTab}
                </TabBtn>
            </TabStrip>
            {tab === "generate" ? (
                <GenerateTab />
            ) : (
                <ToolLayout>
                    <Panel>
                        <PanelHeader>
                            <PanelLabel>{L.jwtTokenLabel}</PanelLabel>
                            <BtnGroup>
                                <ActionBtn onClick={() => setTokenEnd(EXAMPLE_TOKEN)}>{L.generateExampleBtn}</ActionBtn>
                                <LocalBadge />
                            </BtnGroup>
                        </PanelHeader>
                        <TokenWrapper>
                            <TokenHighlight aria-hidden="true">
                                {token ? (
                                    renderHighlight(token)
                                ) : (
                                    <span style={{ color: "var(--text-secondary)", opacity: 0.4 }}>{L.placeholder}</span>
                                )}
                            </TokenHighlight>
                            <TokenTextarea
                                ref={textareaRef}
                                value={token}
                                onChange={handleTokenChange}
                                onDoubleClick={handleTokenDoubleClick}
                                spellCheck={false}
                                autoFocus
                            />
                        </TokenWrapper>
                        {token && (
                            <ActionBar>
                                <ActionBtn $danger onClick={() => setToken("")}>
                                    {C.clearBtn}
                                </ActionBtn>
                                {isValid ? (
                                    <StatusBadge $valid>{L.validJwtLabel}</StatusBadge>
                                ) : (
                                    decodeError && <StatusBadge>{decodeError}</StatusBadge>
                                )}
                            </ActionBar>
                        )}
                        {badges.length > 0 && (
                            <BadgeRow>
                                {badges.map((b) => (
                                    <Badge key={b.label} $type={b.type}>
                                        {b.label}
                                    </Badge>
                                ))}
                            </BadgeRow>
                        )}
                    </Panel>
                    <Panel style={{ maxHeight: "calc(100vh - 180px)", overflowY: "auto" }}>
                        {header ? (
                            <>
                                <ClaimsCard
                                    title={L.decodedHeaderLabel}
                                    data={header}
                                    showDetails={showDetails}
                                    onToggleDetails={() => setShowDetails((v) => !v)}
                                />
                                <ClaimsCard
                                    title={L.decodedPayloadLabel}
                                    data={payload}
                                    showDetails={showDetails}
                                    onToggleDetails={() => setShowDetails((v) => !v)}
                                />
                                <SigVerify
                                    token={token.trim()}
                                    alg={typeof header?.alg === "string" ? header.alg : ""}
                                    signature={signature}
                                    secretKey={secret}
                                />
                            </>
                        ) : (
                            <EmptyState>
                                <span style={{ fontSize: 22, fontFamily: "var(--font-mono)" }}>{}</span>
                                <span style={{ fontSize: 12, fontFamily: "Inter, sans-serif" }}>{L.emptyStateMessage}</span>
                            </EmptyState>
                        )}
                    </Panel>
                </ToolLayout>
            )}
        </>
    );
}
