import React from 'react';
import { Box, TextField, Typography } from '@mui/material';

type DateOperator = 'before' | 'after' | 'between';
type DateValue = string | [string, string];

interface DateInputProps {
  value: DateValue;
  onChange: (value: DateValue) => void;
  operator: DateOperator;
}

export const DateInput: React.FC<DateInputProps> = ({
  value,
  onChange,
  operator,
}) => {
  const isRange = operator === 'between';
  const today = new Date().toISOString().split('T')[0];

  if (isRange) {
    const min = Array.isArray(value) ? value[0] : '';
    const max = Array.isArray(value) ? value[1] : '';

    const isInvalidRange = Boolean(
      min && max && new Date(min) > new Date(max)
    );

    return (
      <Box sx={{ display: 'flex', gap: 1, alignItems: 'center', flexWrap: 'wrap' }}>
        <TextField
          size="small"
          type="date"
          value={min}
          onChange={(e) => onChange([e.target.value, max])}
          error={isInvalidRange}
          slotProps={{
            htmlInput: { max: today },
            inputLabel: { shrink: true },
          }}
        />

        <Typography variant="body2">to</Typography>

        <TextField
          size="small"
          type="date"
          value={max}
          onChange={(e) => onChange([min, e.target.value])}
          error={isInvalidRange}
          slotProps={{
            htmlInput: { max: today },
            inputLabel: { shrink: true },
          }}
        />

        {isInvalidRange && (
          <Typography variant="caption" color="error">
            Start date must be before end date
          </Typography>
        )}
      </Box>
    );
  }

  return (
    <TextField
      size="small"
      type="date"
      value={typeof value === 'string' ? value : ''}
      onChange={(e) => onChange(e.target.value)}
      slotProps={{
        htmlInput: { max: today },
        inputLabel: { shrink: true },
      }}
      fullWidth
    />
  );
};
