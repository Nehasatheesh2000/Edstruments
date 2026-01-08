import React, { useState } from 'react';
import {
    Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
    Paper, TablePagination, Typography, Chip, Box
} from '@mui/material';
import type { Employee } from '../types';

interface DataTableProps {
    data: Employee[];
}

const getNestedValue = (obj: any, path: string): any => {
    return path.split('.').reduce((acc, key) => acc && acc[key], obj);
};

export const DataTable: React.FC<DataTableProps> = ({ data }) => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const handleChangePage = (_event: unknown, newPage: number) => setPage(newPage);
    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    if (data.length === 0) {
        return (
            <Paper sx={{ p: 4, textAlign: 'center' }}>
                <Typography variant="h6" color="text.secondary">No results found</Typography>
            </Paper>
        );
    }

    const columns = [
        { id: 'name', label: 'Name' },
        { id: 'email', label: 'Email' },
        { id: 'role', label: 'Role' },
        { id: 'department', label: 'Department' },
        { id: 'salary', label: 'Salary', format: (v: number) => `$${v.toLocaleString()}` },
        { id: 'joinDate', label: 'Join Date' },
        { id: 'isActive', label: 'Status' },
        { id: 'address.city', label: 'City' },
        { id: 'skills', label: 'Skills' },
        { id: 'projects', label: 'Projects' },
        { id: 'performanceRating', label: 'Rating' },
    ];

    return (
<Paper sx={{ width: '100%', overflow: 'hidden' }}>
  <TableContainer sx={{ maxHeight: 500, width: '100%' }}>
                <Table stickyHeader size="small">
                    <TableHead>
                        <TableRow>
                            {columns.map(col => (
                                <TableCell key={col.id} sx={{ fontWeight: 'bold', textAlign: 'center' }}>
                                    {col.label}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map(row => (
                                <TableRow hover key={row.id}>
                                    {columns.map(col => {
                                        const value = getNestedValue(row, col.id);
                                        return (
                                            <TableCell key={col.id} sx={{ textAlign: 'center', whiteSpace: 'nowrap' }}>
                                                {col.id === 'isActive' ? (
                                                    <Chip
                                                        label={value ? 'Active' : 'Inactive'}
                                                        color={value ? 'success' : 'default'}
                                                        size="small"
                                                        variant="outlined"
                                                    />
                                                ) : col.id === 'skills' ? (
                                                    (value as string[]).slice(0, 3).join(', ') +
                                                    ((value as string[]).length > 3 ? ` +${(value as string[]).length - 3}` : '')
                                                ) : col.format ? (
                                                    col.format(value)
                                                ) : (
                                                    value
                                                )}
                                            </TableCell>
                                        );
                                    })}
                                </TableRow>
                            ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[10, 25, 50]}
                component="div"
                count={data.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Paper>
    );
};
