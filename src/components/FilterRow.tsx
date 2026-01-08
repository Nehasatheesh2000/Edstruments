import React from 'react';
import {
  Box,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  IconButton
} from '@mui/material';
import type { SelectChangeEvent } from '@mui/material';
import { Trash2 } from 'lucide-react';

import type { FilterCondition, Operator } from '../types';
import { AVAILABLE_FIELDS, OPERATORS_BY_TYPE } from '../constants/fields';

import { SimpleInput } from './inputs/SimpleInput';
import { RangeInput } from './inputs/RangeInput';
import { SelectInput } from './inputs/SelectInput';
import { DateInput } from './inputs/Dateinput';
import { BooleanInput } from './inputs/Booleaninput';
interface FilterRowProps {
  condition: FilterCondition;
  onChange: (condition: FilterCondition) => void;
  onRemove: () => void;
}

export const FilterRow: React.FC<FilterRowProps> = ({
  condition,
  onChange,
  onRemove
}) => {
  const handleFieldChange = (e: SelectChangeEvent) => {
    const newFieldKey = e.target.value;
    const fieldDef = AVAILABLE_FIELDS.find(f => f.key === newFieldKey);
    if (!fieldDef) return;

    const defaultOperator =
      OPERATORS_BY_TYPE[fieldDef.type][0].value as Operator;

    let defaultValue: any = '';

    if (fieldDef.type === 'multi-select') defaultValue = [];
    if (fieldDef.type === 'boolean') defaultValue = false;

    onChange({
      ...condition,
      field: newFieldKey,
      type: fieldDef.type,
      operator: defaultOperator,
      value: defaultValue
    });
  };

  const handleOperatorChange = (e: SelectChangeEvent) => {
    onChange({
      ...condition,
      operator: e.target.value as Operator
    });
  };

  const handleValueChange = (value: any) => {
    onChange({
      ...condition,
      value
    });
  };

  const fieldDef = AVAILABLE_FIELDS.find(f => f.key === condition.field);
  const operators = fieldDef
    ? OPERATORS_BY_TYPE[fieldDef.type]
    : [];

  const renderInput = () => {
    if (!fieldDef) return null;

    const isRange = condition.operator === 'between';

    switch (fieldDef.type) {
      case 'text':
        return (
          <SimpleInput
            value={condition.value}
            onChange={handleValueChange}
          />
        );

      case 'number':
        return isRange ? (
          <RangeInput
            value={condition.value}
            onChange={handleValueChange}
          />
        ) : (
          <SimpleInput
            type="number"
            value={condition.value}
            onChange={handleValueChange}
          />
        );

      case 'date':
        return (
          <DateInput
            value={condition.value}
            onChange={handleValueChange}
            isRange={isRange}
          />
        );

      case 'select':
        return (
          <SelectInput
            value={condition.value}
            onChange={handleValueChange}
            options={fieldDef.options || []}
          />
        );

      case 'multi-select':
        return (
          <SelectInput
            value={condition.value}
            onChange={handleValueChange}
            options={fieldDef.options || []}
            multiple
          />
        );

      case 'boolean':
        return (
          <BooleanInput
            value={Boolean(condition.value)}
            onChange={handleValueChange}
          />
        );

      default:
        return null;
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        gap: 2,
        alignItems: 'center',
        mb: 2
      }}
    >
      <FormControl size="small" sx={{ minWidth: 160 }}>
        <InputLabel>Field</InputLabel>
        <Select
          label="Field"
          value={condition.field}
          onChange={handleFieldChange}
        >
          {AVAILABLE_FIELDS.map(field => (
            <MenuItem key={field.key} value={field.key}>
              {field.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl size="small" sx={{ minWidth: 160 }}>
        <InputLabel>Operator</InputLabel>
        <Select
          label="Operator"
          value={condition.operator}
          onChange={handleOperatorChange}
        >
          {operators.map(op => (
            <MenuItem key={op.value} value={op.value}>
              {op.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <Box sx={{ flexGrow: 1 }}>
        {renderInput()}
      </Box>

      <IconButton
        onClick={onRemove}
        color="error"
        size="small"
      >
        <Trash2 size={18} />
      </IconButton>
    </Box>
  );
};
