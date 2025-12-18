import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useTheme as useCustomTheme } from '../../contexts/ThemeContext';
import {
  Grid,
  Paper,
  Typography,
  Box,
  Avatar,
  Button,
  TextField,
  Card,
  CardContent,
  Divider,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Switch,
  FormControlLabel,
  Alert,
  Chip,
} from '@mui/material';
import {
  EditOutlined,
  SaveOutlined,
  CancelOutlined,
  PhotoCameraOutlined,
  PaletteOutlined,
  FontDownloadOutlined,
} from '@mui/icons-material';

const Profile = () => {
  const { user } = useAuth();
  const { mode, primaryColor, fontFamily, setPrimaryColor, setFontFamily } = useCustomTheme();
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({});
  const [tempTheme, setTempTheme] = useState({
    primaryColor,
    fontFamily,
  });

  useEffect(() => {
    console.log(user);
    if (user) {
      setFormData({
        name: user.name,
        email: user.email,
        role: user.role,
        status: user.status,
        // bio: user.bio,
      });
    }
  }, [user]);

  const [saved, setSaved] = useState(false);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleThemeChange = (field, value) => {
    setTempTheme({
      ...tempTheme,
      [field]: value,
    });
  };

  const handleSave = () => {
    // In a real app, you would save to backend
    setPrimaryColor(tempTheme.primaryColor);
    setFontFamily(tempTheme.fontFamily);
    setEditing(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const handleCancel = () => {
    setFormData({
      name: user.name,
      email: user.email,
      role: user.role,
      status: user.status,
      // bio: user.bio,
    });
    setTempTheme({
      primaryColor,
      fontFamily,
    });
    setEditing(false);
  };

  const colorOptions = [
    { name: 'Blue', value: '#1976d2' },
    { name: 'Purple', value: '#9c27b0' },
    { name: 'Green', value: '#388e3c' },
    { name: 'Orange', value: '#f57c00' },
    { name: 'Red', value: '#d32f2f' },
    { name: 'Teal', value: '#00796b' },
  ];

  const fontOptions = [
    { name: 'Roboto', value: '"Roboto", "Helvetica", "Arial", sans-serif' },
    { name: 'Open Sans', value: '"Open Sans", "Helvetica", "Arial", sans-serif' },
    { name: 'Lato', value: '"Lato", "Helvetica", "Arial", sans-serif' },
    { name: 'Montserrat', value: '"Montserrat", "Helvetica", "Arial", sans-serif' },
    { name: 'Poppins', value: '"Poppins", "Helvetica", "Arial", sans-serif' },
  ];

  const canEdit = user?.rolePermission?.includes('profile: edit');

  return (
    <Box>
      <Box display="flex" flexDirection="row" justifyContent="space-between" alignItems="center" gap={1}>
        <Box>
          <Typography variant="title" gutterBottom fontWeight="bold" sx={{ display: 'block' }}>
            Profile Settings
          </Typography>

          <Typography variant="body" color="text.secondary" mb={4} sx={{ display: 'block' }}>
            Manage your account settings and preferences.
          </Typography>
        </Box>


        <Box display="flex" flexDirection="row" gap={2}>
          <Button variant="contained" color="secondary">
            Download Data
          </Button>
          <Button variant="contained" color="secondary">
            Export Profile
          </Button>
          {canEdit && (
            <Button variant="outlined" color="error">
              Delete Account
            </Button>
          )}
        </Box>
      </Box>


      {saved && (
        <Alert severity="success" sx={{ mb: 3 }}>
          Profile updated successfully!
        </Alert>
      )}

      <Grid container spacing={3}>
        {/* Profile Information */}
        <Grid item xs={12}>
          <Card elevation={2} sx={{ p: 3 }}>
            <Box display="flex" flexDirection="row" justifyContent="space-between" alignItems="center" mb={3}>
              <Typography variant="subtitle" fontWeight="bold" sx={{ display: 'block' }}>
                Personal Information {canEdit}
              </Typography>
              {!editing ? (
                canEdit && (
                  <Button
                    startIcon={<EditOutlined />}
                    onClick={() => setEditing(true)}
                    variant="outlined"
                    sx={{ mx: 2 }}
                  >
                    Edit Profile
                  </Button>
                )
              ) : (
                <Box display="flex" gap={1}>
                  <Button
                    startIcon={<SaveOutlined />}
                    onClick={handleSave}
                    variant="contained"
                    color="secondary"
                  >
                    Save
                  </Button>
                  <Button
                    startIcon={<CancelOutlined />}
                    onClick={handleCancel}
                    variant="outlined"
                    color="error"
                  >
                    Cancel
                  </Button>
                </Box>
              )}
            </Box>

            <Grid container spacing={3}>
              <Grid item xs={12} md={2}>
                <Box textAlign="center">
                  <Avatar
                    src={user?.avatar}
                    sx={{ width: 120, height: 120, mx: 'auto', mb: 2 }}
                  >
                    {user?.name?.charAt(0)}
                  </Avatar>
                  {editing && canEdit && (
                    <Button
                      startIcon={<PhotoCameraOutlined />}
                      variant="outlined"
                      size="small"
                    >
                      Change Photo
                    </Button>
                  )}
                </Box>

              </Grid>

              <Grid item xs={12} md={6}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Full Name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      disabled={!editing}
                      size="small"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      disabled={!editing}
                      size="small"
                    />
                  </Grid>
                  <Grid item xs={12} >
                    <TextField
                      fullWidth
                      label="Role"
                      name="role"
                      value={formData.role}
                      onChange={handleInputChange}
                      disabled={!editing}
                      size="small"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Status"
                      name="status"
                      value={formData.status}
                      onChange={handleInputChange}
                      disabled={!editing}
                      size="small"
                    />
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12} md={4}>
                <Card elevation={2} sx={{ p: 2, mb: 3 }}>
                  <Typography variant="subtitle" fontWeight="bold" mb={1.5} sx={{ display: 'block' }}>
                    Account Statistics
                  </Typography>
                  <Box display="flex" flexDirection="column" gap={1.5}>
                    <Box display="flex" justifyContent="space-between">
                      <Typography variant="body" sx={{ display: 'block' }}>Member Since</Typography>
                      <Chip label="Jan 2024" size="small" />
                    </Box>
                    <Box display="flex" justifyContent="space-between">
                      <Typography variant="body" sx={{ display: 'block' }}>Last Login</Typography>
                      <Chip label="Today" size="small" color="success" />
                    </Box>
                    <Box display="flex" justifyContent="space-between">
                      <Typography variant="body" sx={{ display: 'block' }}>Profile Views</Typography>
                      <Chip label="1,234" size="small" color="info" />
                    </Box>
                    <Box display="flex" justifyContent="space-between">
                      <Typography variant="body" sx={{ display: 'block' }}>Status</Typography>
                      <Chip label="Active" size="small" color="success" />
                    </Box>
                  </Box>
                </Card>
              </Grid>
            </Grid>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Profile;