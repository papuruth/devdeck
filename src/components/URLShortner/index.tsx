import { Check, ContentCopy, Download, OpenInNew, Link as LinkIcon, AutoAwesome, QrCode2 } from "@mui/icons-material";
import localization from "localization";
import QRCode from "qrcode";
import React, { useCallback, useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";
import { ActionBtn, Panel } from "components/Shared/ToolKit";
import ToolSkeleton from "components/Shared/ToolSkeleton";
import toast from "utils/toast";
import { useToolChain } from "context/ToolChainContext";
import api from "services/api";

const { urlShortner: L } = localization;

const fadeUp = keyframes`
    from { opacity: 0; transform: translateY(8px); }
    to   { opacity: 1; transform: translateY(0); }
`;

const PageWrap = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
    width: 100%;
`;

/* ─── Input hero card ─────────────────── */

const HeroCard = styled.div`
    background: var(--bg-surface);
    border-radius: var(--radius-panel);
    box-shadow: var(--shadow-panel);
    overflow: hidden;
`;

const HeroBanner = styled.div`
    background: linear-gradient(135deg, #0f2027 0%, #1a3a2a 50%, #0f2027 100%);
    padding: 24px 24px 20px;
    display: flex;
    flex-direction: column;
    gap: 6px;
    position: relative;
    overflow: hidden;
    &::before {
        content: "";
        position: absolute;
        inset: 0;
        background: radial-gradient(ellipse at 70% 50%, rgba(34, 204, 153, 0.12) 0%, transparent 60%);
        pointer-events: none;
    }
`;

const HeroTitle = styled.div`
    font-size: 13px;
    font-weight: 700;
    font-family: "Inter", sans-serif;
    color: rgba(255, 255, 255, 0.9);
    letter-spacing: 0.04em;
    display: flex;
    align-items: center;
    gap: 8px;
`;

const HeroSub = styled.div`
    font-size: 11px;
    font-family: "Inter", sans-serif;
    color: rgba(255, 255, 255, 0.4);
    letter-spacing: 0.02em;
`;

const InputArea = styled.div`
    padding: 16px 20px 20px;
    background: var(--bg-surface);
`;

const UrlRow = styled.div`
    display: flex;
    align-items: center;
    background: var(--bg-input);
    border: 1.5px solid var(--border-color);
    border-radius: 10px;
    overflow: hidden;
    transition: border-color 0.15s, box-shadow 0.15s;
    &:focus-within {
        border-color: #22cc99;
        box-shadow: 0 0 0 3px rgba(34, 204, 153, 0.1);
    }
`;

const UrlPrefix = styled.div`
    padding: 0 4px 0 14px;
    color: var(--text-secondary);
    display: flex;
    align-items: center;
    flex-shrink: 0;
    opacity: 0.5;
`;

const UrlInput = styled.input`
    flex: 1;
    background: transparent;
    border: none;
    outline: none;
    color: var(--text-primary);
    font-family: var(--font-mono);
    font-size: 13px;
    padding: 14px 10px;
    min-width: 0;
    &::placeholder {
        color: var(--text-secondary);
        opacity: 0.4;
    }
    &:disabled {
        opacity: 0.45;
        cursor: not-allowed;
    }
`;

const UrlClearBtn = styled.button`
    padding: 0 10px;
    background: none;
    border: none;
    cursor: pointer;
    color: var(--text-secondary);
    display: flex;
    align-items: center;
    font-size: 18px;
    line-height: 1;
    flex-shrink: 0;
    opacity: 0.5;
    &:hover {
        opacity: 1;
        color: var(--text-primary);
    }
`;

const ShortenBtn = styled.button`
    flex-shrink: 0;
    margin: 6px 6px 6px 2px;
    background: linear-gradient(135deg, #22cc99 0%, #1aaa80 100%);
    border: none;
    border-radius: 8px;
    color: #0b1220;
    font-family: "Inter", sans-serif;
    font-size: 12px;
    font-weight: 700;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    padding: 9px 18px;
    cursor: pointer;
    white-space: nowrap;
    transition: opacity 0.15s, transform 0.1s;
    display: flex;
    align-items: center;
    gap: 6px;
    box-shadow: 0 2px 12px rgba(34, 204, 153, 0.35);
    &:hover:not(:disabled) {
        opacity: 0.9;
        transform: translateY(-1px);
        box-shadow: 0 4px 16px rgba(34, 204, 153, 0.45);
    }
    &:active:not(:disabled) {
        transform: translateY(0);
    }
    &:disabled {
        background: var(--border-color);
        color: var(--text-secondary);
        box-shadow: none;
        cursor: not-allowed;
    }
`;

const PasteBtn = styled.button`
    background: none;
    border: 1px solid var(--border-color);
    border-radius: 6px;
    color: var(--text-secondary);
    font-family: "Inter", sans-serif;
    font-size: 11px;
    font-weight: 500;
    padding: 5px 10px;
    cursor: pointer;
    transition: all 0.12s;
    margin-top: 10px;
    &:hover {
        border-color: rgba(34, 204, 153, 0.4);
        color: #22cc99;
        background: rgba(34, 204, 153, 0.05);
    }
`;

/* ─── Result layout ───────────────────── */

const ResultGrid = styled.div`
    display: grid;
    grid-template-columns: 1fr auto;
    gap: 16px;
    align-items: start;
    animation: ${fadeUp} 0.3s ease;
    @media (max-width: 640px) {
        grid-template-columns: 1fr;
    }
`;

/* ─── Result card ─────────────────────── */

const ResultCard = styled.div`
    background: var(--bg-surface);
    border-radius: var(--radius-panel);
    box-shadow: var(--shadow-panel);
    overflow: hidden;
`;

const ResultBanner = styled.div`
    padding: 20px 24px 16px;
    background: linear-gradient(135deg, rgba(34, 204, 153, 0.08) 0%, rgba(34, 204, 153, 0.02) 100%);
    border-bottom: 1px solid rgba(34, 204, 153, 0.12);
    display: flex;
    flex-direction: column;
    gap: 4px;
`;

const ResultLabel = styled.div`
    font-size: 10px;
    font-weight: 700;
    font-family: "Inter", sans-serif;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    color: var(--text-secondary);
`;

const ResultUrl = styled.a`
    font-size: 20px;
    font-family: var(--font-mono);
    font-weight: 600;
    color: #22cc99;
    word-break: break-all;
    text-decoration: none;
    letter-spacing: -0.01em;
    display: block;
    margin-top: 2px;
    &:hover {
        text-decoration: underline;
        text-underline-offset: 3px;
    }
`;

const OriginalUrlRow = styled.div`
    padding: 8px 24px 12px;
    border-bottom: 1px solid var(--border-color);
    display: flex;
    align-items: center;
    gap: 6px;
`;

const OriginalUrlText = styled.span`
    font-size: 11px;
    font-family: var(--font-mono);
    color: var(--text-secondary);
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    flex: 1;
    min-width: 0;
    opacity: 0.7;
`;

const ResultActions = styled.div`
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 14px 20px;
    flex-wrap: wrap;
`;

const PrimaryBtn = styled.button`
    display: flex;
    align-items: center;
    gap: 6px;
    background: linear-gradient(135deg, #22cc99 0%, #1aaa80 100%);
    color: #0b1220;
    border: none;
    border-radius: 8px;
    padding: 9px 18px;
    font-size: 12px;
    font-weight: 700;
    font-family: "Inter", sans-serif;
    letter-spacing: 0.04em;
    cursor: pointer;
    transition: all 0.15s;
    box-shadow: 0 2px 10px rgba(34, 204, 153, 0.3);
    &:hover {
        opacity: 0.9;
        transform: translateY(-1px);
        box-shadow: 0 4px 14px rgba(34, 204, 153, 0.4);
    }
    &:active {
        transform: none;
    }
`;

const SecondaryBtn = styled.a`
    display: flex;
    align-items: center;
    gap: 6px;
    background: none;
    color: var(--text-secondary);
    border: 1px solid var(--border-color);
    border-radius: 8px;
    padding: 9px 16px;
    font-size: 12px;
    font-weight: 500;
    font-family: "Inter", sans-serif;
    cursor: pointer;
    text-decoration: none;
    transition: all 0.12s;
    &:hover {
        border-color: rgba(34, 204, 153, 0.4);
        color: #22cc99;
        background: rgba(34, 204, 153, 0.05);
    }
`;

const ResetBtn = styled.button`
    display: flex;
    align-items: center;
    gap: 6px;
    background: none;
    color: var(--text-secondary);
    border: 1px solid var(--border-color);
    border-radius: 8px;
    padding: 9px 16px;
    font-size: 12px;
    font-weight: 500;
    font-family: "Inter", sans-serif;
    cursor: pointer;
    transition: all 0.12s;
    margin-left: auto;
    &:hover {
        border-color: rgba(239, 68, 68, 0.4);
        color: #ef4444;
        background: rgba(239, 68, 68, 0.05);
    }
`;

/* ─── QR card ─────────────────────────── */

const QrCard = styled.div`
    background: var(--bg-surface);
    border-radius: var(--radius-panel);
    box-shadow: var(--shadow-panel);
    overflow: hidden;
    display: flex;
    flex-direction: column;
    align-items: center;
    min-width: 180px;
`;

const QrCardHeader = styled.div`
    width: 100%;
    padding: 10px 16px;
    border-bottom: 1px solid var(--border-color);
    background: rgba(0, 0, 0, 0.03);
    display: flex;
    align-items: center;
    gap: 6px;
`;

const QrCardLabel = styled.span`
    font-size: 10px;
    font-weight: 700;
    font-family: "Inter", sans-serif;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    color: var(--text-secondary);
`;

const QrImageWrap = styled.div`
    padding: 16px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 12px;
`;

const QrImg = styled.img`
    width: 140px;
    height: 140px;
    border-radius: 10px;
    border: 1px solid var(--border-color);
    display: block;
    background: #fff;
`;

/* ─── Empty state ─────────────────────── */

const EmptyPanel = styled.div`
    background: var(--bg-surface);
    border-radius: var(--radius-panel);
    box-shadow: var(--shadow-panel);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 12px;
    padding: 52px 24px;
    text-align: center;
`;

const EmptyIcon = styled.div`
    width: 52px;
    height: 52px;
    border-radius: 14px;
    background: rgba(34, 204, 153, 0.08);
    border: 1px solid rgba(34, 204, 153, 0.15);
    display: flex;
    align-items: center;
    justify-content: center;
    color: #22cc99;
    opacity: 0.7;
`;

const EmptyTitle = styled.div`
    font-size: 13px;
    font-weight: 600;
    font-family: "Inter", sans-serif;
    color: var(--text-primary);
    opacity: 0.5;
`;

const EmptySub = styled.div`
    font-size: 11px;
    font-family: "Inter", sans-serif;
    color: var(--text-secondary);
    opacity: 0.5;
    max-width: 240px;
    line-height: 1.6;
`;

function URLShortner() {
    const [url, setURL] = useState("");
    const [copied, setCopied] = useState(false);
    const [isLoading, setisLoading] = useState(false);
    const [qrDataUrl, setQrDataUrl] = useState<string | null>(null);
    const [shortenedLink, setShortenedLink] = useState("");
    const { consumeChain } = useToolChain();

    useEffect(() => {
        const chained = consumeChain ? consumeChain("/url-shortener") : null;
        if (chained && typeof chained === "string") setURL(chained);
    }, [consumeChain]);

    useEffect(() => {
        if (isLoading && shortenedLink) setisLoading(false);
    }, [shortenedLink, isLoading]);

    useEffect(() => {
        if (shortenedLink) {
            QRCode.toDataURL(shortenedLink, { width: 280, margin: 1, color: { dark: "#000000", light: "#ffffff" } })
                .then((dataUrl) => setQrDataUrl(dataUrl))
                .catch(() => setQrDataUrl(null));
        } else {
            setQrDataUrl(null);
        }
    }, [shortenedLink]);

    const handlePaste = async () => {
        try {
            const text = await window.navigator.clipboard.readText();
            if (text?.trim()) setURL(text.trim());
        } catch {
            /* ignore */
        }
    };

    const shortenURL = async () => {
        try {
            const urlObj = new URL(url);
            setisLoading(true);
            const res = await api.post("/api/shorten", { url: urlObj.href });
            setShortenedLink(res?.data?.shortURL || "");
        } catch (error) {
            setisLoading(false);
            const errorMessage = error instanceof Error ? error.message : "Failed to shorten URL";
            toast.error((error as any)?.message ?? errorMessage);
        }
    };

    const resetState = () => {
        setURL("");
        setShortenedLink("");
        setQrDataUrl(null);
    };

    const handleCopy = useCallback(() => {
        if (!window?.navigator?.clipboard) return;
        window.navigator.clipboard.writeText(shortenedLink).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 1800);
        });
    }, [shortenedLink]);

    const downloadQR = () => {
        if (!qrDataUrl) return;
        const a = document.createElement("a");
        a.href = qrDataUrl;
        a.download = "short-url-qr.png";
        a.click();
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter" && url && !shortenedLink && !isLoading) shortenURL();
    };

    function renderResult() {
        if (shortenedLink) return null;
        if (isLoading) return <Panel><ToolSkeleton rows={3} /></Panel>;
        return (
            <EmptyPanel>
                <EmptyIcon><LinkIcon style={{ fontSize: 24 }} /></EmptyIcon>
                <EmptyTitle>Ready to shorten</EmptyTitle>
                <EmptySub>{L.emptyStateMessage}</EmptySub>
            </EmptyPanel>
        );
    }

    return (
        <PageWrap>
            <HeroCard>
                <HeroBanner>
                    <HeroTitle>
                        <AutoAwesome style={{ fontSize: 15, color: "#22cc99" }} />
                        URL Shortener
                    </HeroTitle>
                    <HeroSub>Paste a long URL and get a compact, shareable link instantly</HeroSub>
                </HeroBanner>
                <InputArea>
                    <UrlRow>
                        <UrlPrefix>
                            <LinkIcon style={{ fontSize: 16 }} />
                        </UrlPrefix>
                        <UrlInput
                            type="text"
                            value={url}
                            onChange={(e) => setURL(e.target.value)}
                            onKeyDown={handleKeyDown}
                            placeholder="https://very-long-url.com/path?with=params&and=more"
                            autoComplete="off"
                            disabled={!!shortenedLink}
                            spellCheck={false}
                            autoFocus
                        />
                        {url && !shortenedLink && (
                            <UrlClearBtn onClick={() => setURL("")} title="Clear">×</UrlClearBtn>
                        )}
                        <ShortenBtn onClick={shortenURL} disabled={isLoading || !url || !!shortenedLink}>
                            <AutoAwesome style={{ fontSize: 13 }} />
                            {isLoading ? L.shorteningLabel : L.shortenBtn}
                        </ShortenBtn>
                    </UrlRow>
                    {!shortenedLink && (
                        <PasteBtn onClick={handlePaste}>{L.pasteBtn}</PasteBtn>
                    )}
                </InputArea>
            </HeroCard>

            {shortenedLink && (
                <ResultGrid>
                    <ResultCard>
                        <ResultBanner>
                            <ResultLabel>Shortened URL</ResultLabel>
                            <ResultUrl href={shortenedLink} target="_blank" rel="noopener noreferrer">
                                {shortenedLink}
                            </ResultUrl>
                        </ResultBanner>
                        <OriginalUrlRow>
                            <LinkIcon style={{ fontSize: 12, flexShrink: 0, opacity: 0.4 }} />
                            <OriginalUrlText title={url}>{url}</OriginalUrlText>
                        </OriginalUrlRow>
                        <ResultActions>
                            <PrimaryBtn onClick={handleCopy}>
                                {copied ? <Check style={{ fontSize: 14 }} /> : <ContentCopy style={{ fontSize: 14 }} />}
                                {copied ? L.copiedLabel : L.copyBtn}
                            </PrimaryBtn>
                            <SecondaryBtn href={shortenedLink} target="_blank" rel="noopener noreferrer">
                                <OpenInNew style={{ fontSize: 14 }} />
                                {L.openBtn}
                            </SecondaryBtn>
                            <ResetBtn onClick={resetState}>
                                {L.shortenAnotherBtn}
                            </ResetBtn>
                        </ResultActions>
                    </ResultCard>

                    {qrDataUrl && (
                        <QrCard>
                            <QrCardHeader>
                                <QrCode2 style={{ fontSize: 13, color: "var(--text-secondary)" }} />
                                <QrCardLabel>{L.qrCodeLabel}</QrCardLabel>
                            </QrCardHeader>
                            <QrImageWrap>
                                {/* QR is an in-memory data URL — next/image cannot optimize it */}
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <QrImg src={qrDataUrl} alt="QR code" />
                                <ActionBtn onClick={downloadQR} style={{ width: "100%" }}>
                                    <Download style={{ fontSize: 11 }} />
                                    {L.downloadBtn}
                                </ActionBtn>
                            </QrImageWrap>
                        </QrCard>
                    )}
                </ResultGrid>
            )}
            {renderResult()}
        </PageWrap>
    );
}

export default URLShortner;
