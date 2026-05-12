/**
 * CSS to Tailwind mapping table
 * Covers ~120 CSS properties with Tailwind class equivalents
 */

export interface TailwindMapping {
    property: string;
    mapper: (value: string) => string | null;
}

// Color name to Tailwind color mapping
const COLOR_MAP: Record<string, string> = {
    transparent: "transparent",
    current: "current",
    white: "white",
    black: "black",
    slate: "slate",
    gray: "gray",
    zinc: "zinc",
    neutral: "neutral",
    stone: "stone",
    red: "red",
    orange: "orange",
    amber: "amber",
    yellow: "yellow",
    lime: "lime",
    green: "green",
    emerald: "emerald",
    teal: "teal",
    cyan: "cyan",
    sky: "sky",
    blue: "blue",
    indigo: "indigo",
    violet: "violet",
    purple: "purple",
    fuchsia: "fuchsia",
    pink: "pink",
    rose: "rose"
};

// Common hex colors → Tailwind color name mapping
const HEX_TO_NAME: Record<string, string> = {
    // Black / White / Gray
    "#000": "black",
    "#000000": "black",
    "#fff": "white",
    "#ffffff": "white",
    "#808080": "gray-500",
    "#80808080": "gray-500",
    "#c0c0c0": "gray-300",
    "#a9a9a9": "gray-400",
    // Red
    "#f00": "red-500",
    "#ff0000": "red-500",
    "#dc2626": "red-600",
    "#ef4444": "red-500",
    "#b91c1c": "red-700",
    "#fee2e2": "red-100",
    "#fecaca": "red-200",
    "#fca5a5": "red-300",
    "#f87171": "red-400",
    // Orange
    "#ffa500": "orange-500",
    "#f97316": "orange-500",
    "#ea580c": "orange-600",
    "#fed7aa": "orange-200",
    "#fb923c": "orange-400",
    // Amber / Yellow
    "#ffbf00": "amber-500",
    "#f59e0b": "amber-500",
    "#fbbf24": "yellow-400",
    "#fde047": "yellow-300",
    "#fef08a": "yellow-200",
    "#ffff00": "yellow-400",
    // Green
    "#0f0": "green-500",
    "#00ff00": "green-500",
    "#22cc99": "emerald-400",
    "#22c55e": "green-500",
    "#16a34a": "green-600",
    "#15803d": "green-700",
    "#bbf7d0": "green-200",
    "#86efac": "green-300",
    "#4ade80": "green-400",
    "#10b981": "emerald-500",
    "#059669": "emerald-600",
    "#34d399": "emerald-400",
    "#d1fae5": "emerald-100",
    "#a7f3d0": "emerald-200",
    // Blue
    "#00f": "blue-500",
    "#0000ff": "blue-500",
    "#2299ff": "blue-500",
    "#3b82f6": "blue-500",
    "#2563eb": "blue-600",
    "#1d4ed8": "blue-700",
    "#bfdbfe": "blue-200",
    "#93c5fd": "blue-300",
    "#60a5fa": "blue-400",
    "#0ea5e9": "sky-500",
    "#0284c7": "sky-600",
    "#38bdf8": "sky-400",
    "#e0f2fe": "sky-100",
    "#bae6fd": "sky-200",
    "#6366f1": "indigo-500",
    "#4f46e5": "indigo-600",
    "#a5b4fc": "indigo-300",
    // Purple / Violet
    "#800080": "purple-500",
    "#a855f7": "purple-500",
    "#9333ea": "purple-600",
    "#d8b4fe": "purple-300",
    "#8b5cf6": "violet-500",
    "#7c3aed": "violet-600",
    "#c4b5fd": "violet-300",
    // Pink / Rose
    "#ff69b4": "pink-400",
    "#ec4899": "pink-500",
    "#db2777": "pink-600",
    "#fbcfe8": "pink-200",
    "#f472b6": "pink-400",
    "#f43f5e": "rose-500",
    "#e11d48": "rose-600",
    "#fda4af": "rose-300",
    // Cyan / Teal
    "#00ffff": "cyan-400",
    "#06b6d4": "cyan-500",
    "#0891b2": "cyan-600",
    "#cffafe": "cyan-100",
    "#22d3ee": "cyan-400",
    "#14b8a6": "teal-500",
    "#0d9488": "teal-600",
    "#5eead4": "teal-400",
    "#ccfbf1": "teal-100",
    // Lime / Emerald
    "#84cc16": "lime-500",
    "#65a30d": "lime-600",
    "#bef264": "lime-300",
    "#d9f99d": "lime-200",
    "#50c878": "emerald-400",
    "#6ee7b7": "emerald-300",
    // Brown / Slate / Zinc / Neutral / Stone
    "#8b4513": "stone-600",
    "#a0522d": "stone-500",
    "#d2691e": "orange-600",
    "#718096": "slate-500",
    "#94a3b8": "slate-400",
    "#64748b": "slate-500",
    "#cbd5e1": "slate-300",
    "#78716c": "stone-500",
    "#a8a29e": "stone-400",
    "#d6d3d1": "stone-300",
    "#71717a": "zinc-500",
    "#a1a1aa": "zinc-400",
    "#d4d4d8": "zinc-300",
    "#737373": "neutral-500",
    "#a3a3a3": "neutral-400",
    "#d4d4d4": "neutral-300"
};

// Parse common color formats
function parseColor(value: string): string | null {
    const v = value.trim().toLowerCase();

    // Named colors
    if (COLOR_MAP[v]) {
        return COLOR_MAP[v];
    }

    // Hex colors — check common hex to Tailwind name first, fall back to JIT syntax
    const hexMatch = v.match(/^#([0-9a-f]{3,8})$/i);
    if (hexMatch) {
        const hex = `#${hexMatch[1]}`;
        const namedColor = HEX_TO_NAME[hex];
        if (namedColor) {
            return namedColor;
        }
        return `[#${hexMatch[1]}]`;
    }

    // RGB
    const rgbMatch = v.match(/^rgb\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)$/);
    if (rgbMatch) {
        return `[#${parseInt(rgbMatch[1], 10).toString(16).padStart(2, "0")}${parseInt(rgbMatch[2], 10).toString(16).padStart(2, "0")}${parseInt(rgbMatch[3], 10).toString(16).padStart(2, "0")}]`;
    }

    // RGBA
    const rgbaMatch = v.match(/^rgba\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*,\s*([\d.]+)\s*\)$/);
    if (rgbaMatch) {
        return `[#${parseInt(rgbaMatch[1], 10).toString(16).padStart(2, "0")}${parseInt(rgbaMatch[2], 10).toString(16).padStart(2, "0")}${parseInt(rgbaMatch[3], 10).toString(16).padStart(2, "0")}_${rgbaMatch[4]}]`;
    }

    return null;
}

