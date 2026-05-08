const prefix = "@neutron:";

const storageKeys = {
    token: `${prefix}token`,
    recentTools: `${prefix}recent_tools`,
    toolCounts: `${prefix}tool_counts`,
    theme: `${prefix}theme`
};

const MAX_RECENT_TOOLS = 5;

export default {
    // Token
    setToken: (token: string) => localStorage.setItem(storageKeys.token, token),
    getToken: () => localStorage.getItem(storageKeys.token),
    removeToken: () => localStorage.removeItem(storageKeys.token),

    // Recently used tools
    setRecentTool: (route: string) => {
        try {
            const current = JSON.parse(localStorage.getItem(storageKeys.recentTools) || "[]");
            const updated = [route, ...current.filter((r: string) => r !== route)].slice(0, MAX_RECENT_TOOLS);
            localStorage.setItem(storageKeys.recentTools, JSON.stringify(updated));
            const counts = JSON.parse(localStorage.getItem(storageKeys.toolCounts) || "{}");
            counts[route] = (counts[route] || 0) + 1;
            localStorage.setItem(storageKeys.toolCounts, JSON.stringify(counts));
        } catch {
            // ignore storage errors
        }
    },
    getRecentTools: (): string[] => {
        try {
            return JSON.parse(localStorage.getItem(storageKeys.recentTools) || "[]") as string[];
        } catch {
            return [];
        }
    },
    // Tool frequency counts
    incrementToolCount: (route: string) => {
        try {
            const counts = JSON.parse(localStorage.getItem(storageKeys.toolCounts) || "{}");
            counts[route] = (counts[route] || 0) + 1;
            localStorage.setItem(storageKeys.toolCounts, JSON.stringify(counts));
        } catch {
            // ignore storage errors
        }
    },
    getToolFrequency: (): Record<string, number> => {
        try {
            return JSON.parse(localStorage.getItem(storageKeys.toolCounts) || "{}") as Record<string, number>;
        } catch {
            return {};
        }
    },
    clearRecentTools: () => {
        localStorage.removeItem(storageKeys.recentTools);
        localStorage.removeItem(storageKeys.toolCounts);
    }
};
