import React, { useState } from 'react';
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
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: '+1 (555) 123-4567',
    location: 'New York, NY',
    bio: 'Experienced administrator with a passion for efficient systems and user experience.',
  });
  const [tempTheme, setTempTheme] = useState({
    primaryColor,
    fontFamily,
  });
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
      name: user?.name || '',
      email: user?.email || '',
      phone: '+1 (555) 123-4567',
      location: 'New York, NY',
      bio: 'Experienced administrator with a passion for efficient systems and user experience.',
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

  return (
    <Box>
      <Typography variant="title" gutterBottom fontWeight="bold" mt={3} sx={{ display: 'block' }}>
        Profile Settings
      </Typography>
      
      <Typography variant="body" color="text.secondary" mb={4} sx={{ display: 'block' }}>
        Manage your account settings and preferences.
      </Typography>

      {saved && (
        <Alert severity="success" sx={{ mb: 3 }}>
          Profile updated successfully!
        </Alert>
      )}

      <Grid container spacing={3}>
        {/* Profile Information */}
        <Grid item xs={12} lg={8}>
          <Paper elevation={2} sx={{ p: 3 }}>
            <Box display="flex" justifyContent="between" alignItems="center" mb={3}>
              <Typography variant="subtitle" fontWeight="bold" sx={{ display: 'block' }}>
                Personal Information
              </Typography>
              {!editing ? (
                <Button
                  startIcon={<EditOutlined />}
                  onClick={() => setEditing(true)}
                  variant="outlined"
                  sx={{mx: 2}}
                >
                  Edit Profile
                </Button>
              ) : (
                <Box display="flex" gap={1}>
                  <Button
                    startIcon={<SaveOutlined />}
                    onClick={handleSave}
                    variant="contained"
                  >
                    Save
                  </Button>
                  <Button
                    startIcon={<CancelOutlined />}
                    onClick={handleCancel}
                    variant="outlined"
                  >
                    Cancel
                  </Button>
                </Box>
              )}
            </Box>

            <Grid container spacing={3}>
              <Grid item xs={12} md={4}>
                <Box textAlign="center">
                  <Avatar
                    src={user?.avatar}
                    sx={{ width: 120, height: 120, mx: 'auto', mb: 2 }}
                  >
                    {user?.name?.charAt(0)}
                  </Avatar>
                  {editing && (
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

              <Grid item xs={12} md={8}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Full Name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      disabled={!editing}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      disabled={!editing}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      disabled={!editing}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Location"
                      name="location"
                      value={formData.location}
                      onChange={handleInputChange}
                      disabled={!editing}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Bio"
                      name="bio"
                      value={formData.bio}
                      onChange={handleInputChange}
                      disabled={!editing}
                      multiline
                      rows={3}
                    />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Paper>
        </Grid>

        {/* Account Stats */}
        <Grid item xs={12} lg={4}>
          <Paper elevation={2} sx={{ p: 3, mb: 3 }}>
            <Typography variant="subtitle" fontWeight="bold" mb={2} sx={{ display: 'block' }}>
              Account Statistics
            </Typography>
            <Box display="flex" flexDirection="column" gap={2}>
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
          </Paper>

          {/* Quick Actions */}
          <Paper elevation={2} sx={{ p: 3 }}>
            <Typography variant="subtitle" fontWeight="bold" mb={2} sx={{ display: 'block' }}>
              Quick Actions
            </Typography>
            <Box display="flex" flexDirection="column" gap={1}>
              <Button variant="outlined" fullWidth>
                Download Data
              </Button>
              <Button variant="outlined" fullWidth>
                Export Profile
              </Button>
              <Button variant="outlined" color="error" fullWidth>
                Delete Account
              </Button>
            </Box>
          </Paper>
        </Grid>

        {/* Theme Customization */}
        <Grid item xs={12}>
          <Paper elevation={2} sx={{ p: 3 }}>
            <Box display="flex" alignItems="center" mb={3}>
              <PaletteOutlined sx={{ mr: 1, color: 'primary.main' }} />
              <Typography variant="subtitle" fontWeight="bold" sx={{ display: 'block' }}>
                Theme Customization
              </Typography>
            </Box>

            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Typography variant="subtitle" fontWeight="bold" mb={2} sx={{ display: 'block' }}>
                  Primary Color
                </Typography>
                <Box display="flex" gap={1} flexWrap="wrap">
                  {colorOptions.map((color) => (
                    <Box
                      key={color.value}
                      onClick={() => handleThemeChange('primaryColor', color.value)}
                      sx={{
                        width: 40,
                        height: 40,
                        backgroundColor: color.value,
                        borderRadius: 1,
                        cursor: 'pointer',
                        border: tempTheme.primaryColor === color.value ? '3px solid #000' : '1px solid #ccc',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      {tempTheme.primaryColor === color.value && (
                        <Typography variant="text" color="white" fontWeight="bold">
                          ✓
                        </Typography>
                      )}
                    </Box>
                  ))}
                </Box>
              </Grid>

              <Grid item xs={12} md={6}>
                <Typography variant="subtitle" fontWeight="bold" mb={2} sx={{ display: 'block' }}>
                  Font Family
                </Typography>
                <FormControl fullWidth>
                  <InputLabel>Select Font</InputLabel>
                  <Select
                    value={tempTheme.fontFamily}
                    label="Select Font"
                    onChange={(e) => handleThemeChange('fontFamily', e.target.value)}
                  >
                    {fontOptions.map((font) => (
                      <MenuItem key={font.value} value={font.value}>
                        <Box sx={{ fontFamily: font.value }}>
                          {font.name}
                        </Box>
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
            </Grid>

            <Box mt={3}>
              <Button
                variant="contained"
                onClick={handleSave}
                startIcon={<SaveOutlined />}
              >
                Apply Theme Changes
              </Button>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Profile;