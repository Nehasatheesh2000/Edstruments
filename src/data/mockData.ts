import type { Employee } from "../types/filters";

const departments = ['Engineering', 'Sales', 'Marketing', 'HR', 'Product', 'Design'];
const roles = ['Junior', 'Mid-Level', 'Senior', 'Lead', 'Manager', 'Director'];
const cities = ['San Francisco', 'New York', 'Austin', 'Boston', 'Seattle', 'London', 'Berlin'];
const skillsList = ['React', 'TypeScript', 'Node.js', 'Python', 'Go', 'Java', 'C++', 'Figma', 'AWS', 'Docker'];

// Generator function for random employees
const generateEmployee = (id: number): Employee => {
    const dept = departments[Math.floor(Math.random() * departments.length)];
    const isTech = ['Engineering', 'Product', 'Design'].includes(dept);

    return {
        id,
        name: `Employee ${id}`,
        email: `employee${id}@company.com`,
        department: dept,
        role: `${roles[Math.floor(Math.random() * roles.length)]} ${isTech ? 'Developer' : 'Specialist'}`,
        salary: 50000 + Math.floor(Math.random() * 150000),
        joinDate: new Date(2020 + Math.floor(Math.random() * 5), Math.floor(Math.random() * 12), Math.floor(Math.random() * 28))
            .toISOString().split('T')[0],
        isActive: Math.random() > 0.1,
        skills: Array.from({ length: 2 + Math.floor(Math.random() * 4) }, () => skillsList[Math.floor(Math.random() * skillsList.length)]),
        address: {
            city: cities[Math.floor(Math.random() * cities.length)],
            state: 'CA', 
            country: Math.random() > 0.8 ? 'UK' : 'USA'
        },
        projects: Math.floor(Math.random() * 10),
        lastReview: new Date(2023, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28))
            .toISOString().split('T')[0],
        performanceRating: Number((2 + Math.random() * 3).toFixed(1))
    };
};

// Initial hardcoded employees (optional)
const hardcodedEmployees: Employee[] = [
    {
        id: 1,
        name: "John Smith",
        email: "john.smith@company.com",
        department: "Engineering",
        role: "Senior Developer",
        salary: 95000,
        joinDate: "2021-03-15",
        isActive: true,
        skills: ["React", "TypeScript", "Node.js", "GraphQL"],
        address: { city: "San Francisco", state: "CA", country: "USA" },
        projects: 3,
        lastReview: "2024-01-15",
        performanceRating: 4.5
    },
    {
        id: 2,
        name: "Jane Doe",
        email: "jane.doe@company.com",
        department: "Sales",
        role: "Director",
        salary: 180000,
        joinDate: "2019-11-01",
        isActive: true,
        skills: ["Salesforce", "Management"],
        address: { city: "New York", state: "NY", country: "USA" },
        projects: 12,
        lastReview: "2023-12-20",
        performanceRating: 4.9
    }
];

// Generate remaining employees to make total 50
export const initialData: Employee[] = [
    ...hardcodedEmployees,
    ...Array.from({ length: 50 - hardcodedEmployees.length }, (_, i) => generateEmployee(i + hardcodedEmployees.length + 1))
];
