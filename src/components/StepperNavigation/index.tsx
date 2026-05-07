import React from "react";
import { Breadcrumbs, Typography } from "@mui/material";
import { StyledContainer, StyledLink } from "./styles";

interface StepperNavigationProps {
    currentView: string;
    category?: { label: string; id?: string; color?: string } | null;
}

export default function StepperNavigation({ currentView, category }: StepperNavigationProps) {
    return (
        <StyledContainer>
            <Breadcrumbs aria-label="breadcrumb">
                <StyledLink href="/">Home</StyledLink>
                {category ? (
                    <Typography color="text.secondary" sx={{ fontSize: "0.875rem" }}>
                        {category.label}
                    </Typography>
                ) : null}
                <Typography color="text.primary">{currentView}</Typography>
            </Breadcrumbs>
        </StyledContainer>
    );
}


