import React from 'react';
import { TextField } from '@mui/material';

interface SimpleInputProps {
    value: any;
    onChange: (value: any) => void;
    type?: 'text' | 'number';
    placeholder?: string;
}

export const SimpleInput: React.FC<SimpleInputProps> = ({ value, onChange, type = 'text', placeholder }) => {
    return (
        <TextField
            size="small"
            type={type}
            value={value || ''}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            fullWidth
        />
    );
};
