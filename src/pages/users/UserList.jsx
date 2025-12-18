import React, { useState, useMemo } from 'react';
import {
    Box,
    Chip,
    Avatar,
    IconButton,
    Tooltip,
    Typography,
} from '@mui/material';
import {
    Edit as EditIcon,
    Delete as DeleteIcon,
} from '@mui/icons-material';
import DataTable from '../../components/DataTable';
import { DataGrid } from '@mui/x-data-grid';
import CustomToolbar from '../../components/customToolbar';
import Header from '../../components/header';

// --- Mock Data Generation ---
const generateUsers = (count) => {
    const roles = ['admin', 'user', 'manager', 'editor'];
    const statuses = ['active', 'inactive', 'pending'];
    const users = [];

    for (let i = 1; i <= count; i++) {
        const role = roles[Math.floor(Math.random() * roles.length)];
        const status = statuses[Math.floor(Math.random() * statuses.length)];
        users.push({
            id: i,
            name: `User ${i}`,
            email: `user${i}@example.com`,
            role: role,
            status: status,
            joinDate: new Date(Date.now() - Math.floor(Math.random() * 10000000000)).toLocaleDateString(),
            avatar: `https://i.pravatar.cc/150?u=${i}`,
        });
    }
    return users;
};

const rows = generateUsers(50);

const UserList = () => {


    // Status Chip Colors
    const getStatusColor = (status) => {
        switch (status) {
            case 'active': return 'success';
            case 'inactive': return 'default';
            case 'pending': return 'warning';
            default: return 'default';
        }
    }

    const columns = [
        {
            field: 'user',
            headerName: 'User',
            width: 250,
            renderCell: (params) => (
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Avatar src={params.row.avatar} alt={params.row.name} sx={{ width: 32, height: 32 }} />
                    <Typography variant="body2" fontWeight="medium">{params.row.name}</Typography>
                </Box>
            ),
        },
        { field: 'email', headerName: 'Email', width: 250 },
        {
            field: 'role',
            headerName: 'Role',
            width: 150,
            renderCell: (params) => (
                <Typography variant="caption" sx={{ textTransform: 'uppercase', fontWeight: 'bold', color: 'text.secondary' }}>
                    {params.value}
                </Typography>
            ),
        },
        {
            field: 'status',
            headerName: 'Status',
            width: 150,
            renderCell: (params) => (
                <Chip
                    label={params.value}
                    size="small"
                    color={getStatusColor(params.value)}
                    variant="outlined"
                    sx={{ textTransform: 'capitalize' }}
                />
            ),
        },
        { field: 'joinDate', headerName: 'Joined', width: 150 },
        {
            field: 'actions',
            headerName: 'Actions',
            width: 120,
            sortable: false,
            renderCell: (params) => (
                <Box>
                    <Tooltip title="Edit">
                        <IconButton size="small">
                            <EditIcon fontSize="small" />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete">
                        <IconButton size="small" color="error">
                            <DeleteIcon fontSize="small" />
                        </IconButton>
                    </Tooltip>
                </Box>
            )
        }
    ];

    return (
        <Box sx={{ height: '75vh', width: '100%', display: 'flex', flexDirection: 'column' }}>
            <Header title="Users" description="Manage your user listing" />
            <DataGrid
                rows={rows}
                columns={columns}
                slots={{
                    toolbar: CustomToolbar,
                }}
                initialState={{
                    pagination: {
                        paginationModel: { pageSize: 100 },
                    },
                }}
                pageSizeOptions={[25, 50, 100]}
                disableRowSelectionOnClick
                sx={{ border: 'none' }}
            />
        </Box>
    );
};

export default UserList;
