import type { Employee, FilterCondition } from '../types';

const getNestedValue = (obj: any, path: string): any => {
    return path.split('.').reduce((acc, part) => acc && acc[part], obj);
};

export const filterData = (data: Employee[], conditions: FilterCondition[]): Employee[] => {
    if (conditions.length === 0) return data;

    const conditionsByField: Record<string, FilterCondition[]> = {};
    conditions.forEach(c => {
        if (!conditionsByField[c.field]) conditionsByField[c.field] = [];
        conditionsByField[c.field].push(c);
    });

    return data.filter((item) => {
        return Object.keys(conditionsByField).every(field => {
            const fieldConditions = conditionsByField[field];
            return fieldConditions.some(condition => {
                const itemValue = getNestedValue(item, condition.field);
                return evaluateCondition(itemValue, condition);
            });
        });
    });
};

const evaluateCondition = (value: any, condition: FilterCondition): boolean => {
    const { operator, value: filterValue } = condition;

    if (value === undefined || value === null) return false;

    const strValue = String(value).toLowerCase();
    const strFilter = String(filterValue).toLowerCase();

    switch (operator) {
        case 'equals':
            return strValue === strFilter;
        case 'contains':
            return strValue.includes(strFilter);
        case 'starts_with':
            return strValue.startsWith(strFilter);
        case 'ends_with':
            return strValue.endsWith(strFilter);
        case 'does_not_contain':
            return !strValue.includes(strFilter);

        case 'gt':
            return Number(value) > Number(filterValue);
        case 'lt':
            return Number(value) < Number(filterValue);
        case 'gte':
            return Number(value) >= Number(filterValue);
        case 'lte':
            return Number(value) <= Number(filterValue);
        case 'neq':
            return Number(value) !== Number(filterValue);

        case 'between':
            if (Array.isArray(filterValue) && filterValue.length === 2) {
                if (!filterValue[0] || !filterValue[1]) return true;
                const valTime = new Date(value).getTime();
                const minTime = new Date(filterValue[0]).getTime();
                const maxTime = new Date(filterValue[1]).getTime();
                return valTime >= minTime && valTime <= maxTime;
            }
            return false;
        case 'before':
            return new Date(value).getTime() < new Date(filterValue).getTime();
        case 'after':
            return new Date(value).getTime() > new Date(filterValue).getTime();

        case 'is':
            return String(value) === String(filterValue);

        case 'is_not':
            return strValue !== strFilter;

        case 'in':
            if (Array.isArray(value)) {
                return value.some(v => (filterValue as any[]).includes(v));
            } else {
                return (filterValue as any[]).includes(value);
            }
        case 'all':
            if (Array.isArray(value)) {
                return (filterValue as any[]).every(fv => value.includes(fv));
            }
            return false;
        case 'not_in':
            if (Array.isArray(value)) {
                return !value.some(v => (filterValue as any[]).includes(v));
            } else {
                return !(filterValue as any[]).includes(value);
            }

        default:
            return false;
    }
};
