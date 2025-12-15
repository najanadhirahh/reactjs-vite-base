import React, { useState } from 'react';
import {
    Box,
    Toolbar,
    Typography,
    TextField,
    InputAdornment,
    IconButton,
    Tooltip,
    Menu,
    MenuItem,
    ListItemIcon,
    ListItemText,
} from '@mui/material';
import {
    Search as SearchIcon,
    FilterList as FilterListIcon,
    ViewHeadline as DensityIcon,
    ViewCompact,
    ViewComfy,
    TableRows,
} from '@mui/icons-material';
import { DataGrid } from '@mui/x-data-grid';

const DataTable = ({
    title,
    rows,
    columns,
    searchValue,
    onSearchChange,
    showSearch = true,
    initialPageSize = 100,
    pageSizeOptions = [10, 25, 100],
    checkboxSelection = true,
    disableRowSelectionOnClick = true,
}) => {
    const [density, setDensity] = useState('compact');
    const [densityMenuAnchor, setDensityMenuAnchor] = useState(null);

    const handleDensityMenuOpen = (event) => {
        setDensityMenuAnchor(event.currentTarget);
    };

    const handleDensityMenuClose = () => {
        setDensityMenuAnchor(null);
    };

    const handleDensityChange = (newDensity) => {
        setDensity(newDensity);
        handleDensityMenuClose();
    };

    return (
        <Box sx={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column' }}>
            {/* Toolbar */}
            <Toolbar
                sx={{
                    p: { xs: 1, sm: 1 },
                    display: 'flex',
                    justifyContent: 'space-between',
                    gap: 2,
                }}
            >
                <Typography
                    sx={{ flex: '1 1 100%' }}
                    variant="title" // Using custom variant from theme
                    id="tableTitle"
                    component="div"
                    fontWeight="bold"
                >
                    {title}
                </Typography>

                {showSearch && (
                    <TextField
                        variant="outlined"
                        size="small"
                        placeholder={`Search ${title.toLowerCase()}...`}
                        value={searchValue}
                        onChange={onSearchChange}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <SearchIcon />
                                </InputAdornment>
                            ),
                        }}
                        sx={{ minWidth: 250 }}
                    />
                )}

                <Tooltip title="Density">
                    <IconButton onClick={handleDensityMenuOpen}>
                        <DensityIcon />
                    </IconButton>
                </Tooltip>

                <Menu
                    anchorEl={densityMenuAnchor}
                    open={Boolean(densityMenuAnchor)}
                    onClose={handleDensityMenuClose}
                >
                    <MenuItem onClick={() => handleDensityChange('compact')}>
                        <ListItemIcon>
                            <ViewCompact fontSize="small" />
                        </ListItemIcon>
                        <ListItemText>Compact</ListItemText>
                    </MenuItem>
                    <MenuItem onClick={() => handleDensityChange('standard')}>
                        <ListItemIcon>
                            <TableRows fontSize="small" />
                        </ListItemIcon>
                        <ListItemText>Standard</ListItemText>
                    </MenuItem>
                    <MenuItem onClick={() => handleDensityChange('comfortable')}>
                        <ListItemIcon>
                            <ViewComfy fontSize="small" />
                        </ListItemIcon>
                        <ListItemText>Comfortable</ListItemText>
                    </MenuItem>
                </Menu>

                <Tooltip title="Filter list">
                    <IconButton>
                        <FilterListIcon />
                    </IconButton>
                </Tooltip>
            </Toolbar>

            <DataGrid
                density={density}
                rows={rows}
                columns={columns}
                initialState={{
                    pagination: {
                        paginationModel: { page: 0, pageSize: initialPageSize },
                    },
                }}
                pageSizeOptions={pageSizeOptions}
                checkboxSelection={checkboxSelection}
                disableRowSelectionOnClick={disableRowSelectionOnClick}
                sx={{
                    border: 0,
                    '& .MuiDataGrid-cell:focus': {
                        outline: 'none',
                    },
                    '& .MuiDataGrid-columnHeaders': {
                        backgroundColor: '#b4b4b4ff',
                        borderBottom: '1px solid #e0e0e0',
                    },
                    '& .MuiDataGrid-columnHeader': {
                        backgroundColor: '#b4b4b4ff',
                    },
                }}
            />
        </Box>
    );
};

export default DataTable;
