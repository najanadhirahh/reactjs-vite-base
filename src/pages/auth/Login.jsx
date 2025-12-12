import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import {
  Container,
  Paper,
  TextField,
  Button,
  Typography,
  Box,
  Alert,
  CircularProgress,
  Divider,
} from '@mui/material';
import { LoginOutlined } from '@mui/icons-material';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const result = await login(email, password);

    if (result.success) {
      navigate('/dashboard');
    } else {
      setError(result.error);
    }

    setLoading(false);
  };

  return (
    <Paper elevation={10} sx={{
      p: { xs: 2.5, sm: 3, md: 4 },
      borderRadius: 2,
      maxWidth: 400,
      width: '100%',
      height: '90%',
      boxShadow: { xs: 8, sm: 10 }
    }}>
      <Box textAlign="center" mb={3}>
        <LoginOutlined sx={{ fontSize: { xs: 40, sm: 48 }, color: 'primary.main', mb: 2 }} />
        <Typography variant="title" gutterBottom sx={{ display: 'block' }}>
          Welcome Back
        </Typography>
        <Typography variant="subtitle" color="text.secondary" sx={{ display: 'block' }}>
          Sign in to your account
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
          margin="dense"
          required
          autoComplete="email"
          autoFocus
          size='small'
        />

        <TextField
          fullWidth
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          margin="dense"
          required
          autoComplete="current-password"
          size='small'
        />

        <Button
          type="submit"
          fullWidth
          variant="contained"
          size="large"
          disabled={loading}
          sx={{ mt: 3, mb: 2, py: { xs: 1, sm: 1.5 } }}
        >
          {loading ? <CircularProgress size={24} /> : 'Sign In'}
        </Button>

        <Box textAlign="center">
          <Link to="/forgot-password" style={{ textDecoration: 'none' }}>
            <Typography variant="text" color="primary" sx={{ display: 'block' }}>
              Forgot your password?
            </Typography>
          </Link>
        </Box>

        <Divider sx={{ my: 2 }}>
          <Typography variant="text" color="text.secondary" sx={{ display: 'block' }}>
            OR
          </Typography>
        </Divider>

        <Box textAlign="center">
          <Typography variant="text" color="text.secondary" sx={{ display: 'block' }}>
            Don't have an account?{' '}
            <Link to="/signup" style={{ textDecoration: 'none' }}>
              <Typography component="span" color="primary" fontWeight="medium" sx={{ display: 'block' }}>
                Sign up
              </Typography>
            </Link>
          </Typography>
        </Box>
      </Box>

      <Box mt={3} p={2} bgcolor="grey.50" borderRadius={1}>
        <Typography variant="text" color="text.secondary" textAlign="center" sx={{ display: 'block' }}>
          <strong>Demo Credentials:</strong><br />
          Admin: admin@example.com / password<br />
          User: user@example.com / password
        </Typography>
      </Box>
    </Paper>
  );
};

export default Login;