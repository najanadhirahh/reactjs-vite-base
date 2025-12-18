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

const Index = () => {
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
            <Typography variant="title" gutterBottom fontWeight="bold" sx={{ display: 'block' }}>
                Portal Setting
            </Typography>

            <Typography variant="body" color="text.secondary" mb={4} sx={{ display: 'block' }}>
                Manage user profile settings.
            </Typography>

            {saved && (
                <Alert severity="success" sx={{ mb: 3 }}>
                    User profile updated successfully!
                </Alert>
            )}

            <Grid container spacing={3}>
                {/* Theme Customization */}
                <Grid item xs={12}>
                    <Paper elevation={2} sx={{ p: 3 }}>
                        <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
                            <Box display="flex" alignItems="center">
                                <PaletteOutlined sx={{ mr: 1, color: 'primary.main' }} />
                                <Typography variant="subtitle" fontWeight="bold" sx={{ display: 'block' }}>
                                    Theme Customization
                                </Typography>
                            </Box>

                            {user?.rolePermission?.includes('setting: edit') && (
                                <Button
                                    variant="contained"
                                    onClick={handleSave}
                                    startIcon={<SaveOutlined />}
                                >
                                    Apply Theme Changes
                                </Button>
                            )}
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

                        {/* <Box mt={3}>
              
            </Box> */}
                    </Paper>
                </Grid>
            </Grid>
        </Box>
    );
};

export default Index;