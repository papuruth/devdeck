"use client";

import NoData from "components/Shared/NoData";
import localization from "localization";
import { filter, includes, isEmpty, map, toLower } from "lodash";
import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "utils/hooks/redux";
import { useRouter } from "next/navigation";
import { useToolChain } from "context/ToolChainContext";
import { fuzzyFilter } from "utils/fuzzySearch";
import { detectInputType, type DetectedInput } from "utils/inputDetector";
import { ENRICHED_TOOLS } from "components/CommandPalette/paletteData";
import { GLOBAL_CONSTANTS, TOOL_CATEGORIES } from "utils/globalConstants";
import storage from "utils/storage";
import { toggleCommandPaletteAction } from "components/Header/HeaderAction";
import { isMac } from "utils/helperFunctions";
import {
    HeroCTAPrimary,
    HeroCTARow,
    HeroCTASecondary,
    HeroEnterHint,
    HeroFeature,
    HeroFeatureRow,
    HeroHighlight,
    HeroInputField,
    HeroInputHints,
    HeroInputKbd,
    HeroMicroText,
    HeroSearchBox,
    HeroSearchIcon,
    HeroSearchWrapper,
    HeroSmartBanner,
    HeroSuggestionDesc,
    HeroSuggestionFooter,
    HeroSuggestionItem,
    HeroSuggestionLabel,
    HeroSuggestionsList,
    StyledBadge,
    StyledCard,
    StyledCardContent,
    StyledCardDescription,
    StyledCardIconWrapper,
    StyledCardTitle,
    StyledContainer,
    StyledGridContainer,
    StyledGridItem,
    StyledHero,
    StyledHeroBadge,
    StyledHeroSubtitle,
    StyledHeroTitle,
    StyledLink,
    StyledSectionAccent,
    StyledSectionHeader,
    StyledSectionTitle,
    StyledSectionWrapper,
    LearnLinksRow,
    LearnLink,
    LearnViewAll
} from "./styles";

function highlightMatch(text: string, query: string) {
    if (!query) return text;
    const idx = text.toLowerCase().indexOf(query.toLowerCase());
    if (idx === -1) return text;
    return (
        <>
            {text.slice(0, idx)}
            <HeroHighlight>{text.slice(idx, idx + query.length)}</HeroHighlight>
            {text.slice(idx + query.length)}
        </>
    );
}

interface HeroSearchProps {
    onOpenPalette: () => void;
}

