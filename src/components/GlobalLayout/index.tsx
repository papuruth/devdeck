"use client";

import React, { useCallback, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "utils/hooks/redux";
import { useRouter } from "next/navigation";
import Header from "components/Header";
import Footer from "components/Footer";
import CommandPalette from "components/CommandPalette";
import { closeCommandPaletteAction, toggleCommandPaletteAction } from "components/Header/HeaderAction";
import { StyledContainer, StyledMainViewContainer } from "./styles";

function useProtocolHandler() {
    const router = useRouter();
    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const toolParam = params.get("tool");
        if (!toolParam) return;
        try {
            const url = new URL(toolParam);
            const toolPath = `/${url.hostname}`;
            router.replace(toolPath);
        } catch {
            // malformed protocol URL — ignore
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
}

function isEditableTarget(target: EventTarget | null): boolean {
    if (!target) return false;
    const el = target as HTMLElement;
    const tag = el.tagName?.toLowerCase();
    return tag === "input" || tag === "textarea" || tag === "select" || el.isContentEditable;
}

interface GlobalLayoutProps {
    children: React.ReactNode;
    themeMode: string;
    isMac: boolean;
}

export default function GlobalLayout({ children, themeMode, isMac }: GlobalLayoutProps) {
    useProtocolHandler();
    const dispatch = useAppDispatch();
    const paletteOpen = useAppSelector((state) => state.headerReducer.commandPaletteOpen);
    const router = useRouter();

    const handleKeyDown = useCallback(
        (e: KeyboardEvent) => {
            if ((e.ctrlKey || e.metaKey) && e.key === "k") {
                e.preventDefault();
                dispatch(toggleCommandPaletteAction());
                return;
            }
            if (e.key === "Backspace" && !isEditableTarget(e.target)) {
                e.preventDefault();
                router.back();
            }
        },
        [dispatch, router]
    );

    useEffect(() => {
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [handleKeyDown]);

    return (
        <StyledContainer>
            <StyledMainViewContainer>
                <Header themeMode={themeMode} isMac={isMac} />
                {children}
                <Footer />
            </StyledMainViewContainer>
            <CommandPalette open={paletteOpen} onClose={() => dispatch(closeCommandPaletteAction())} />
        </StyledContainer>
    );
}
