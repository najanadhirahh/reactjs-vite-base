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
    const [searchText, setSearchText] = useState('');

    const handleSearch = (event) => {
        setSearchText(event.target.value);
    };

    // Filter Logic
    const filteredRows = useMemo(() => {
        return rows.filter((row) =>
            row.name.toLowerCase().includes(searchText.toLowerCase()) ||
            row.email.toLowerCase().includes(searchText.toLowerCase()) ||
            row.role.toLowerCase().includes(searchText.toLowerCase())
        );
    }, [searchText]);

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
        <Box sx={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', overflow: 'hidden', py: 2 }}>
            <DataTable
                title="Users"
                rows={filteredRows}
                columns={columns}
                searchValue={searchText}
                onSearchChange={handleSearch}
                initialPageSize={100}
            />
        </Box>
    );
};

export default UserList;
