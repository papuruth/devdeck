// @ts-nocheck
import { Check, ContentCopy } from "@mui/icons-material";
import localization from "localization";
import React, { useCallback, useEffect, useState } from "react";
import { useToolChain } from "context/ToolChainContext";
import styled, { keyframes } from "styled-components";
import {
    ActionBar,
    ActionBtn,
    ActionBtnGroup,
    EmptyState,
    ModeBtn,
    ModeToggle,
    Panel,
    PanelHeader,
    PanelLabel,
    TabBtn,
    ToolLayout
} from "components/Shared/ToolKit";

const { uuidGenerator: L } = localization;

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

function generateV4() {
    if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") return crypto.randomUUID();
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
        const r = Math.floor(Math.random() * 16);
        return (c === "x" ? r : (r % 4) + 8).toString(16);
    });
}

/* eslint-disable no-bitwise */
function generateV1() {
    const now = Date.now();
    const t = now + 122192928000000000; // offset to UUID epoch
    const tLow = (t & 0xffffffff) >>> 0;
    const tMid = ((t / 0x100000000) & 0xffff) >>> 0;
    const tHigh = (((t / 0x1000000000000) & 0x0fff) | 0x1000) >>> 0;
    const clockSeq = (Math.floor(Math.random() * 0x3fff) | 0x8000) >>> 0;
    const node = Array.from({ length: 6 }, () =>
        Math.floor(Math.random() * 256)
            .toString(16)
            .padStart(2, "0")
    ).join("");
    return [
        tLow.toString(16).padStart(8, "0"),
        tMid.toString(16).padStart(4, "0"),
        tHigh.toString(16).padStart(4, "0"),
        clockSeq.toString(16).padStart(4, "0"),
        node
    ].join("-");
}

function generateV7() {
    // eslint-disable-next-line no-undef
    const ms = BigInt(Date.now());
    // eslint-disable-next-line no-undef
    const rand = Array.from(window.crypto.getRandomValues(new Uint8Array(10)));
    // v7: 48 bits ms | 4 bits ver=7 | 12 bits rand | 2 bits var | 62 bits rand
    const msHex = ms.toString(16).padStart(12, "0");
    const randA = ((rand[0] & 0x0f) | 0x70).toString(16) + rand[1].toString(16).padStart(2, "0").slice(0, 2);
    const randB =
        ((rand[2] & 0x3f) | 0x80).toString(16) +
        rand
            .slice(3, 6)
            .map((b) => b.toString(16).padStart(2, "0"))
            .join("");
    const randC = rand
        .slice(6)
        .map((b) => b.toString(16).padStart(2, "0"))
        .join("");
    return `${msHex.slice(0, 8)}-${msHex.slice(8, 12)}-${randA.slice(0, 4)}-${randB.slice(0, 4)}-${randB.slice(4)}${randC}`.slice(0, 36);
}

interface UUIDVersion {
    value: "v1" | "v4" | "v7";
    label: string;
    fn: () => string;
}

const VERSIONS: UUIDVersion[] = [
    { value: "v1", label: "v1", fn: generateV1 },
    { value: "v4", label: "v4", fn: generateV4 },
    { value: "v7", label: "v7", fn: generateV7 }
];

const VERSION_DESCRIPTIONS: Record<"v1" | "v4" | "v7", string> = {
    v1: "Time-based: encodes current timestamp + node address",
    v4: "Random: cryptographically random 128 bits",
    v7: "Unix-time ordered: ms-precision timestamp prefix + random"
};

const ControlRow = styled.div`
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 10px 16px;
    border-bottom: 1px solid var(--border-color);
`;

const CountLabel = styled.span`
    font-size: 11px;
    font-weight: 600;
    font-family: "Inter", sans-serif;
    color: var(--text-secondary);
    text-transform: uppercase;
    letter-spacing: 0.08em;
`;

const CountInput = styled.input`
    width: 60px;
    background: var(--bg-input);
    border: 1px solid var(--border-color);
    border-radius: 4px;
    color: var(--text-primary);
    font-family: var(--font-mono);
    font-size: 13px;
    padding: 4px 8px;
    text-align: center;
    outline: none;
    &:focus {
        border-color: #22cc99;
    }
`;

const DescBadge = styled.div`
    padding: 8px 16px;
    font-size: 11px;
    font-family: "Inter", sans-serif;
    color: #22cc99;
    background: rgba(34, 204, 153, 0.08);
    border-bottom: 1px solid var(--border-color);
`;

const UUIDList = styled.div`
    flex: 1;
    overflow: auto;
`;

const UUIDRow = styled.div`
    display: flex;
    align-items: center;
    padding: 10px 16px;
    border-bottom: 1px solid var(--border-color);
    gap: 12px;
`;

