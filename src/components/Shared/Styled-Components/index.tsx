import { Box, Button, Divider, Paper, TextField, Typography } from "@mui/material";
import styled from "styled-components";
import { styled as muiStyled } from "@mui/material/styles";
import { styledMedia } from "styles/global";

const getBoxWidth = (props: any) => {
    const { width } = props || {};
    if (typeof width === "number") {
        return `${width}px`;
    }
    if (typeof width === "string") {
        return width;
    }
    return "100%";
};

const getBoxHeight = (props: any) => {
    const { height } = props || {};
    if (typeof height === "number") {
        return `${height}px`;
    }
    if (typeof height === "string") {
        return height;
    }
    return "100%";
};

export const StyledImagePreviewContainer = styled.div<{ isPadding?: boolean; borderRight?: boolean; borderBottom?: boolean }>`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 50%;
    padding: ${(props) => (props?.isPadding ? "20px" : "0")};
    text-align: center;
    border-right: ${(props) => (props.borderRight ? "1px solid var(--border-color)" : "")};
    ${styledMedia.lessThan("md")`
      width: 100%;
      border-right: 0;
      border-bottom: ${(props: { borderBottom?: boolean }) => (props.borderBottom ? "1px solid var(--border-color)" : "")};
    `}
`;

export const StyledBoxCenter = styled(Box as any)<any>`
    display: flex;
    align-items: center;
    width: ${(props: any) => getBoxWidth(props)};
    max-width: 100%;
    height: 100%;
    margin: auto;
    margin-top: ${(props: any) => (props.marginTop ? `${props.marginTop * 8}px` : "auto")};
    ${styledMedia.lessThan("md")`
      width: 100%;
      height: 100%;
      padding: ${(props: any) => (props?.$isLeftRightPadding ? "0 16px" : "")}
    `}
    ${styledMedia.lessThan("sm")`
      width: 100%;
      padding: ${(props: any) => (props?.$isLeftRightPadding ? "0 12px" : "")}
    `}
    ${styledMedia.lessThan("xs")`
      width: 100%;
      padding: ${(props: any) => (props?.$isLeftRightPadding ? "0 8px" : "")}
    `}
`;

export const StyledPaperCenter = styled(Paper as any)<any>`
    display: flex;
    align-items: center;
    justify-content: center;
    width: ${(props: any) => (props.width ? `${props.width}px` : "100%")};
    max-width: 100%;
    height: ${(props: any) => (props.height ? `${props.height}px` : "100%")};
    flex-direction: column;
    aspect-ratio: ${(props: any) => (props?.$isAspectRatio ? 1 / 1 : "")};
    ${styledMedia.lessThan("md")`
      width: 100%;
      height: 100%;
    `}
    ${styledMedia.lessThan("sm")`
      width: 100%;
      height: 100%;
    `}
    ${styledMedia.lessThan("xs")`
      width: 100%;
      height: 100%;
    `}
`;

const getImageHeight = (props: any) => {
    if (props.sameDimensions && props.width) {
        return `${props.width}px`;
    }
    if (props.height) {
        return `${props.height}px`;
    }
    return "100%";
};

export const StyledImageRenderer = styled.img`
    width: ${(props: any) => (props.width ? `${props.width}px` : "100%")};
    height: ${(props: any) => getImageHeight(props)};
    object-fit: scale-down;
    ${styledMedia.lessThan("md")`
      width: 100%;
      height: 100%;
    `}
    ${styledMedia.lessThan("sm")`
      width: 100%;
      height: auto;
    `}
    ${styledMedia.lessThan("xs")`
      width: 100%;
      height: auto;
    `}
`;

export const StyledDivider = styled(Divider)<{ width?: number }>`
    width: ${(props) => (props.width ? `${props.width}px` : "100%")};
`;

export const StyledTextField = muiStyled(TextField)({
    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
        borderColor: "black",
        borderWidth: "1px"
    },
    "&[readonly='read-only']": {
        pointerEvents: "none"
    },
    "#placeholder": {
        textAlign: "center"
    }
});

export const StyledText = styled(Typography as any)<any>`
    font-size: ${(props) => (props.fontSize ? `${props.fontSize}px` : "")};
    ${styledMedia.lessThan("md")`
      font-size: 2rem;
    `}
    ${styledMedia.lessThan("sm")`
      font-size: 1rem;
    `}
    ${styledMedia.lessThan("xs")`
      font-size: 14px;
    `}
`;

export const StyledButton = styled(Button)``;

export const StyledBoxContainer = styled(Box as any)<any>`
    display: flex;
    width: ${(props: any) => getBoxWidth(props)};
    max-width: 100%;
    height: ${(props: any) => getBoxHeight(props)};
    margin: auto;
    margin-top: ${(props: any) => (props.marginTop ? `${props.marginTop * 8}px` : "auto")};
    ${styledMedia.lessThan("md")`
      width: 100%;
    `}
    ${styledMedia.lessThan("sm")`
      width: 100%;
    `}
    ${styledMedia.lessThan("xs")`
      width: 100%;
    `}
`;

export const StyledSpacer = styled(Typography)`
    display: block;
`;
