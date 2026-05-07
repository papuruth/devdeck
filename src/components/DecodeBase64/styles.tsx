import { Typography } from "@mui/material";
import type { ElementType } from "react";
import styled from "styled-components";
import { styledMedia } from "styles/global";

export const StyledContainer = styled.div`
    width: 100%;
`;

export const StyledText = styled(Typography)<{ component?: ElementType; fontSize?: number | string }>`
    font-size: ${(props) => (props.fontSize ? `${props.fontSize}px` : "")};
    ${styledMedia.lessThan("sm")`
      font-size: 1rem;
    `}
    ${styledMedia.lessThan("xs")`
      font-size: 14px;
    `}
`;