const UUIDText = styled.span`
    font-size: 12px;
    font-family: var(--font-mono);
    color: var(--text-primary);
    flex: 1;
    letter-spacing: 0.02em;
`;

const BtnGroup = styled(ActionBtnGroup)`
    margin-left: auto;
`;

const TabStripWrapper = styled.div`
    display: flex;
    border-bottom: 1px solid var(--border-color);
    background: var(--bg-panel-header);
`;

const UUIDInput = styled.input`
    width: 100%;
    background: var(--bg-input);
    color: var(--text-primary);
    border: none;
    outline: none;
    padding: 16px;
    font-family: var(--font-mono);
    font-size: 12px;
    &:focus {
        box-shadow: inset 0 0 0 2px rgba(34, 204, 153, 0.3);
    }
    &::placeholder {
        color: var(--text-secondary);
        opacity: 0.4;
    }
`;

const ValidationBadge = styled.div<{ $valid: boolean }>`
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 4px 10px;
    border-radius: 4px;
    font-size: 11px;
    font-weight: 500;
    font-family: "Inter", sans-serif;
    animation: ${fadeInDown} 0.2s ease;
    color: ${(p) => (p.$valid ? "#22cc99" : "#ef4444")};
    background: ${(p) => (p.$valid ? "rgba(34,204,153,0.1)" : "rgba(239,68,68,0.06)")};
    border: 1px solid ${(p) => (p.$valid ? "rgba(34,204,153,0.3)" : "rgba(239,68,68,0.3)")};
    margin: 0 16px 0;
    margin-top: 8px;
`;

const DetailsGrid = styled.div`
    display: grid;
    grid-template-columns: 100px 1fr;
    gap: 12px;
    padding: 16px;
    border-bottom: 1px solid var(--border-color);
    align-items: center;
`;

const DetailLabel = styled.span`
    font-size: 10px;
    font-weight: 600;
    font-family: "Inter", sans-serif;
    text-transform: uppercase;
    color: var(--text-secondary);
    letter-spacing: 0.06em;
`;

const DetailValue = styled.span`
    font-size: 12px;
    font-family: var(--font-mono);
    color: var(--text-primary);
    word-break: break-all;
`;

const NormalizedSection = styled.div`
    padding: 16px;
    border-bottom: 1px solid var(--border-color);
`;

const NormalizedRow = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 8px 0;
    gap: 10px;
    font-size: 11px;
    font-family: "Inter", sans-serif;
    color: var(--text-secondary);

    &:not(:last-child) {
        border-bottom: 1px solid var(--border-color);
        padding-bottom: 8px;
        margin-bottom: 8px;
    }
`;

const NormalizedValue = styled.code`
    flex: 1;
    font-size: 11px;
    font-family: var(--font-mono);
    color: var(--text-primary);
    background: var(--bg-input);
    padding: 4px 8px;
    border-radius: 3px;
    word-break: break-all;
`;

const RowCopyBtn = styled.button`
    background: none;
    border: none;
    cursor: pointer;
    color: var(--text-secondary);
    display: flex;
    align-items: center;
    padding: 2px 4px;
    border-radius: 3px;
    flex-shrink: 0;
    &:hover {
        color: var(--text-primary);
        background: rgba(255, 255, 255, 0.05);
    }
`;

const SectionLabel = styled.div`
    font-size: 10px;
    font-weight: 600;
    font-family: "Inter", sans-serif;
    text-transform: uppercase;
    color: var(--text-secondary);
    letter-spacing: 0.06em;
    margin-bottom: 10px;
