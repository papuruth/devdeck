import { Box } from "@mui/material";
import NextLink from "next/link";
import styled from "styled-components";
import colors from "styles/colors";

export const StyledContainer = styled(Box)`
    padding-bottom: 4px;
`;

export const StyledLink = styled(NextLink)`
    font-weight: 500;
    color: ${colors.primary};
`;
