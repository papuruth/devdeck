"use client";

import React, { createContext, useCallback, useContext, useMemo, useRef, useState } from "react";

interface ChainData {
    value: string;
    targetRoute: string;
}

interface ContextValue {
    chain: ChainData | null;
    sendTo: (value: string, targetRoute: string) => void;
    consumeChain: (currentRoute: string) => string | null;
    clearChain: () => void;
}

/**
 * M5 — Tool Chaining Context.
 * Allows any tool to "send" its output to another tool, which will
 * pre-fill its input on mount.
 */
const ToolChainContext = createContext<ContextValue | null>(null);

export function ToolChainProvider({ children }: { children: React.ReactNode }) {
    // { value: string, targetRoute: string } | null
    const [chain, setChain] = useState<ChainData | null>(null);
    // ref to avoid stale closures in sendTo
    const chainRef = useRef<ChainData | null>(chain);
    chainRef.current = chain;

    const sendTo = useCallback((value: string, targetRoute: string) => {
        setChain({ value, targetRoute });
    }, []);

    /**
     * Called by a tool on mount to consume a chain intended for it.
     * Returns the value and clears the chain so it's only consumed once.
     */
    const consumeChain = useCallback((currentRoute: string) => {
        if (chainRef.current && chainRef.current.targetRoute === currentRoute) {
            const { value } = chainRef.current;
            setChain(null);
            return value;
        }
        return null;
    }, []);

    const clearChain = useCallback(() => setChain(null), []);

    const contextValue = useMemo(() => ({ chain, sendTo, consumeChain, clearChain }), [chain, sendTo, consumeChain, clearChain]);

    return <ToolChainContext.Provider value={contextValue}>{children}</ToolChainContext.Provider>;
}

export function useToolChain() {
    const ctx = useContext(ToolChainContext);
    if (!ctx) throw new Error("useToolChain must be used inside ToolChainProvider");
    return ctx;
}

