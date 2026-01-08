import React from 'react';
import { Box, TextField } from '@mui/material';

interface RangeInputProps {
    value: [number | string, number | string] | null;
    onChange: (value: [number | string, number | string]) => void;
}

export const RangeInput: React.FC<RangeInputProps> = ({ value, onChange }) => {
    const min = value ? value[0] : '';
    const max = value ? value[1] : '';

    const handleMinChange = (val: string) => {
        onChange([val, max]);
    };

    const handleMaxChange = (val: string) => {
        onChange([min, val]);
    };
const isInvalidRange =
  min !== '' && max !== '' && Number(min) > Number(max);

    return (
        <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
            <TextField
                size="small"
                type="number"
                value={min}
                onChange={(e) => handleMinChange(e.target.value)}
                placeholder="Min"
                 error={isInvalidRange}
            />
            <span>-</span>
            <TextField
                size="small"
                type="number"
                value={max}
                onChange={(e) => handleMaxChange(e.target.value)}
                placeholder="Max"
                error={isInvalidRange}
            />
        </Box>
    );
};