function HeroSearch({ onOpenPalette }: HeroSearchProps) {
    const router = useRouter();
    const { sendTo } = useToolChain();
    const [query, setQuery] = useState("");
    const [activeIndex, setActiveIndex] = useState(0);
    const [focused, setFocused] = useState(false);
    const [smartHint, setSmartHint] = useState<DetectedInput | null>(null);
    const [pastedText, setPastedText] = useState("");
    const [macKbd, setMacKbd] = useState(false);
    const [showKeyboardHints, setShowKeyboardHints] = useState(false);
    
    const inputRef = useRef<HTMLInputElement>(null);
    const wrapperRef = useRef<HTMLDivElement>(null);

    const suggestions = useMemo(
        () => (query.trim() ? fuzzyFilter(ENRICHED_TOOLS, query, (t) => [t.label, t.description || "", ...(t.keywords || [])]).slice(0, 5) : []),
        [query]
    );

    const allItems = useMemo(
        () => [...(smartHint ? [{ kind: "smart", route: smartHint.route, label: smartHint.label }] : []), ...suggestions],
        [smartHint, suggestions]
    );

    const showDropdown = focused && allItems.length > 0;

    const navigateTo = useCallback(
        (route: string, prefill?: string) => {
            storage.setRecentTool(route);
            if (prefill && sendTo) sendTo(prefill, route);
            router.push(route);
        },
        [router, sendTo]
    );

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value;
        setQuery(val);
        setActiveIndex(0);
        if (!val.trim()) setSmartHint(null);
    };

    const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
        const text = e.clipboardData.getData("text");
        setPastedText(text);
        setTimeout(() => {
            const detected = detectInputType(text);
            setSmartHint(detected || null);
            if (detected) setActiveIndex(0);
        }, 0);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "ArrowDown") {
            e.preventDefault();
            setActiveIndex((i) => Math.min(i + 1, allItems.length - 1));
        } else if (e.key === "ArrowUp") {
            e.preventDefault();
            setActiveIndex((i) => Math.max(i - 1, 0));
        } else if (e.key === "Enter") {
            e.preventDefault();
            if (allItems[activeIndex]) {
                const item = allItems[activeIndex];
                if (item.route) navigateTo(item.route, item.kind === "smart" ? pastedText : undefined);
            } else onOpenPalette();
        } else if (e.key === "Escape") {
            setFocused(false);
            inputRef.current?.blur();
        }
    };

    useEffect(() => {
        setMacKbd(isMac);
        setShowKeyboardHints(true);
    }, []);

    useEffect(() => {
        const handler = (e: MouseEvent) => {
            if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) setFocused(false);
        };
        document.addEventListener("mousedown", handler);
        return () => document.removeEventListener("mousedown", handler);
    }, []);

    return (
        <HeroSearchWrapper ref={wrapperRef}>
            <HeroSearchBox $focused={focused} onClick={() => inputRef.current?.focus()}>
                <HeroSearchIcon aria-hidden="true">🔍</HeroSearchIcon>
                <HeroInputField
                    ref={inputRef}
                    value={query}
                    onChange={handleChange}
                    onPaste={handlePaste}
                    onKeyDown={handleKeyDown}
                    onFocus={() => setFocused(true)}
                    placeholder="Try: json, regex, hash, uuid..."
                    aria-label="Search dev tools"
                    aria-autocomplete="list"
                    autoComplete="off"
                    spellCheck={false}
                    autoFocus
                />
                {showKeyboardHints ? (
                    <HeroInputHints>
                        <HeroInputKbd>{macKbd ? "Cmd + K" : "Ctrl + K"}</HeroInputKbd>
                        <HeroEnterHint>or ↵</HeroEnterHint>
                    </HeroInputHints>
                ) : null}
            </HeroSearchBox>
            {showDropdown && (
                <HeroSuggestionsList role="listbox">
                    {allItems.map((item, i) => {
                        if (item.kind === "smart") {
                            return (
                                <HeroSmartBanner
                                    key="smart"
                                    $active={i === activeIndex}
                                    role="option"
                                    aria-selected={i === activeIndex}
                                    onMouseEnter={() => setActiveIndex(i)}
                                    onMouseDown={(e) => {
                                        e.preventDefault();
                                        if (item.route) navigateTo(item.route, pastedText);
                                    }}
                                >
                                    <span>🧠</span>
                                    <span>
                                        Looks like <strong>{item.label}</strong> —{" "}
                                        <strong>{ENRICHED_TOOLS.find((t) => t.route === item.route)?.label}</strong>
                                    </span>
                                </HeroSmartBanner>
                            );
                        }
                        return (
                            <HeroSuggestionItem
                                key={item.route}
                                $active={i === activeIndex}
                                role="option"
                                aria-selected={i === activeIndex}
                                onMouseEnter={() => setActiveIndex(i)}
                                onMouseDown={(e) => {
                                    e.preventDefault();
                                    if (item.route) navigateTo(item.route);
                                }}
                            >
                                <HeroSuggestionLabel>{highlightMatch(item.label, query)}</HeroSuggestionLabel>
                                <HeroSuggestionDesc>{"description" in item ? item.description : ""}</HeroSuggestionDesc>
                            </HeroSuggestionItem>
                        );
                    })}
                    <HeroSuggestionFooter
                        onMouseDown={(e) => {
                            e.preventDefault();
                            onOpenPalette();
                        }}
                    >
                        Open full search palette →
                    </HeroSuggestionFooter>
                </HeroSuggestionsList>
            )}
        </HeroSearchWrapper>
    );
}

interface ToolCardItem {
    route: string;
    label: string;
    description: string;
    category: string;
    icon: React.ReactNode;
    badge?: string | null;
}

interface ToolCardProps {
    item: ToolCardItem;
}

function ToolCard({ item }: ToolCardProps) {
    const category = TOOL_CATEGORIES.find((c) => c.id === item.category);
    const accentColor = category?.color || "#22cc99";

    return (
        <StyledGridItem $accentColor={accentColor}>
            <StyledLink href={item.route}>
                <StyledCard>
                    <StyledCardIconWrapper $accentColor={accentColor}>{item.icon}</StyledCardIconWrapper>
                    <StyledCardContent>
                        <StyledCardTitle variant="body1">{item.label}</StyledCardTitle>
                        {item.description ? <StyledCardDescription variant="caption">{item.description}</StyledCardDescription> : null}
                    </StyledCardContent>
                </StyledCard>
                {item.badge ? <StyledBadge label={item.badge} size="small" color={item.badge === "popular" ? "primary" : "secondary"} /> : null}
            </StyledLink>
        </StyledGridItem>
    );
}