`;

function validateUUID(uuid: string): boolean {
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
    return uuidRegex.test(uuid);
}

function parseUUID(uuid: string) {
    const normalized = uuid.toLowerCase().replace(/-/g, "");
    const versionChar = parseInt(normalized[12], 16);
    const variantBits = parseInt(normalized[16], 16).toString(2).padStart(4, "0").substring(0, 2);
    const variant = variantBits === "10" ? "RFC 4122" : "Unknown";

    const isNil = normalized === "00000000000000000000000000000000";
    const isMax = normalized === "ffffffffffffffffffffffffffffffff";

    let timestamp = null;
    if (versionChar === 1) {
        const timeLow = normalized.slice(0, 8);
        const timeMid = normalized.slice(8, 12);
        const timeHi = normalized.slice(12, 16);
        const timeValue = parseInt(timeHi.slice(1) + timeMid + timeLow, 16);
        const ms = Math.floor((timeValue - 122192928000000000) / 10000);
        timestamp = new Date(ms).toISOString();
    }

    return { versionChar, variant, isNil, isMax, timestamp };
}

export default function UUIDGenerator() {
    const [tab, setTab] = useState<"generate" | "inspect">("generate");
    const [count, setCount] = useState(5);
    const [uuids, setUuids] = useState<string[]>([]);
    const [version, setVersion] = useState<"v1" | "v4" | "v7">("v4");
    const [copiedAll, setCopiedAll] = useState(false);
    const [copiedUuid, setCopiedUuid] = useState<string | null>(null);
    const [inspectInput, setInspectInput] = useState("");
    const [copiedNormalized, setCopiedNormalized] = useState<string | null>(null);
    const { consumeChain } = useToolChain();

    useEffect(() => {
        const chained = consumeChain("/uuid-generator");
        if (chained && typeof chained === "string") {
            setInspectInput(chained.trim());
            setTab("inspect");
        }
    }, [consumeChain]);

    const generate = useCallback(() => {
        const { fn } = VERSIONS.find((v) => v.value === version) || VERSIONS[1];
        setUuids(Array.from({ length: count }, fn));
    }, [count, version]);

    const copyAll = useCallback(() => {
        if (!uuids.length || !window?.navigator?.clipboard) return;
        window.navigator.clipboard.writeText(uuids.join("\n")).then(() => {
            setCopiedAll(true);
            setTimeout(() => setCopiedAll(false), 1500);
        });
    }, [uuids]);

    const copyOne = useCallback((uuid: string) => {
        if (!window?.navigator?.clipboard) return;
        window.navigator.clipboard.writeText(uuid).then(() => {
            setCopiedUuid(uuid);
            setTimeout(() => setCopiedUuid(null), 1500);
        });
    }, []);

    const copyNormalized = useCallback((value: string) => {
        if (!window?.navigator?.clipboard) return;
        window.navigator.clipboard.writeText(value).then(() => {
            setCopiedNormalized(value);
            setTimeout(() => setCopiedNormalized(null), 1500);
        });
    }, []);

    const isValidUUID = validateUUID(inspectInput);
    const uuidData = isValidUUID ? parseUUID(inspectInput) : null;
    const normalized = inspectInput.toLowerCase().replace(/-/g, "");

    if (tab === "inspect") {
        return (
            <ToolLayout>
                <Panel>
                    <PanelHeader>
                        <PanelLabel>{L.uuidInputLabel}</PanelLabel>
                    </PanelHeader>
                    <UUIDInput
                        type="text"
                        placeholder={L.uuidInputPlaceholder}
                        value={inspectInput}
                        onChange={(e) => setInspectInput(e.target.value)}
                        spellCheck={false}
                    />
                    {inspectInput && (
                        <ValidationBadge $valid={isValidUUID}>
                            {isValidUUID ? "✓" : "✕"}
                            {isValidUUID ? L.validLabel : L.invalidLabel}
                        </ValidationBadge>
                    )}
                </Panel>

                <Panel>
                    <PanelHeader>
                        <PanelLabel>{L.detailsLabel}</PanelLabel>
                    </PanelHeader>
                    {isValidUUID && uuidData ? (
                        <>
                            <DetailsGrid>
                                <DetailLabel>{L.versionLabel}</DetailLabel>
                                <DetailValue>v{uuidData.versionChar}</DetailValue>
                                <DetailLabel>{L.variantLabel}</DetailLabel>
                                <DetailValue>{uuidData.variant}</DetailValue>
                                <DetailLabel>{L.formatLabel}</DetailLabel>
                                <DetailValue>RFC 4122</DetailValue>
                                <DetailLabel>{L.nilLabel}</DetailLabel>
                                <DetailValue>{uuidData.isNil ? "Yes" : "No"}</DetailValue>
                                <DetailLabel>{L.maxLabel}</DetailLabel>
                                <DetailValue>{uuidData.isMax ? "Yes" : "No"}</DetailValue>
                                {uuidData.timestamp && (
                                    <>
                                        <DetailLabel>{L.timestampLabel}</DetailLabel>
                                        <DetailValue>{uuidData.timestamp}</DetailValue>
                                    </>
                                )}
                            </DetailsGrid>
                            <NormalizedSection>
                                <SectionLabel>{L.normalizedLabel}</SectionLabel>
                                <NormalizedRow>
                                    <span>{L.upperCaseLabel}</span>
                                    <NormalizedValue>{inspectInput.toUpperCase()}</NormalizedValue>
                                    <RowCopyBtn
                                        onClick={() => copyNormalized(inspectInput.toUpperCase())}
                                        title="Copy"
                                    >
                                        {copiedNormalized === inspectInput.toUpperCase() ? (
                                            <Check style={{ fontSize: 13 }} />
                                        ) : (
                                            <ContentCopy style={{ fontSize: 13 }} />
                                        )}
                                    </RowCopyBtn>
                                </NormalizedRow>
                                <NormalizedRow>
                                    <span>{L.lowerCaseLabel}</span>
                                    <NormalizedValue>{inspectInput.toLowerCase()}</NormalizedValue>
                                    <RowCopyBtn
                                        onClick={() => copyNormalized(inspectInput.toLowerCase())}
                                        title="Copy"
                                    >
                                        {copiedNormalized === inspectInput.toLowerCase() ? (
                                            <Check style={{ fontSize: 13 }} />
                                        ) : (
                                            <ContentCopy style={{ fontSize: 13 }} />
                                        )}
                                    </RowCopyBtn>
                                </NormalizedRow>
                                <NormalizedRow>
                                    <span>{L.noHyphensLabel}</span>
                                    <NormalizedValue>{normalized}</NormalizedValue>
                                    <RowCopyBtn
                                        onClick={() => copyNormalized(normalized)}
                                        title="Copy"
                                    >
                                        {copiedNormalized === normalized ? (
                                            <Check style={{ fontSize: 13 }} />
                                        ) : (
                                            <ContentCopy style={{ fontSize: 13 }} />
                                        )}
                                    </RowCopyBtn>
                                </NormalizedRow>
                            </NormalizedSection>
                        </>
                    ) : (
                        <EmptyState>
                            <span>{L.inspectEmptyState}</span>
                        </EmptyState>
                    )}
                </Panel>
            </ToolLayout>
        );
    }

    return (
        <>
            <TabStripWrapper>
                <TabBtn $active={tab === "generate"} onClick={() => setTab("generate" as const)}>
                    {L.generateTab}
                </TabBtn>
                <TabBtn $active={tab === "inspect"} onClick={() => setTab("inspect" as const)}>
                    {L.inspectTab}
                </TabBtn>
            </TabStripWrapper>
            <ToolLayout>
            <Panel>
                <PanelHeader>
                    <PanelLabel>{L.settingsLabel}</PanelLabel>
                </PanelHeader>
                <ModeToggle>
                    {VERSIONS.map(({ value, label }) => (
                        <ModeBtn key={value} $active={version === value} onClick={() => setVersion(value)}>
                            {label}
                        </ModeBtn>
                    ))}
                </ModeToggle>
                <DescBadge>{VERSION_DESCRIPTIONS[version]}</DescBadge>
                <ControlRow>
                    <CountLabel>{L.countInputLabel}</CountLabel>
                    <CountInput
                        type="number"
                        min={1}
                        max={100}
                        value={count}
                        onChange={(e) => setCount(Math.max(1, Math.min(100, Number(e.target.value) || 1)))}
                    />
                </ControlRow>
                <ActionBar>
                    <BtnGroup>
                        <ActionBtn onClick={generate}>{L.generateBtnLabel}</ActionBtn>
                    </BtnGroup>
                </ActionBar>
            </Panel>

            <Panel>
                <PanelHeader>
                    <PanelLabel>{L.uuidsLabel}</PanelLabel>
                </PanelHeader>
                {uuids.length > 0 ? (
                    <>
                        <UUIDList>
                            {uuids.map((uuid, i) => (
                                // eslint-disable-next-line react/no-array-index-key
                                <UUIDRow key={i}>
                                    <UUIDText>{uuid}</UUIDText>
                                    <RowCopyBtn onClick={() => copyOne(uuid)} title="Copy">
                                        {copiedUuid === uuid ? <Check style={{ fontSize: 13 }} /> : <ContentCopy style={{ fontSize: 13 }} />}
                                    </RowCopyBtn>
                                </UUIDRow>
                            ))}
                        </UUIDList>
                        <ActionBar>
                            <BtnGroup>
                                <ActionBtn $success={copiedAll} onClick={copyAll}>
                                    {copiedAll ? <Check style={{ fontSize: 11 }} /> : <ContentCopy style={{ fontSize: 11 }} />}
                                    {copiedAll ? L.copiedAll : L.copyAllBtn}
                                </ActionBtn>
                            </BtnGroup>
                        </ActionBar>
                    </>
                ) : (
                    <EmptyState>
                        <span style={{ fontSize: 15, fontFamily: "var(--font-mono)", color: "var(--text-secondary)" }}>
                            xxxxxxxx-xxxx-xxxx
                        </span>
                        <span style={{ fontSize: 12, fontFamily: "Inter, sans-serif" }}>{L.emptyStateMessage}</span>
                    </EmptyState>
                )}
            </Panel>
        </ToolLayout>
        </>
    );
}
