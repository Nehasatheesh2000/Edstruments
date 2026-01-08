import React from 'react';
import { Select, MenuItem, FormControl, InputLabel, Checkbox, ListItemText, OutlinedInput } from '@mui/material';

interface SelectInputProps {
  value: string | string[];
  onChange: (value: string | string[]) => void;
  options: string[];
  multiple?: boolean;
}


export const SelectInput: React.FC<SelectInputProps> = ({ value, onChange, options, multiple = false }) => {
    return (
        <FormControl fullWidth size="small">
            <InputLabel>Select Value</InputLabel>
            <Select
                multiple={multiple}
                value={value || (multiple ? [] : '')}
                onChange={(e) => onChange(e.target.value)}
                input={<OutlinedInput label="Select Value" />}
                renderValue={(selected) => multiple ? (selected as string[]).join(', ') : (selected as string)}
            >
                {options.map((option) => (
                    <MenuItem key={option} value={option}>
                        {multiple && <Checkbox checked={(value || []).indexOf(option) > -1} />}
                        <ListItemText primary={option} />
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
};
