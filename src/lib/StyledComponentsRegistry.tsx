"use client";

import React, { useState } from "react";
import { useServerInsertedHTML } from "next/navigation";
import { ServerStyleSheet, StyleSheetManager } from "styled-components";
import isPropValid from "@emotion/is-prop-valid";

// Mirror the shouldForwardProp behavior from the CRA App.js
function shouldForwardProp(propName: string, target: unknown): boolean {
    if (typeof target === "string") {
        return isPropValid(propName);
    }
    return true;
}

export default function StyledComponentsRegistry({ children }: { children: React.ReactNode }) {
    const [styledComponentsStyleSheet] = useState(() => new ServerStyleSheet());

    useServerInsertedHTML(() => {
        const styles = styledComponentsStyleSheet.getStyleElement();
        styledComponentsStyleSheet.instance.clearTag();
        return styles;
    });

    // eslint-disable-next-line react/jsx-no-useless-fragment
    if (typeof window !== "undefined") return <>{children}</>;

    return (
        <StyleSheetManager sheet={styledComponentsStyleSheet.instance} shouldForwardProp={shouldForwardProp}>
            {children}
        </StyleSheetManager>
    );
}
