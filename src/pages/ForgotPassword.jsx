import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import {
  Container,
  Paper,
  TextField,
  Button,
  Typography,
  Box,
  Alert,
  CircularProgress,
} from '@mui/material';
import { LockResetOutlined, CheckCircleOutlined } from '@mui/icons-material';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const { forgotPassword } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const result = await forgotPassword(email);
    
    if (result.success) {
      setSuccess(true);
    } else {
      setError(result.error);
    }
    
    setLoading(false);
  };

  if (success) {
    return (
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          padding: { xs: 1.5, sm: 2, md: 3 },
        }}
      >
        <Paper
          elevation={10}
          sx={{
            padding: { xs: 2.5, sm: 3, md: 4 },
            borderRadius: 2,
            textAlign: 'center',
            maxWidth: 400,
            width: '100%',
            boxShadow: { xs: 8, sm: 10 }
          }}
        >
            <CheckCircleOutlined sx={{ fontSize: { xs: 56, sm: 64 }, color: 'success.main', mb: 2 }} />
            <Typography variant="title" component="h1" gutterBottom sx={{ display: 'block' }}>
              Check Your Email
            </Typography>
            <Typography variant="body" color="text.secondary" mb={3} sx={{ display: 'block' }}>
              We've sent a password reset link to <strong>{email}</strong>
            </Typography>
            <Typography variant="text" color="text.secondary" mb={3} sx={{ display: 'block' }}>
              Didn't receive the email? Check your spam folder or try again.
            </Typography>
            <Link to="/login" style={{ textDecoration: 'none' }}>
              <Button variant="contained" size="large">
                Back to Login
              </Button>
            </Link>
        </Paper>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        padding: { xs: 1.5, sm: 2, md: 3 },
      }}
    >
      <Paper
        elevation={10}
        sx={{
          padding: { xs: 2.5, sm: 3, md: 4 },
          borderRadius: 2,
          maxWidth: 400,
          width: '100%',
          boxShadow: { xs: 8, sm: 10 }
        }}
      >
          <Box textAlign="center" mb={3}>
            <LockResetOutlined sx={{ fontSize: { xs: 40, sm: 48 }, color: 'primary.main', mb: 2 }} />
            <Typography variant="title" component="h1" gutterBottom sx={{ display: 'block' }}>
              Reset Password
            </Typography>
            <Typography variant="text" color="text.secondary" sx={{ display: 'block' }}>
              Enter your email address and we'll send you a link to reset your password
            </Typography>
          </Box>

          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          <Box component="form" onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Email Address"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              margin="normal"
              required
              autoComplete="email"
              autoFocus
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              size="large"
              disabled={loading}
              sx={{ mt: 3, mb: 2, py: { xs: 1, sm: 1.5 } }}
            >
              {loading ? <CircularProgress size={24} /> : 'Send Reset Link'}
            </Button>
         
            <Box textAlign="center">
              <Link to="/login" style={{ textDecoration: 'none' }}>
                <Typography variant="text" color="primary" sx={{ display: 'block' }}>
                  Back to Login
                </Typography>
              </Link>
            </Box>
          </Box>
        </Paper>
    </Box>
  );
};

export default ForgotPassword;