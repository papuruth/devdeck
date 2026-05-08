import { useCallback, useState } from "react";

const MAX_ITEMS = 10;
const PREFIX = "@devdeck:history:";

function readFromStorage(key: string): string[] {
    try {
        if (typeof window === "undefined") return [];
        return JSON.parse(localStorage.getItem(PREFIX + key) || "[]") as string[];
    } catch {
        return [];
    }
}

function writeToStorage(key: string, items: string[]): void {
    try {
        localStorage.setItem(PREFIX + key, JSON.stringify(items));
    } catch {
        // ignore storage errors
    }
}

/**
 * M6 — Per-tool history.
 */
export function useToolHistory(toolId: string, maxItems = MAX_ITEMS) {
    const [history, setHistory] = useState<string[]>(() => readFromStorage(toolId));

    const addHistory = useCallback(
        (entry: string): void => {
            if (!entry || String(entry).trim() === "") return;
            setHistory((prev) => {
                const deduplicated = [entry, ...prev.filter((e) => e !== entry)].slice(0, maxItems);
                writeToStorage(toolId, deduplicated);
                return deduplicated;
            });
        },
        [toolId, maxItems]
    );

    const clearHistory = useCallback(() => {
        writeToStorage(toolId, []);
        setHistory([]);
    }, [toolId]);

    return { history, addHistory, clearHistory };
}