function Home() {
    const searchQuery = useAppSelector((state) => state.headerReducer?.searchQuery ?? "");
    const dispatch = useAppDispatch();
    const { OPERATIONS_ITEMS } = GLOBAL_CONSTANTS;
    const { noSearchDataMessage } = localization;
    const totalTools = OPERATIONS_ITEMS.length;

    type OpsItem = (typeof OPERATIONS_ITEMS)[number];
    const [recentRoutes, setRecentRoutes] = useState<string[]>([]);
    useEffect(() => {
        setRecentRoutes(storage.getRecentTools());
    }, []);
    const recentItems: OpsItem[] = useMemo(
        () => recentRoutes.map((route) => OPERATIONS_ITEMS.find((item) => item.route === route)).filter((i): i is OpsItem => Boolean(i)),
        [recentRoutes, OPERATIONS_ITEMS]
    );

    const scrollToTools = () => {
        document.getElementById("tools-section")?.scrollIntoView({ behavior: "smooth" });
    };

    if (searchQuery) {
        const filtered = filter(OPERATIONS_ITEMS, (item) => includes(toLower(item.label), toLower(searchQuery)));
        return (
            <StyledContainer>
                <StyledSectionWrapper>
                    <StyledSectionHeader>
                        <StyledSectionAccent $color="#22cc99" />
                        <StyledSectionTitle variant="h6">Search results for &ldquo;{searchQuery}&rdquo;</StyledSectionTitle>
                    </StyledSectionHeader>
                    {!isEmpty(filtered) ? (
                        <StyledGridContainer>
                            {map(filtered, (item) => (
                                <ToolCard key={item.route} item={item} />
                            ))}
                        </StyledGridContainer>
                    ) : (
                        <NoData title={noSearchDataMessage.replace("[DATA]", searchQuery)} />
                    )}
                </StyledSectionWrapper>
            </StyledContainer>
        );
    }

    return (
        <StyledContainer>
            {/* ── Hero ─────────────────────────────────────────────────────── */}
            <StyledHero>
                <StyledHeroTitle variant="h3">DevDeck</StyledHeroTitle>
                <StyledHeroSubtitle variant="h6">All your dev tools. One command away.</StyledHeroSubtitle>
                <HeroMicroText>No signup&nbsp;&nbsp;•&nbsp;&nbsp;Instant results&nbsp;&nbsp;•&nbsp;&nbsp;Works offline</HeroMicroText>
                <StyledHeroBadge label={`⚡ ${totalTools} tools • Instant • No signup`} variant="outlined" size="small" />

                {/* Inline search with live suggestions + smart paste detection */}
                <HeroSearch onOpenPalette={() => dispatch(toggleCommandPaletteAction())} />

                {/* CTA buttons */}
                <HeroCTARow>
                    <HeroCTAPrimary onClick={() => dispatch(toggleCommandPaletteAction())}>Get Started</HeroCTAPrimary>
                    <HeroCTASecondary onClick={scrollToTools}>View Tools</HeroCTASecondary>
                </HeroCTARow>

                {/* Feature highlights */}
                <HeroFeatureRow>
                    <HeroFeature>
                        <span className="icon">⚡</span>
                        <span className="label">Instant Tools</span>
                    </HeroFeature>
                    <HeroFeature>
                        <span className="icon">🧠</span>
                        <span className="label">Smart Detection</span>
                    </HeroFeature>
                    <HeroFeature>
                        <span className="icon">⌨️</span>
                        <span className="label">Command First</span>
                    </HeroFeature>
                </HeroFeatureRow>
            </StyledHero>

            <StyledSectionWrapper id="tools-section">
                {recentItems.length > 0 ? (
                    <>
                        <StyledSectionHeader>
                            <StyledSectionAccent $color="#ff9800" />
                            <StyledSectionTitle variant="h6">Recently Used</StyledSectionTitle>
                        </StyledSectionHeader>
                        <StyledGridContainer>
                            {map(recentItems, (item) => (
                                <ToolCard key={`recent-${item.route}`} item={item} />
                            ))}
                        </StyledGridContainer>
                    </>
                ) : null}

                {map(TOOL_CATEGORIES, (category) => {
                    const categoryItems = filter(OPERATIONS_ITEMS, (item) => item.category === category.id);
                    if (isEmpty(categoryItems)) return null;
                    return (
                        <div key={category.id}>
                            <StyledSectionHeader>
                                <StyledSectionAccent $color={category.color} />
                                <StyledSectionTitle variant="h6">{category.label}</StyledSectionTitle>
                            </StyledSectionHeader>
                            <StyledGridContainer>
                                {map(categoryItems, (item) => (
                                    <ToolCard key={item.route} item={item} />
                                ))}
                            </StyledGridContainer>
                        </div>
                    );
                })}
            </StyledSectionWrapper>

            <StyledSectionWrapper>
                <StyledSectionHeader>
                    <StyledSectionAccent $color="#22cc99" />
                    <StyledSectionTitle variant="h6">Learn</StyledSectionTitle>
                </StyledSectionHeader>
                <LearnLinksRow>
                    {[
                        { slug: "json-viewer", label: "What is JSON Viewer?" },
                        { slug: "base64-text-encoder", label: "How Base64 Encoding Works" },
                        { slug: "regex-tester", label: "Regex Explained" },
                        { slug: "jwt-decoder", label: "Understanding JWTs" },
                        { slug: "password-generator", label: "Password Security Guide" }
                    ].map((g, i) => (
                        <LearnLink key={g.slug} $index={i} href={`/blog/${g.slug}`}>
                            {g.label} <span className="arrow">→</span>
                        </LearnLink>
                    ))}
                    <LearnViewAll href="/blog">
                        View all guides <span className="arrow">→</span>
                    </LearnViewAll>
                </LearnLinksRow>
            </StyledSectionWrapper>
        </StyledContainer>
    );
}

export default Home;