// Parse spacing values (px, rem, em, etc.)
function parseSpacing(value: string): string | null {
    const v = value.trim();

    // 0
    if (v === "0") return "0";

    // Pixel values - map to Tailwind scale
    const pxMatch = v.match(/^(-?\d+(?:\.\d+)?)px$/);
    if (pxMatch) {
        const px = parseFloat(pxMatch[1]);
        const absPx = Math.abs(px);
        const prefix = px < 0 ? "-" : "";

        // Common Tailwind spacing scale
        const spacingMap: Record<number, string> = {
            0: "0",
            1: "px",
            2: "0.5",
            4: "1",
            6: "1.5",
            8: "2",
            10: "2.5",
            12: "3",
            14: "3.5",
            16: "4",
            20: "5",
            24: "6",
            28: "7",
            32: "8",
            36: "9",
            40: "10",
            44: "11",
            48: "12",
            56: "14",
            64: "16",
            80: "20",
            96: "24",
            112: "28",
            128: "32",
            144: "36",
            160: "40",
            176: "44",
            192: "48",
            208: "52",
            224: "56",
            240: "60",
            256: "64",
            288: "72",
            320: "80",
            352: "88",
            384: "96"
        };

        if (spacingMap[absPx] !== undefined) {
            return prefix + spacingMap[absPx];
        }

        // For values not in the scale, use arbitrary value
        return `[${prefix}${absPx}px]`;
    }

    // Rem values
    const remMatch = v.match(/^(-?\d+(?:\.\d+)?)rem$/);
    if (remMatch) {
        const rem = parseFloat(remMatch[1]);
        const px = rem * 16;
        const prefix = rem < 0 ? "-" : "";
        return `[${prefix}${Math.abs(px)}px]`;
    }

    // Em values
    const emMatch = v.match(/^(-?\d+(?:\.\d+)?)em$/);
    if (emMatch) {
        return `[${v}]`;
    }

    // Percentages
    const pctMatch = v.match(/^(-?\d+(?:\.\d+)?)%$/);
    if (pctMatch) {
        return v;
    }

    // Full
    if (v === "auto") return "auto";
    if (v === "full") return "full";

    return null;
}

// Parse font-size values
function parseFontSize(value: string): string | null {
    const v = value.trim();

    const fontSizeMap: Record<string, string> = {
        "9px": "xs",
        "10px": "xs",
        "11px": "xs",
        "12px": "xs",
        "0.75rem": "xs",
        "13px": "sm",
        "14px": "sm",
        "0.875rem": "sm",
        "15px": "base",
        "16px": "base",
        "1rem": "base",
        "18px": "lg",
        "1.125rem": "lg",
        "20px": "xl",
        "1.25rem": "xl",
        "24px": "2xl",
        "1.5rem": "2xl",
        "30px": "3xl",
        "1.875rem": "3xl",
        "36px": "4xl",
        "2.25rem": "4xl",
        "48px": "5xl",
        "3rem": "5xl",
        "60px": "6xl",
        "3.75rem": "6xl",
        "72px": "7xl",
        "4.5rem": "7xl",
        "96px": "8xl",
        "6rem": "8xl"
    };

    if (fontSizeMap[v]) {
        return fontSizeMap[v];
    }

    const pxMatch = v.match(/^(\d+(?:\.\d+)?)px$/);
    if (pxMatch) {
        return `[${v}]`;
    }

    return null;
}

// Parse font-weight values
function parseFontWeight(value: string): string | null {
    const v = value.trim();

    const weightMap: Record<string, string> = {
        "100": "thin",
        "200": "extralight",
        "300": "light",
        "400": "normal",
        "500": "medium",
        "600": "semibold",
        "700": "bold",
        "800": "extrabold",
        "900": "black",
        normal: "normal",
        bold: "bold",
        lighter: "light",
        bolder: "bold"
    };

    return weightMap[v] || weightMap[v.toLowerCase()] || null;
}

