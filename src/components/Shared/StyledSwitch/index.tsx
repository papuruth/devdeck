import { FormControlLabel, FormGroup } from "@mui/material";
import React from "react";
import { Android12Switch } from "./styles";

interface StyledSwitchProps {
    label: string;
    checked: boolean;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    disabled?: boolean;
}

export default function StyledSwitch({ label, checked, onChange, disabled }: StyledSwitchProps) {
    return (
        <FormGroup>
            <FormControlLabel
                sx={{ ml: 0 }}
                control={<Android12Switch checked={checked} onChange={onChange} />}
                label={label}
                labelPlacement="start"
                slotProps={{
                    typography: { sx: { fontWeight: 500, mr: 2 } }
                }}
                disabled={disabled}
            />
        </FormGroup>
    );
}


