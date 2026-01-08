import React from 'react';
import { Box, Button, Typography, Paper } from '@mui/material';
import { Plus, X } from 'lucide-react';
import type { FilterCondition } from '../types';
import { FilterRow } from './FilterRow';
import { AVAILABLE_FIELDS, OPERATORS_BY_TYPE } from '../constants/fields';

interface FilterBuilderProps {
    conditions: FilterCondition[];
    setConditions: (conditions: FilterCondition[]) => void;
}

export const FilterBuilder: React.FC<FilterBuilderProps> = ({ conditions, setConditions }) => {
    const addCondition = () => {
        const defaultField = AVAILABLE_FIELDS[0];
        const newCondition: FilterCondition = {
            id: crypto.randomUUID(),
            field: defaultField.key,
            type: defaultField.type,
            operator: OPERATORS_BY_TYPE[defaultField.type][0].value as any,
            value: ''
        };
        setConditions([...conditions, newCondition]);
    };

    const updateCondition = (id: string, newCondition: FilterCondition) => {
        setConditions(conditions.map(c => c.id === id ? newCondition : c));
    };

    const removeCondition = (id: string) => {
        setConditions(conditions.filter(c => c.id !== id));
    };

    const clearAll = () => {
        setConditions([]);
    };

    return (
        <Paper sx={{ p: 3, mb: 3 }} elevation={1}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="h6">Filters</Typography>
                {conditions.length > 0 && (
                    <Button startIcon={<X size={16} />} onClick={clearAll} color="inherit" size="small">
                        Clear All
                    </Button>
                )}
            </Box>

            {conditions.map(condition => (
                <FilterRow
                    key={condition.id}
                    condition={condition}
                    onChange={(newCond) => updateCondition(condition.id, newCond)}
                    onRemove={() => removeCondition(condition.id)}
                />
            ))}

            <Button startIcon={<Plus size={18} />} onClick={addCondition} variant="outlined" size="small">
                Add Filter
            </Button>
        </Paper>
    );
};
