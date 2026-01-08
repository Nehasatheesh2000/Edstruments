import type { FilterType } from '../types';

export interface FieldDefinition {
    key: string;
    label: string;
    type: FilterType;
    options?: string[];
}

export const AVAILABLE_FIELDS: FieldDefinition[] = [
    { key: 'name', label: 'Name', type: 'text' },
    { key: 'email', label: 'Email', type: 'text' },
    { key: 'department', label: 'Department', type: 'select', options: ['Engineering', 'Sales', 'Marketing', 'HR', 'Product', 'Design'] },
    { key: 'role', label: 'Role', type: 'text' },
    { key: 'salary', label: 'Salary', type: 'number' },
    { key: 'joinDate', label: 'Join Date', type: 'date' },
    { key: 'isActive', label: 'Is Active', type: 'boolean' },
    { key: 'skills', label: 'Skills', type: 'multi-select', options: ['React', 'TypeScript', 'Node.js', 'Python', 'Go', 'Java', 'C++', 'Figma', 'AWS', 'Docker'] },
    { key: 'address.city', label: 'City', type: 'text' },
    { key: 'projects', label: 'Projects', type: 'number' },
    { key: 'performanceRating', label: 'Rating', type: 'number' },
];

export const OPERATORS_BY_TYPE: Record<FilterType, { label: string; value: string }[]> = {
    text: [
        { label: 'Equals', value: 'equals' },
        { label: 'Contains', value: 'contains' },
        { label: 'Starts With', value: 'starts_with' },
        { label: 'Ends With', value: 'ends_with' },
        { label: 'Does Not Contain', value: 'does_not_contain' },
    ],
    number: [
        { label: '=', value: 'equals' },
        { label: '>', value: 'gt' },
        { label: '<', value: 'lt' },
        { label: '>=', value: 'gte' },
        { label: '<=', value: 'lte' },
        { label: '!=', value: 'neq' },
        { label: 'Between', value: 'between' }
    ],
    date: [
        { label: 'On', value: 'is' },
        { label: 'Before', value: 'before' },
        { label: 'After', value: 'after' },
        { label: 'Between', value: 'between' }
    ],
    boolean: [
        { label: 'Is', value: 'is' }
    ],
    select: [
        { label: 'Is', value: 'equals' },
        { label: 'Is Not', value: 'is_not' }
    ],
    'multi-select': [
        { label: 'Includes Any', value: 'in' },
        { label: 'Includes All', value: 'all' },
        { label: 'Does Not Include', value: 'not_in' }
    ]
};
