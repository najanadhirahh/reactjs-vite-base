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
        // p: { xs: 1.5, sm: 2, md: 3 },
        // background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      }}
    >
      <Outlet />
    </Box>
  );
};

export default PublicLayout;