// Main mapping table
export const CSS_TO_TAILWIND: TailwindMapping[] = [
    // Layout - Display
    {
        property: "display",
        mapper(v) {
            const map: Record<string, string> = {
                flex: "flex",
                "inline-flex": "inline-flex",
                block: "block",
                "inline-block": "inline-block",
                inline: "inline",
                grid: "grid",
                "inline-grid": "inline-grid",
                none: "hidden",
                table: "table",
                "inline-table": "inline-table"
            };
            return map[v.trim()] || null;
        }
    },

    // Flexbox
    {
        property: "flex-direction",
        mapper(v) {
            const map: Record<string, string> = {
                row: "flex-row",
                "row-reverse": "flex-row-reverse",
                column: "flex-col",
                "column-reverse": "flex-col-reverse"
            };
            return map[v.trim()] || null;
        }
    },
    {
        property: "flex-wrap",
        mapper(v) {
            const map: Record<string, string> = {
                wrap: "flex-wrap",
                nowrap: "flex-nowrap",
                "wrap-reverse": "flex-wrap-reverse"
            };
            return map[v.trim()] || null;
        }
    },
    {
        property: "flex",
        mapper(v) {
            const val = v.trim();
            if (val === "1") return "flex-1";
            if (val === "none") return "flex-none";
            if (val === "auto") return "flex-auto";
            return `[flex:${val}]`;
        }
    },
    {
        property: "flex-grow",
        mapper(v) {
            const val = v.trim();
            if (val === "0") return "grow-0";
            if (val === "1") return "grow";
            return `[flex-grow:${val}]`;
        }
    },
    {
        property: "flex-shrink",
        mapper(v) {
            const val = v.trim();
            if (val === "0") return "shrink-0";
            if (val === "1") return "shrink";
            return `[flex-shrink:${val}]`;
        }
    },
    {
        property: "justify-content",
        mapper(v) {
            const map: Record<string, string> = {
                "flex-start": "justify-start",
                "flex-end": "justify-end",
                center: "justify-center",
                "space-between": "justify-between",
                "space-around": "justify-around",
                "space-evenly": "justify-evenly"
            };
            return map[v.trim()] || null;
        }
    },
    {
        property: "align-items",
        mapper(v) {
            const map: Record<string, string> = {
                "flex-start": "items-start",
                "flex-end": "items-end",
                center: "items-center",
                baseline: "items-baseline",
                stretch: "items-stretch"
            };
            return map[v.trim()] || null;
        }
    },
    {
        property: "align-content",
        mapper(v) {
            const map: Record<string, string> = {
                "flex-start": "content-start",
                "flex-end": "content-end",
                center: "content-center",
                "space-between": "content-between",
                "space-around": "content-around",
                stretch: "content-stretch"
            };
            return map[v.trim()] || null;
        }
    },
    {
        property: "align-self",
        mapper(v) {
            const map: Record<string, string> = {
                auto: "self-auto",
                "flex-start": "self-start",
                "flex-end": "self-end",
                center: "self-center",
                stretch: "self-stretch"
            };
            return map[v.trim()] || null;
        }
    },
    {
        property: "gap",
        mapper(v) {
            const spacing = parseSpacing(v);
            if (spacing) return `gap-${spacing}`;
            return null;
        }
    },
    {
        property: "row-gap",
        mapper(v) {
            const spacing = parseSpacing(v);
            if (spacing) return `gap-y-${spacing}`;
            return null;
        }
    },
    {
        property: "column-gap",
        mapper(v) {
            const spacing = parseSpacing(v);
            if (spacing) return `gap-x-${spacing}`;
            return null;
        }
    },

    // Grid
    {
        property: "grid-template-columns",
        mapper(v) {
            const val = v.trim();
            if (val === "repeat(12, minmax(0, 1fr))") return "grid-cols-12";
            if (val === "repeat(6, minmax(0, 1fr))") return "grid-cols-6";
            if (val === "repeat(4, minmax(0, 1fr))") return "grid-cols-4";
            if (val === "repeat(3, minmax(0, 1fr))") return "grid-cols-3";
            if (val === "repeat(2, minmax(0, 1fr))") return "grid-cols-2";
            if (val === "none") return "grid-cols-none";
            return `[grid-template-columns:${encodeURIComponent(val)}]`;
        }
    },
    {
        property: "grid-template-rows",
        mapper(v) {
            const val = v.trim();
            if (val === "none") return "grid-rows-none";
            return `[grid-template-rows:${encodeURIComponent(val)}]`;
        }
    },
    {
        property: "grid-column",
        mapper(v) {
            const val = v.trim();
            const map: Record<string, string> = {
                "span 1 / span 1": "col-span-1",
                "span 2 / span 2": "col-span-2",
                "span 3 / span 3": "col-span-3",
                "span 4 / span 4": "col-span-4",
                "span 5 / span 5": "col-span-5",
                "span 6 / span 6": "col-span-6",
                "span 7 / span 7": "col-span-7",
                "span 8 / span 8": "col-span-8",
                "span 9 / span 9": "col-span-9",
                "span 10 / span 10": "col-span-10",
                "span 11 / span 11": "col-span-11",
                "span 12 / span 12": "col-span-12",
                auto: "col-auto"
            };
            return map[val] || null;
        }
    },
    {
        property: "grid-row",
        mapper(v) {
            const val = v.trim();
            if (val.startsWith("span")) {
                const num = val.match(/span\s*(\d+)/);
                if (num) return `row-span-${num[1]}`;
            }
            if (val === "auto") return "row-auto";
            return null;
        }
    },

    // Position
    {
        property: "position",
        mapper(v) {
            const map: Record<string, string> = {
                static: "static",
                fixed: "fixed",
                absolute: "absolute",
                relative: "relative",
                sticky: "sticky"
            };
            return map[v.trim()] || null;
        }
    },
    {
        property: "top",
        mapper(v) {
            const spacing = parseSpacing(v);
            if (spacing !== null) return `top-${spacing}`;
            return null;
        }
    },
    {
        property: "right",
        mapper(v) {
            const spacing = parseSpacing(v);
            if (spacing !== null) return `right-${spacing}`;
            return null;
        }
    },
    {
        property: "bottom",
        mapper(v) {
            const spacing = parseSpacing(v);
            if (spacing !== null) return `bottom-${spacing}`;
            return null;
        }
    },
    {
        property: "left",
        mapper(v) {
            const spacing = parseSpacing(v);
            if (spacing !== null) return `left-${spacing}`;
            return null;
        }
    },
    {
        property: "inset",
        mapper(v) {
            const spacing = parseSpacing(v);
            if (spacing !== null) return `inset-${spacing}`;
            return null;
        }
    },

    // Sizing
    {
        property: "width",
        mapper(v) {
            const val = v.trim();
            if (val === "100%") return "w-full";
            if (val === "auto") return "w-auto";
            if (val === "screen") return "w-screen";
            if (val === "min-content") return "w-min";
            if (val === "max-content") return "w-max";
            if (val === "fit-content") return "w-fit";
            const spacing = parseSpacing(v);
            if (spacing !== null) return `w-${spacing}`;
            return null;
        }
    },
    {
        property: "min-width",
        mapper(v) {
            const val = v.trim();
            if (val === "0") return "min-w-0";
            if (val === "max-content") return "min-w-max";
            if (val === "min-content") return "min-w-min";
            if (val === "fit-content") return "min-w-fit";
            const spacing = parseSpacing(v);
            if (spacing !== null) return `min-w-${spacing}`;
            return null;
        }
    },
    {
        property: "max-width",
        mapper(v) {
            const val = v.trim();
            if (val === "none") return "max-w-none";
            if (val === "full") return "max-w-full";
            if (val === "min-content") return "max-w-min";
            if (val === "max-content") return "max-w-max";
            if (val === "fit-content") return "max-w-fit";
            if (val === "screen") return "max-w-screen";
            const map: Record<string, string> = {
                "20rem": "prose",
                "24rem": "md",
                "28rem": "lg",
                "32rem": "xl",
                "36rem": "2xl",
                "42rem": "3xl",
                "48rem": "4xl",
                "56rem": "5xl",
                "64rem": "6xl",
                "72rem": "7xl",
                "80rem": "7xl"
            };
            if (map[val]) return `max-w-${map[val]}`;
            const spacing = parseSpacing(v);
            if (spacing !== null) return `max-w-${spacing}`;
            return null;
        }
    },
    {
        property: "height",
        mapper(v) {
            const val = v.trim();
            if (val === "100%") return "h-full";
            if (val === "auto") return "h-auto";
            if (val === "screen") return "h-screen";
            if (val === "min-content") return "h-min";
            if (val === "max-content") return "h-max";
            if (val === "fit-content") return "h-fit";
            const spacing = parseSpacing(v);
            if (spacing !== null) return `h-${spacing}`;
            return null;
        }
    },
    {
        property: "min-height",
        mapper(v) {
            const val = v.trim();
            if (val === "0") return "min-h-0";
            if (val === "full") return "min-h-full";
            if (val === "screen") return "min-h-screen";
            if (val === "max-content") return "min-h-max";
            if (val === "min-content") return "min-h-min";
            if (val === "fit-content") return "min-h-fit";
            const spacing = parseSpacing(v);
            if (spacing !== null) return `min-h-${spacing}`;
            return null;
        }
    },
    {
        property: "max-height",
        mapper(v) {
            const val = v.trim();
            if (val === "full") return "max-h-full";
            if (val === "screen") return "max-h-screen";
            if (val === "max-content") return "max-h-max";
            if (val === "min-content") return "max-h-min";
            if (val === "fit-content") return "max-h-fit";
            const spacing = parseSpacing(v);
            if (spacing !== null) return `max-h-${spacing}`;
            return null;
        }
    },

    // Typography
    {
        property: "font-size",
        mapper(v) {
            const size = parseFontSize(v);
            if (size) return `text-${size}`;
            return null;
        }
    },
    {
        property: "font-weight",
        mapper(v) {
            const weight = parseFontWeight(v);
            if (weight) return `font-${weight}`;
            return null;
        }
    },
    {
        property: "font-family",
        mapper(v) {
            const val = v.trim().toLowerCase();
            if (val.includes("sans")) return "font-sans";
            if (val.includes("serif")) return "font-serif";
            if (val.includes("mono")) return "font-mono";
            return null;
        }
    },
    {
        property: "font-style",
        mapper(v) {
            const map: Record<string, string> = {
                italic: "italic",
                normal: "not-italic"
            };
            return map[v.trim()] || null;
        }
    },
    {
        property: "text-decoration",
        mapper(v) {
            const map: Record<string, string> = {
                underline: "underline",
                overline: "overline",
                "line-through": "line-through",
                none: "no-underline"
            };
            return map[v.trim()] || null;
        }
    },
    {
        property: "text-transform",
        mapper(v) {
            const map: Record<string, string> = {
                uppercase: "uppercase",
                lowercase: "lowercase",
                capitalize: "capitalize",
                none: "normal-case"
            };
            return map[v.trim()] || null;
        }
    },
    {
        property: "letter-spacing",
        mapper(v) {
            const map: Record<string, string> = {
                "-0.05em": "tracking-tighter",
                "-0.025em": "tracking-tight",
                "-0.01em": "tracking-normal",
                "0.025em": "tracking-wide",
                "0.05em": "tracking-wider",
                "0.1em": "tracking-widest"
            };
            return map[v.trim()] || null;
        }
    },
    {
        property: "line-height",
        mapper(v) {
            const map: Record<string, string> = {
                "1": "leading-none",
                "1.25": "leading-tight",
                "1.375": "leading-snug",
                "1.5": "leading-normal",
                "1.625": "leading-relaxed",
                "2": "leading-loose"
            };
            const val = v.trim();
            if (map[val]) return `leading-${map[val]}`;
            const pxMatch = val.match(/^(\d+)px$/);
            if (pxMatch) return `[line-height:${val}]`;
            return null;
        }
    },
    {
        property: "text-align",
        mapper(v) {
            const map: Record<string, string> = {
                left: "text-left",
                center: "text-center",
                right: "text-right",
                justify: "text-justify",
                start: "text-start",
                end: "text-end"
            };
            return map[v.trim()] || null;
        }
    },
    {
        property: "color",
        mapper(v) {
            const color = parseColor(v);
            if (color) {
                if (color === "transparent") return "text-transparent";
                if (color === "current") return "text-current";
                if (color.startsWith("[#")) return `text-${color}`;
                return `text-${color}`;
            }
            return null;
        }
    },
    {
        property: "text-indent",
        mapper(v) {
            const spacing = parseSpacing(v);
            if (spacing !== null) return `indent-${spacing}`;
            return null;
        }
    },
    {
        property: "vertical-align",
        mapper(v) {
            const map: Record<string, string> = {
                baseline: "align-baseline",
                top: "align-top",
                middle: "align-middle",
                bottom: "align-bottom",
                "text-top": "align-text-top",
                "text-bottom": "align-text-bottom",
                sub: "align-sub",
                super: "align-super"
            };
            return map[v.trim()] || null;
        }
    },
    {
        property: "white-space",
        mapper(v) {
            const map: Record<string, string> = {
                normal: "whitespace-normal",
                nowrap: "whitespace-nowrap",
                pre: "whitespace-pre",
                "pre-line": "whitespace-pre-line",
                "pre-wrap": "whitespace-pre-wrap"
            };
            return map[v.trim()] || null;
        }
    },
    {
        property: "word-break",
        mapper(v) {
            const map: Record<string, string> = {
                normal: "break-normal",
                "break-all": "break-all",
                "keep-all": "break-keep"
            };
            return map[v.trim()] || null;
        }
    },
    {
        property: "overflow-wrap",
        mapper(v) {
            const map: Record<string, string> = {
                normal: "break-normal",
                "break-word": "break-words",
                anywhere: "break-all"
            };
            return map[v.trim()] || null;
        }
    },

    // Background
    {
        property: "background-color",
        mapper(v) {
            const color = parseColor(v);
            if (color) {
                if (color === "transparent") return "bg-transparent";
                if (color === "current") return "bg-current";
                if (color.startsWith("[#")) return `bg-${color}`;
                return `bg-${color}`;
            }
            return null;
        }
    },
    {
        property: "background",
        mapper(v) {
            // Try to extract color from background shorthand
            const colorMatch = v.match(/(#[0-9a-fA-F]{3,8}|rgb[a]?\([^)]+\)|[a-zA-Z]+)/);
            if (colorMatch) {
                const color = parseColor(colorMatch[1]);
                if (color) {
                    if (color === "transparent") return "bg-transparent";
                    if (color === "current") return "bg-current";
                    if (color.startsWith("[#")) return `bg-${color}`;
                    return `bg-${color}`;
                }
            }
            return null;
        }
    },
    {
        property: "background-image",
        mapper(v) {
            const val = v.trim();
            if (val === "none") return "bg-none";
            if (val.includes("linear-gradient")) return `[background-image:${encodeURIComponent(val)}]`;
            if (val.includes("radial-gradient")) return `[background-image:${encodeURIComponent(val)}]`;
            return null;
        }
    },
    {
        property: "background-size",
        mapper(v) {
            const map: Record<string, string> = {
                auto: "bg-auto",
                cover: "bg-cover",
                contain: "bg-contain"
            };
            return map[v.trim()] || null;
        }
    },
    {
        property: "background-position",
        mapper(v) {
            const map: Record<string, string> = {
                center: "bg-center",
                top: "bg-top",
                bottom: "bg-bottom",
                left: "bg-left",
                right: "bg-right",
                "top left": "bg-top-left",
                "top right": "bg-top-right",
                "bottom left": "bg-bottom-left",
                "bottom right": "bg-bottom-right"
            };
            return map[v.trim()] || null;
        }
    },
    {
        property: "background-repeat",
        mapper(v) {
            const map: Record<string, string> = {
                repeat: "bg-repeat",
                "no-repeat": "bg-no-repeat",
                "repeat-x": "bg-repeat-x",
                "repeat-y": "bg-repeat-y",
                "repeat-round": "bg-repeat-round",
                "repeat-space": "bg-repeat-space"
            };
            return map[v.trim()] || null;
        }
    },
    {
        property: "background-attachment",
        mapper(v) {
            const map: Record<string, string> = {
                scroll: "bg-scroll",
                fixed: "bg-fixed",
                local: "bg-local"
            };
            return map[v.trim()] || null;
        }
    },

    // Border
    {
        property: "border",
        mapper(v) {
            const val = v.trim();
            if (val === "none") return "border-none";
            // Parse border shorthand: width style color
            const parts = val.split(/\s+/);
            let result = "";
            parts.forEach((part) => {
                if (/^\d+px$/.test(part)) {
                    const w = parseInt(part, 10);
                    if (w === 0) result += "border-0 ";
                    else if (w === 1) result += "border ";
                    else if (w === 2) result += "border-2 ";
                    else if (w === 4) result += "border-4 ";
                    else result += `[border-width:${part}] `;
                } else if (["solid", "dashed", "dotted", "double", "none", "hidden"].includes(part)) {
                    result += `border-${part} `;
                } else {
                    const color = parseColor(part);
                    if (color) result += `border-${color} `;
                }
            });
            return result.trim() || null;
        }
    },
    {
        property: "border-width",
        mapper(v) {
            const map: Record<string, string> = {
                "0": "border-0",
                "0px": "border-0",
                "1": "border",
                "1px": "border",
                "2": "border-2",
                "2px": "border-2",
                "4": "border-4",
                "4px": "border-4",
                "8": "border-8",
                "8px": "border-8"
            };
            return map[v.trim()] || null;
        }
    },
    {
        property: "border-style",
        mapper(v) {
            const map: Record<string, string> = {
                solid: "border-solid",
                dashed: "border-dashed",
                dotted: "border-dotted",
                double: "border-double",
                none: "border-none",
                hidden: "border-hidden"
            };
            return map[v.trim()] || null;
        }
    },
    {
        property: "border-color",
        mapper(v) {
            const color = parseColor(v);
            if (color) return `border-${color}`;
            return null;
        }
    },
    {
        property: "border-radius",
        mapper(v) {
            const map: Record<string, string> = {
                "0": "rounded-none",
                "0px": "rounded-none",
                "2px": "rounded-sm",
                "4px": "rounded",
                "6px": "rounded-md",
                "8px": "rounded-lg",
                "12px": "rounded-xl",
                "16px": "rounded-2xl",
                "24px": "rounded-3xl",
                "9999px": "rounded-full"
            };
            return map[v.trim()] || null;
        }
    },
    {
        property: "border-top-left-radius",
        mapper(v) {
            const map: Record<string, string> = {
                "0": "rounded-tl-none",
                "0px": "rounded-tl-none",
                "2px": "rounded-tl-sm",
                "4px": "rounded-tl",
                "6px": "rounded-tl-md",
                "8px": "rounded-tl-lg",
                "12px": "rounded-tl-xl",
                "16px": "rounded-tl-2xl",
                "24px": "rounded-tl-3xl",
                "9999px": "rounded-tl-full"
            };
            return map[v.trim()] || null;
        }
    },
    {
        property: "border-top-right-radius",
        mapper(v) {
            const map: Record<string, string> = {
                "0": "rounded-tr-none",
                "0px": "rounded-tr-none",
                "2px": "rounded-tr-sm",
                "4px": "rounded-tr",
                "6px": "rounded-tr-md",
                "8px": "rounded-tr-lg",
                "12px": "rounded-tr-xl",
                "16px": "rounded-tr-2xl",
                "24px": "rounded-tr-3xl",
                "9999px": "rounded-tr-full"
            };
            return map[v.trim()] || null;
        }
    },
    {
        property: "border-bottom-right-radius",
        mapper(v) {
            const map: Record<string, string> = {
                "0": "rounded-br-none",
                "0px": "rounded-br-none",
                "2px": "rounded-br-sm",
                "4px": "rounded-br",
                "6px": "rounded-br-md",
                "8px": "rounded-br-lg",
                "12px": "rounded-br-xl",
                "16px": "rounded-br-2xl",
                "24px": "rounded-br-3xl",
                "9999px": "rounded-br-full"
            };
            return map[v.trim()] || null;
        }
    },
    {
        property: "border-bottom-left-radius",
        mapper(v) {
            const map: Record<string, string> = {
                "0": "rounded-bl-none",
                "0px": "rounded-bl-none",
                "2px": "rounded-bl-sm",
                "4px": "rounded-bl",
                "6px": "rounded-bl-md",
                "8px": "rounded-bl-lg",
                "12px": "rounded-bl-xl",
                "16px": "rounded-bl-2xl",
                "24px": "rounded-bl-3xl",
                "9999px": "rounded-bl-full"
            };
            return map[v.trim()] || null;
        }
    },

    // Shadow
    {
        property: "box-shadow",
        mapper(v) {
            const val = v.trim();
            if (val === "none") return "shadow-none";
            // Check for common shadow patterns
            if (val.includes("0 1px 2px 0 rgba")) return "shadow-sm";
            if (val.includes("0 1px 3px 0 rgba") || val.includes("0 1px 2px -1px rgba")) return "shadow";
            if (val.includes("0 4px 6px -1px rgba") || val.includes("0 2px 4px rgba")) return "shadow-md";
            if (val.includes("0 10px 15px -3px rgba") || val.includes("0 4px 6px rgba")) return "shadow-lg";
            if (val.includes("0 20px 25px -5px rgba") || val.includes("0 10px 10px rgba")) return "shadow-xl";
            if (val.includes("0 25px 50px -12px rgba")) return "shadow-2xl";
            if (val.includes("inset")) return `[box-shadow:${encodeURIComponent(val)}]`;
            return `[box-shadow:${encodeURIComponent(val)}]`;
        }
    },

    // Opacity
    {
        property: "opacity",
        mapper(v) {
            const val = parseFloat(v.trim());
            if (Number.isNaN(val)) return null;
            const pct = Math.round(val * 100);
            const map: Record<number, string> = {
                0: "opacity-0",
                5: "opacity-5",
                10: "opacity-10",
                20: "opacity-20",
                25: "opacity-25",
                30: "opacity-30",
                40: "opacity-40",
                50: "opacity-50",
                60: "opacity-60",
                70: "opacity-70",
                75: "opacity-75",
                80: "opacity-80",
                90: "opacity-90",
                95: "opacity-95",
                100: "opacity-100"
            };
            return map[pct] || `opacity-[${val}]`;
        }
    },

    // Spacing - Margin
    {
        property: "margin",
        mapper(v) {
            const values = v.trim().split(/\s+/);
            // 1 value: margin: 10px → m-10
            if (values.length === 1) {
                const spacing = parseSpacing(values[0]);
                if (spacing !== null) return `m-${spacing}`;
                return null;
            }
            const [v0, v1, v2, v3] = values;
            const top = parseSpacing(v0);
            const right = parseSpacing(values.length >= 2 ? v1 : v0);
            const bottom = parseSpacing(values.length >= 3 ? v2 : v0);
            let leftVal;
            if (values.length >= 4) {
                leftVal = v3;
            } else if (values.length === 2) {
                leftVal = v1;
            } else {
                leftVal = v0;
            }
            const left = parseSpacing(leftVal);
            // All same → m-*
            if (top && top === right && top === bottom && top === left) {
                return `m-${top}`;
            }
            // top=bottom, left=right → my-* mx-*
            if (top && bottom && top === bottom && right && left && right === left) {
                return `my-${top} mx-${right}`;
            }
            // top=bottom → my-* and individual x
            if (top && bottom && top === bottom) {
                const parts = [];
                if (top) parts.push(`my-${top}`);
                if (right && right !== top) parts.push(`mx-${right}`);
                return parts.length > 0 ? parts.join(" ") : null;
            }
            // left=right → individual y, mx-*
            if (right && left && right === left) {
                const parts = [];
                if (top) parts.push(`mt-${top}`);
                if (bottom && bottom !== top) parts.push(`mb-${bottom}`);
                if (right) parts.push(`mx-${right}`);
                return parts.length > 0 ? parts.join(" ") : null;
            }
            // All different → mt-* mr-* mb-* ml-*
            const parts = [];
            if (top) parts.push(`mt-${top}`);
            if (right) parts.push(`mr-${right}`);
            if (bottom) parts.push(`mb-${bottom}`);
            if (left) parts.push(`ml-${left}`);
            return parts.length > 0 ? parts.join(" ") : null;
        }
    },
    {
        property: "margin-top",
        mapper(v) {
            const spacing = parseSpacing(v);
            if (spacing !== null) return `mt-${spacing}`;
            return null;
        }
    },
    {
        property: "margin-right",
        mapper(v) {
            const spacing = parseSpacing(v);
            if (spacing !== null) return `mr-${spacing}`;
            return null;
        }
    },
    {
        property: "margin-bottom",
        mapper(v) {
            const spacing = parseSpacing(v);
            if (spacing !== null) return `mb-${spacing}`;
            return null;
        }
    },
    {
        property: "margin-left",
        mapper(v) {
            const spacing = parseSpacing(v);
            if (spacing !== null) return `ml-${spacing}`;
            return null;
        }
    },
    {
        property: "margin-x",
        mapper(v) {
            const spacing = parseSpacing(v);
            if (spacing !== null) return `mx-${spacing}`;
            return null;
        }
    },
    {
        property: "margin-y",
        mapper(v) {
            const spacing = parseSpacing(v);
            if (spacing !== null) return `my-${spacing}`;
            return null;
        }
    },

    // Spacing - Padding
    {
        property: "padding",
        mapper(v) {
            const values = v.trim().split(/\s+/);
            // 1 value: padding: 10px → p-10
            if (values.length === 1) {
                const spacing = parseSpacing(values[0]);
                if (spacing !== null) return `p-${spacing}`;
                return null;
            }
            const [v0, v1, v2, v3] = values;
            const top = parseSpacing(v0);
            const right = parseSpacing(values.length >= 2 ? v1 : v0);
            const bottom = parseSpacing(values.length >= 3 ? v2 : v0);
            let leftVal;
            if (values.length >= 4) {
                leftVal = v3;
            } else if (values.length === 2) {
                leftVal = v1;
            } else {
                leftVal = v0;
            }
            const left = parseSpacing(leftVal);
            // All same → p-*
            if (top && top === right && top === bottom && top === left) {
                return `p-${top}`;
            }
            // top=bottom, left=right → py-* px-*
            if (top && bottom && top === bottom && right && left && right === left) {
                return `py-${top} px-${right}`;
            }
            // top=bottom → py-* and individual x
            if (top && bottom && top === bottom) {
                const parts = [];
                if (top) parts.push(`py-${top}`);
                if (right && right !== top) parts.push(`px-${right}`);
                return parts.length > 0 ? parts.join(" ") : null;
            }
            // left=right → individual y, px-*
            if (right && left && right === left) {
                const parts = [];
                if (top) parts.push(`pt-${top}`);
                if (bottom && bottom !== top) parts.push(`pb-${bottom}`);
                if (right) parts.push(`px-${right}`);
                return parts.length > 0 ? parts.join(" ") : null;
            }
            // All different → pt-* pr-* pb-* pl-*
            const parts = [];
            if (top) parts.push(`pt-${top}`);
            if (right) parts.push(`pr-${right}`);
            if (bottom) parts.push(`pb-${bottom}`);
            if (left) parts.push(`pl-${left}`);
            return parts.length > 0 ? parts.join(" ") : null;
        }
    },
    {
        property: "padding-top",
        mapper(v) {
            const spacing = parseSpacing(v);
            if (spacing !== null) return `pt-${spacing}`;
            return null;
        }
    },
    {
        property: "padding-right",
        mapper(v) {
            const spacing = parseSpacing(v);
            if (spacing !== null) return `pr-${spacing}`;
            return null;
        }
    },
    {
        property: "padding-bottom",
        mapper(v) {
            const spacing = parseSpacing(v);
            if (spacing !== null) return `pb-${spacing}`;
            return null;
        }
    },
    {
        property: "padding-left",
        mapper(v) {
            const spacing = parseSpacing(v);
            if (spacing !== null) return `pl-${spacing}`;
            return null;
        }
    },
    {
        property: "padding-x",
        mapper(v) {
            const spacing = parseSpacing(v);
            if (spacing !== null) return `px-${spacing}`;
            return null;
        }
    },
    {
        property: "padding-y",
        mapper(v) {
            const spacing = parseSpacing(v);
            if (spacing !== null) return `py-${spacing}`;
            return null;
        }
    },

    // Overflow
    {
        property: "overflow",
        mapper(v) {
            const map: Record<string, string> = {
                auto: "overflow-auto",
                hidden: "overflow-hidden",
                visible: "overflow-visible",
                scroll: "overflow-scroll",
                "auto x": "overflow-x-auto",
                "auto y": "overflow-y-auto"
            };
            return map[v.trim()] || null;
        }
    },
    {
        property: "overflow-x",
        mapper(v) {
            const map: Record<string, string> = {
                auto: "overflow-x-auto",
                hidden: "overflow-x-hidden",
                visible: "overflow-x-visible",
                scroll: "overflow-x-scroll"
            };
            return map[v.trim()] || null;
        }
    },
    {
        property: "overflow-y",
        mapper(v) {
            const map: Record<string, string> = {
                auto: "overflow-y-auto",
                hidden: "overflow-y-hidden",
                visible: "overflow-y-visible",
                scroll: "overflow-y-scroll"
            };
            return map[v.trim()] || null;
        }
    },

    // Cursor
    {
        property: "cursor",
        mapper(v) {
            const map: Record<string, string> = {
                auto: "cursor-auto",
                default: "cursor-default",
                pointer: "cursor-pointer",
                wait: "cursor-wait",
                text: "cursor-text",
                move: "cursor-move",
                "not-allowed": "cursor-not-allowed",
                grab: "cursor-grab",
                grabbing: "cursor-grabbing",
                crosshair: "cursor-crosshair",
                help: "cursor-help",
                progress: "cursor-progress",
                cell: "cursor-cell",
                copy: "cursor-copy",
                alias: "cursor-alias",
                "no-drop": "cursor-no-drop",
                none: "cursor-none",
                "all-scroll": "cursor-all-scroll",
                "col-resize": "cursor-col-resize",
                "row-resize": "cursor-row-resize",
                "n-resize": "cursor-n-resize",
                "s-resize": "cursor-s-resize",
                "e-resize": "cursor-e-resize",
                "w-resize": "cursor-w-resize",
                "ns-resize": "cursor-ns-resize",
                "ew-resize": "cursor-ew-resize",
                "nesw-resize": "cursor-nesw-resize",
                "nwse-resize": "cursor-nwse-resize",
                "zoom-in": "cursor-zoom-in",
                "zoom-out": "cursor-zoom-out"
            };
            return map[v.trim()] || null;
        }
    },

    // Transitions
    {
        property: "transition",
        mapper(v) {
            const val = v.trim();
            if (val === "none") return "transition-none";
            if (val === "all" || val === "all 0.15s ease" || val === "all 0.3s ease") return "transition-all";
            if (val.includes("opacity")) return "transition-opacity";
            if (val.includes("transform")) return "transition-transform";
            if (val.includes("color") || val.includes("background")) return "transition-colors";
            if (val.includes("box-shadow")) return "transition-shadow";
            return "transition-all";
        }
    },
    {
        property: "transition-duration",
        mapper(v) {
            const map: Record<string, string> = {
                "75ms": "duration-75",
                "0.075s": "duration-75",
                "100ms": "duration-100",
                "0.1s": "duration-100",
                "150ms": "duration-150",
                "0.15s": "duration-150",
                "200ms": "duration-200",
                "0.2s": "duration-200",
                "300ms": "duration-300",
                "0.3s": "duration-300",
                "500ms": "duration-500",
                "0.5s": "duration-500",
                "700ms": "duration-700",
                "0.7s": "duration-700",
                "1000ms": "duration-1000",
                "1s": "duration-1000"
            };
            return map[v.trim()] || null;
        }
    },
    {
        property: "transition-timing-function",
        mapper(v) {
            const map: Record<string, string> = {
                linear: "ease-linear",
                ease: "ease-in-out",
                "ease-in": "ease-in",
                "ease-out": "ease-out",
                "ease-in-out": "ease-in-out"
            };
            return map[v.trim()] || null;
        }
    },

    // Transform
    {
        property: "transform",
        mapper(v) {
            const val = v.trim();
            if (val === "none") return "translate-x-0";
            return null;
        }
    },
    {
        property: "transform-origin",
        mapper(v) {
            const map: Record<string, string> = {
                center: "origin-center",
                top: "origin-top",
                "top right": "origin-top-right",
                right: "origin-right",
                "bottom right": "origin-bottom-right",
                bottom: "origin-bottom",
                "bottom left": "origin-bottom-left",
                left: "origin-left",
                "top left": "origin-top-left"
            };
            return map[v.trim()] || null;
        }
    },

    // Z-index
    {
        property: "z-index",
        mapper(v) {
            const val = v.trim();
            const map: Record<string, string> = {
                "0": "z-0",
                "10": "z-10",
                "20": "z-20",
                "30": "z-30",
                "40": "z-40",
                "50": "z-50",
                auto: "z-auto"
            };
            return map[val] || `z-[${val}]`;
        }
    },

    // Visibility
    {
        property: "visibility",
        mapper(v) {
            const map: Record<string, string> = {
                visible: "visible",
                hidden: "invisible"
            };
            return map[v.trim()] || null;
        }
    },

    // List style
    {
        property: "list-style-type",
        mapper(v) {
            const map: Record<string, string> = {
                none: "list-none",
                disc: "list-disc",
                decimal: "list-decimal",
                circle: "list-circle",
                square: "list-square"
            };
            return map[v.trim()] || null;
        }
    },
    {
        property: "list-style-position",
        mapper(v) {
            const map: Record<string, string> = {
                inside: "list-inside",
                outside: "list-outside"
            };
            return map[v.trim()] || null;
        }
    },

    // Object fit
    {
        property: "object-fit",
        mapper(v) {
            const map: Record<string, string> = {
                contain: "object-contain",
                cover: "object-cover",
                fill: "object-fill",
                none: "object-none",
                "scale-down": "object-scale-down"
            };
            return map[v.trim()] || null;
        }
    },

    // Pointer events
    {
        property: "pointer-events",
        mapper(v) {
            const map: Record<string, string> = {
                none: "pointer-events-none",
                auto: "pointer-events-auto"
            };
            return map[v.trim()] || null;
        }
    },

    // Resize
    {
        property: "resize",
        mapper(v) {
            const map: Record<string, string> = {
                none: "resize-none",
                both: "resize",
                horizontal: "resize-x",
                vertical: "resize-y"
            };
            return map[v.trim()] || null;
        }
    },

    // User select
    {
        property: "user-select",
        mapper(v) {
            const map: Record<string, string> = {
                none: "select-none",
                text: "select-text",
                all: "select-all",
                auto: "select-auto"
            };
            return map[v.trim()] || null;
        }
    },

    // Float
    {
        property: "float",
        mapper(v) {
            const map: Record<string, string> = {
                left: "float-left",
                right: "float-right",
                none: "float-none"
            };
            return map[v.trim()] || null;
        }
    },

    // Clear
    {
        property: "clear",
        mapper(v) {
            const map: Record<string, string> = {
                left: "clear-left",
                right: "clear-right",
                both: "clear-both",
                none: "clear-none"
            };
            return map[v.trim()] || null;
        }
    },

    // Table layout
    {
        property: "table-layout",
        mapper(v) {
            const map: Record<string, string> = {
                auto: "table-auto",
                fixed: "table-fixed"
            };
            return map[v.trim()] || null;
        }
    },

    // Border collapse
    {
        property: "border-collapse",
        mapper(v) {
            const map: Record<string, string> = {
                collapse: "border-collapse",
                separate: "border-separate"
            };
            return map[v.trim()] || null;
        }
    },

    // Outline
    {
        property: "outline",
        mapper(v) {
            const val = v.trim();
            if (val === "none") return "outline-none";
            return null;
        }
    },

    // Appearance
    {
        property: "appearance",
        mapper(v) {
            const val = v.trim();
            if (val === "none") return "appearance-none";
            return null;
        }
    },

    // Mix blend mode
    {
        property: "mix-blend-mode",
        mapper(v) {
            const map: Record<string, string> = {
                normal: "mix-blend-normal",
                multiply: "mix-blend-multiply",
                screen: "mix-blend-screen",
                overlay: "mix-blend-overlay",
                darken: "mix-blend-darken",
                lighten: "mix-blend-lighten",
                "color-dodge": "mix-blend-color-dodge",
                "color-burn": "mix-blend-color-burn",
                "hard-light": "mix-blend-hard-light",
                "soft-light": "mix-blend-soft-light",
                difference: "mix-blend-difference",
                exclusion: "mix-blend-exclusion",
                hue: "mix-blend-hue",
                saturation: "mix-blend-saturation",
                color: "mix-blend-color",
                luminosity: "mix-blend-luminosity"
            };
            return map[v.trim()] || null;
        }
    },

    // Filter
    {
        property: "filter",
        mapper(v) {
            const val = v.trim();
            if (val === "none") return "filter-none";
            if (val.includes("blur")) {
                const blurMatch = val.match(/blur\((\d+px)\)/);
                if (blurMatch) return `[filter:blur(${blurMatch[1]})]`;
            }
            return null;
        }
    },
    {
        property: "backdrop-filter",
        mapper(v) {
            const val = v.trim();
            if (val === "none") return "backdrop-blur-none";
            if (val.includes("blur")) return "backdrop-blur-sm";
            return null;
        }
    },

    // Content
    {
        property: "content",
        mapper(v) {
            const val = v.trim();
            if (val === "none" || val === `""`) return "content-['']";
            return null;
        }
    }
];

// Create a property-to-mapper map for quick lookup
export const CSS_PROPERTY_MAP: Record<string, (value: string) => string | null> = {};
CSS_TO_TAILWIND.forEach((mapping) => {
    CSS_PROPERTY_MAP[mapping.property] = mapping.mapper;
});
