import  { useState, useMemo } from 'react';
import { createTheme, ThemeProvider, CssBaseline, Box, Typography, Container } from '@mui/material';
import { FilterBuilder } from './components/FilterBuilder';
import { DataTable } from './components/FilterTable';
import { initialData } from './data/mockData';
import { filterData } from './utils/filterLogic';
import type { FilterCondition } from './types';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#90caf9',
    },
    background: {
      default: '#121212',
      paper: '#1e1e1e',
    },
  },
  typography: {
    fontFamily: 'Inter, sans-serif',
    h4: {
      fontWeight: 700,
      fontSize: '2rem',
    },
    body1: {
      fontSize: '1rem',
      color: '#ffffffff',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '6px',
          textTransform: 'none',
          padding: '8px 18px',
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          textAlign: 'center',
          borderBottom: '1px solid #333',
        },
      },
    },
  },
});


function App() {
  const [conditions, setConditions] = useState<FilterCondition[]>([]);

  // Use useMemo for performance: filter data only when conditions change
  const filteredData = useMemo(() => {
    return filterData(initialData, conditions);
  }, [conditions]);

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Container maxWidth="lg" sx={{ py: 4 }}>
        {/* Page title */}
        <Typography variant="h4" component="h1" gutterBottom fontWeight="bold">
         Edstruments Dynamic Filter System
        </Typography>

        {/* Filter builder */}
        <FilterBuilder
          conditions={conditions}
          setConditions={setConditions}
        />

        {/* Data Table */}
        <Box sx={{ mt: 4 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography variant="h6">Employee Records</Typography>
            <Typography variant="body2" color="text.secondary">
              Showing {filteredData.length} of {initialData.length} records
            </Typography>
          </Box>
          <DataTable data={filteredData} />
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default App;  