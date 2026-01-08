export type FilterType = 'text' | 'number' | 'date' | 'boolean' | 'select' | 'multi-select';

export type Operator =
    // Text
    | 'equals' | 'contains' | 'starts_with' | 'ends_with' | 'does_not_contain'
    // Number
    | 'gt' | 'lt' | 'gte' | 'lte' | 'neq'
    // Date
    | 'between' | 'before' | 'after'
    // Boolean
    | 'is'
    // Select
    | 'is_not'
    // Multi-select
    | 'in' | 'not_in' | 'all';

export interface FilterCondition {
    id: string;
    field: string;
    operator: Operator;
    value: any;
    type: FilterType;
}

export interface Address {
    city: string;
    state: string;
    country: string;
}

export interface Employee {
    id: number;
    name: string;
    email: string;
    department: string;
    role: string;
    salary: number;
    joinDate: string; // ISO Date string
    isActive: boolean;
    skills: string[];
    address: Address;
    projects: number;
    lastReview: string;
    performanceRating: number;
}
