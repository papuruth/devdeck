import React from "react";
import noDataImage from "assets/images/no-results.svg";
import { Typography } from "@mui/material";
import { StyledContainer } from "./styles";
import { StyledImageRenderer } from "../Styled-Components";

interface NoDataProps {
    title: string;
}

function NoData(props: NoDataProps) {
    const { title } = props;
    return (
        <StyledContainer>
            <figure>
                <StyledImageRenderer src={noDataImage} alt="no-data-found" />
            </figure>
            <Typography variant="h6" color="var(--text-primary)" sx={{ fontWeight: 500 }}>
                {title}
            </Typography>
        </StyledContainer>
    );
}


export default NoData;
