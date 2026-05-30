import { IosShare } from "@mui/icons-material";
import localization from "localization";
import React, { useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import {
    ActionBar,
    ActionBtn,
    ActionBtnGroup,
    EmptyState,
    InputArea,
    MetaText,
    Panel,
    PanelHeader,
    PanelLabel,
    ToolLayout
} from "components/Shared/ToolKit";
import SendToButton, { type SendToTarget } from "components/Shared/SendToButton";
import { useToolChain } from "context/ToolChainContext";
import { useShareableURL } from "utils/hooks/useShareableURL.hooks";

const { wordCounter: L, common: C } = localization;

const STOP_WORDS = new Set([
    "a",
    "an",
    "the",
    "and",
    "or",
    "but",
    "in",
    "on",
    "at",
    "to",
    "for",
    "of",
    "with",
    "by",
    "from",
    "up",
    "about",
    "into",
    "as",
    "is",
    "it",
    "its",
    "was",
    "are",
    "were",
    "be",
    "been",
    "being",
    "have",
    "has",
    "had",
    "do",
    "does",
    "did",
    "will",
    "would",
    "could",
    "should",
    "may",
    "might",
    "shall",
    "this",
    "that",
    "these",
    "those",
    "i",
    "you",
    "he",
    "she",
    "we",
    "they",
    "my",
    "your",
    "his",
    "her",
    "our",
    "their",
    "not",
    "no",
    "nor",
    "so",
    "yet",
    "both",
    "either",
    "neither",
    "each",
    "few",
    "more",
    "most",
    "other",
    "some",
    "such",
    "than",
    "too",
    "very",
    "just",
    "s",
    "t"
]);

interface TextStats {
    words: number;
    chars: number;
    charsNoSpace: number;
    lines: number;
    sentences: number;
    paragraphs: number;
    readingTime: string;
    speakingTime: string;
}

function getStats(text: string): TextStats {
    if (!text) {
        return { words: 0, chars: 0, charsNoSpace: 0, lines: 0, sentences: 0, paragraphs: 0, readingTime: "< 1 min", speakingTime: "< 1 min" };
    }
    const words = text.trim() ? text.trim().split(/\s+/).length : 0;
    const chars = text.length;
    const charsNoSpace = text.replace(/\s/g, "").length;
    const lines = text.split("\n").length;
    const sentences = (text.match(/[^.!?]*[.!?]/g) || []).length;
    const paragraphs = text.split(/\n\s*\n/).filter((p: string) => p.trim()).length;
    const readMins = Math.ceil(words / 200);
    const speakMins = Math.ceil(words / 130);
    return {
        words,
        chars,
        charsNoSpace,
        lines,
        sentences,
        paragraphs,
        readingTime: readMins <= 1 ? "< 1 min" : `~${readMins} min`,
        speakingTime: speakMins <= 1 ? "< 1 min" : `~${speakMins} min`
    };
}

interface KeywordDensityItem {
    word: string;
    count: number;
    pct: string;
}

function getKeywordDensity(text: string, topN: number = 10): KeywordDensityItem[] {
    if (!text.trim()) return [];
    const words = text.toLowerCase().match(/\b[a-z]{3,}\b/g) || [];
    const freq: Record<string, number> = {};
    words.forEach((w: string) => {
        if (!STOP_WORDS.has(w)) freq[w] = (freq[w] || 0) + 1;
    });
    const total = words.filter((w: string) => !STOP_WORDS.has(w)).length || 1;
    return Object.entries(freq)
        .sort((a, b) => (b[1] as number) - (a[1] as number))
        .slice(0, topN)
        .map(([word, count]) => ({ word, count, pct: ((count / total) * 100).toFixed(1) }));
}

function getStatsConfig() {
    return [
        { key: "words", label: L.wordsLabel },
        { key: "chars", label: L.charsLabel },
        { key: "charsNoSpace", label: L.charsNoSpaceLabel },
        { key: "sentences", label: L.sentencesLabel },
        { key: "paragraphs", label: L.paragraphsLabel },
        { key: "lines", label: L.linesLabel },
        { key: "readingTime", label: L.readingTimeLabel },
        { key: "speakingTime", label: L.speakingTimeLabel }
    ];
}

const StatsGrid = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1px;
    background: var(--border-color);
    border-top: 1px solid var(--border-color);
`;

const StatCard = styled.div`
    background: var(--bg-surface);
    padding: 14px 16px;
    display: flex;
    flex-direction: column;
    gap: 2px;
`;

const StatValue = styled.span`
    font-size: 18px;
    font-weight: 600;
    font-family: var(--font-mono);
    color: var(--text-primary);
    line-height: 1.2;
`;

const StatLabel = styled.span`
    font-size: 10px;
    font-weight: 600;
    font-family: "Inter", sans-serif;
    color: var(--text-secondary);
    text-transform: uppercase;
    letter-spacing: 0.08em;
`;

const KeywordSection = styled.div`
    padding: 12px 16px;
    border-top: 1px solid var(--border-color);
    display: flex;
    flex-direction: column;
    gap: 6px;
`;

const KeywordRow = styled.div`
    display: flex;
    align-items: center;
    gap: 8px;
`;

const KeywordWord = styled.span`
    font-size: 11px;
    font-family: var(--font-mono);
    color: var(--text-primary);
    min-width: 80px;
`;

const KeywordBar = styled.div`
    flex: 1;
    height: 3px;
    border-radius: 2px;
    background: var(--border-color);
    overflow: hidden;
`;

const KeywordFill = styled.div<{ $pct?: number }>`
    height: 100%;
    border-radius: 2px;
    background: #22cc99;
    width: ${(p) => p.$pct}%;
    transition: width 0.3s ease;
`;

const KeywordMeta = styled.span`
    font-size: 10px;
    font-family: "Inter", sans-serif;
    color: var(--text-secondary);
    min-width: 52px;
    text-align: right;
`;

const KeywordHeader = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 8px 16px;
    border-top: 1px solid var(--border-color);
    background: var(--bg-panel-header);
    min-height: 36px;
`;

export default function WordCounter() {
    const [text, setText] = useState("");
    const stats = useMemo(() => getStats(text), [text]);
    const keywords = useMemo(() => getKeywordDensity(text), [text]);
    const { consumeChain } = useToolChain();
    const { initialValue, shareURL } = useShareableURL("q");

    useEffect(() => {
        const chained = consumeChain("/word-counter");
        if (chained && typeof chained === "string") setText(chained);
        else if (initialValue) setText(initialValue);
    }, [consumeChain, initialValue]);

    const STATS_CONFIG = getStatsConfig();

    return (
        <ToolLayout>
            <Panel>
                <PanelHeader>
                    <PanelLabel>{L.textLabel}</PanelLabel>
                    {text && (
                        <MetaText>
                            {stats.words.toLocaleString()} {L.wordsLabel}
                        </MetaText>
                    )}
                </PanelHeader>
                <InputArea value={text} onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setText(e.target.value)} placeholder={L.placeholder} spellCheck style={{ minHeight: 400 }} />
                {text && (
                    <ActionBar>
                        <ActionBtnGroup>
                            <ActionBtn $danger onClick={() => setText("")}>
                                {C.clearBtn}
                            </ActionBtn>
                            <ActionBtn onClick={() => shareURL(text)}>
                                <IosShare style={{ fontSize: 11 }} /> {L.shareBtn}
                            </ActionBtn>
                            <SendToButton
                                value={text}
                                targets={[
                                    { label: "Hash Generator", route: "/hash-generator" },
                                    { label: "Text Case Converter", route: "/text-case" },
                                    { label: "Regex Tester", route: "/regex-tester" }
                                ] as SendToTarget[]}
                            />
                        </ActionBtnGroup>
                    </ActionBar>
                )}
            </Panel>

            <Panel>
                <PanelHeader>
                    <PanelLabel>{L.statsLabel}</PanelLabel>
                </PanelHeader>
                {text ? (
                    <>
                        <StatsGrid>
                            {STATS_CONFIG.map(({ key, label }) => (
                                <StatCard key={key}>
                                    <StatValue>{stats[key as keyof TextStats]}</StatValue>
                                    <StatLabel>{label}</StatLabel>
                                </StatCard>
                            ))}
                        </StatsGrid>
                        {keywords.length > 0 && (
                            <>
                                <KeywordHeader>
                                    <PanelLabel>{L.keywordDensityLabel}</PanelLabel>
                                    <MetaText>top {keywords.length}</MetaText>
                                </KeywordHeader>
                                <KeywordSection>
                                    {keywords.map(({ word, count, pct }) => (
                                        <KeywordRow key={word}>
                                            <KeywordWord>{word}</KeywordWord>
                                            <KeywordBar>
                                                <KeywordFill $pct={Math.min(100, parseFloat(pct) * 5)} />
                                            </KeywordBar>
                                            <KeywordMeta>
                                                {count}× {pct}%
                                            </KeywordMeta>
                                        </KeywordRow>
                                    ))}
                                </KeywordSection>
                            </>
                        )}
                    </>
                ) : (
                    <EmptyState>
                        <span style={{ fontSize: 26, fontFamily: "var(--font-mono)" }}>&#931;</span>
                        <span style={{ fontSize: 12, fontFamily: "Inter, sans-serif" }}>{L.emptyStateMessage}</span>
                    </EmptyState>
                )}
            </Panel>
        </ToolLayout>
    );
}
