import React from 'react';
import { Box, Typography, Button, Container } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
// import { ShieldAlert } from '@mui/icons-material';

const Unauthorized = () => {
    const { user } = useAuth();
    const navigate = useNavigate();

    // useEffect(() => {
    //     const token = localStorage.getItem('token');
    //     if (token) {
    //         navigate('/dashboard');
    //     }
    // }, [navigate]);

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
                        {user ? 'Access Denied' : 'Unauthorized'}
                    </Typography>
                    <Typography variant="body1" color="text.secondary" paragraph>
                        {user ? 'You do not have permission to access this page.' : 'You are not authorized to access this page.'}
                        Please contact your administrator if you believe this is a mistake.
                    </Typography>
                </Box>

                <Button
                    variant="contained"
                    onClick={() => { user ? navigate(-1) : navigate('/login') }}
                    size="large"
                >
                    {user ? 'Return to Dashboard' : 'Return to Login'}
                </Button>
            </Box>
        </Container>
    );
};

export default Unauthorized;
