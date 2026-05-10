// Migration shim: allow any transient ($-prefixed) props on styled-components
// Remove this file and add explicit prop generics as types are incrementally added.
import "styled-components";

declare module "styled-components" {
    // Augment the base styled-components props to allow any transient prop
    // eslint-disable-next-line @typescript-eslint/no-empty-interface
    interface DefaultTheme {
        [key: string]: unknown;
    }
}

// Allow any $-prefixed prop on styled-components without explicit generics
declare global {
    namespace JSX {
        interface IntrinsicElements {
            [elemName: string]: Record<string, unknown>;
        }
    }
}

// Allow CSS imports
declare module "*.css" {
  export {};
}