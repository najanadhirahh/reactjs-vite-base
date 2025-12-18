import React from 'react';
import { Box, Typography } from '@mui/material';

const Header = ({ title, description }) => {
    return (
        <Box>
            <Typography variant="title" gutterBottom fontWeight="bold" sx={{ display: 'block' }}>
                {title}
            </Typography>

            <Typography variant="body" color="text.secondary" mb={2} sx={{ display: 'block' }}>
                {description}
            </Typography>
        </Box>
    );
};

export default Header;