/**
 * CSS Parser - Extracts CSS properties from CSS input
 * Handles multi-rule CSS blocks and extracts property:value pairs
 */

export interface CSSProperty {
    selector: string;
    property: string;
    value: string;
}

export interface ParsedCSS {
    properties: CSSProperty[];
    raw: string;
}

/**
 * Parse CSS input and extract all properties with their selectors
 * Handles multiple rule blocks, nested selectors, and pseudo-selectors
 */
export function parseCSS(input: string): ParsedCSS {
    const trimmed = input.trim();
    if (!trimmed) {
        return { properties: [], raw: "" };
    }

    const props: CSSProperty[] = [];

    // Remove CSS comments
    const css = trimmed.replace(/\/\*[\s\S]*?\*\//g, "");

    // Match CSS rule blocks: selector { properties }
    const ruleRegex = /([^{}]+)\{([^{}]*)\}/g;
    let match = ruleRegex.exec(css);

    while (match !== null) {
        const selector = match[1].trim();
        const declarations = match[2].trim();

        // Split declarations by semicolon and parse each
        const declarationParts = declarations.split(";");

        declarationParts.forEach((decl) => {
            const trimmedDecl = decl.trim();
            if (!trimmedDecl) return;

            const colonIndex = trimmedDecl.indexOf(":");
            if (colonIndex === -1) return;

            const property = trimmedDecl.substring(0, colonIndex).trim().toLowerCase();
            const value = trimmedDecl.substring(colonIndex + 1).trim();

            if (property && value) {
                props.push({
                    selector,
                    property,
                    value
                });
            }
        });

        match = ruleRegex.exec(css);
    }

    // If no rule blocks found, try to parse as inline declarations
    if (props.length === 0 && css.includes(":")) {
        // Check if it looks like declarations without a selector
        if (!css.includes("{") && !css.includes("}")) {
            const declarationParts = css.split(";");
            declarationParts.forEach((decl) => {
                const trimmedDecl = decl.trim();
                if (!trimmedDecl) return;

                const colonIndex = trimmedDecl.indexOf(":");
                if (colonIndex === -1) return;

                const property = trimmedDecl.substring(0, colonIndex).trim().toLowerCase();
                const value = trimmedDecl.substring(colonIndex + 1).trim();

                if (property && value) {
                    props.push({
                        selector: "inline",
                        property,
                        value
                    });
                }
            });
        }
    }

    return {
        properties: props,
        raw: css
    };
}

/**
 * Convert a single CSS property value to Tailwind classes
 */
export function convertPropertyToTailwind(
    property: string,
    value: string,
    mapper: (value: string) => string | null
): { tailwind: string | null; isMapped: boolean } {
    const result = mapper(value);
    return {
        tailwind: result,
        isMapped: result !== null
    };
}

/**
 * Format Tailwind classes for output
 * - Joins multiple classes with spaces
 * - Handles arbitrary values
 * - Formats for direct use in className
 */
export function formatTailwindOutput(classes: string[]): string {
    return classes.filter(Boolean).join("\n");
}

/**
 * Generate comment for unmapped properties
 */
export function generateUnmappedComment(property: string, value: string): string {
    return `/* ${property}: ${value} — no Tailwind class */`;
}
