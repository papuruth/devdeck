import UpdateIcon from "@mui/icons-material/Update";
import React from "react";
import { StyledBoxContainer, StyledButton, StyledPaperCenter, StyledText } from "../Styled-Components";

interface AppUpdateUIProps {
    onClickYes: () => void;
    onClose: () => void;
    showCancel?: boolean;
    title?: string;
    description?: string;
    noLabel?: string;
    yesLabel?: string;
}

export default function AppUpdateUI({
    onClickYes,
    onClose,
    showCancel = true,
    title = window.document.title,
    description = "Are you sure?",
    noLabel = "No",
    yesLabel = "Yes"
}: AppUpdateUIProps) {
    return (
        <StyledPaperCenter width={350} sx={{ p: 1 }}>
            <UpdateIcon fontSize="large" sx={{ m: 2 }} color="primary" />
            <StyledText as="h1" variant="h5">
                {title}
            </StyledText>
            <StyledText as="p" sx={{ mt: 1, minHeight: "50px" }}>
                {description}
            </StyledText>
            <StyledBoxContainer justifyContent="flex-end">
                {showCancel ? (
                    <StyledButton variant="outlined" onClick={onClose} sx={{ mr: 1 }}>
                        {noLabel}
                    </StyledButton>
                ) : null}
                <StyledButton variant="outlined" onClick={onClickYes}>
                    {yesLabel}
                </StyledButton>
            </StyledBoxContainer>
        </StyledPaperCenter>
    );
}


