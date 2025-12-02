// src/components/PublicLayout.jsx
import React from 'react';
import { Outlet } from 'react-router-dom';
import { Box } from '@mui/material';

const PublicLayout = () => {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        p: 2,
        bgcolor: 'grey.50' // optional background
      }}
    >
      <Box sx={{ width: '100%', maxWidth: 400 }}>
        <Outlet />
      </Box>
    </Box>
  );
};

export default PublicLayout;