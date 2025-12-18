import React, { createContext, useContext, useState, useEffect } from 'react';
import DummyUsers from '../data/users';
const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Dummy users for testing
const DUMMY_USERS = DummyUsers;

// Mock API service
const mockAPI = {
  login: async (email, password) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    const user = DUMMY_USERS.find(u => u.email === email && u.password === password);

    if (user) {
      // Return user without password
      const { password: _, ...userWithoutPassword } = user;
      const token = 'mock-jwt-token-' + Date.now();
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(userWithoutPassword));
      return { user: userWithoutPassword, token };
    } else {
      throw new Error('Invalid credentials');
    }
  },

  signup: async (email, password, name) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    const user = {
      id: Date.now(),
      email,
      name,
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
      role: 'user'
    };
    const token = 'mock-jwt-token-' + Date.now();
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
    return { user, token };
  },

  forgotPassword: async (email) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    return { message: 'Password reset email sent successfully' };
  },

  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },

  getCurrentUser: () => {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    if (token && user) {
      return { user: JSON.parse(user), token };
    }
    return null;
  }
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is already logged in
    const currentUser = mockAPI.getCurrentUser();
    if (currentUser) {
      setUser(currentUser.user);
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      const { user } = await mockAPI.login(email, password);
      setUser(user);
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const signup = async (email, password, name) => {
    try {
      const { user } = await mockAPI.signup(email, password, name);
      setUser(user);
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const forgotPassword = async (email) => {
    try {
      await mockAPI.forgotPassword(email);
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const logout = () => {
    mockAPI.logout();
    setUser(null);
  };

  const value = {
    user,
    login,
    signup,
    logout,
    forgotPassword,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};