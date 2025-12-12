import React from 'react';
import { Box, Typography, Button, Container } from '@mui/material';
import { useNavigate } from 'react-router-dom';
// import { ShieldAlert } from '@mui/icons-material';

const Unauthorized = () => {
    const navigate = useNavigate();

    return (
        <Container maxWidth="sm">
            <Box
                display="flex"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
                minHeight="100vh"
                textAlign="center"
                gap={3}
            >
                {/* <ShieldAlert size={64} color="#ef4444" /> */}

                <Box>
                    <Typography variant="h3" component="h1" gutterBottom fontWeight="bold">
                        Access Denied
                    </Typography>
                    <Typography variant="body1" color="text.secondary" paragraph>
                        You do not have permission to access this page.
                        Please contact your administrator if you believe this is a mistake.
                    </Typography>
                </Box>

                <Button
                    variant="contained"
                    onClick={() => navigate('/dashboard')}
                    size="large"
                >
                    Return to Dashboard
                </Button>
            </Box>
        </Container>
    );
};

export default Unauthorized;
