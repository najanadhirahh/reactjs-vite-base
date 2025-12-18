import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { ThemeProvider } from './contexts/ThemeContext';
import ProtectedRoute from './components/layouts/ProtectedRoute';
import Layout from './components/layouts/Layout';
import Login from './pages/auth/Login';
import Signup from './pages/auth/Signup';
import ForgotPassword from './pages/auth/ForgotPassword';
import Dashboard from './pages/dashboard/Dashboard';
import UserList from './pages/users/UserList';
import Profile from './pages/profile/Profile';
import Settings from './pages/setting/Index';
import Unauthorized from './pages/Unauthorized';
import NotFound from './pages/NotFound';
import { CssBaseline } from '@mui/material';
import theme from './theme';
import PublicLayout from './components/layouts/PublicLayout';

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      <AuthProvider>
        <BrowserRouter>
          <Routes>
            {/* Public Routes */}
            <Route element={<PublicLayout />}>
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/unauthorized" element={<Unauthorized />} />
              <Route path="*" element={<Navigate to="/not-found" replace />} />
            </Route>


            {/* Protected Routes */}
            <Route path="/" element={
              <ProtectedRoute>
                <Layout />
              </ProtectedRoute>
            }>
              <Route index element={<Navigate to="/dashboard" replace />} />
              <Route path="dashboard" element={
                <ProtectedRoute requiredPermission="dashboard: view">
                  <Dashboard />
                </ProtectedRoute>
              } />
              <Route path="profile" element={
                <ProtectedRoute requiredPermission="profile: view">
                  <Profile />
                </ProtectedRoute>
              } />
              <Route path="analytics" element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <Dashboard />
                </ProtectedRoute>
              } />
              <Route path="users" element={
                <ProtectedRoute requiredPermission="user: view">
                  <UserList />
                </ProtectedRoute>
              } />
              <Route path="settings" element={
                <ProtectedRoute requiredPermission="setting: view">
                  <Settings />
                </ProtectedRoute>
              } />
            </Route>

            {/* Catch all route */}
            {/* <Route path="*" element={<Navigate to="/not-found" replace />} /> */}
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  );
};

export default App;
